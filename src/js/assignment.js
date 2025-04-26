// import { supaClient } from "./app.js";
// const pageTitle = document.querySelector(".page-title");
// const courseId = sessionStorage.getItem("courseId");

// async function alreadyUploadedAssignmets() {
//   const { data, error } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     // .is("assignment_path", null);
//     .neq("assignment_path", null);
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     console.log(data);
//     return data;
//   }
// }
// alreadyUploadedAssignmets();
// async function getCourseName() {
//   const { data, error } = await supaClient
//     .from("course")
//     .select("*")
//     .eq("course_id", courseId);
//   if (error) {
//     console.error("Error fetching course name:", error);
//     return;
//   }
//   if (data) {
//     pageTitle.textContent = `${data[0].course_name} Assignments`;
//     console.log("Course name:", data[0].course_name);
//   }
// }
// async function getAssignment() {
//   getCourseName();
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);
//   if (error) {
//     console.error("Error fetching assignment:", error);
//     return;
//   }
//   if (data) {
//     return data;
//   }
// }

// async function getAssignmentID() {
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);
//   if (error) {
//     console.error("Error fetching assignment:", error);
//     return;
//   }
//   if (data) {
//     console.log(data);
//     return data[0].assign_id;
//   }
// }
// async function renderAssignment() {
//   const assignmentsContainer = document.querySelector(".assignments-container");
//   const assignment = await getAssignment();
//   if (assignment.length !== 0) {
//     const { data, error } = await supaClient
//       .from("assignment")
//       .select("*")
//       .eq("assign_id", assignment[0]?.assign_id);

//     if (error) {
//       console.error("Error fetching assignment:", error);
//       return;
//     }
//     if (data) {
//     }
//     let markup = "";
//     assignmentsContainer.innerHTML = "";
//     data.forEach((assignment, index) => {
//       markup += `<div class="project-box active">
//             <h3 class="project-title">${assignment.assign_title}</h3>
//             <p class="project-description">${assignment.assign_description}<br /></p>
//             <hr class="project-divider" />
//             <div class="due-date">
//               <i
//                 class="fi fi-rr-calendar-clock"
//                 style="margin-right: 8px; color: #5955b3; font-size: 20px"
//               ></i>
//               <span>Due: ${assignment.assign_duedate}</span>
//             </div>
//             <button class="instructions-btn">View Instructions</button>
//             <!-- <div class="upload-area">
//               <i class="fi fi-bs-cloud-download upload-icon"></i>
//               <p>
//                 Drag and drop project file here<br />or
//                 <a href="#">Upload File</a>
//               </p>
//             </div> -->
//             <label
//               class="custum-file-upload custum-file-upload-primary"
//               for="file"
//             >
//               <div class="icon">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill=""
//                   viewBox="0 0 24 24"
//                 >
//                   <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//                   <g
//                     stroke-linejoin="round"
//                     stroke-linecap="round"
//                     id="SVGRepo_tracerCarrier"
//                   ></g>
//                   <g id="SVGRepo_iconCarrier">
//                     <path
//                       fill=""
//                       d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
//                       clip-rule="evenodd"
//                       fill-rule="evenodd"
//                     ></path>
//                   </g>
//                 </svg>
//               </div>
//               <div class="text">
//                 <span>Click to upload image</span>
//               </div>
//               <input class="file__input" type="file" id="file-${index}" data-file=${index} />
//             </label>
//             <button class="submit-btn" data-btn-file=${index}>submit</button>
//           </div>`;
//     });
//     assignmentsContainer.innerHTML = markup;

//     const uploadBtn = document.querySelector(".submit-btn");
//     uploadBtn.addEventListener("click", uploadFile);
//   } else {
//     assignmentsContainer.innerHTML = `<h2 class="empty" >No Assignments yet for that course</h2  >`;
//   }
// }
// // const isAllowedFileType = (file) =>
// //   ["application/pdf", "docs", "docx"].includes(file.type);

// renderAssignment();
// async function uploadFile(e) {
//   // const {data , error } = await supaClient.from('')

//   const targetFile = e.target.dataset.btnFile;
//   const fileInput = document.getElementById(`file-${targetFile}`);
//   console.log(fileInput);
//   const fileName = `${Math.random()}-${fileInput?.files[0]?.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const filePath = `https://iuiwdjtmdeempcqxeuhf.supabase.co/storage/v1/object/public/students-assignments/${fileName}`;
//   const assignmentFile = fileInput.files[0];
//   const assignmentID = await getAssignmentID();
//   console.log(assignmentID);
//   console.log(assignmentFile);
//   const alreadyUploaded = await alreadyUploadedAssignmets();
//   console.log(alreadyUploaded);
//   const { data, updateError } = await supaClient
//     .from("student_assignment")
//     .update({ assignment_path: filePath })
//     // .is("assignment_path", null)
//     .eq("assign_id", assignmentID)
//     .eq("student_id", sessionStorage.getItem("studentId"))
//     .select();
//   console.log(data, updateError);

//   console.log(assignmentFile, fileName);
//   if (fileName && assignmentFile && !updateError) {
//     const { error } = await supaClient.storage
//       .from("students-assignments")
//       .upload(fileName, assignmentFile);
//     console.log(error);
//     if (!error && !updateError) {
//       document.querySelector(".submit-btn").disabled = true;
//       document.querySelector(".submit-btn").style.cursor = "not-allowed";
//     }
//   }
// }

///////////////////////  SECOND VERSION ///////////////////
// import { supaClient } from "./app.js";
// const pageTitle = document.querySelector(".page-title");
// const courseId = sessionStorage.getItem("courseId");
// const studentId = sessionStorage.getItem("studentId");

// // Modified to get submissions for a specific student and course
// async function alreadyUploadedAssignments() {
//   const { data, error } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     .eq("student_id", studentId)
//     .eq("course_id", courseId)
//     .neq("assignment_path", null);

//   if (error) {
//     console.error("Error fetching uploaded assignments:", error);
//     return [];
//   }

//   console.log("Already uploaded assignments:", data);
//   return data || [];
// }

// async function getCourseName() {
//   const { data, error } = await supaClient
//     .from("course")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching course name:", error);
//     return;
//   }

//   if (data && data.length > 0) {
//     pageTitle.textContent = `${data[0].course_name} Assignments`;
//     console.log("Course name:", data[0].course_name);
//   }
// }

// async function getAssignments() {
//   await getCourseName();
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching assignments:", error);
//     return [];
//   }

//   return data || [];
// }

// async function renderAssignments() {
//   const assignmentsContainer = document.querySelector(".assignments-container");
//   const assignments = await getAssignments();
//   const uploadedAssignments = await alreadyUploadedAssignments();

//   if (assignments.length === 0) {
//     assignmentsContainer.innerHTML = `<h2 class="empty">No assignments yet for this course</h2>`;
//     return;
//   }

//   let markup = "";
//   assignmentsContainer.innerHTML = "";

//   assignments.forEach((assignment, index) => {
//     // Check if this assignment has already been uploaded by the student
//     const isUploaded = uploadedAssignments.some(
//       (uploaded) => uploaded.assign_id === assignment.assign_id
//     );

//     // Get the uploaded file path if it exists
//     const uploadedAssignment = uploadedAssignments.find(
//       (uploaded) => uploaded.assign_id === assignment.assign_id
//     );

//     const uploadedFilePath = uploadedAssignment
//       ? uploadedAssignment.assignment_path
//       : null;

//     // Extract just the filename from the path for display
//     const uploadedFileName = uploadedFilePath
//       ? uploadedFilePath.substring(uploadedFilePath.lastIndexOf("/") + 1)
//       : "";

//     markup += `<div class="project-box active">
//         <h3 class="project-title">${assignment.assign_title}</h3>
//         <p class="project-description">${
//           assignment.assign_description
//         }<br /></p>
//         <hr class="project-divider" />
//         <div class="due-date">
//           <i
//             class="fi fi-rr-calendar-clock"
//             style="margin-right: 8px; color: #5955b3; font-size: 20px"
//           ></i>
//           <span>Due: ${assignment.assign_duedate}</span>
//         </div>
//         <button class="instructions-btn">View Instructions</button>

//         ${
//           isUploaded
//             ? `<div class="upload-status success">
//              <i class="fi fi-rr-check-circle" style="margin-right: 8px; color: green;"></i>
//              <span>Already submitted: ${uploadedFileName}</span>
//              <a href="${uploadedFilePath}" target="_blank" class="view-submission">View Submission</a>
//            </div>`
//             : ""
//         }

//         <label
//           class="custum-file-upload custum-file-upload-primary ${
//             isUploaded ? "disabled" : ""
//           }"
//           for="file-${index}"
//         >
//           <div class="icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill=""
//               viewBox="0 0 24 24"
//             >
//               <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//               <g
//                 stroke-linejoin="round"
//                 stroke-linecap="round"
//                 id="SVGRepo_tracerCarrier"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 <path
//                   fill=""
//                   d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
//                   clip-rule="evenodd"
//                   fill-rule="evenodd"
//                 ></path>
//               </g>
//             </svg>
//           </div>
//           <div class="text">
//             <span>${
//               isUploaded ? "Already submitted" : "Click to upload assignment"
//             }</span>
//           </div>
//           <input class="file__input" type="file" id="file-${index}" data-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }" ${isUploaded ? "disabled" : ""} />
//         </label>
//         <button class="submit-btn" data-btn-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }" ${isUploaded ? "disabled" : ""}>
//           ${isUploaded ? "Submitted" : "Submit"}
//         </button>
//       </div>`;
//   });

//   assignmentsContainer.innerHTML = markup;

//   // Add event listeners to all submit buttons
//   const uploadBtns = document.querySelectorAll(".submit-btn");
//   uploadBtns.forEach((btn) => {
//     if (!btn.disabled) {
//       btn.addEventListener("click", uploadFile);
//     }
//   });

//   // Add CSS for disabled elements if not already in your stylesheet
//   const style = document.createElement("style");
//   style.textContent = `
//     .disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//     .upload-status {
//       padding: 10px;
//       margin: 10px 0;
//       border-radius: 5px;
//       display: flex;
//       align-items: center;
//     }
//     .upload-status.success {
//       background-color: rgba(0, 128, 0, 0.1);
//       color: green;
//     }
//     .view-submission {
//       margin-left: auto;
//       color: #5955b3;
//       text-decoration: underline;
//     }
//   `;
//   document.head.appendChild(style);
// }

// async function uploadFile(e) {
//   const targetBtn = e.target;
//   const targetIndex = targetBtn.dataset.btnFile;
//   const assignmentId = targetBtn.dataset.assignmentId;
//   const fileInput = document.getElementById(`file-${targetIndex}`);

//   if (!fileInput.files || fileInput.files.length === 0) {
//     alert("Please select a file to upload");
//     return;
//   }

//   const fileName = `${studentId}-${assignmentId}-${Math.random()
//     .toString(36)
//     .substring(2)}-${fileInput.files[0].name}`.replaceAll("/", "");
//   const filePath = `https://iuiwdjtmdeempcqxeuhf.supabase.co/storage/v1/object/public/students-assignments/${fileName}`;
//   const assignmentFile = fileInput.files[0];

//   // Check if there's already a record for this assignment and student
//   const { data: existingData, error: checkError } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     .eq("assign_id", assignmentId)
//     .eq("student_id", studentId);

//   console.log("Existing data check:", existingData, checkError);

