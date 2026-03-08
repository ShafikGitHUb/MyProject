// sob id ana akhane

const container = document.getElementById('card-container');
const modal = document.getElementById("issue_modal");
const closeBtn = document.getElementById("modal-close");
const buttons = document.querySelectorAll("#btn-section button"); // 3 buttons
const issueCountEl = document.querySelector(".flex.items-center.gap-3 h2");
let allIssues = [];
const loading = document.getElementById("loading");
// protita cart er api function suru
   
async function loadIssues() {
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  displayIssue(data.data);
}
// protita cart er api function suru call hoa aslo

function displayIssue(data) {
  container.innerHTML = ''; // clear old cards
  data.forEach(issue => {
    console.log(issue);
  const card = document.createElement('div');
  // card a click korle modal asbe
  card.addEventListener("click", () => {
  openModal(issue.id);
});
    
card.className = "card bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden p-4 space-y-4";
card.innerHTML = `  <div class="flex justify-between items-start mb-4">
       <img src= "Images/Open-Status.png"alt="Open-Status Image">
       <div class="badge badge-soft badge-secondary">${issue.priority}</div>
  </div>
  <div>
      <h2 class="text-lg font-semibold text-xl">
        ${issue.title}
      </h2>
      <p class="text-slate-500 text-sm">
        ${issue.description}
      </p>
  </div>
  <div>
 <div class="badge badge-soft badge-secondary">
  ${issue.labels[0] ? issue.labels[0] : " Missining"}
</div>
<div class="badge badge-soft badge-secondary">
  ${issue.labels[1] ? issue.labels[1] : "Missining"}
</div>
  </div>
  <div class="border-t border-slate-300 p-5 bg-slate-50/30">
       <p class="text-slate-400 text-xs font-medium mb-1">#${issue.id} by ${issue.author}</p>
       <p class="text-slate-400 text-xs font-medium">${new Date(issue.createdAt).toLocaleDateString()}</p>
  </div>`;
    container.appendChild(card);
  });
}


// modal start
async function openModal(id) {
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const response = await res.json();
  const data = response.data;
  const modalId = document.getElementById("modal-id");
  const modalBox = document.createElement("div");
  modalId.innerHTML = "";
  modalBox.innerHTML = `
<div class="w-[92%] max-w-[95%] sm:w-11/12 md:max-w-2xl p-4 md:p-6">
  <div class="flex flex-col gap-2">
    <h2 class="text-2xl font-bold text-slate-800">${data.title}</h2>
    <div class="flex items-center gap-2 text-sm text-gray-500">
      <span class="badge badge-success badge-sm text-white px-3 py-3">${data.status}</span>
      <span>Opened by <span class=""></span></span>
      <span>${data.createdAt}</span>
    </div>
  </div>
  <div class="flex gap-2 mt-4">
    <div class="badge badge-outline border-red-200 text-red-500 bg-red-50 gap-1 px-3 py-3">
      <svg xmlns="" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      ${data.labels[0]}
    </div>
    <div class="badge badge-outline border-orange-200 text-orange-500 bg-orange-50 gap-1 px-3 py-3">
      <span class="text-xs">⚙</span> ${data.labels[1]}
    </div>
  </div>
  <p class="mt-6 text-slate-600 leading-relaxed">${data.description}  </p>

  <div class="mt-8 p-4 bg-slate-50 rounded-lg flex justify-between items-center">
    <div>
      <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Assignee:</p>
      <p class="font-bold text-slate-800 mt-1">${data.assignee}</p>
    </div>
    <div class="text-right">
      <p class="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Priority:</p>
      <span class="badge bg-red-500 border-none text-white font-bold px-4 py-3">${data.priority}</span>
    </div>
  </div>
   <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
</div>`;
    modalId.appendChild(modalBox);
    my_modal_5.showModal();
}
// Call all card
loadIssues();


// Filter Button
async function loadIssues() {
  const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await response.json();
  allIssues = data.data;
  displayIssue(allIssues);
  updateCount(allIssues.length);
  setActiveButton("All");
}
function filterIssues(status) {
  let filtered;
  if(status === "All") {
    filtered = allIssues;
  } else {
    filtered = allIssues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
  }
  displayIssue(filtered);
  updateCount(filtered.length);
  setActiveButton(status);
}

function updateCount(count) {
  if(issueCountEl) {
    issueCountEl.textContent = `${count} Issues`;
  }
}

function setActiveButton(status) {
  buttons.forEach(btn => {
    if(btn.textContent === status) {
      btn.classList.add("btn-primary", "text-white");
      btn.classList.remove("btn-outline", "text-gray-500");
    } else {
      btn.classList.remove("btn-primary", "text-white");
      btn.classList.add("btn-outline", "text-gray-500");
    }
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterIssues(btn.textContent);
  });
});
