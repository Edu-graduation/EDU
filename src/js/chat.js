// ///////////////// // Ninth Version /////////////////
// import { supaClient } from "./app.js";
// import { getUserName } from "./app.js";
// const studentId = sessionStorage.getItem("studentId");
// const chatName = document.querySelector(".chat__name");
// const chats = document.querySelector(".chats");
// const collapseButton = document.querySelector(".collapse__chat-btn");
// const chatView = document.querySelector(".chat__view");
// const chatListContainer = document.querySelector(".chats__list");
// let currentChatId = null;
// let subscription = null;
// // Track messages we've already seen to prevent duplicates
// let processedMessageIds = new Set();
// // Cache for user names to reduce API calls
// const userNameCache = new Map();

// // Helper function to safely get user names with caching
// async function safeGetUserName(userId) {
//   if (!userId) {
//     return "Unknown User";
//   }

//   // Check cache first
//   if (userNameCache.has(userId)) {
//     return userNameCache.get(userId);
//   }

//   try {
//     const name = await getUserName(userId);
//     userNameCache.set(userId, name); // Cache the result
//     return name;
//   } catch (error) {
//     console.error(`Error getting username for ID ${userId}:`, error);
//     userNameCache.set(userId, "Unknown User"); // Cache the fallback
//     return "Unknown User";
//   }
// }

// function openChat() {
//   chats.classList.add("open");
//   chatView.classList.add("active");
// }

// function closeChat() {
//   chats.classList.remove("open");
//   chatView.classList.remove("active");
//   document.querySelectorAll(".chat__item").forEach((chat) => {
//     chat.classList.remove("active");
//   });
// }

// function attachChatClickListeners() {
//   document.querySelectorAll(".chat__item").forEach((chatItem) => {
//     chatItem.addEventListener("click", async (e) => {
//       // Close chat list and open chat view
//       if (
//         e.target.closest(".chat__item") &&
//         !e.target.closest(".chat__item").classList.contains("active")
//       ) {
//         document.querySelectorAll(".chat__item").forEach((item) => {
//           item.classList.remove("active");
//         });
//         e.target.closest(".chat__item").classList.add("active");
//         openChat();
//       }

//       const chatId = chatItem.getAttribute("data-chat-id");

//       // Don't reload if we're already on this chat
//       if (currentChatId === chatId) {
//         return;
//       }

//       // Unsubscribe from previous chat subscription if exists
//       if (subscription) {
//         subscription.unsubscribe();
//       }

//       currentChatId = chatId;
//       const chatNameText = chatItem.getAttribute("data-chat-name");

//       // Reset processed message IDs when changing chats
//       processedMessageIds = new Set();

//       // Show loading indicator
//       const messagesContainer = document.querySelector(
//         ".chat__messages-container"
//       );
//       messagesContainer.innerHTML =
//         '<div class="loading-messages loader"></div>';

//       // Load chat details
//       const chatDetails = await getChatDetails(chatId);

//       // Render chat details
//       renderChatDetails(chatDetails);

//       try {
//         // Load chat messages
//         const chatMessages = await retrieveChatMessages(chatId);

//         // Only render if this is still the current chat (user didn't switch while loading)
//         if (currentChatId === chatId) {
//           // Render chat messages
//           renderChatMessages(chatMessages, false); // false = no animation on initial load
//         }
//       } catch (error) {
//         console.error("Error loading messages:", error);
//         messagesContainer.innerHTML =
//           '<div class="error-messages">Error loading messages. Please try again.</div>';
//       }

//       // Set up real-time subscription for this chat
//       setupChatSubscription(chatId);

//       // Set up event listener for send button
//       setupSendMessageHandler(chatId);
//     });
//   });

//   collapseButton.addEventListener("click", closeChat);
// }

// function setupSendMessageHandler(chatId) {
//   const sendButton = document.querySelector(".send__message-btn");
//   const messageInput = document.querySelector(".message__input");

//   // First, remove any existing event listeners by cloning the elements
//   const newSendButton = sendButton.cloneNode(true);
//   sendButton.parentNode.replaceChild(newSendButton, sendButton);

//   const newMessageInput = messageInput.cloneNode(true);
//   messageInput.parentNode.replaceChild(newMessageInput, messageInput);

//   // Add event listener to the send button
//   newSendButton.addEventListener("click", async () => {
//     const messageContent = newMessageInput.value.trim();
//     if (messageContent) {
//       await sendMessage(chatId, messageContent);
//       newMessageInput.value = ""; // Clear input after sending
//       newMessageInput.focus(); // Keep focus on input for better UX
//     }
//   });

//   // Add event listener for Enter key
//   newMessageInput.addEventListener("keypress", async (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent default to avoid form submission
//       const messageContent = newMessageInput.value.trim();
//       if (messageContent) {
//         await sendMessage(chatId, messageContent);
//         newMessageInput.value = ""; // Clear input after sending
//       }
//     }
//   });

//   // Focus the input field for immediate typing
//   newMessageInput.focus();
// }

// let isReconnecting = false;

// function setupChatSubscription(chatId) {
//   // Unsubscribe from any existing subscription first
//   if (subscription) {
//     subscription.unsubscribe();
//   }

//   // Create a more robust subscription with better error handling
//   try {
//     subscription = supaClient
//       .channel(`chat:${chatId}`)
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "message",
//           filter: `chat_id=eq.${chatId}`,
//         },
//         (payload) => {
//           // Only process if this is still the current chat
//           if (currentChatId === chatId) {
//             if (!processedMessageIds.has(payload.new.msg_id)) {
//               processedMessageIds.add(payload.new.msg_id);
//               addMessageToChat(payload.new);
//             }
//           }
//         }
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status);
//         if (status === "SUBSCRIBED") {
//           console.log(`Successfully subscribed to chat ${chatId}`);
//           isReconnecting = false;
//         } else if (status === "CHANNEL_ERROR" && !isReconnecting) {
//           console.error(`Error subscribing to chat ${chatId}`);
//           isReconnecting = true;
//           // Try to resubscribe after a delay if there was an error
//           setTimeout(() => {
//             if (currentChatId === chatId) {
//               // Only reconnect if still on this chat
//               setupChatSubscription(chatId);
//             }
//           }, 3000);
//         }
//       });
//   } catch (error) {
//     console.error("Error setting up subscription:", error);
//     // Try to resubscribe after a delay
//     if (!isReconnecting) {
//       isReconnecting = true;
//       setTimeout(() => {
//         if (currentChatId === chatId) {
//           // Only reconnect if still on this chat
//           setupChatSubscription(chatId);
//           isReconnecting = false;
//         }
//       }, 3000);
//     }
//   }
// }