//   let uploadResult;

//   if (existingData && existingData.length > 0) {
//     // Update existing record
//     uploadResult = await supaClient
//       .from("student_assignment")
//       .update({ assignment_path: filePath })
//       .eq("assign_id", assignmentId)
//       .eq("student_id", studentId)
//       .select();
//   } else {
//     // Insert new record
//     uploadResult = await supaClient
//       .from("student_assignment")
//       .insert({
//         student_id: studentId,
//         assign_id: assignmentId,
//         course_id: courseId,
//         assignment_path: filePath,
//         submission_date: new Date().toISOString(),
//       })
//       .select();
//   }

//   const { data, error: dbError } = uploadResult;
//   console.log("Database operation result:", data, dbError);

//   if (dbError) {
//     alert("Error saving assignment information. Please try again.");
//     console.error(dbError);
//     return;
//   }

//   // Upload the file to storage
//   const { error: storageError } = await supaClient.storage
//     .from("students-assignments")
//     .upload(fileName, assignmentFile);

//   if (storageError) {
//     alert("Error uploading file. Please try again.");
//     console.error(storageError);
//     return;
//   }

//   // Success! Update UI to show the file was uploaded
//   targetBtn.disabled = true;
//   targetBtn.textContent = "Submitted";
//   targetBtn.style.cursor = "not-allowed";
//   fileInput.disabled = true;
//   fileInput.parentElement.classList.add("disabled");

//   // Show success message
//   const successDiv = document.createElement("div");
//   successDiv.className = "upload-status success";
//   successDiv.innerHTML = `
//     <i class="fi fi-rr-check-circle" style="margin-right: 8px; color: green;"></i>
//     <span>Successfully submitted: ${fileName}</span>
//     <a href="${filePath}" target="_blank" class="view-submission">View Submission</a>
//   `;

//   // Insert the success message before the file upload label
//   fileInput.parentElement.insertAdjacentElement("beforebegin", successDiv);

//   // Refresh the assignment list to reflect the new upload status
//   // This is optional but provides a clean refresh of the UI
//   setTimeout(() => renderAssignments(), 2000);
// }

// // Start rendering the assignments
// renderAssignments();

//////////////////////////// THIRD VERSION/////////////////
// import { supaClient } from "./app.js";
// const pageTitle = document.querySelector(".page-title");
// const courseId = sessionStorage.getItem("courseId");
// const studentId = sessionStorage.getItem("studentId");

// // Function to show interactive toast notifications
// function showToast(message, type = "success") {
//   // Create toast container if it doesn't exist
//   let toastContainer = document.querySelector(".toast-container");
//   if (!toastContainer) {
//     toastContainer = document.createElement("div");
//     toastContainer.className = "toast-container";
//     document.body.appendChild(toastContainer);

//     // Add toast container styles
//     const style = document.createElement("style");
//     style.textContent = `
//       .toast-container {
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         z-index: 9999;
//       }
//       .toast {
//         min-width: 250px;
//         margin-bottom: 10px;
//         padding: 15px;
//         border-radius: 4px;
//         color: white;
//         font-weight: 500;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//         animation: slideIn 0.3s ease-out, fadeOut 0.5s 2.5s ease-out forwards;
//         cursor: pointer;
//       }
//       .toast.success {
//         background-color: #4CAF50;
//       }
//       .toast.error {
//         background-color: #F44336;
//       }
//       .toast.info {
//         background-color: #2196F3;
//       }
//       .toast-close {
//         margin-left: 15px;
//         color: white;
//         font-weight: bold;
//         font-size: 20px;
//         cursor: pointer;
//       }
//       @keyframes slideIn {
//         from {
//           transform: translateX(100%);
//           opacity: 0;
//         }
//         to {
//           transform: translateX(0);
//           opacity: 1;
//         }
//       }
//       @keyframes fadeOut {
//         from {
//           opacity: 1;
//         }
//         to {
//           opacity: 0;
//           transform: translateY(-20px);
//         }
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   // Create and display toast
//   const toast = document.createElement("div");
//   toast.className = `toast ${type}`;
//   toast.innerHTML = `
//     <span>${message}</span>
//     <span class="toast-close">&times;</span>
//   `;

//   // Add click event to close toast
//   toast.addEventListener("click", () => {
//     toast.remove();
//   });

//   toastContainer.appendChild(toast);

//   // Auto-remove toast after 3 seconds
//   setTimeout(() => {
//     if (toast.parentNode) {
//       toast.remove();
//     }
//   }, 3000);
// }

// // Function to show loading spinner
// function showLoadingSpinner(button, isLoading = true) {
//   if (isLoading) {
//     const originalText = button.textContent;
//     button.setAttribute("data-original-text", originalText);
//     button.innerHTML = `
//       <span class="spinner"></span>
//       <span>Uploading...</span>
//     `;
//     button.disabled = true;

//     // Add spinner style if not already added
//     if (!document.querySelector("style.spinner-style")) {
//       const spinnerStyle = document.createElement("style");
//       spinnerStyle.className = "spinner-style";
//       spinnerStyle.textContent = `
//         .spinner {
//           display: inline-block;
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-radius: 50%;
//           border-top-color: #fff;
//           animation: spin 1s ease-in-out infinite;
//           margin-right: 8px;
//         }
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `;
//       document.head.appendChild(spinnerStyle);
//     }
//   } else {
//     const originalText = button.getAttribute("data-original-text");
//     if (originalText) {
//       button.textContent = originalText;
//     }
//     button.disabled = false;
//   }
// }

// async function alreadyUploadedAssignments() {
//   const { data, error } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     .eq("student_id", studentId)
//     // .eq("course_id", courseId)
//     .neq("assignment_path", null);

//   if (error) {
//     console.error("Error fetching uploaded assignments:", error);
//     showToast("Failed to check for existing submissions", "error");
//     return [];
//   }

//   console.log("Already uploaded assignments:", data);
//   return data || [];
// }

// async function getCourseName() {
//   const { data, error } = await supaClient
//     .from("course")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching course name:", error);
//     showToast("Failed to load course information", "error");
//     return;
//   }

//   if (data && data.length > 0) {
//     pageTitle.textContent = `${data[0].course_name} Assignments`;
//     console.log("Course name:", data[0].course_name);
//   }
// }

// async function getAssignments() {
//   await getCourseName();
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching assignments:", error);
//     showToast("Failed to load assignments", "error");
//     return [];
//   }

//   return data || [];
// }

// async function renderAssignments() {
//   const assignmentsContainer = document.querySelector(".assignments-container");

//   // Show loading state
//   assignmentsContainer.innerHTML = `
//     <div class="loading-assignments">
//       <div class="loading-spinner"></div>
//       <p>Loading assignments...</p>
//     </div>
//   `;

//   // Add loading spinner style
//   if (!document.querySelector(".loading-style")) {
//     const loadingStyle = document.createElement("style");
//     loadingStyle.className = "loading-style";
//     loadingStyle.textContent = `
//       .loading-assignments {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         padding: 40px 0;
//         color: #5955b3;
//       }
//       .loading-spinner {
//         width: 40px;
//         height: 40px;
//         border: 4px solid rgba(89, 85, 179, 0.2);
//         border-radius: 50%;
//         border-top-color: #5955b3;
//         animation: spin 1s ease-in-out infinite;
//         margin-bottom: 15px;
//       }
//       .disabled {
//         opacity: 0.6;
//         cursor: not-allowed !important;
//       }
//       .upload-status {
//         padding: 10px;
//         margin: 10px 0;
//         border-radius: 5px;
//         display: flex;
//         align-items: center;
//       }
//       .upload-status.success {
//         background-color: rgba(0, 128, 0, 0.1);
//         color: green;
//       }
//       .view-submission {
//         margin-left: auto;
//         color: #5955b3;
//         text-decoration: underline;
//       }
//       .file-info {
//         display: flex;
//         align-items: center;
//         margin: 10px 0;
//         padding: 8px;
//         background-color: rgba(89, 85, 179, 0.1);
//         border-radius: 4px;
//       }
//       .file-name {
//         margin-left: 8px;
//         flex: 1;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         max-width: 200px;
//       }
//       .remove-file {
//         color: #F44336;
//         cursor: pointer;
//         font-weight: bold;
//         margin-left: 8px;
//       }
//     `;
//     document.head.appendChild(loadingStyle);
//   }

//   const assignments = await getAssignments();
//   const uploadedAssignments = await alreadyUploadedAssignments();

//   if (assignments.length === 0) {
//     assignmentsContainer.innerHTML = `<h2 class="empty">No assignments yet for this course</h2>`;
//     return;
//   }

//   let markup = "";

//   assignments.forEach((assignment, index) => {
//     // Check if this assignment has already been uploaded by the student
//     const isUploaded = uploadedAssignments.some(
//       (uploaded) => uploaded.assign_id === assignment.assign_id
//     );

//     // Get the uploaded file path if it exists
//     const uploadedAssignment = uploadedAssignments.find(
//       (uploaded) => uploaded.assign_id === assignment.assign_id
//     );

//     const uploadedFilePath = uploadedAssignment
//       ? uploadedAssignment.assignment_path
//       : null;

//     // Extract just the filename from the path for display
//     const uploadedFileName = uploadedFilePath
//       ? decodeURIComponent(
//           uploadedFilePath.substring(uploadedFilePath.lastIndexOf("/") + 1)
//         )
//       : "";

//     // Get submission date if available
//     const submissionDate = uploadedAssignment
//       ? new Date(uploadedAssignment.submission_date).toLocaleString()
//       : "";

//     markup += `<div class="project-box active">
//         <h3 class="project-title">${assignment.assign_title}</h3>
//         <p class="project-description">${
//           assignment.assign_description
//         }<br /></p>
//         <hr class="project-divider" />
//         <div class="due-date">
//           <i
//             class="fi fi-rr-calendar-clock"
//             style="margin-right: 8px; color: #5955b3; font-size: 20px"
//           ></i>
//           <span>Due: ${assignment.assign_duedate}</span>
//         </div>
//         <button class="instructions-btn" data-assignment-id="${
//           assignment.assign_id
//         }">View Instructions</button>

//         ${
//           isUploaded
//             ? `<div class="upload-status success">
//              <i class="fi fi-rr-check-circle" style="margin-right: 8px; color: green;"></i>
//              <span>
//                <strong>Submitted:</strong> ${submissionDate}<br>
//                <strong>File:</strong> ${uploadedFileName}
//              </span>
//              <a href="${uploadedFilePath}" target="_blank" class="view-submission">View Submission</a>
//            </div>`
//             : ""
//         }

//         <div class="file-selection-area" id="file-area-${index}" style="display: ${
//       isUploaded ? "none" : "block"
//     }">
//           <label
//             class="custum-file-upload custum-file-upload-primary ${
//               isUploaded ? "disabled" : ""
//             }"
//             for="file-${index}"
//           >
//             <div class="icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill=""
//                 viewBox="0 0 24 24"
//               >
//                 <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//                 <g
//                   stroke-linejoin="round"
//                   stroke-linecap="round"
//                   id="SVGRepo_tracerCarrier"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   <path
//                     fill=""
//                     d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
//                     clip-rule="evenodd"
//                     fill-rule="evenodd"
//                   ></path>
//                 </g>
//               </svg>
//             </div>
//             <div class="text">
//               <span>Click to upload assignment</span>
//             </div>
//             <input class="file__input" type="file" id="file-${index}" data-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }" />
//           </label>

