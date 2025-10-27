// This code is based on your class notes.

// 1. Get the HTML elements where we will put the content.
// We will give these IDs in the HTML file (Step 3)
let headerTitle = document.getElementById("page-title");
let section = document.getElementById("lawyer-list-container");

// 2. This is the main async function (just like your example)
async function updateLawyerPage() {
    // Create request object (using the path from Step 1)
    let request = new Request("json/lawyers.json");

    // Fetch request for response
    let response = await fetch(request);

    // Get Json object using response
    let jsonobj = await response.json();

    // 3. Call functions to update the page
    updateHeader(jsonobj);
    updateSection(jsonobj);
}

// 4. This function updates the header (like your example)
function updateHeader(jsonobj) {
    // We use textContent (from your class notes)
    headerTitle.textContent = jsonobj["title"];
}

// 5. This function updates the section (like your example)
function updateSection(jsonobj) {
    // Get the array of lawyers from the JSON
    let lawyers = jsonobj["lawyers"];

    // 6. Loop through the array using 'for...of' (from your class notes)
    for (let lawyer of lawyers) {
        
        // 7. Create all the HTML elements for one card
        // This is just like your example's 'article', 'bname1', etc.

        // Create the main <div class="card">
        let card = document.createElement("div");
        card.className = "card"; // This applies your CSS style!

        // Create <img>
        let img = document.createElement("img");
        img.src = lawyer.img;
        card.appendChild(img); // Add img to card

        // Create <h3> (name)
        let h3 = document.createElement("h3");
        h3.textContent = lawyer.name;
        card.appendChild(h3); // Add h3 to card

        // Create <a> (specialization)
        let spec = document.createElement("a");
        spec.className = "specialization";
        spec.textContent = lawyer.specialization;
        spec.href = "#"; // Set a placeholder link
        card.appendChild(spec); // Add <a> to card

        // Create <p> (description)
        let desc = document.createElement("p");
        desc.textContent = lawyer.description;
        card.appendChild(desc); // Add <p> to card

        // Create <p> (location)
        // We use the same pattern as your class: "Eligibility:" + branch.elig
        let loc = document.createElement("p");
        loc.textContent = "Location: " + lawyer.location;
        card.appendChild(loc);

        // Create <p> (rating)
        let rating = document.createElement("p");
        rating.textContent = "Rating: " + lawyer.rating;
        card.appendChild(rating);

        // Create <p> (experience)
        let exp = document.createElement("p");
        exp.textContent = "Experience: " + lawyer.experience;
        card.appendChild(exp);

        // Create <button>
        let btn = document.createElement("button");
        btn.className = "hire-btn";
        btn.textContent = "Hire Now";
        card.appendChild(btn);

        // 8. Add the finished card to the main section
        section.appendChild(card);
    }
}

// 9. Call the main function to start everything
updateLawyerPage();