// async function addMessageToChat(message) {
//   // First check if we already have this message in the DOM
//   const existingMessage = document.querySelector(
//     `[data-message-id="${message.msg_id}"]`
//   );
//   if (existingMessage) {
//     return; // Skip if already exists
//   }

//   // Create the new message element
//   const messagesContainer = document.querySelector(".chat__messages-container");
//   const messageEl = document.createElement("div");
//   messageEl.setAttribute("data-message-id", message.msg_id);
//   messageEl.setAttribute(
//     "data-timestamp",
//     new Date(message.msg_date_time).getTime()
//   );

//   const messageSenderName = document.createElement("p");
//   const messageContent = document.createElement("p");
//   const messageTime = document.createElement("p");

//   messageSenderName.classList.add("message__sender-name");
//   messageContent.classList.add("message__content");
//   messageTime.classList.add("message__time");

//   messageContent.textContent = message.msg_content;
//   messageTime.textContent = formatDateTime(new Date(message.msg_date_time));

//   messageEl.appendChild(messageSenderName);
//   messageEl.appendChild(messageContent);
//   messageEl.appendChild(messageTime);

//   // Check if the message is from the current user
//   const isSentByCurrentUser = message.senderid === +studentId;
//   if (isSentByCurrentUser) {
//     messageEl.classList.add("sent");
//     messageSenderName.textContent = await safeGetUserName(studentId);
//   } else {
//     messageEl.classList.add("received");
//     messageSenderName.textContent = await safeGetUserName(message.senderid);
//   }

//   messageEl.classList.add("message");

//   // Find the proper position to insert this message chronologically
//   const timestamp = new Date(message.msg_date_time).getTime();
//   const allMessages = Array.from(
//     messagesContainer.querySelectorAll(".message[data-timestamp]")
//   );

//   // Sort by timestamp then by ID if available
//   let inserted = false;

//   for (let i = 0; i < allMessages.length; i++) {
//     const existingMsg = allMessages[i];
//     const existingTimestamp = parseInt(
//       existingMsg.getAttribute("data-timestamp"),
//       10
//     );

//     if (timestamp < existingTimestamp) {
//       messagesContainer.insertBefore(messageEl, existingMsg);
//       inserted = true;
//       break;
//     }

//     if (timestamp === existingTimestamp) {
//       // If timestamps are equal, check msg_id for ordering
//       const existingId = existingMsg.getAttribute("data-message-id");
//       if (existingId && message.msg_id < existingId) {
//         messagesContainer.insertBefore(messageEl, existingMsg);
//         inserted = true;
//         break;
//       }
//     }
//   }

//   // If we didn't find a place to insert it, append it at the end
//   if (!inserted) {
//     messagesContainer.appendChild(messageEl);
//   }

//   // Add with a slight animation effect
//   messageEl.style.opacity = "0";
//   messageEl.style.transform = "translateY(10px)";

//   // Trigger reflow to ensure the animation works
//   void messageEl.offsetWidth;

//   // Apply transition
//   messageEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
//   messageEl.style.opacity = "1";
//   messageEl.style.transform = "translateY(0)";

//   // Scroll to the bottom to show the new message
//   scrollToBottom();

//   // Update just the chat list item with this message, not the entire chat list
//   updateLastMessageInChatList(
//     message.chat_id,
//     message.msg_content,
//     message.senderid
//   );
// }

// function scrollToBottom() {
//   const messagesContainer = document.querySelector(".chat__messages-container");
//   messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }

// function formatDateTime(date) {
//   // Adjust for local timezone and format
//   const options = {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     // day: "2-digit",
//     // month: "2-digit",
//     // year: "numeric",
//   };

//   // Get just the time part for today's messages
//   const today = new Date();
//   if (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   ) {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   }

//   // Show full date for older messages
//   return date.toLocaleString("en-US", options);
// }

// async function renderChatList() {
//   try {
//     const chats = await getChatList();
//     chatListContainer.innerHTML = '<div class="loader loading-chats"></div>';

//     if (chats.length === 0) {
//       // Display a message when no chats are available
//       chatListContainer.innerHTML = `
//         <li class="no-chats">
//           <p>No chats available</p>
//         </li>
//       `;
//       return;
//     }

//     let markup = "";

//     for (const chat of chats) {
//       // Try to get the last message for this chat
//       const lastMessage = await getLastMessage(chat.chat_id);
//       const lastMessageText = lastMessage
//         ? truncateText(lastMessage.msg_content, 30)
//         : "No messages yet...";

//       // Safely get the sender name
//       let senderPrefix = "";
//       if (lastMessage) {
//         if (+studentId === +lastMessage.senderid) {
//           senderPrefix = "You: ";
//         } else if (lastMessage.senderid) {
//           const senderName = await safeGetUserName(lastMessage.senderid);
//           senderPrefix = `${senderName}: `;
//         }
//       }

//       markup += `
//        <li class="chat__item" data-chat-id="${chat.chat_id}" data-chat-name="${chat.chat_name}">
//                 <div class="chat__img"></div>
//                 <div class="chat__details">
//                   <div class="chat__name">${chat.chat_name}</div>
//                   <div class="chat__last-message">
//                     ${senderPrefix}${lastMessageText}
//                   </div>
//                 </div>
//               </li>`;
//     }

//     chatListContainer.innerHTML = markup;
//     attachChatClickListeners();
//   } catch (error) {
//     console.error("Error rendering chat list:", error);
//     chatListContainer.innerHTML = `
//       <li class="error-message">
//         <p>Error loading chats. Please try again.</p>
//       </li>
//     `;
//   }
// }

// function truncateText(text, maxLength) {
//   if (!text) return "";
//   if (text.length <= maxLength) return text;
//   return text.substring(0, maxLength) + "...";
// }

// async function getLastMessage(chatId) {
//   const { data, error } = await supaClient
//     .from("message")
//     .select("*")
//     .eq("chat_id", chatId)
//     .order("msg_date_time", { ascending: false })
//     .limit(1);