//           <div class="file-preview" id="file-preview-${index}" style="display: none;"></div>

//           <button class="submit-btn" data-btn-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }">
//             Submit Assignment
//           </button>
//         </div>
//       </div>`;
//   });

//   assignmentsContainer.innerHTML = markup;

//   // Add event listeners to all submit buttons and file inputs
//   const uploadBtns = document.querySelectorAll(".submit-btn");
//   const fileInputs = document.querySelectorAll(".file__input");

//   uploadBtns.forEach((btn) => {
//     if (!btn.disabled) {
//       btn.addEventListener("click", uploadFile);
//     }
//   });

//   fileInputs.forEach((input) => {
//     input.addEventListener("change", (e) => {
//       const fileIndex = e.target.dataset.file;
//       const previewArea = document.getElementById(`file-preview-${fileIndex}`);

//       if (e.target.files && e.target.files.length > 0) {
//         const file = e.target.files[0];
//         previewArea.innerHTML = `
//           <div class="file-info">
//             <i class="fi fi-rr-file" style="color: #5955b3; font-size: 18px;"></i>
//             <span class="file-name">${file.name}</span>
//             <span class="file-size">(${(file.size / 1024).toFixed(2)} KB)</span>
//             <span class="remove-file" data-file-index="${fileIndex}">✕</span>
//           </div>
//         `;
//         previewArea.style.display = "block";

//         // Add event listener to remove file button
//         const removeBtn = previewArea.querySelector(".remove-file");
//         removeBtn.addEventListener("click", () => {
//           e.target.value = "";
//           previewArea.style.display = "none";
//         });
//       } else {
//         previewArea.style.display = "none";
//       }
//     });
//   });

//   // Add event listeners to view instructions buttons
//   const instructionBtns = document.querySelectorAll(".instructions-btn");
//   instructionBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const assignmentId = btn.dataset.assignmentId;
//       showToast(`Viewing instructions for assignment ${assignmentId}`, "info");
//       // Here you would implement the actual instructions viewing functionality
//     });
//   });
// }

// async function uploadFile(e) {
//   const targetBtn = e.target;
//   const targetIndex = targetBtn.dataset.btnFile;
//   const assignmentId = targetBtn.dataset.assignmentId;
//   const fileInput = document.getElementById(`file-${targetIndex}`);

//   if (!fileInput.files || fileInput.files.length === 0) {
//     showToast("Please select a file to upload", "error");
//     return;
//   }

//   // Show loading spinner on button
//   showLoadingSpinner(targetBtn, true);

//   const fileName = `${studentId}-${assignmentId}-${Math.random()
//     .toString(36)
//     .substring(2)}-${fileInput.files[0].name}`.replaceAll("/", "");
//   const filePath = `https://iuiwdjtmdeempcqxeuhf.supabase.co/storage/v1/object/public/students-assignments/${fileName}`;
//   const assignmentFile = fileInput.files[0];

//   try {
//     // Check if there's already a record for this assignment and student
//     const { data: existingData, error: checkError } = await supaClient
//       .from("student_assignment")
//       .select("*")
//       .eq("assign_id", assignmentId)
//       .eq("student_id", studentId);

//     if (checkError) {
//       throw new Error("Failed to check existing submissions");
//     }

//     let uploadResult;

//     if (existingData && existingData.length > 0) {
//       // Update existing record
//       uploadResult = await supaClient
//         .from("student_assignment")
//         .update({
//           assignment_path: filePath,
//           submission_date: new Date().toISOString(),
//         })
//         .eq("assign_id", assignmentId)
//         .eq("student_id", studentId)
//         .select();
//     } else {
//       // Insert new record
//       uploadResult = await supaClient
//         .from("student_assignment")
//         .insert({
//           student_id: studentId,
//           assign_id: assignmentId,
//           course_id: courseId,
//           assignment_path: filePath,
//           submission_date: new Date().toISOString(),
//         })
//         .select();
//     }

//     const { data, error: dbError } = uploadResult;

//     if (dbError) {
//       throw new Error("Failed to save assignment information");
//     }

//     // Upload the file to storage
//     const { error: storageError } = await supaClient.storage
//       .from("students-assignments")
//       .upload(fileName, assignmentFile);

//     if (storageError) {
//       throw new Error("Failed to upload file to storage");
//     }

//     // Success!
//     showToast("Assignment submitted successfully!", "success");

//     // Update UI to reflect submission
//     const fileArea = document.getElementById(`file-area-${targetIndex}`);
//     const projectBox = fileArea.closest(".project-box");

//     // Create success message
//     const successDiv = document.createElement("div");
//     successDiv.className = "upload-status success";
//     successDiv.innerHTML = `
//       <i class="fi fi-rr-check-circle" style="margin-right: 8px; color: green;"></i>
//       <span>
//         <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
//         <strong>File:</strong> ${fileName}
//       </span>
//       <a href="${filePath}" target="_blank" class="view-submission">View Submission</a>
//     `;

//     // Replace file area with success message
//     fileArea.style.display = "none";
//     projectBox.insertBefore(successDiv, fileArea);

//     // Refresh list after short delay
//     setTimeout(() => renderAssignments(), 2000);
//   } catch (error) {
//     console.error("Upload error:", error);
//     showToast(error.message || "Failed to upload assignment", "error");
//     // Reset button state
//     showLoadingSpinner(targetBtn, false);
//   }
// }

// // Add global styles
// const globalStyles = document.createElement("style");
// globalStyles.textContent = `
//   .project-box {
//     position: relative;
//     transition: all 0.3s ease;
//   }

//   .submit-btn:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }

//   .instructions-btn {
//     margin-bottom: 15px;
//   }

//   /* Hover effects */
//   .submit-btn:not(:disabled):hover {
//     background-color: #4a478f;
//   }

//   .view-submission:hover {
//     color: #4a478f;
//     text-decoration: underline;
//   }
// `;
// document.head.appendChild(globalStyles);

// // Start rendering the assignments
// renderAssignments();

///////////////////////// FOURTH VERSION//////////////////////////
// import { supaClient } from "./app.js";
// const pageTitle = document.querySelector(".page-title");
// const courseId = sessionStorage.getItem("courseId");
// const studentId = sessionStorage.getItem("studentId");

// // Function to show interactive toast notifications
// function showToast(message, type = "success") {
//   // Create toast container if it doesn't exist
//   let toastContainer = document.querySelector(".toast-container");
//   if (!toastContainer) {
//     toastContainer = document.createElement("div");
//     toastContainer.className = "toast-container";
//     document.body.appendChild(toastContainer);
//   }

//   // Create and display toast
//   const toast = document.createElement("div");
//   toast.className = `toast ${type}`;
//   toast.innerHTML = `
//     <span>${message}</span>
//     <span class="toast-close">&times;</span>
//   `;

//   // Add click event to close toast
//   toast.addEventListener("click", () => {
//     toast.classList.add("toast-hiding");
//     setTimeout(() => toast.remove(), 300);
//   });

//   toastContainer.appendChild(toast);

//   // Auto-remove toast after 3 seconds
//   setTimeout(() => {
//     if (toast.parentNode) {
//       toast.classList.add("toast-hiding");
//       setTimeout(() => toast.remove(), 300);
//     }
//   }, 3000);
// }

// // Function to show loading spinner
// function showLoadingSpinner(button, isLoading = true) {
//   if (isLoading) {
//     const originalText = button.textContent;
//     button.setAttribute("data-original-text", originalText);
//     button.innerHTML = `
//       <span class="spinner"></span>
//       <span>Uploading...</span>
//     `;
//     button.disabled = true;
//   } else {
//     const originalText = button.getAttribute("data-original-text") || "Submit";
//     button.textContent = originalText;
//     button.disabled = false;
//   }
// }

// // Check if date has passed
// function isDatePassed(dateString) {
//   const dueDate = new Date(dateString);
//   const today = new Date();
//   return today > dueDate;
// }

// // Format date for better display
// function formatDate(dateString) {
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// }

// async function alreadyUploadedAssignments() {
//   const { data, error } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     .eq("student_id", studentId)
//     .neq("assignment_path", null);

//   if (error) {
//     console.error("Error fetching uploaded assignments:", error);
//     showToast("Failed to check for existing submissions", "error");
//     return [];
//   }

//   console.log("Already uploaded assignments:", data);
//   return data || [];
// }

// async function getCourseName() {
//   const { data, error } = await supaClient
//     .from("course")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching course name:", error);
//     showToast("Failed to load course information", "error");
//     return;
//   }

//   if (data && data.length > 0) {
//     pageTitle.textContent = `${data[0].course_name} Assignments`;
//   }
// }

// async function getAssignments() {
//   await getCourseName();
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching assignments:", error);
//     showToast("Failed to load assignments", "error");
//     return [];
//   }

//   return data || [];
// }

// async function renderAssignments() {
//   //Add global styles for responsive design and animations
//   // if (!document.querySelector(".assignment-styles")) {
//   //   const styles = document.createElement("style");
//   //   styles.className = "assignment-styles";
//   //   styles.textContent = `
//   //     /* Toast notifications */
//   //     .toast-container {
//   //       position: fixed;
//   //       top: 20px;
//   //       right: 20px;
//   //       z-index: 9999;
//   //       max-width: 100%;
//   //       width: 350px;
//   //     }
//   //     .toast {
//   //       width: 100%;
//   //       margin-bottom: 10px;
//   //       padding: 15px;
//   //       border-radius: 8px;
//   //       color: white;
//   //       font-weight: 500;
//   //       display: flex;
//   //       align-items: center;
//   //       justify-content: space-between;
//   //       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//   //       animation: slideIn 0.3s ease-out;
//   //       transition: all 0.3s ease;
//   //       cursor: pointer;
//   //     }
//   //     .toast.success {
//   //       background-color: #4CAF50;
//   //     }
//   //     .toast.error {
//   //       background-color: #F44336;
//   //     }
//   //     .toast.info {
//   //       background-color: #2196F3;
//   //     }
//   //     .toast.warning {
//   //       background-color: #FF9800;
//   //     }
//   //     .toast-close {
//   //       margin-left: 15px;
//   //       color: white;
//   //       font-weight: bold;
//   //       font-size: 20px;
//   //       cursor: pointer;
//   //     }
//   //     .toast-hiding {
//   //       transform: translateX(120%);
//   //       opacity: 0;
//   //     }
//   //     @keyframes slideIn {
//   //       from {
//   //         transform: translateX(100%);
//   //         opacity: 0;
//   //       }
//   //       to {
//   //         transform: translateX(0);
//   //         opacity: 1;
//   //       }
//   //     }

//   //     /* Loading indicators */
//   //     .loading-assignments {
//   //       display: flex;
//   //       flex-direction: column;
//   //       align-items: center;
//   //       justify-content: center;
//   //       padding: 40px 0;
//   //       color: #5955b3;
//   //     }
//   //     .loading-spinner {
//   //       width: 40px;
//   //       height: 40px;
//   //       border: 4px solid rgba(89, 85, 179, 0.2);
//   //       border-radius: 50%;
//   //       border-top-color: #5955b3;
//   //       animation: spin 1s ease-in-out infinite;
//   //       margin-bottom: 15px;
//   //     }
//   //     .spinner {
//   //       display: inline-block;
//   //       width: 16px;
//   //       height: 16px;
//   //       border: 2px solid rgba(255,255,255,0.3);
//   //       border-radius: 50%;
//   //       border-top-color: #fff;
//   //       animation: spin 1s ease-in-out infinite;
//   //       margin-right: 8px;
//   //     }
//   //     @keyframes spin {
//   //       to { transform: rotate(360deg); }
//   //     }

