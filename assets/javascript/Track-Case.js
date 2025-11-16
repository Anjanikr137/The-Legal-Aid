
let trackBtn = document.getElementById("track-button");

trackBtn.onclick = function() {
    getCaseStatus(); 
};

async function getCaseStatus() {
    

    let input = document.getElementById("caseNumber"); 
    let resultDiv = document.getElementById("result-div");

   

    let caseId = input.value; 

    resultDiv.textContent = ""; 

    let request = new Request("json/cases.json");
    let response = await fetch(request);
    let allCases = await response.json(); 


    if (allCases[caseId]) {

        let caseInfo = allCases[caseId];


        let p_status = document.createElement("p");

        p_status.textContent = "Status: " + caseInfo.status;

        let p_lawyer = document.createElement("p");
        p_lawyer.textContent = "Assigned Lawyer: " + caseInfo.assignedLawyer;

        let p_update = document.createElement("p");
        p_update.textContent = "Last Update: " + caseInfo.lastUpdate;

        resultDiv.appendChild(p_status);
        resultDiv.appendChild(p_lawyer);
        resultDiv.appendChild(p_update);

    } else {
        let p_error = document.createElement("p");
        p_error.textContent = "Case ID '" + caseId + "' not found. Please try again.";
        resultDiv.appendChild(p_error);
    }
}