//   if (error || !data) {
//     return null;
//   }
//   if (data) {
//     // console.log(data[0].msg_content);
//     // console.log(data[0]);
//     return data[0];
//   }
// }

// async function getChatList() {
//   const { data, error } = await supaClient
//     .from("student_chat")
//     .select("*")
//     .eq("student_id", studentId);

//   if (error) {
//     console.error("Error fetching chat list:", error);
//     return [];
//   }

//   if (data && data.length > 0) {
//     const { data: chats, error } = await supaClient
//       .from("chat")
//       .select("*")
//       .in(
//         "chat_id",
//         data.map((chat) => chat.chat_id)
//       );

//     if (error) {
//       console.error("Error fetching chat details:", error);
//       return [];
//     } else {
//       return chats;
//     }
//   }
//   return [];
// }

// async function getChatDetails(chatId) {
//   const { data, error } = await supaClient
//     .from("chat")
//     .select("*")
//     .eq("chat_id", chatId)
//     .single();

//   if (error) {
//     console.error("Error fetching chat details:", error);
//     return null;
//   } else {
//     return data;
//   }
// }

// function renderChatDetails(chat) {
//   if (chat) {
//     chatName.textContent = chat.chat_name;
//   }
// }

// async function retrieveChatMessages(chatId) {
//   const { data, error } = await supaClient
//     .from("message")
//     .select("*")
//     .eq("chat_id", chatId)
//     .order("msg_date_time", { ascending: true }) // Primary sort by timestamp
//     .order("msg_id", { ascending: true }); // Secondary sort by message_id for consistency

//   if (error) {
//     console.error("Error fetching chat messages:", error);
//     return [];
//   } else {
//     // Build our processed message IDs set
//     data.forEach((msg) => {
//       if (msg.msg_id) {
//         processedMessageIds.add(msg.msg_id);
//       }
//     });

//     return data;
//   }
// }

// function renderChatMessages(messages, animate = true) {
//   // Get the messages container
//   const messagesContainer = document.querySelector(".chat__messages-container");

//   // Clear existing messages
//   messagesContainer.innerHTML = "";

//   if (!messages || messages.length === 0) {
//     // Show a message when there are no messages
//     const emptyMessage = document.createElement("div");
//     emptyMessage.classList.add("empty-messages");
//     emptyMessage.textContent = "No messages yet. Start the conversation!";
//     messagesContainer.appendChild(emptyMessage);
//     return;
//   }

//   // First ensure messages are properly sorted
//   messages.sort((a, b) => {
//     const timeA = new Date(a.msg_date_time).getTime();
//     const timeB = new Date(b.msg_date_time).getTime();

//     // If timestamps are equal, sort by message_id as secondary criteria
//     if (timeA === timeB) {
//       return a.msg_id - b.msg_id;
//     }

//     return timeA - timeB;
//   });

//   // Performance optimization: Create a document fragment to append all messages at once
//   const fragment = document.createDocumentFragment();

//   // Store promises for user name resolution
//   const namePromises = [];

//   // Render all messages
//   messages.forEach((message, index) => {
//     if (!message) return; // Skip any undefined messages

//     const messageEl = document.createElement("div");
//     messageEl.setAttribute("data-message-id", message.msg_id);
//     messageEl.setAttribute(
//       "data-timestamp",
//       new Date(message.msg_date_time).getTime()
//     );

//     const messageSenderName = document.createElement("p");
//     const messageContent = document.createElement("p");
//     const messageTime = document.createElement("p");

//     messageSenderName.classList.add("message__sender-name");
//     messageContent.classList.add("message__content");
//     messageTime.classList.add("message__time");

//     messageContent.textContent = message.msg_content || "";
//     messageTime.textContent = formatDateTime(new Date(message.msg_date_time));

//     messageEl.appendChild(messageSenderName);
//     messageEl.appendChild(messageContent);
//     messageEl.appendChild(messageTime);

//     // Check if the message is from the current user
//     const isSentByCurrentUser = message.senderid === +studentId;

//     // Add message classes based on sender
//     if (isSentByCurrentUser) {
//       messageEl.classList.add("sent");
//       // Add a promise for resolving the username
//       namePromises.push(
//         safeGetUserName(studentId).then((name) => {
//           messageSenderName.textContent = name;
//         })
//       );
//     } else {
//       messageEl.classList.add("received");
//       // Add a promise for resolving the username
//       namePromises.push(
//         safeGetUserName(message.senderid).then((name) => {
//           messageSenderName.textContent = name;
//         })
//       );
//     }

//     messageEl.classList.add("message");

//     // Only animate if specified
//     if (animate) {
//       // Add initial state for animation
//       messageEl.style.opacity = "0";
//       messageEl.style.transform = "translateY(10px)";

//       // Add to fragment (will be appended to DOM in correct order)
//       fragment.appendChild(messageEl);

//       // Animate in with a staggered delay based on index
//       // Only animate the most recent messages if there are many
//       const shouldAnimate = messages.length - index <= 15;

//       if (shouldAnimate) {
//         setTimeout(() => {
//           messageEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
//           messageEl.style.opacity = "1";
//           messageEl.style.transform = "translateY(0)";
//         }, Math.min(index * 30, 300)); // Stagger with a max delay of 300ms
//       } else {
//         // Instantly show older messages
//         messageEl.style.opacity = "1";
//         messageEl.style.transform = "translateY(0)";
//       }
//     } else {
//       // No animation - immediately visible
//       messageEl.style.opacity = "1";
//       messageEl.style.transform = "translateY(0)";
//       fragment.appendChild(messageEl);
//     }
//   });

//   // Append all messages at once for better performance
//   messagesContainer.appendChild(fragment);

//   // Resolve all name promises in parallel
//   Promise.all(namePromises).catch((error) => {
//     console.error("Error resolving usernames:", error);
//   });

//   // Scroll to the bottom of the messages container
//   // Use a small timeout to ensure it happens after rendering
//   setTimeout(scrollToBottom, 100);
// }

// // Updated function to handle last message in chat list with sender ID
// async function updateLastMessageInChatList(chatId, messageContent, senderId) {
//   const chatItem = document.querySelector(
//     `.chat__item[data-chat-id="${chatId}"]`
//   );
//   if (chatItem) {
//     const lastMessageEl = chatItem.querySelector(".chat__last-message");
//     if (lastMessageEl) {
//       let prefix = "";