//   //     /* Project boxes */
//   //     .assignments-container {
//   //       display: grid;
//   //       grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   //       gap: 20px;
//   //       margin-top: 20px;
//   //     }
//   //     .project-box {
//   //       position: relative;
//   //       background-color: #ffffff;
//   //       border-radius: 12px;
//   //       padding: 20px;
//   //       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//   //       transition: all 0.3s ease;
//   //       overflow: hidden;
//   //     }
//   //     .project-box:hover {
//   //       transform: translateY(-5px);
//   //       box-shadow: 0 10px 20px rgba(89, 85, 179, 0.1);
//   //     }
//   //     .project-title {
//   //       color: #333;
//   //       font-size: 18px;
//   //       margin-bottom: 10px;
//   //       font-weight: 600;
//   //     }
//   //     .project-description {
//   //       color: #666;
//   //       font-size: 14px;
//   //       line-height: 1.5;
//   //       margin-bottom: 15px;
//   //     }
//   //     .project-divider {
//   //       border: none;
//   //       height: 1px;
//   //       background-color: #eee;
//   //       margin: 15px 0;
//   //     }

//   //     /* Due date indicators */
//   //     .due-date {
//   //       display: flex;
//   //       align-items: center;
//   //       margin-bottom: 15px;
//   //       padding: 8px;
//   //       border-radius: 6px;
//   //       font-size: 14px;
//   //       transition: all 0.3s ease;
//   //     }
//   //     .due-date.overdue {
//   //       background-color: rgba(244, 67, 54, 0.1);
//   //       color: #F44336;
//   //     }
//   //     .due-date.upcoming {
//   //       background-color: rgba(255, 152, 0, 0.1);
//   //       color: #FF9800;
//   //     }
//   //     .due-date.ok {
//   //       background-color: rgba(76, 175, 80, 0.1);
//   //       color: #4CAF50;
//   //     }

//   //     /* File Upload */
//   //     .custum-file-upload {
//   //       display: flex;
//   //       flex-direction: column;
//   //       align-items: center;
//   //       justify-content: center;
//   //       height: 150px;
//   //       border: 2px dashed #5955b3;
//   //       border-radius: 8px;
//   //       background-color: rgba(89, 85, 179, 0.05);
//   //       cursor: pointer;
//   //       transition: all 0.3s ease;
//   //       margin-bottom: 15px;
//   //     }
//   //     .custum-file-upload:hover {
//   //       background-color: rgba(89, 85, 179, 0.1);
//   //       border-color: #4a478f;
//   //     }
//   //     .custum-file-upload.disabled {
//   //       opacity: 0.6;
//   //       cursor: not-allowed;
//   //       background-color: #f5f5f5;
//   //       border-color: #ddd;
//   //     }
//   //     .custum-file-upload .icon {
//   //       margin-bottom: 10px;
//   //     }
//   //     .custum-file-upload .icon svg {
//   //       width: 40px;
//   //       height: 40px;
//   //       fill: #5955b3;
//   //     }
//   //     .custum-file-upload .text {
//   //       color: #5955b3;
//   //       font-size: 14px;
//   //       font-weight: 500;
//   //     }

//   //     /* Buttons */
//   //     .instructions-btn, .submit-btn {
//   //       display: block;
//   //       width: 100%;
//   //       padding: 12px;
//   //       border: none;
//   //       border-radius: 6px;
//   //       font-size: 14px;
//   //       font-weight: 500;
//   //       cursor: pointer;
//   //       transition: all 0.3s ease;
//   //       text-align: center;
//   //     }
//   //     .instructions-btn {
//   //       background-color: #f0f0f7;
//   //       color: #5955b3;
//   //       margin-bottom: 15px;
//   //     }
//   //     .instructions-btn:hover {
//   //       background-color: #e0e0f0;
//   //     }
//   //     .submit-btn {
//   //       background-color: #5955b3;
//   //       color: white;
//   //     }
//   //     .submit-btn:hover:not(:disabled) {
//   //       background-color: #4a478f;
//   //       transform: translateY(-2px);
//   //     }
//   //     .submit-btn:disabled {
//   //       opacity: 0.6;
//   //       cursor: not-allowed;
//   //     }

//   //     /* Submission status */
//   //     .upload-status {
//   //       padding: 15px;
//   //       margin: 15px 0;
//   //       border-radius: 8px;
//   //       display: flex;
//   //       align-items: flex-start;
//   //       transition: all 0.3s ease;
//   //     }
//   //     .upload-status.success {
//   //       background-color: rgba(76, 175, 80, 0.1);
//   //       color: #4CAF50;
//   //     }
//   //     .upload-status span {
//   //       flex: 1;
//   //       margin-left: 10px;
//   //       font-size: 14px;
//   //       line-height: 1.5;
//   //     }
//   //     .view-submission {
//   //       color: #5955b3;
//   //       text-decoration: none;
//   //       font-weight: 500;
//   //       padding: 5px 10px;
//   //       border-radius: 4px;
//   //       transition: all 0.3s ease;
//   //       background-color: rgba(89, 85, 179, 0.1);
//   //       margin-left: 10px;
//   //     }
//   //     .view-submission:hover {
//   //       background-color: rgba(89, 85, 179, 0.2);
//   //       color: #4a478f;
//   //     }

//   //     /* File Preview */
//   //     .file-info {
//   //       display: flex;
//   //       align-items: center;
//   //       margin: 10px 0;
//   //       padding: 10px;
//   //       background-color: rgba(89, 85, 179, 0.1);
//   //       border-radius: 6px;
//   //       transition: all 0.3s ease;
//   //     }
//   //     .file-info:hover {
//   //       background-color: rgba(89, 85, 179, 0.15);
//   //     }
//   //     .file-name {
//   //       margin-left: 10px;
//   //       flex: 1;
//   //       white-space: nowrap;
//   //       overflow: hidden;
//   //       text-overflow: ellipsis;
//   //       font-size: 14px;
//   //     }
//   //     .file-size {
//   //       font-size: 12px;
//   //       color: #666;
//   //       margin-left: 10px;
//   //     }
//   //     .remove-file {
//   //       color: #F44336;
//   //       cursor: pointer;
//   //       font-weight: bold;
//   //       margin-left: 10px;
//   //       padding: 2px 6px;
//   //       border-radius: 50%;
//   //       background-color: rgba(244, 67, 54, 0.1);
//   //       transition: all 0.2s ease;
//   //     }
//   //     .remove-file:hover {
//   //       background-color: rgba(244, 67, 54, 0.2);
//   //     }

//   //     /* Empty state */
//   //     .empty {
//   //       text-align: center;
//   //       padding: 40px;
//   //       color: #999;
//   //       font-weight: 500;
//   //       font-size: 18px;
//   //     }

//   //     /* Responsive adjustments */
//   //     @media (max-width: 768px) {
//   //       .assignments-container {
//   //         grid-template-columns: 1fr;
//   //       }
//   //       .toast-container {
//   //         width: calc(100% - 40px);
//   //         right: 10px;
//   //       }
//   //     }
//   //   `;
//   //   document.head.appendChild(styles);
//   // }

//   const assignmentsContainer = document.querySelector(".assignments-container");

//   // Show loading state
//   assignmentsContainer.innerHTML = `
//     <div class="loading-assignments">
//       <div class="loading-spinner"></div>
//       <p>Loading assignments...</p>
//     </div>
//   `;

//   const assignments = await getAssignments();
//   const uploadedAssignments = await alreadyUploadedAssignments();

//   if (assignments.length === 0) {
//     assignmentsContainer.innerHTML = `<h2 class="empty">No assignments yet for this course</h2>`;
//     return;
//   }

//   let markup = "";

//   assignments.forEach((assignment, index) => {
//     // Check if this assignment has already been uploaded by the student
//     const isUploaded = uploadedAssignments.some(
//       (uploaded) =>
//         uploaded.assign_id === assignment.assign_id &&
//         uploaded.student_id === studentId
//     );

//     // Get the uploaded file path if it exists
//     const uploadedAssignment = uploadedAssignments.find(
//       (uploaded) =>
//         uploaded.assign_id === assignment.assign_id &&
//         uploaded.student_id === studentId
//     );

//     const uploadedFilePath = uploadedAssignment
//       ? uploadedAssignment.assignment_path
//       : null;

//     // Extract just the filename from the path for display
//     const uploadedFileName = uploadedFilePath
//       ? decodeURIComponent(
//           uploadedFilePath.substring(uploadedFilePath.lastIndexOf("/") + 1)
//         )
//       : "";

//     // Get submission date if available
//     const submissionDate =
//       uploadedAssignment && uploadedAssignment.submission_date
//         ? formatDate(uploadedAssignment.submission_date)
//         : "";

//     // Check if due date has passed
//     const dueDatePassed = isDatePassed(assignment.assign_duedate);
//     const dueDateFormatted = formatDate(assignment.assign_duedate);

//     // Determine due date class
//     let dueDateClass = "ok";
//     const today = new Date();
//     const dueDate = new Date(assignment.assign_duedate);
//     const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

//     if (dueDatePassed) {
//       dueDateClass = "overdue";
//     } else if (daysUntilDue <= 3) {
//       dueDateClass = "upcoming";
//     }

//     markup += `<div class="project-box">
//         <h3 class="project-title">${assignment.assign_title}</h3>
//         <p class="project-description">${assignment.assign_description}</p>
//         <hr class="project-divider" />
//         <div class="due-date ${dueDateClass}">
//           <i
//             class="fi fi-rr-calendar-clock"
//             style="margin-right: 8px; font-size: 18px"
//           ></i>
//           <span>Due: ${dueDateFormatted}</span>
//           ${
//             dueDatePassed && !isUploaded
//               ? `<span style="margin-left: auto; font-weight: bold;">OVERDUE</span>`
//               : ""
//           }
//         </div>
//         <button class="instructions-btn" data-assignment-id="${
//           assignment.assign_id
//         }">
//           <i class="fi fi-rr-document-signed" style="margin-right: 5px;"></i>
//           View Instructions
//         </button>

//         ${
//           isUploaded
//             ? `<div class="upload-status success">
//              <i class="fi fi-rr-check-circle" style="font-size: 18px;"></i>
//              <span>
//                <strong>Submitted:</strong> ${submissionDate}<br>
//                <strong>File:</strong> ${uploadedFileName.split("-").pop()}
//              </span>
//              <a href="${uploadedFilePath}" target="_blank" class="view-submission">View</a>
//            </div>`
//             : ""
//         }

//         <div class="file-selection-area" id="file-area-${index}" style="display: ${
//       isUploaded ? "none" : "block"
//     }; opacity: ${dueDatePassed && !isUploaded ? "0.7" : "1"}">
//           ${
//             dueDatePassed && !isUploaded
//               ? `<div class="upload-status warning" style="background-color: rgba(244, 67, 54, 0.1); color: #F44336;">
//                <i class="fi fi-rr-exclamation" style="font-size: 18px;"></i>
//                <span>Due date has passed but you can still submit your assignment (late submission)</span>
//              </div>`
//               : ""
//           }

