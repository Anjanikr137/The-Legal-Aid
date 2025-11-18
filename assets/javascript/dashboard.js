// --- assets/javascript/dashboard.js ---

class LegalCase {
    constructor(title, progress, avatarUrl) {
        this.title = title;
        this.progress = progress;
        this.avatarUrl = avatarUrl;
    }
}

let case1 = new LegalCase("Johnson v. Acme Corp.", 60, "https://i.pravatar.cc/30?u=lawyer1");
let case2 = new LegalCase("Smith v. DataCo", 30, "https://i.pravatar.cc/30?u=lawyer2");
let case3 = new LegalCase("Rodriguez v. Hooli", 90, "https://i.pravatar.cc/30?u=lawyer3");

let case_array = [case1, case2, case3];

let container = document.getElementById("cases-grid-container");

// Check if container exists before trying to add to it
if (container) {
    for (let legalCase of case_array) {
        let card = document.createElement("div");
        card.className = "case-card";

        let p = document.createElement("p");
        p.textContent = legalCase.title;

        let progressBar = document.createElement("div");
        progressBar.className = "progress-bar";

        let progress = document.createElement("div");
        progress.className = "progress";
        progress.style.width = legalCase.progress + "%";

        let span = document.createElement("span");
        span.textContent = legalCase.progress + "%";

        let img = document.createElement("img");
        img.src = legalCase.avatarUrl;
        img.alt = "Lawyer Avatar";

        progressBar.appendChild(progress);

        card.appendChild(p);
        card.appendChild(progressBar);
        card.appendChild(span);
        card.appendChild(img);

        container.appendChild(card);
    }
}