//       // Determine the prefix based on sender
//       if (senderId === +studentId) {
//         prefix = "You: ";
//       } else if (senderId) {
//         try {
//           const senderName = await safeGetUserName(senderId);
//           prefix = senderName ? `${senderName}: ` : "";
//         } catch (error) {
//           console.error("Error getting sender name:", error);
//           prefix = "";
//         }
//       }

//       lastMessageEl.textContent = prefix + truncateText(messageContent, 30);

//       // Move this chat to the top of the list (most recent)
//       const chatsList = chatItem.parentElement;
//       if (chatsList && chatsList.firstChild !== chatItem) {
//         chatsList.insertBefore(chatItem, chatsList.firstChild);
//       }
//     }
//   }
// }

// async function sendMessage(chatId, messageContent) {
//   try {
//     const timestamp = new Date();

//     // Create a temporary visual placeholder for the message with a unique ID
//     const tempMessageId = `temp-${Date.now()}`;
//     const messagesContainer = document.querySelector(
//       ".chat__messages-container"
//     );

//     // Remove any "empty messages" placeholder if it exists
//     const emptyPlaceholder = messagesContainer.querySelector(".empty-messages");
//     if (emptyPlaceholder) {
//       emptyPlaceholder.remove();
//     }

//     const messageEl = document.createElement("div");
//     messageEl.id = tempMessageId;
//     messageEl.classList.add("message", "sent", "pending");
//     // Add timestamp as data attribute for sorting
//     messageEl.setAttribute("data-timestamp", timestamp.getTime());

//     const messageSenderName = document.createElement("p");
//     messageSenderName.classList.add("message__sender-name");
//     messageSenderName.textContent = await safeGetUserName(studentId);

//     const messageContent_el = document.createElement("p");
//     messageContent_el.classList.add("message__content");
//     messageContent_el.textContent = messageContent;

//     const messageTime = document.createElement("p");
//     messageTime.classList.add("message__time");
//     messageTime.textContent = formatDateTime(timestamp);

//     messageEl.appendChild(messageSenderName);
//     messageEl.appendChild(messageContent_el);
//     messageEl.appendChild(messageTime);

//     // Find the proper position to insert the message chronologically
//     const allMessages = Array.from(
//       messagesContainer.querySelectorAll(".message[data-timestamp]")
//     );
//     let inserted = false;

//     for (const existingMsg of allMessages) {
//       const existingTimestamp = parseInt(
//         existingMsg.getAttribute("data-timestamp"),
//         10
//       );

//       if (timestamp.getTime() < existingTimestamp) {
//         messagesContainer.insertBefore(messageEl, existingMsg);
//         inserted = true;
//         break;
//       }
//     }

//     // If we didn't find a place to insert it, append it at the end
//     if (!inserted) {
//       messagesContainer.appendChild(messageEl);
//     }

//     // Add animation
//     messageEl.style.opacity = "0";
//     messageEl.style.transform = "translateY(10px)";

//     // Trigger reflow
//     void messageEl.offsetWidth;

//     // Animate in
//     messageEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
//     messageEl.style.opacity = "1";
//     messageEl.style.transform = "translateY(0)";

//     // Scroll to the bottom to show the new message
//     scrollToBottom();

//     // Send the actual message to the database
//     const { data, error } = await supaClient
//       .from("message")
//       .insert({
//         chat_id: chatId,
//         msg_content: messageContent,
//         senderid: studentId,
//         msg_date_time: timestamp.toISOString(),
//       })
//       .select();

//     if (error) {
//       console.error("Error sending message:", error);
//       messageEl.classList.add("error");
//       messageTime.textContent = "Failed to send";

//       // Add retry button
//       const retryButton = document.createElement("button");
//       retryButton.classList.add("retry-button");
//       retryButton.textContent = "Retry";
//       retryButton.addEventListener("click", () => {
//         // Remove the failed message
//         messageEl.remove();
//         // Try sending again
//         sendMessage(chatId, messageContent);
//       });
//       messageEl.appendChild(retryButton);
//     } else {
//       console.log("Message sent:", data);

//       // Instead of removing the placeholder, just mark it as confirmed and add the ID
//       messageEl.classList.remove("pending");
//       messageEl.classList.add("confirmed");
//       messageEl.setAttribute("data-message-id", data[0].msg_id);

//       // Add this message ID to our processed set to prevent duplication
//       if (data && data[0] && data[0].msg_id) {
//         processedMessageIds.add(data[0].msg_id);
//       }

//       // Update just the chat list item with this message
//       updateLastMessageInChatList(chatId, messageContent, studentId);
//     }
//   } catch (err) {
//     console.error("Exception sending message:", err);
//   }
// }

// // Initialize chat list
// renderChatList();

// // When the page is about to be unloaded, unsubscribe from any active subscription
// window.addEventListener("beforeunload", () => {
//   if (subscription) {
//     subscription.unsubscribe();
//   }
// });

// // A more intelligent visibility change handler that doesn't cause flickering
// let visibilityTimeout = null;
// document.addEventListener("visibilitychange", () => {
//   // Clear any pending timeout
//   if (visibilityTimeout) {
//     clearTimeout(visibilityTimeout);
//   }

//   if (document.visibilityState === "visible" && currentChatId) {
//     console.log("Tab visible again, checking connection status");

//     // Set a short delay before checking to avoid unnecessary reloads
//     visibilityTimeout = setTimeout(async () => {
//       // First check if our subscription is still active
//       if (!subscription || subscription.status !== "SUBSCRIBED") {
//         console.log("Reestablishing subscription");
//         setupChatSubscription(currentChatId);

//         // Only fetch new messages, don't completely re-render
//         try {
//           const lastMessageEl = document.querySelector(
//             ".message[data-message-id]:last-child"
//           );
//           let lastTimestamp = null;

//           if (lastMessageEl) {
//             const lastMsgId = lastMessageEl.getAttribute("data-message-id");

//             // Get messages newer than our last message
//             const { data: newMessages, error } = await supaClient
//               .from("message")
//               .select("*")
//               .eq("chat_id", currentChatId)
//               .gt("msg_id", lastMsgId)
//               .order("msg_date_time", { ascending: true })
//               .order("msg_id", { ascending: true });

//             if (!error && newMessages && newMessages.length > 0) {
//               console.log(
//                 `Found ${newMessages.length} new messages while away`
//               );