//           <label
//             class="custum-file-upload"
//             for="file-${index}"
//           >
//             <div class="icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill=""
//                 viewBox="0 0 24 24"
//               >
//                 <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//                 <g
//                   stroke-linejoin="round"
//                   stroke-linecap="round"
//                   id="SVGRepo_tracerCarrier"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   <path
//                     fill=""
//                     d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
//                     clip-rule="evenodd"
//                     fill-rule="evenodd"
//                   ></path>
//                 </g>
//               </svg>
//             </div>
//             <div class="text">
//               <span>${
//                 dueDatePassed
//                   ? "Late submission - Click to upload"
//                   : "Click to upload assignment"
//               }</span>
//             </div>
//             <input class="file__input" type="file" id="file-${index}" data-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }" />
//           </label>

//           <div class="file-preview" id="file-preview-${index}" style="display: none;"></div>

//           <button class="submit-btn" data-btn-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }">
//             ${dueDatePassed ? "Submit Late Assignment" : "Submit Assignment"}
//           </button>
//         </div>
//       </div>`;
//   });

//   assignmentsContainer.innerHTML = markup;

//   // Add event listeners to all submit buttons and file inputs
//   const uploadBtns = document.querySelectorAll(".submit-btn");
//   const fileInputs = document.querySelectorAll(".file__input");

//   uploadBtns.forEach((btn) => {
//     btn.addEventListener("click", uploadFile);
//   });

//   fileInputs.forEach((input) => {
//     // Add drag and drop functionality
//     const uploadArea = input.parentElement;

//     // Handle file selection
//     input.addEventListener("change", (e) => {
//       const fileIndex = e.target.dataset.file;
//       const previewArea = document.getElementById(`file-preview-${fileIndex}`);

//       if (e.target.files && e.target.files.length > 0) {
//         const file = e.target.files[0];
//         const fileName = file.name;
//         const fileSize = (file.size / 1024).toFixed(2);

//         // Show file icon based on type
//         let fileIcon = "fi-rr-file";
//         const fileExt = fileName.split(".").pop().toLowerCase();

//         if (["pdf"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-pdf";
//         } else if (["doc", "docx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-word";
//         } else if (["xls", "xlsx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-excel";
//         } else if (["ppt", "pptx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-powerpoint";
//         } else if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-image";
//         } else if (["zip", "rar", "7z"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-archive";
//         }

//         previewArea.innerHTML = `
//           <div class="file-info">
//             <i class="fi ${fileIcon}" style="color: #5955b3; font-size: 18px;"></i>
//             <span class="file-name">${fileName}</span>
//             <span class="file-size">(${fileSize} KB)</span>
//             <span class="remove-file" data-file-index="${fileIndex}">✕</span>
//           </div>
//         `;
//         previewArea.style.display = "block";
//         uploadArea.style.borderColor = "#4CAF50";
//         uploadArea.style.backgroundColor = "rgba(76, 175, 80, 0.05)";

//         // Add event listener to remove file button
//         const removeBtn = previewArea.querySelector(".remove-file");
//         removeBtn.addEventListener("click", (event) => {
//           event.stopPropagation();
//           input.value = "";
//           previewArea.style.display = "none";
//           uploadArea.style.borderColor = "#5955b3";
//           uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//         });
//       } else {
//         previewArea.style.display = "none";
//         uploadArea.style.borderColor = "#5955b3";
//         uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//       }
//     });

//     // Drag and drop events
//     uploadArea.addEventListener("dragover", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#4a478f";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.15)";
//     });

//     uploadArea.addEventListener("dragleave", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#5955b3";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//     });

//     uploadArea.addEventListener("drop", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#5955b3";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";

//       if (e.dataTransfer.files.length) {
//         input.files = e.dataTransfer.files;
//         input.dispatchEvent(new Event("change"));
//       }
//     });
//   });

//   // Add event listeners to view instructions buttons
//   const instructionBtns = document.querySelectorAll(".instructions-btn");
//   instructionBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const assignmentId = btn.dataset.assignmentId;
//       const assignment = assignments.find((a) => a.assign_id === assignmentId);

//       if (assignment) {
//         // Create modal for instructions
//         const modal = document.createElement("div");
//         modal.className = "instructions-modal";
//         modal.innerHTML = `
//           <div class="modal-content">
//             <div class="modal-header">
//               <h2>${assignment.assign_title} - Instructions</h2>
//               <span class="modal-close">&times;</span>
//             </div>
//             <div class="modal-body">
//               <div class="instruction-details">
//                 <p><strong>Due Date:</strong> ${formatDate(
//                   assignment.assign_duedate
//                 )}</p>
//                 <div class="instruction-text">
//                   ${assignment.assign_description}
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;

//         document.body.appendChild(modal);

//         // Add modal styles if not already added
//         if (!document.querySelector(".modal-styles")) {
//           const modalStyles = document.createElement("style");
//           modalStyles.className = "modal-styles";
//           modalStyles.textContent = `
//             .instructions-modal {
//               display: flex;
//               position: fixed;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               background-color: rgba(0, 0, 0, 0.5);
//               z-index: 1000;
//               justify-content: center;
//               align-items: center;
//               opacity: 0;
//               animation: fadeIn 0.3s ease forwards;
//             }
//             .modal-content {
//               background-color: white;
//               width: 90%;
//               max-width: 600px;
//               border-radius: 12px;
//               overflow: hidden;
//               box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//               transform: translateY(20px);
//               animation: slideUp 0.3s ease forwards;
//             }
//             .modal-header {
//               padding: 20px;
//               background-color: #5955b3;
//               color: white;
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//             }
//             .modal-header h2 {
//               margin: 0;
//               font-size: 18px;
//               font-weight: 500;
//             }
//             .modal-close {
//               font-size: 24px;
//               cursor: pointer;
//               transition: all 0.2s ease;
//             }
//             .modal-close:hover {
//               transform: scale(1.2);
//             }
//             .modal-body {
//               padding: 20px;
//               max-height: 70vh;
//               overflow-y: auto;
//             }
//             .instruction-details {
//               line-height: 1.6;
//             }
//             .instruction-text {
//               margin-top: 15px;
//               white-space: pre-line;
//             }
//             @keyframes fadeIn {
//               from { opacity: 0; }
//               to { opacity: 1; }
//             }
//             @keyframes slideUp {
//               from { transform: translateY(20px); }
//               to { transform: translateY(0); }
//             }
//             @keyframes slideDown {
//               from { transform: translateY(0); }
//               to { transform: translateY(20px); opacity: 0; }
//             }
//           `;
//           document.head.appendChild(modalStyles);
//         }

//         // Close modal on click
//         const closeBtn = modal.querySelector(".modal-close");
//         closeBtn.addEventListener("click", () => {
//           modal.style.opacity = "0";
//           modal.querySelector(".modal-content").style.animation =
//             "slideDown 0.3s ease forwards";
//           setTimeout(() => modal.remove(), 300);
//         });

//         // Close modal on outside click
//         modal.addEventListener("click", (e) => {
//           if (e.target === modal) {
//             modal.style.opacity = "0";
//             modal.querySelector(".modal-content").style.animation =
//               "slideDown 0.3s ease forwards";
//             setTimeout(() => modal.remove(), 300);
//           }
//         });
//       }
//     });
//   });
// }

// async function uploadFile(e) {
//   const fileIndex = e.target.dataset.btnFile;
//   const assignmentId = e.target.dataset.assignmentId;
//   const fileInput = document.getElementById(`file-${fileIndex}`);

//   if (!fileInput.files || fileInput.files.length === 0) {
//     showToast("Please select a file to upload", "warning");
//     return;
//   }

//   const file = fileInput.files[0];

//   // Show loading state
//   showLoadingSpinner(e.target, true);

//   try {
//     // Create a unique filename with timestamp to prevent overwriting
//     const fileName = `${Math.random()}-${fileInput.files[0].name}`.replaceAll(
//       "/",
//       ""
//     );

//     const filePath = `https://iuiwdjtmdeempcqxeuhf.supabase.co/storage/v1/object/public/students-assignments//${fileName}`;
//     // const activityID = await getActivityID();
//     // const timestamp = new Date().getTime();
//     // const fileExtension = file.name.split(".").pop();
//     // const uniqueFileName = `https://iuiwdjtmdeempcqxeuhf.supabase.co/storage/v1/object/public/students-assignments/${assignmentId}-${studentId}-${timestamp}.${fileExtension}`;

//     // Create storage path
//     // const filePath = `assignments/${uniqueFileName}`;

//     // Upload file to storage
//     const { data: uploadData, error: uploadError } = await supaClient.storage
//       .from("students-assignments")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Error uploading file:", uploadError);
//       showToast("Failed to upload file. Please try again.", "error");
//       showLoadingSpinner(e.target, false);
//       return;
//     }

//     // Get public URL for the uploaded file
//     const { data: publicUrl } = supaClient.storage
//       .from("student-files")
//       .getPublicUrl(filePath);

//     // Update database with the file path and submission information
//     const { data: submissionData, error: submissionError } = await supaClient
//       .from("student_assignment")
//       .upsert(
//         [
//           {
//             student_id: studentId,
//             assign_id: assignmentId,
//             assignment_path: publicUrl.publicUrl,
//             submission_date: new Date().toISOString(),
//           },
//         ],
//         { onConflict: ["student_id", "assign_id"] }
//       );

//     if (submissionError) {
//       console.error("Error updating database:", submissionError);
//       showToast(
//         "File uploaded but failed to update records. Please contact support.",
//         "warning"
//       );
//       showLoadingSpinner(e.target, false);
//       return;
//     }

//     showToast("Assignment submitted successfully!", "success");

//     // Update UI to show success and hide upload controls
//     setTimeout(() => {
//       renderAssignments(); // Refresh to show the uploaded file
//     }, 1000);
//   } catch (error) {
//     console.error("Unexpected error during upload:", error);
//     showToast("An unexpected error occurred. Please try again later.", "error");
//     showLoadingSpinner(e.target, false);
//   }
// }

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//   // Check if user is logged in
//   if (!studentId || !courseId) {
//     window.location.href = "login.html";
//     return;
//   }

//   // Initialize assignments view
//   renderAssignments();

//   // Add navigation event listeners
//   const backButton = document.querySelector(".back-button");
//   if (backButton) {
//     backButton.addEventListener("click", () => {
//       window.location.href = "dashboard.html";
//     });
//   }

//   // Add refresh button functionality
//   const refreshButton = document.querySelector(".refresh-button");
//   if (refreshButton) {
//     refreshButton.addEventListener("click", () => {
//       renderAssignments();
//       showToast("Assignments refreshed", "info");
//     });
//   }
// });

//////////////////////// FIFTH VERSION//////////////////
// import { supaClient } from "./app.js";
// const pageTitle = document.querySelector(".page-title");
// const courseId = sessionStorage.getItem("courseId");
// const studentId = sessionStorage.getItem("studentId");

// // Function to show interactive toast notifications
// function showToast(message, type = "success") {
//   // Create toast container if it doesn't exist
//   let toastContainer = document.querySelector(".toast-container");
//   if (!toastContainer) {
//     toastContainer = document.createElement("div");
//     toastContainer.className = "toast-container";
//     document.body.appendChild(toastContainer);
//   }

//   // Create and display toast
//   const toast = document.createElement("div");
//   toast.className = `toast ${type}`;
//   toast.innerHTML = `
//     <span>${message}</span>
//     <span class="toast-close">&times;</span>
//   `;

