// This code is based 100% on your class notes.

// 1. Get the button using its ID (from Week 1 notes)
// We will give the button this ID in the HTML file (Step 3)
let trackBtn = document.getElementById("track-button");

// 2. Assign a function to the 'click event' (from Week 1 notes)
trackBtn.onclick = function() {
    // This calls our async function
    getCaseStatus(); 
};

// 3. This async function fetches and displays the data (from Week 4 notes)
async function getCaseStatus() {
    // Get the input field and result div by their IDs
    // Your HTML already has id="caseNumber"
    let input = document.getElementById("caseNumber"); 
    let resultDiv = document.getElementById("result-div");

    // Get the value from the input box (e.g., "CASE123")
    // We use .value to get the text the user typed
    let caseId = input.value; 

    // Clear old results (using textContent, from Week 3 notes)
    resultDiv.textContent = ""; 

    // 4. Fetch the JSON file (from Week 4 notes)
    // The json/cases.json file is in the 'json' folder
    let request = new Request("json/cases.json");
    let response = await fetch(request);
    let allCases = await response.json(); // This is our big object of all cases

    // 5. Check if the caseId exists in the JSON object (Conditional Statement)
    if (allCases[caseId]) {
        // The key exists! Get the info.
        let caseInfo = allCases[caseId];

        // 6. Create elements to show the info (from Week 3 notes)
        let p_status = document.createElement("p");
        // We use textContent to set the text
        p_status.textContent = "Status: " + caseInfo.status;

        let p_lawyer = document.createElement("p");
        p_lawyer.textContent = "Assigned Lawyer: " + caseInfo.assignedLawyer;

        let p_update = document.createElement("p");
        p_update.textContent = "Last Update: " + caseInfo.lastUpdate;

        // Append them to the result div (from Week 3 notes)
        resultDiv.appendChild(p_status);
        resultDiv.appendChild(p_lawyer);
        resultDiv.appendChild(p_update);

    } else {
        // The key does not exist. Show an error.
        let p_error = document.createElement("p");
        p_error.textContent = "Case ID '" + caseId + "' not found. Please try again.";
        resultDiv.appendChild(p_error);
    }
}