//               // Add only the new messages without re-rendering everything
//               for (const message of newMessages) {
//                 if (!processedMessageIds.has(message.msg_id)) {
//                   processedMessageIds.add(message.msg_id);
//                   await addMessageToChat(message);
//                 }
//               }
//             }
//           } else {
//             // If there are no messages, do a full refresh
//             const messages = await retrieveChatMessages(currentChatId);
//             renderChatMessages(messages, false); // no animation
//           }
//         } catch (error) {
//           console.error("Error refreshing messages:", error);
//         }
//       }
//     }, 500); // Short delay to avoid unnecessary work
//   }
// });

//////////////////// V2 ////////////////////
import { supaClient } from "./app.js";
import { getUserName } from "./app.js";
const studentId = sessionStorage.getItem("studentId");
const chatName = document.querySelector(".chat__name");
const chats = document.querySelector(".chats");
const collapseButton = document.querySelector(".collapse__chat-btn");
const chatView = document.querySelector(".chat__view");
const chatListContainer = document.querySelector(".chats__list");
let currentChatId = null;
let subscription = null;
// Track messages we've already seen to prevent duplicates
let processedMessageIds = new Set();
// Cache for user names to reduce API calls
const userNameCache = new Map();

// Prefetch the current user's name and cache it
if (studentId) {
  getUserName(studentId)
    .then((name) => {
      userNameCache.set(studentId, name);
    })
    .catch(() => {
      userNameCache.set(studentId, "Unknown User");
    });
}

// Helper function to safely get user names with caching
async function safeGetUserName(userId) {
  if (!userId) {
    return "Unknown User";
  }

  // Check cache first
  if (userNameCache.has(userId)) {
    return userNameCache.get(userId);
  }

  try {
    const name = await getUserName(userId);
    userNameCache.set(userId, name); // Cache the result
    return name;
  } catch (error) {
    console.error(`Error getting username for ID ${userId}:`, error);
    userNameCache.set(userId, "Unknown User"); // Cache the fallback
    return "Unknown User";
  }
}

// Batch username loading to avoid multiple sequential requests
async function loadUserNames(userIds) {
  const uniqueIds = [...new Set(userIds)].filter(
    (id) => id && !userNameCache.has(id)
  );

  if (uniqueIds.length === 0) return;

  // Load user names in parallel
  const promises = uniqueIds.map(async (userId) => {
    try {
      const name = await getUserName(userId);
      userNameCache.set(userId, name);
    } catch (error) {
      userNameCache.set(userId, "Unknown User");
    }
  });

  await Promise.all(promises);
}

function openChat() {
  chats.classList.add("open");
  chatView.classList.add("active");
}

function closeChat() {
  chats.classList.remove("open");
  chatView.classList.remove("active");
  document.querySelectorAll(".chat__item").forEach((chat) => {
    chat.classList.remove("active");
  });
}

function attachChatClickListeners() {
  document.querySelectorAll(".chat__item").forEach((chatItem) => {
    chatItem.addEventListener("click", async (e) => {
      // Close chat list and open chat view
      if (
        e.target.closest(".chat__item") &&
        !e.target.closest(".chat__item").classList.contains("active")
      ) {
        document.querySelectorAll(".chat__item").forEach((item) => {
          item.classList.remove("active");
        });
        e.target.closest(".chat__item").classList.add("active");
        openChat();
      }

      const chatId = chatItem.getAttribute("data-chat-id");

      // Don't reload if we're already on this chat
      if (currentChatId === chatId) {
        return;
      }

      // Unsubscribe from previous chat subscription if exists
      if (subscription) {
        subscription.unsubscribe();
      }

      currentChatId = chatId;
      const chatNameText = chatItem.getAttribute("data-chat-name");

      // Reset processed message IDs when changing chats
      processedMessageIds = new Set();

      // Show loading indicator
      const messagesContainer = document.querySelector(
        ".chat__messages-container"
      );
      messagesContainer.innerHTML =
        '<div class="loading-messages loader"></div>';

      // Load chat details
      const chatDetailsPromise = getChatDetails(chatId);
      const messagesPromise = retrieveChatMessages(chatId);

      // Load chat details and messages in parallel
      try {
        const [chatDetails, chatMessages] = await Promise.all([
          chatDetailsPromise,
          messagesPromise,
        ]);

        // Render chat details
        renderChatDetails(chatDetails);

        // Extract all user IDs for parallel name loading
        const userIds = chatMessages.map((msg) => msg.senderid);
        userIds.push(studentId); // Include current user

        // Prefetch all user names in parallel before rendering messages
        await loadUserNames(userIds);

        // Only render if this is still the current chat
        if (currentChatId === chatId) {
          // Render chat messages
          renderChatMessages(chatMessages, false); // false = no animation on initial load
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        messagesContainer.innerHTML =
          '<div class="error-messages">Error loading messages. Please try again.</div>';
      }

      // Set up real-time subscription for this chat
      setupChatSubscription(chatId);

      // Set up event listener for send button
      setupSendMessageHandler(chatId);
    });
  });

  collapseButton.addEventListener("click", closeChat);
}

function setupSendMessageHandler(chatId) {
  const sendButton = document.querySelector(".send__message-btn");
  const messageInput = document.querySelector(".message__input");

  // First, remove any existing event listeners by cloning the elements
  const newSendButton = sendButton.cloneNode(true);
  sendButton.parentNode.replaceChild(newSendButton, sendButton);

  const newMessageInput = messageInput.cloneNode(true);
  messageInput.parentNode.replaceChild(newMessageInput, messageInput);

  // Add event listener to the send button
  newSendButton.addEventListener("click", async () => {
    const messageContent = newMessageInput.value.trim();
    if (messageContent) {
      await sendMessage(chatId, messageContent);
      newMessageInput.value = ""; // Clear input after sending
      newMessageInput.focus(); // Keep focus on input for better UX
    }
  });

  // Add event listener for Enter key
  newMessageInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default to avoid form submission
      const messageContent = newMessageInput.value.trim();
      if (messageContent) {
        await sendMessage(chatId, messageContent);
        newMessageInput.value = ""; // Clear input after sending
      }
    }
  });

  // Focus the input field for immediate typing
  newMessageInput.focus();
}

let isReconnecting = false;