//   // Add click event to close toast
//   toast.addEventListener("click", () => {
//     toast.classList.add("toast-hiding");
//     setTimeout(() => toast.remove(), 300);
//   });

//   toastContainer.appendChild(toast);

//   // Auto-remove toast after 3 seconds
//   setTimeout(() => {
//     if (toast.parentNode) {
//       toast.classList.add("toast-hiding");
//       setTimeout(() => toast.remove(), 300);
//     }
//   }, 3000);
// }

// // Function to show loading spinner
// function showLoadingSpinner(button, isLoading = true) {
//   if (isLoading) {
//     const originalText = button.textContent;
//     button.setAttribute("data-original-text", originalText);
//     button.innerHTML = `
//       <span class="spinner"></span>
//       <span>Uploading...</span>
//     `;
//     button.disabled = true;
//   } else {
//     const originalText = button.getAttribute("data-original-text") || "Submit";
//     button.textContent = originalText;
//     button.disabled = false;
//   }
// }

// // Check if date has passed
// function isDatePassed(dateString) {
//   const dueDate = new Date(dateString);
//   const today = new Date();
//   return today > dueDate;
// }

// // Format date for better display
// function formatDate(dateString) {
//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// }

// async function alreadyUploadedAssignments() {
//   const { data, error } = await supaClient
//     .from("student_assignment")
//     .select("*")
//     .eq("student_id", studentId)
//     .neq("assignment_path", null);

//   if (error) {
//     console.error("Error fetching uploaded assignments:", error);
//     showToast("Failed to check for existing submissions", "error");
//     return [];
//   }

//   console.log("Already uploaded assignments:", data);
//   return data || [];
// }

// async function getCourseName() {
//   const { data, error } = await supaClient
//     .from("course")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching course name:", error);
//     showToast("Failed to load course information", "error");
//     return;
//   }

//   if (data && data.length > 0) {
//     pageTitle.textContent = `${data[0].course_name} Assignments`;
//   }
// }

// async function getAssignments() {
//   await getCourseName();
//   const { data, error } = await supaClient
//     .from("assignment")
//     .select("*")
//     .eq("course_id", courseId);

//   if (error) {
//     console.error("Error fetching assignments:", error);
//     showToast("Failed to load assignments", "error");
//     return [];
//   }

//   return data || [];
// }

// async function renderAssignments() {
//   const assignmentsContainer = document.querySelector(".assignments-container");

//   // Show loading state
//   assignmentsContainer.innerHTML = `
//     <div class="loading-assignments">
//       <div class="loading-spinner"></div>
//       <p>Loading assignments...</p>
//     </div>
//   `;

//   const assignments = await getAssignments();
//   const uploadedAssignments = await alreadyUploadedAssignments();

//   if (assignments.length === 0) {
//     assignmentsContainer.innerHTML = `<h2 class="empty">No assignments yet for this course</h2>`;
//     return;
//   }

//   let markup = "";

//   assignments.forEach((assignment, index) => {
//     // Check if this assignment has already been uploaded by the student
//     const isUploaded = uploadedAssignments.some(
//       (uploaded) =>
//         uploaded.assign_id === assignment.assign_id &&
//         uploaded.student_id === studentId
//     );

//     // Get the uploaded file path if it exists
//     const uploadedAssignment = uploadedAssignments.find(
//       (uploaded) =>
//         uploaded.assign_id === assignment.assign_id &&
//         uploaded.student_id === studentId
//     );

//     const uploadedFilePath = uploadedAssignment
//       ? uploadedAssignment.assignment_path
//       : null;

//     // Extract just the filename from the path for display
//     const uploadedFileName = uploadedFilePath
//       ? decodeURIComponent(
//           uploadedFilePath.substring(uploadedFilePath.lastIndexOf("/") + 1)
//         )
//       : "";

//     // Get submission date if available
//     const submissionDate =
//       uploadedAssignment && uploadedAssignment.submission_date
//         ? formatDate(uploadedAssignment.submission_date)
//         : "";

//     // Check if due date has passed
//     const dueDatePassed = isDatePassed(assignment.assign_duedate);
//     const dueDateFormatted = formatDate(assignment.assign_duedate);

//     // Determine due date class
//     let dueDateClass = "ok";
//     const today = new Date();
//     const dueDate = new Date(assignment.assign_duedate);
//     const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

//     if (dueDatePassed) {
//       dueDateClass = "overdue";
//     } else if (daysUntilDue <= 3) {
//       dueDateClass = "upcoming";
//     }

//     markup += `<div class="project-box ${dueDatePassed ? "" : "active"}">
//         <h3 class="project-title">${assignment.assign_title}</h3>
//         <p class="project-description">${assignment.assign_description}</p>
//         <hr class="project-divider" />
//         <div class="due-date ${dueDateClass}">
//           <i
//             class="fi fi-rr-calendar-clock"
//             style="margin-right: 8px; font-size: 18px"
//           ></i>
//           <span>Due: ${dueDateFormatted}</span>
//           ${
//             dueDatePassed && !isUploaded
//               ? `<span style="margin-left: auto; font-weight: bold;">OVERDUE</span>`
//               : ""
//           }
//         </div>
//         <button class="instructions-btn" data-assignment-id="${
//           assignment.assign_id
//         }">
//           <i class="fi fi-rr-document-signed" style="margin-right: 5px;"></i>
//           View Instructions
//         </button>

//         ${
//           isUploaded
//             ? `<div class="upload-status success">
//              <i class="fi fi-rr-check-circle" style="font-size: 18px;"></i>
//              <span>
//                <strong>Submitted:</strong> ${submissionDate}<br>
//                <strong>File:</strong> ${uploadedFileName.split("-").pop()}
//              </span>
//              <a href="${uploadedFilePath}" target="_blank" class="view-submission">View</a>
//            </div>`
//             : ""
//         }

//         <div class="file-selection-area" id="file-area-${index}" style="display: ${
//       isUploaded ? "none" : "block"
//     }; opacity: ${dueDatePassed && !isUploaded ? "0.7" : "1"}">
//           ${
//             dueDatePassed && !isUploaded
//               ? `<div class="upload-status warning" style="background-color: rgba(244, 67, 54, 0.1); color: #F44336;">
//                <i class="fi fi-rr-exclamation" style="font-size: 18px;"></i>
//                <span>Due date has passed but you can still submit your assignment (late submission)</span>
//              </div>`
//               : ""
//           }

//           <label
//             class="custum-file-upload"
//             for="file-${index}"
//           >
//             <div class="icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill=""
//                 viewBox="0 0 24 24"
//               >
//                 <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//                 <g
//                   stroke-linejoin="round"
//                   stroke-linecap="round"
//                   id="SVGRepo_tracerCarrier"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   <path
//                     fill=""
//                     d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
//                     clip-rule="evenodd"
//                     fill-rule="evenodd"
//                   ></path>
//                 </g>
//               </svg>
//             </div>
//             <div class="text">
//               <span>${
//                 dueDatePassed
//                   ? "Late submission - Click to upload"
//                   : "Click to upload assignment"
//               }</span>
//             </div>
//             <input class="file__input" type="file" id="file-${index}" data-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }" />
//           </label>

//           <div class="file-preview" id="file-preview-${index}" style="display: none;"></div>

//           <button class="submit-btn" data-btn-file="${index}" data-assignment-id="${
//       assignment.assign_id
//     }">
//             ${dueDatePassed ? "Submit Late Assignment" : "Submit Assignment"}
//           </button>
//         </div>
//       </div>`;
//   });

//   assignmentsContainer.innerHTML = markup;

//   // Add event listeners to all submit buttons and file inputs
//   const uploadBtns = document.querySelectorAll(".submit-btn");
//   const fileInputs = document.querySelectorAll(".file__input");

//   uploadBtns.forEach((btn) => {
//     btn.addEventListener("click", uploadFile);
//   });

//   fileInputs.forEach((input) => {
//     // Add drag and drop functionality
//     const uploadArea = input.parentElement;

//     // Handle file selection
//     input.addEventListener("change", (e) => {
//       const fileIndex = e.target.dataset.file;
//       const previewArea = document.getElementById(`file-preview-${fileIndex}`);

//       if (e.target.files && e.target.files.length > 0) {
//         const file = e.target.files[0];
//         const fileName = file.name;
//         const fileSize = (file.size / 1024).toFixed(2);

//         // Show file icon based on type
//         let fileIcon = "fi-rr-file";
//         const fileExt = fileName.split(".").pop().toLowerCase();

//         if (["pdf"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-pdf";
//         } else if (["doc", "docx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-word";
//         } else if (["xls", "xlsx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-excel";
//         } else if (["ppt", "pptx"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-powerpoint";
//         } else if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-image";
//         } else if (["zip", "rar", "7z"].includes(fileExt)) {
//           fileIcon = "fi-rr-file-archive";
//         }

//         previewArea.innerHTML = `
//           <div class="file-info">
//             <i class="fi ${fileIcon}" style="color: #5955b3; font-size: 18px;"></i>
//             <span class="file-name">${fileName}</span>
//             <span class="file-size">(${fileSize} KB)</span>
//             <span class="remove-file" data-file-index="${fileIndex}">✕</span>
//           </div>
//         `;
//         previewArea.style.display = "block";
//         uploadArea.style.borderColor = "#4CAF50";
//         uploadArea.style.backgroundColor = "rgba(76, 175, 80, 0.05)";

//         // Add event listener to remove file button
//         const removeBtn = previewArea.querySelector(".remove-file");
//         removeBtn.addEventListener("click", (event) => {
//           event.stopPropagation();
//           input.value = "";
//           previewArea.style.display = "none";
//           uploadArea.style.borderColor = "#5955b3";
//           uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//         });
//       } else {
//         previewArea.style.display = "none";
//         uploadArea.style.borderColor = "#5955b3";
//         uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//       }
//     });

//     // Drag and drop events
//     uploadArea.addEventListener("dragover", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#4a478f";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.15)";
//     });

//     uploadArea.addEventListener("dragleave", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#5955b3";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
//     });

//     uploadArea.addEventListener("drop", (e) => {
//       e.preventDefault();
//       uploadArea.style.borderColor = "#5955b3";
//       uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";

//       if (e.dataTransfer.files.length) {
//         input.files = e.dataTransfer.files;
//         input.dispatchEvent(new Event("change"));
//       }
//     });
//   });

//   // Add event listeners to view instructions buttons
//   const instructionBtns = document.querySelectorAll(".instructions-btn");
//   instructionBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const assignmentId = btn.dataset.assignmentId;
//       const assignment = assignments.find((a) => a.assign_id === assignmentId);

//       if (assignment) {
//         // Create modal for instructions
//         const modal = document.createElement("div");
//         modal.className = "instructions-modal";
//         modal.innerHTML = `
//           <div class="modal-content">
//             <div class="modal-header">
//               <h2>${assignment.assign_title} - Instructions</h2>
//               <span class="modal-close">&times;</span>
//             </div>
//             <div class="modal-body">
//               <div class="instruction-details">
//                 <p><strong>Due Date:</strong> ${formatDate(
//                   assignment.assign_duedate
//                 )}</p>
//                 <div class="instruction-text">
//                   ${assignment.assign_description}
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;

//         document.body.appendChild(modal);

