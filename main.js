document.getElementById("bugInputForm").addEventListener("submit", saveBug);

function saveBug(e) {
  var bugDesc = document.getElementById("bugDescInput").value;
  var bugSeverity = document.getElementById("bugSeverityInput").value;
  var bugAssignedTo = document.getElementById("bugAssignedToInput").value;
  var bugId = chance.guid();
  var bugStatus = "Open";

  var bug = {
    id: bugId,
    description: bugDesc,
    severity: bugSeverity,
    assignedTo: bugAssignedTo,
    status: bugStatus
  };

  if (localStorage.getItem("bugs") == null) {
    var bugs = [];
    bugs.push(bug);
    localStorage.setItem("bugs", JSON.stringify(bugs));
  } else {
    var bugs = JSON.parse(localStorage.getItem("bugs"));
    bugs.push(bug);
    localStorage.setItem("bugs", JSON.stringify(bugs));
  }

  document.getElementById("bugInputForm").reset();

  fetchBugs();
  e.preventDefault();
}

function setStatusClosed(id) {
  let bugs = JSON.parse(localStorage.getItem("bugs"));
  console.log(bugs);

  for (i = 0; i < bugs.length; i++) {
    if (bugs[i].id == id) {
      bugs[i].status = "Closed";
    }
  }
  localStorage.setItem("bugs", JSON.stringify(bugs));

  fetchBugs();
}

function fetchBugs() {
  var bugs = JSON.parse(localStorage.getItem("bugs"));
  var bugsList = document.getElementById("bugsList");

  bugsList.innerHTML = "";

  for (i = 0; i < bugs.length; i++) {
    var id = bugs[i].id;
    var desc = bugs[i].description;
    var severity = bugs[i].severity;
    var assignedTo = bugs[i].assignedTo;
    var status = bugs[i].status;

    bugsList.innerHTML += `<div class="well">
        <h6>Bugs ID: ${id}</h6>
        <p><span class="label label-info">${status}</span></p>
        <h3>${desc}</h3>
        <p><span class="glypnicon glypnicon-time"></span>${severity}</p>
        <p><span class="glypnicon glypnicon-user"></span>${assignedTo}</p>
        <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
        <a href="#" onclick="deleteBugs(${id})" class="btn btn-danger">Delete</a>
        </div>
        `;
  }
}