function setupChatSubscription(chatId) {
  // Unsubscribe from any existing subscription first
  if (subscription) {
    subscription.unsubscribe();
  }

  // Create a more robust subscription with better error handling
  try {
    subscription = supaClient
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          // Only process if this is still the current chat
          if (currentChatId === chatId) {
            if (!processedMessageIds.has(payload.new.msg_id)) {
              processedMessageIds.add(payload.new.msg_id);

              // Pre-load the sender's name if needed before adding the message
              if (
                payload.new.senderid &&
                !userNameCache.has(payload.new.senderid)
              ) {
                safeGetUserName(payload.new.senderid).then(() => {
                  addMessageToChat(payload.new);
                });
              } else {
                addMessageToChat(payload.new);
              }
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log(`Successfully subscribed to chat ${chatId}`);
          isReconnecting = false;
        } else if (status === "CHANNEL_ERROR" && !isReconnecting) {
          console.error(`Error subscribing to chat ${chatId}`);
          isReconnecting = true;
          // Try to resubscribe after a delay if there was an error
          setTimeout(() => {
            if (currentChatId === chatId) {
              // Only reconnect if still on this chat
              setupChatSubscription(chatId);
            }
          }, 3000);
        }
      });
  } catch (error) {
    console.error("Error setting up subscription:", error);
    // Try to resubscribe after a delay
    if (!isReconnecting) {
      isReconnecting = true;
      setTimeout(() => {
        if (currentChatId === chatId) {
          // Only reconnect if still on this chat
          setupChatSubscription(chatId);
          isReconnecting = false;
        }
      }, 3000);
    }
  }
}

// Create a single message element for faster DOM operations
function createMessageElement(message, animate = true) {
  // Create the new message element
  const messageEl = document.createElement("div");
  messageEl.setAttribute("data-message-id", message.msg_id);
  messageEl.setAttribute(
    "data-timestamp",
    new Date(message.msg_date_time).getTime()
  );

  const messageSenderName = document.createElement("p");
  const messageContent = document.createElement("p");
  const messageTime = document.createElement("p");

  messageSenderName.classList.add("message__sender-name");
  messageContent.classList.add("message__content");
  messageTime.classList.add("message__time");

  messageContent.textContent = message.msg_content || "";
  messageTime.textContent = formatDateTime(new Date(message.msg_date_time));

  // Check if the message is from the current user
  const isSentByCurrentUser = message.senderid === +studentId;

  // Add message classes based on sender
  if (isSentByCurrentUser) {
    messageEl.classList.add("sent");
    messageSenderName.textContent = userNameCache.get(studentId) || "You";
  } else {
    messageEl.classList.add("received");
    messageSenderName.textContent =
      userNameCache.get(message.senderid) || "User";
  }

  messageEl.classList.add("message");

  messageEl.appendChild(messageSenderName);
  messageEl.appendChild(messageContent);
  messageEl.appendChild(messageTime);

  // Add animation if needed
  if (animate) {
    messageEl.style.opacity = "0";
    messageEl.style.transform = "translateY(10px)";

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      messageEl.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      messageEl.style.opacity = "1";
      messageEl.style.transform = "translateY(0)";
    });
  }

  return messageEl;
}

async function addMessageToChat(message) {
  // First check if we already have this message in the DOM
  const existingMessage = document.querySelector(
    `[data-message-id="${message.msg_id}"]`
  );
  if (existingMessage) {
    return; // Skip if already exists
  }

  // Create the message element
  const messagesContainer = document.querySelector(".chat__messages-container");
  const messageEl = createMessageElement(message, true);

  // Find the proper position to insert this message chronologically
  const timestamp = new Date(message.msg_date_time).getTime();
  const allMessages = Array.from(
    messagesContainer.querySelectorAll(".message[data-timestamp]")
  );

  // Sort by timestamp then by ID if available
  let inserted = false;

  for (let i = 0; i < allMessages.length; i++) {
    const existingMsg = allMessages[i];
    const existingTimestamp = parseInt(
      existingMsg.getAttribute("data-timestamp"),
      10
    );

    if (timestamp < existingTimestamp) {
      messagesContainer.insertBefore(messageEl, existingMsg);
      inserted = true;
      break;
    }

    if (timestamp === existingTimestamp) {
      // If timestamps are equal, check msg_id for ordering
      const existingId = existingMsg.getAttribute("data-message-id");
      if (existingId && message.msg_id < existingId) {
        messagesContainer.insertBefore(messageEl, existingMsg);
        inserted = true;
        break;
      }
    }
  }

  // If we didn't find a place to insert it, append it at the end
  if (!inserted) {
    messagesContainer.appendChild(messageEl);
  }

  // Scroll to the bottom to show the new message
  scrollToBottom();

  // Update just the chat list item with this message, not the entire chat list
  updateLastMessageInChatList(
    message.chat_id,
    message.msg_content,
    message.senderid
  );
}