//         // Add modal styles if not already added
//         if (!document.querySelector(".modal-styles")) {
//           const modalStyles = document.createElement("style");
//           modalStyles.className = "modal-styles";
//           modalStyles.textContent = `
//             .instructions-modal {
//               display: flex;
//               position: fixed;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               background-color: rgba(0, 0, 0, 0.5);
//               z-index: 1000;
//               justify-content: center;
//               align-items: center;
//               opacity: 0;
//               animation: fadeIn 0.3s ease forwards;
//             }
//             .modal-content {
//               background-color: white;
//               width: 90%;
//               max-width: 600px;
//               border-radius: 12px;
//               overflow: hidden;
//               box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//               transform: translateY(20px);
//               animation: slideUp 0.3s ease forwards;
//             }
//             .modal-header {
//               padding: 20px;
//               background-color: #5955b3;
//               color: white;
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//             }
//             .modal-header h2 {
//               margin: 0;
//               font-size: 18px;
//               font-weight: 500;
//             }
//             .modal-close {
//               font-size: 24px;
//               cursor: pointer;
//               transition: all 0.2s ease;
//             }
//             .modal-close:hover {
//               transform: scale(1.2);
//             }
//             .modal-body {
//               padding: 20px;
//               max-height: 70vh;
//               overflow-y: auto;
//             }
//             .instruction-details {
//               line-height: 1.6;
//             }
//             .instruction-text {
//               margin-top: 15px;
//               white-space: pre-line;
//             }
//             @keyframes fadeIn {
//               from { opacity: 0; }
//               to { opacity: 1; }
//             }
//             @keyframes slideUp {
//               from { transform: translateY(20px); }
//               to { transform: translateY(0); }
//             }
//             @keyframes slideDown {
//               from { transform: translateY(0); }
//               to { transform: translateY(20px); opacity: 0; }
//             }
//           `;
//           document.head.appendChild(modalStyles);
//         }

//         // Close modal on click
//         const closeBtn = modal.querySelector(".modal-close");
//         closeBtn.addEventListener("click", () => {
//           modal.style.opacity = "0";
//           modal.querySelector(".modal-content").style.animation =
//             "slideDown 0.3s ease forwards";
//           setTimeout(() => modal.remove(), 300);
//         });

//         // Close modal on outside click
//         modal.addEventListener("click", (e) => {
//           if (e.target === modal) {
//             modal.style.opacity = "0";
//             modal.querySelector(".modal-content").style.animation =
//               "slideDown 0.3s ease forwards";
//             setTimeout(() => modal.remove(), 300);
//           }
//         });
//       }
//     });
//   });
// }

// async function uploadFile(e) {
//   const fileIndex = e.target.dataset.btnFile;
//   const assignmentId = e.target.dataset.assignmentId;
//   const fileInput = document.getElementById(`file-${fileIndex}`);

//   if (!fileInput.files || fileInput.files.length === 0) {
//     showToast("Please select a file to upload", "warning");
//     return;
//   }

//   const file = fileInput.files[0];

//   // Show loading state
//   showLoadingSpinner(e.target, true);

//   try {
//     // First check if this assignment was already submitted
//     const { data: existingSubmissions, error: checkError } = await supaClient
//       .from("student_assignment")
//       .select("*")
//       .eq("student_id", studentId)
//       .eq("assign_id", assignmentId)
//       .neq("assignment_path", null);

//     if (checkError) {
//       console.error("Error checking existing submissions:", checkError);
//       showToast("Error checking submission status", "error");
//       showLoadingSpinner(e.target, false);
//       return;
//     }

//     // If already submitted, show message and prevent re-upload
//     if (existingSubmissions && existingSubmissions.length > 0) {
//       showToast("This assignment has already been submitted", "warning");
//       showLoadingSpinner(e.target, false);
//       // Refresh the assignments display to show the submission
//       renderAssignments();
//       return;
//     }

//     // Create a unique filename with timestamp to prevent overwriting
//     const timestamp = new Date().getTime();
//     const fileName =
//       `${studentId}-${assignmentId}-${timestamp}-${file.name}`.replaceAll(
//         "/",
//         ""
//       );

//     // Define storage path
//     const filePath = fileName;

//     // Upload file to storage
//     const { data: uploadData, error: uploadError } = await supaClient.storage
//       .from("students-assignments")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Error uploading file:", uploadError);
//       showToast("Failed to upload file. Please try again.", "error");
//       showLoadingSpinner(e.target, false);
//       return;
//     }

//     // Get public URL for the uploaded file
//     const { data: publicUrl } = supaClient.storage
//       .from("students-assignments")
//       .getPublicUrl(filePath);

//     // Update database with the file path and submission information
//     const { data: submissionData, error: submissionError } = await supaClient
//       .from("student_assignment")
//       .upsert(
//         [
//           {
//             student_id: studentId,
//             assign_id: assignmentId,
//             assignment_path: publicUrl.publicUrl,
//             submission_date: new Date().toISOString(),
//           },
//         ],
//         { onConflict: ["student_id", "assign_id"] }
//       );

//     if (submissionError) {
//       console.error("Error updating database:", submissionError);
//       showToast(
//         "File uploaded but failed to update records. Please contact support.",
//         "warning"
//       );
//       showLoadingSpinner(e.target, false);
//       return;
//     }

//     showToast("Assignment submitted successfully!", "success");

//     // Update UI to show success and hide upload controls
//     setTimeout(() => {
//       renderAssignments(); // Refresh to show the uploaded file
//     }, 1000);
//   } catch (error) {
//     console.error("Unexpected error during upload:", error);
//     showToast("An unexpected error occurred. Please try again later.", "error");
//     showLoadingSpinner(e.target, false);
//   }
// }

// // Initialize page
// document.addEventListener("DOMContentLoaded", () => {
//   // Check if user is logged in
//   if (!studentId || !courseId) {
//     window.location.href = "login.html";
//     return;
//   }

//   // Initialize assignments view
//   renderAssignments();

//   // Add navigation event listeners
//   const backButton = document.querySelector(".back-button");
//   if (backButton) {
//     backButton.addEventListener("click", () => {
//       window.location.href = "dashboard.html";
//     });
//   }

//   // Add refresh button functionality
//   const refreshButton = document.querySelector(".refresh-button");
//   if (refreshButton) {
//     refreshButton.addEventListener("click", () => {
//       renderAssignments();
//       showToast("Assignments refreshed", "info");
//     });
//   }
// });

/////////////////////////// SIXTH VERSION //////////////////////////////
import { supaClient } from "./app.js";
const pageTitle = document.querySelector(".page-title");
const courseId = sessionStorage.getItem("courseId");
const studentId = sessionStorage.getItem("studentId");