// Use a more efficient scrolling method with requestAnimationFrame
function scrollToBottom() {
  requestAnimationFrame(() => {
    const messagesContainer = document.querySelector(
      ".chat__messages-container"
    );
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

function formatDateTime(date) {
  // Adjust for local timezone and format
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Get just the time part for today's messages
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Show full date for older messages
  return date.toLocaleString("en-US", options);
}

async function renderChatList() {
  try {
    chatListContainer.innerHTML = '<div class="loader loading-chats"></div>';
    const chats = await getChatList();

    if (chats.length === 0) {
      // Display a message when no chats are available
      chatListContainer.innerHTML = `
        <li class="no-chats">
          <p>No chats available</p>
        </li>
      `;
      return;
    }

    // Create a document fragment for batch DOM updates
    const fragment = document.createDocumentFragment();
    const pendingChats = [];

    // First render the basic chat list structure
    for (const chat of chats) {
      const chatItem = document.createElement("li");
      chatItem.className = "chat__item";
      chatItem.setAttribute("data-chat-id", chat.chat_id);
      chatItem.setAttribute("data-chat-name", chat.chat_name);

      chatItem.innerHTML = `
        <div class="chat__img"></div>
        <div class="chat__details">
          <div class="chat__name">${chat.chat_name}</div>
          <div class="chat__last-message">Loading...</div>
        </div>
      `;

      fragment.appendChild(chatItem);
      pendingChats.push(chat.chat_id);
    }

    // Update the DOM once with all chat items
    chatListContainer.innerHTML = "";
    chatListContainer.appendChild(fragment);

    // Attach click listeners immediately
    attachChatClickListeners();

    // Then load last messages for each chat in parallel
    const lastMessagePromises = pendingChats.map(async (chatId) => {
      const lastMessage = await getLastMessage(chatId);
      if (lastMessage) {
        // Ensure we have the sender name
        if (lastMessage.senderid && !userNameCache.has(lastMessage.senderid)) {
          await safeGetUserName(lastMessage.senderid);
        }
        return { chatId, lastMessage };
      }
      return { chatId, lastMessage: null };
    });

    // Update last messages as they come in
    const results = await Promise.all(lastMessagePromises);

    // Update the UI with last message data
    for (const { chatId, lastMessage } of results) {
      const chatItem = document.querySelector(
        `.chat__item[data-chat-id="${chatId}"]`
      );
      if (!chatItem) continue;

      const lastMessageEl = chatItem.querySelector(".chat__last-message");
      if (!lastMessageEl) continue;

      let messageText = "No messages yet...";
      let senderPrefix = "";

      if (lastMessage) {
        messageText = truncateText(lastMessage.msg_content, 30);

        if (+studentId === +lastMessage.senderid) {
          senderPrefix = "You: ";
        } else if (
          lastMessage.senderid &&
          userNameCache.has(lastMessage.senderid)
        ) {
          senderPrefix = `${userNameCache.get(lastMessage.senderid)}: `;
        }
      }

      lastMessageEl.textContent = senderPrefix + messageText;
    }
  } catch (error) {
    console.error("Error rendering chat list:", error);
    chatListContainer.innerHTML = `
      <li class="error-message">
        <p>Error loading chats. Please try again.</p>
      </li>
    `;
  }
}

function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

async function getLastMessage(chatId) {
  const { data, error } = await supaClient
    .from("message")
    .select("*")
    .eq("chat_id", chatId)
    .order("msg_date_time", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return null;
  }
  return data[0];
}

async function getChatList() {
  const { data, error } = await supaClient
    .from("student_chat")
    .select("*")
    .eq("student_id", studentId);

  if (error) {
    console.error("Error fetching chat list:", error);
    return [];
  }

  if (data && data.length > 0) {
    const { data: chats, error } = await supaClient
      .from("chat")
      .select("*")
      .in(
        "chat_id",
        data.map((chat) => chat.chat_id)
      );

    if (error) {
      console.error("Error fetching chat details:", error);
      return [];
    } else {
      return chats;
    }
  }
  return [];
}

async function getChatDetails(chatId) {
  const { data, error } = await supaClient
    .from("chat")
    .select("*")
    .eq("chat_id", chatId)
    .single();

  if (error) {
    console.error("Error fetching chat details:", error);
    return null;
  } else {
    return data;
  }
}

function renderChatDetails(chat) {
  if (chat) {
    chatName.textContent = chat.chat_name;
  }
}

async function retrieveChatMessages(chatId) {
  const { data, error } = await supaClient
    .from("message")
    .select("*")
    .eq("chat_id", chatId)
    .order("msg_date_time", { ascending: true }) // Primary sort by timestamp
    .order("msg_id", { ascending: true }); // Secondary sort by message_id for consistency

  if (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  } else {
    // Build our processed message IDs set
    data.forEach((msg) => {
      if (msg.msg_id) {
        processedMessageIds.add(msg.msg_id);
      }
    });

    return data;
  }
}

function renderChatMessages(messages, animate = true) {
  // Get the messages container
  const messagesContainer = document.querySelector(".chat__messages-container");

  // Clear existing messages
  messagesContainer.innerHTML = "";

  if (!messages || messages.length === 0) {
    // Show a message when there are no messages
    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("empty-messages");
    emptyMessage.textContent = "No messages yet. Start the conversation!";
    messagesContainer.appendChild(emptyMessage);
    return;
  }

  // First ensure messages are properly sorted
  messages.sort((a, b) => {
    const timeA = new Date(a.msg_date_time).getTime();
    const timeB = new Date(b.msg_date_time).getTime();

    // If timestamps are equal, sort by message_id as secondary criteria
    if (timeA === timeB) {
      return a.msg_id - b.msg_id;
    }

    return timeA - timeB;
  });

  // Performance optimization: Create a document fragment and batch render
  const fragment = document.createDocumentFragment();

  // For large message sets, use virtual rendering
  const shouldVirtualize = messages.length > 100;

  // If virtualizing, only render the last 50 messages initially
  const messagesToRender = shouldVirtualize ? messages.slice(-50) : messages;

  // Render messages in batches using requestAnimationFrame for better performance
  const renderBatch = (startIdx, endIdx) => {
    for (let i = startIdx; i < endIdx && i < messagesToRender.length; i++) {
      const message = messagesToRender[i];
      if (!message) continue;

      const messageEl = createMessageElement(message, false); // Don't animate batches
      fragment.appendChild(messageEl);
    }

    // Add this batch to the container
    messagesContainer.appendChild(fragment);
  };

  // For small message sets, render all at once
  if (!shouldVirtualize) {
    renderBatch(0, messagesToRender.length);
  } else {
    // For large message sets, render in batches of 20
    let currentBatch = 0;
    const batchSize = 20;

    const processNextBatch = () => {
      const startIdx = currentBatch * batchSize;
      const endIdx = startIdx + batchSize;

      if (startIdx < messagesToRender.length) {
        renderBatch(startIdx, endIdx);
        currentBatch++;
        requestAnimationFrame(processNextBatch);
      } else {
        // All batches processed
        scrollToBottom();
      }
    };

    // Start rendering batches
    processNextBatch();
  }

  // Scroll to the bottom immediately for small message sets
  if (!shouldVirtualize) {
    scrollToBottom();
  }
}

// Updated function to handle last message in chat list with sender ID
async function updateLastMessageInChatList(chatId, messageContent, senderId) {
  const chatItem = document.querySelector(
    `.chat__item[data-chat-id="${chatId}"]`
  );
  if (chatItem) {
    const lastMessageEl = chatItem.querySelector(".chat__last-message");
    if (lastMessageEl) {
      let prefix = "";

      // Determine the prefix based on sender
      if (senderId === +studentId) {
        prefix = "You: ";
      } else if (senderId && userNameCache.has(senderId)) {
        prefix = `${userNameCache.get(senderId)}: `;
      }

      lastMessageEl.textContent = prefix + truncateText(messageContent, 30);

      // Move this chat to the top of the list (most recent)
      const chatsList = chatItem.parentElement;
      if (chatsList && chatsList.firstChild !== chatItem) {
        // Use animation API for smoother transitions
        chatItem.style.transition = "none";
        chatItem.style.opacity = "0.7";

        // Move to top
        chatsList.insertBefore(chatItem, chatsList.firstChild);

        // Trigger reflow
        void chatItem.offsetWidth;

        // Animate back to normal
        chatItem.style.transition = "opacity 0.3s ease";
        chatItem.style.opacity = "1";
      }
    }
  }
}

async function sendMessage(chatId, messageContent) {
  try {
    const timestamp = new Date();

    // Create a temporary visual placeholder for the message with a unique ID
    const tempMessageId = `temp-${Date.now()}`;
    const messagesContainer = document.querySelector(
      ".chat__messages-container"
    );

    // Remove any "empty messages" placeholder if it exists
    const emptyPlaceholder = messagesContainer.querySelector(".empty-messages");
    if (emptyPlaceholder) {
      emptyPlaceholder.remove();
    }

    // If we don't have the current user's name yet, get it
    if (!userNameCache.has(studentId)) {
      await safeGetUserName(studentId);
    }

    // Create temporary message element
    const messageEl = document.createElement("div");
    messageEl.id = tempMessageId;
    messageEl.classList.add("message", "sent", "pending");
    // Add timestamp as data attribute for sorting
    messageEl.setAttribute("data-timestamp", timestamp.getTime());

    const messageSenderName = document.createElement("p");
    messageSenderName.classList.add("message__sender-name");
    messageSenderName.textContent = userNameCache.get(studentId) || "You";

    const messageContent_el = document.createElement("p");
    messageContent_el.classList.add("message__content");
    messageContent_el.textContent = messageContent;

    const messageTime = document.createElement("p");
    messageTime.classList.add("message__time");
    messageTime.textContent = formatDateTime(timestamp);

    messageEl.appendChild(messageSenderName);
    messageEl.appendChild(messageContent_el);
    messageEl.appendChild(messageTime);

    // Append message to the end for immediate feedback
    messagesContainer.appendChild(messageEl);

    // Add animation for a smoother appearance
    messageEl.style.opacity = "0";
    messageEl.style.transform = "translateY(10px)";

    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      messageEl.style.transition = "opacity 0.2s ease, transform 0.2s ease";
      messageEl.style.opacity = "1";
      messageEl.style.transform = "translateY(0)";

      // Scroll to bottom to show the new message
      scrollToBottom();
    });

    // Send the actual message to the database
    const { data, error } = await supaClient
      .from("message")
      .insert({
        chat_id: chatId,
        msg_content: messageContent,
        senderid: studentId,
        msg_date_time: timestamp.toISOString(),
      })
      .select();

    if (error) {
      console.error("Error sending message:", error);
      messageEl.classList.add("error");
      messageTime.textContent = "Failed to send";

      // Add retry button
      const retryButton = document.createElement("button");
      retryButton.classList.add("retry-button");
      retryButton.textContent = "Retry";
      retryButton.addEventListener("click", () => {
        // Remove the failed message
        messageEl.remove();
        // Try sending again
        sendMessage(chatId, messageContent);
      });
      messageEl.appendChild(retryButton);
    } else {
      console.log("Message sent:", data);

      // Instead of removing the placeholder, just mark it as confirmed and add the ID
      messageEl.classList.remove("pending");
      messageEl.classList.add("confirmed");
      messageEl.setAttribute("data-message-id", data[0].msg_id);

      // Add this message ID to our processed set to prevent duplication
      if (data && data[0] && data[0].msg_id) {
        processedMessageIds.add(data[0].msg_id);
      }

      // Update just the chat list item with this message
      updateLastMessageInChatList(chatId, messageContent, studentId);
    }
  } catch (err) {
    console.error("Exception sending message:", err);
  }
}

// Initialize chat list
renderChatList();

// When the page is about to be unloaded, unsubscribe from any active subscription
window.addEventListener("beforeunload", () => {
  if (subscription) {
    subscription.unsubscribe();
  }
});

// A more intelligent visibility change handler that doesn't cause flickering
let visibilityTimeout = null;
document.addEventListener("visibilitychange", () => {
  // Clear any pending timeout
  if (visibilityTimeout) {
    clearTimeout(visibilityTimeout);
  }

  if (document.visibilityState === "visible" && currentChatId) {
    console.log("Tab visible again, checking connection status");

    // Set a short delay before checking to avoid unnecessary reloads
    visibilityTimeout = setTimeout(async () => {
      // First check if our subscription is still active
      if (!subscription || subscription.status !== "SUBSCRIBED") {
        console.log("Reestablishing subscription");
        setupChatSubscription(currentChatId);

        // Only fetch new messages, don't completely re-render
        try {
          const lastMessageEl = document.querySelector(
            ".message[data-message-id]:last-child"
          );

          if (lastMessageEl) {
            const lastMsgId = lastMessageEl.getAttribute("data-message-id");

            // Get messages newer than our last message
            const { data: newMessages, error } = await supaClient
              .from("message")
              .select("*")
              .eq("chat_id", currentChatId)
              .gt("msg_id", lastMsgId)
              .order("msg_date_time", { ascending: true })
              .order("msg_id", { ascending: true });

            if (!error && newMessages && newMessages.length > 0) {
              console.log(
                `Found ${newMessages.length} new messages while away`
              );

              // Preload all usernames before rendering
              const userIds = newMessages.map((msg) => msg.senderid);
              await loadUserNames(userIds);

              // Add only the new messages without re-rendering everything
              for (const message of newMessages) {
                if (!processedMessageIds.has(message.msg_id)) {
                  processedMessageIds.add(message.msg_id);
                  await addMessageToChat(message);
                }
              }
            }
          } else {
            // If there are no messages, do a full refresh
            const messages = await retrieveChatMessages(currentChatId);

            // Preload all usernames before rendering
            const userIds = messages.map((msg) => msg.senderid);
            await loadUserNames(userIds);

            renderChatMessages(messages, true); // no animation
          }
        } catch (error) {
          console.error("Error refreshing messages:", error);
        }
      }
    }, 500); // Short delay to avoid unnecessary work
  }
});