// Function to show interactive toast notifications
function showToast(message, type = "success") {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  // Create and display toast
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <span class="toast-close">&times;</span>
  `;

  // Add click event to close toast
  toast.addEventListener("click", () => {
    toast.classList.add("toast-hiding");
    setTimeout(() => toast.remove(), 300);
  });

  toastContainer.appendChild(toast);

  // Auto-remove toast after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add("toast-hiding");
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
}

// Function to show loading spinner
function showLoadingSpinner(button, isLoading = true) {
  if (isLoading) {
    const originalText = button.textContent;
    button.setAttribute("data-original-text", originalText);
    button.innerHTML = `
      <span class="spinner"></span>
      <span>Uploading...</span>
    `;
    button.disabled = true;
  } else {
    const originalText = button.getAttribute("data-original-text") || "Submit";
    button.textContent = originalText;
    button.disabled = false;
  }
}

// Check if date has passed
function isDatePassed(dateString) {
  const dueDate = new Date(dateString);
  const today = new Date();
  return today > dueDate;
}

// Format date for better display
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

async function alreadyUploadedAssignments() {
  const { data, error } = await supaClient
    .from("student_assignment")
    .select("*")
    .eq("student_id", studentId)
    .neq("assignment_path", null);

  if (error) {
    console.error("Error fetching uploaded assignments:", error);
    showToast("Failed to check for existing submissions", "error");
    return [];
  }

  console.log("Already uploaded assignments:", data);
  return data || [];
}

async function getCourseName() {
  const { data, error } = await supaClient
    .from("course")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    console.error("Error fetching course name:", error);
    showToast("Failed to load course information", "error");
    return;
  }

  if (data && data.length > 0) {
    pageTitle.textContent = `${data[0].course_name} Assignments`;
  }
}

async function getAssignments() {
  await getCourseName();
  const { data, error } = await supaClient
    .from("assignment")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    console.error("Error fetching assignments:", error);
    showToast("Failed to load assignments", "error");
    return [];
  }

  return data || [];
}

async function renderAssignments() {
  const assignmentsContainer = document.querySelector(".assignments-container");

  // Show loading state
  assignmentsContainer.innerHTML = `
    <div class="loading-assignments">
      <div class="loading-spinner"></div>
      <p>Loading assignments...</p>
    </div>
  `;

  const assignments = await getAssignments();
  const uploadedAssignments = await alreadyUploadedAssignments();

  if (assignments.length === 0) {
    assignmentsContainer.innerHTML = `<h2 class="empty">No assignments yet for this course</h2>`;
    return;
  }

  let markup = "";

  assignments.forEach((assignment, index) => {
    // Check if this assignment has already been uploaded by the student
    const isUploaded = uploadedAssignments.some(
      (uploaded) =>
        uploaded.assign_id === assignment.assign_id &&
        uploaded.student_id === studentId
    );

    // Get the uploaded file path if it exists
    const uploadedAssignment = uploadedAssignments.find(
      (uploaded) =>
        uploaded.assign_id === assignment.assign_id &&
        uploaded.student_id === studentId
    );

    const uploadedFilePath = uploadedAssignment
      ? uploadedAssignment.assignment_path
      : null;

    // Extract just the filename from the path for display
    const uploadedFileName = uploadedFilePath
      ? decodeURIComponent(
          uploadedFilePath.substring(uploadedFilePath.lastIndexOf("/") + 1)
        )
      : "";

    // Check if due date has passed
    const dueDatePassed = isDatePassed(assignment.assign_duedate);
    const dueDateFormatted = formatDate(assignment.assign_duedate);

    // Determine due date class
    let dueDateClass = "ok";
    const today = new Date();
    const dueDate = new Date(assignment.assign_duedate);
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (dueDatePassed) {
      dueDateClass = "overdue";
    } else if (daysUntilDue <= 3) {
      dueDateClass = "upcoming";
    }

    markup += `<div class="project-box ${
      dueDatePassed && !isUploaded ? "inactive" : "active"
    }">
        <h3 class="project-title">${assignment.assign_title}</h3>
        <p class="project-description">${assignment.assign_description}</p>
        <hr class="project-divider" />
        <div class="due-date ${dueDateClass}">
          <i
            class="fi fi-rr-calendar-clock"
            style="margin-right: 8px; font-size: 18px"
          ></i>
          <span>Due: ${dueDateFormatted}</span>
          ${
            dueDatePassed && !isUploaded
              ? `<span style="margin-left: auto; font-weight: bold; color: #F44336;">OVERDUE</span>`
              : ""
          }
        </div>
        <button class="instructions-btn" data-assignment-id="${
          assignment.assign_id
        }">
          <i class="fi fi-rr-document-signed" style="margin-right: 5px;"></i>
          View Instructions
        </button>
        
        ${
          isUploaded
            ? `<div class="upload-status success">
             <i class="fi fi-rr-check-circle" style="font-size: 18px;"></i>
             <span>
               <strong>Submitted</strong><br>
               <strong>File:</strong> ${uploadedFileName.split("-").pop()}
             </span>
             <a href="${uploadedFilePath}" target="_blank" class="view-submission">View</a>
           </div>`
            : ""
        }
        
        <div class="file-selection-area" id="file-area-${index}" style="display: ${
      isUploaded || dueDatePassed ? "none" : "block"
    };">
          <label
            class="custum-file-upload"
            for="file-${index}"
          >
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill=""
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="text">
              <span>Click to upload assignment</span>
            </div>
            <input class="file__input" type="file" id="file-${index}" data-file="${index}" data-assignment-id="${
      assignment.assign_id
    }" />
          </label>
          
          <div class="file-preview" id="file-preview-${index}" style="display: none;"></div>
          
          <button class="submit-btn" data-btn-file="${index}" data-assignment-id="${
      assignment.assign_id
    }">
            Submit Assignment
          </button>
        </div>
        
        ${
          dueDatePassed && !isUploaded
            ? `<div class="deadline-passed-message">
                <i class="fi fi-rr-ban" style="font-size: 18px; color: #F44336;"></i>
                <span>Submission deadline has passed. Contact your instructor if you need an extension.</span>
              </div>`
            : ""
        }
      </div>`;
  });

  assignmentsContainer.innerHTML = markup;

  // Add event listeners to all submit buttons and file inputs
  const uploadBtns = document.querySelectorAll(".submit-btn");
  const fileInputs = document.querySelectorAll(".file__input");

  uploadBtns.forEach((btn) => {
    btn.addEventListener("click", uploadFile);
  });

  fileInputs.forEach((input) => {
    // Add drag and drop functionality
    const uploadArea = input.parentElement;

    // Handle file selection
    input.addEventListener("change", (e) => {
      const fileIndex = e.target.dataset.file;
      const previewArea = document.getElementById(`file-preview-${fileIndex}`);

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(2);

        // Show file icon based on type
        let fileIcon = "fi-rr-file";
        const fileExt = fileName.split(".").pop().toLowerCase();

        if (["pdf"].includes(fileExt)) {
          fileIcon = "fi-rr-file-pdf";
        } else if (["doc", "docx"].includes(fileExt)) {
          fileIcon = "fi-rr-file-word";
        } else if (["xls", "xlsx"].includes(fileExt)) {
          fileIcon = "fi-rr-file-excel";
        } else if (["ppt", "pptx"].includes(fileExt)) {
          fileIcon = "fi-rr-file-powerpoint";
        } else if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) {
          fileIcon = "fi-rr-file-image";
        } else if (["zip", "rar", "7z"].includes(fileExt)) {
          fileIcon = "fi-rr-file-archive";
        }

        previewArea.innerHTML = `
          <div class="file-info">
            <i class="fi ${fileIcon}" style="color: #5955b3; font-size: 18px;"></i>
            <span class="file-name">${fileName}</span>
            <span class="file-size">(${fileSize} KB)</span>
            <span class="remove-file" data-file-index="${fileIndex}">✕</span>
          </div>
        `;
        previewArea.style.display = "block";
        uploadArea.style.borderColor = "#4CAF50";
        uploadArea.style.backgroundColor = "rgba(76, 175, 80, 0.05)";

        // Add event listener to remove file button
        const removeBtn = previewArea.querySelector(".remove-file");
        removeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          input.value = "";
          previewArea.style.display = "none";
          uploadArea.style.borderColor = "#5955b3";
          uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
        });
      } else {
        previewArea.style.display = "none";
        uploadArea.style.borderColor = "#5955b3";
        uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
      }
    });

    // Drag and drop events
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = "#4a478f";
      uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.15)";
    });

    uploadArea.addEventListener("dragleave", (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = "#5955b3";
      uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = "#5955b3";
      uploadArea.style.backgroundColor = "rgba(89, 85, 179, 0.05)";

      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event("change"));
      }
    });
  });

  // Add event listeners to view instructions buttons
  const instructionBtns = document.querySelectorAll(".instructions-btn");
  instructionBtns.forEach((btn) => {
    console.log(btn);
    btn.addEventListener("click", () => {
      const assignmentId = btn.dataset.assignmentId;
      console.log(assignmentId);
      const assignment = assignments.find((a) => a.assign_id === +assignmentId);
      console.log(assignment);
      console.log(assignments);
      if (assignment) {
        // Create modal for instructions
        const modal = document.createElement("div");
        modal.className = "instructions-modal";
        modal.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h2>${assignment.assign_title} - Instructions</h2>
              <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
              <div class="instruction-details">
                <p><strong>Due Date:</strong> ${formatDate(
                  assignment.assign_duedate
                )}</p>
                <div class="instruction-text">
                  ${assignment.assign_description}
                </div>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        // Add modal styles if not already added
        if (!document.querySelector(".modal-styles")) {
          const modalStyles = document.createElement("style");
          modalStyles.className = "modal-styles";
          modalStyles.textContent = `
            .instructions-modal {
              display: flex;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 1000;
              justify-content: center;
              align-items: center;
              opacity: 0;
              animation: fadeIn 0.3s ease forwards;
            }
            .modal-content {
              background-color: white;
              width: 90%;
              max-width: 600px;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
              transform: translateY(20px);
              animation: slideUp 0.3s ease forwards;
            }
            .modal-header {
              padding: 20px;
              background-color: #5955b3;
              color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .modal-header h2 {
              margin: 0;
              font-size: 18px;
              font-weight: 500;
            }
            .modal-close {
              font-size: 24px;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .modal-close:hover {
              transform: scale(1.2);
            }
            .modal-body {
              padding: 20px;
              max-height: 70vh;
              overflow-y: auto;
            }
            .instruction-details {
              line-height: 1.6;
            }
            .instruction-text {
              margin-top: 15px;
              white-space: pre-line;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); }
              to { transform: translateY(0); }
            }
            @keyframes slideDown {
              from { transform: translateY(0); }
              to { transform: translateY(20px); opacity: 0; }
            }
          `;
          document.head.appendChild(modalStyles);
        }

        // Close modal on click
        const closeBtn = modal.querySelector(".modal-close");
        closeBtn.addEventListener("click", () => {
          modal.style.opacity = "0";
          modal.querySelector(".modal-content").style.animation =
            "slideDown 0.3s ease forwards";
          setTimeout(() => modal.remove(), 300);
        });

        // Close modal on outside click
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.opacity = "0";
            modal.querySelector(".modal-content").style.animation =
              "slideDown 0.3s ease forwards";
            setTimeout(() => modal.remove(), 300);
          }
        });
      }
    });
  });
}

async function uploadFile(e) {
  const fileIndex = e.target.dataset.btnFile;
  const assignmentId = e.target.dataset.assignmentId;
  const fileInput = document.getElementById(`file-${fileIndex}`);

  if (!fileInput.files || fileInput.files.length === 0) {
    showToast("Please select a file to upload", "warning");
    return;
  }

  const file = fileInput.files[0];

  // Show loading state
  showLoadingSpinner(e.target, true);

  try {
    // First check if this assignment was already submitted
    const { data: existingSubmissions, error: checkError } = await supaClient
      .from("student_assignment")
      .select("*")
      .eq("student_id", studentId)
      .eq("assign_id", assignmentId)
      .neq("assignment_path", null);

    if (checkError) {
      console.error("Error checking existing submissions:", checkError);
      showToast("Error checking submission status", "error");
      showLoadingSpinner(e.target, false);
      return;
    }

    // If already submitted, show message and prevent re-upload
    if (existingSubmissions && existingSubmissions.length > 0) {
      showToast("This assignment has already been submitted", "warning");
      showLoadingSpinner(e.target, false);
      // Refresh the assignments display to show the submission
      renderAssignments();
      return;
    }

    // Check if due date has passed for this assignment
    const assignment = await getAssignmentById(assignmentId);
    if (assignment && isDatePassed(assignment.assign_duedate)) {
      showToast("Assignment deadline has passed. Cannot submit.", "error");
      showLoadingSpinner(e.target, false);
      renderAssignments();
      return;
    }

    // Create a unique filename with timestamp to prevent overwriting
    const timestamp = new Date().getTime();
    const fileName = `$-${assignmentId}-${timestamp}-${file.name}`.replaceAll(
      "/",
      ""
    );

    // Define storage path
    const filePath = fileName;

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supaClient.storage
      .from("students-assignments")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      showToast("Failed to upload file. Please try again.", "error");
      showLoadingSpinner(e.target, false);
      return;
    }

    // Get public URL for the uploaded file
    const { data: publicUrl } = supaClient.storage
      .from("students-assignments")
      .getPublicUrl(filePath);

    // Update database with the file path and submission information
    const { data: submissionData, error: submissionError } = await supaClient
      .from("student_assignment")
      .upsert(
        [
          {
            student_id: studentId,
            assign_id: assignmentId,
            assignment_path: publicUrl.publicUrl,
          },
        ],
        { onConflict: ["student_id", "assign_id"] }
      );

    if (submissionError) {
      console.error("Error updating database:", submissionError);
      showToast(
        "File uploaded but failed to update records. Please contact support.",
        "warning"
      );
      showLoadingSpinner(e.target, false);
      return;
    }

    showToast("Assignment submitted successfully!", "success");

    // Update UI to show success and hide upload controls
    setTimeout(() => {
      renderAssignments(); // Refresh to show the uploaded file
    }, 1000);
  } catch (error) {
    console.error("Unexpected error during upload:", error);
    showToast("An unexpected error occurred. Please try again later.", "error");
    showLoadingSpinner(e.target, false);
  }
}

// Helper function to get assignment details by ID
async function getAssignmentById(assignmentId) {
  const { data, error } = await supaClient
    .from("assignment")
    .select("*")
    .eq("assign_id", assignmentId)
    .single();

  if (error) {
    console.error("Error fetching assignment details:", error);
    return null;
  }

  return data;
}

// Add CSS for new message styles
function addCustomStyles() {
  const customStyles = document.createElement("style");
  customStyles.textContent = `
    .deadline-passed-message {
      background-color: rgba(244, 67, 54, 0.1);
      color: #555;
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .project-box.inactive {
      opacity: 0.8;
      border-color: #ddd;
    }
    
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
    }
    
    .toast {
      min-width: 250px;
      margin-bottom: 10px;
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease forwards;
    }
    
    .toast.success {
      background-color: #E8F5E9;
      color: #2E7D32;
      border-left: 4px solid #2E7D32;
    }
    
    .toast.error {
      background-color: #FFEBEE;
      color: #C62828;
      border-left: 4px solid #C62828;
    }
    
    .toast.warning {
      background-color: #FFF8E1;
      color: #F57F17;
      border-left: 4px solid #F57F17;
    }
    
    .toast.info {
      background-color: #E3F2FD;
      color: #1565C0;
      border-left: 4px solid #1565C0;
    }
    
    .toast-close {
      cursor: pointer;
      margin-left: 10px;
    }
    
    .toast-hiding {
      animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(customStyles);
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  if (!studentId || !courseId) {
    window.location.href = "login.html";
    return;
  }

  // Add custom styles
  addCustomStyles();

  // Initialize assignments view
  renderAssignments();

  // Add navigation event listeners
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Add refresh button functionality
  const refreshButton = document.querySelector(".refresh-button");
  if (refreshButton) {
    refreshButton.addEventListener("click", () => {
      renderAssignments();
      showToast("Assignments refreshed", "info");
    });
  }
});
