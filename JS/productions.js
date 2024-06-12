// Function to create a production card
function createProductionCard(title, company, time, thumbnail, description) {
    const card = document.createElement("div");
    card.classList.add("production-subpanel");

    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt = title;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("production-details");

    const titleElem = document.createElement("h2");
    titleElem.textContent = title;

    const companyElem = document.createElement("p");
    companyElem.textContent = company;
    companyElem.style.fontWeight = "bold";

    const timeElem = document.createElement("p");
    timeElem.textContent = time;
    timeElem.style.fontStyle = "italic";

    const descElem = document.createElement("p");
    descElem.textContent = description;

    // Append text elements to the detailsDiv
    detailsDiv.appendChild(titleElem);
    detailsDiv.appendChild(companyElem);
    detailsDiv.appendChild(timeElem);

    // Create a container for the details and description
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("production-content");
    contentContainer.appendChild(detailsDiv);
    contentContainer.appendChild(descElem);

    // Append img and contentContainer to the main card
    card.appendChild(img);
    card.appendChild(contentContainer);

    return card;
}

// Fetch and append production cards on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    fetch('../Config/productions.txt')
        .then(response => response.text())
        .then(text => {
            const productions = text.split('---').map(prod => prod.trim()).filter(prod => prod);
            const productionsContainer = document.querySelector(".productions-subpanels");

            console.log("Processing productions...");

            productions.forEach((prod, index) => {
                const lines = prod.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
                console.log(`Production ${index}:`, lines); // Debugging log
                if (lines.length === 5) {
                    const card = createProductionCard(lines[0], lines[1], lines[2], lines[3], lines[4]);
                    productionsContainer.appendChild(card);
                } else {
                    console.error('Invalid production data format:', lines);
                }
            });
        })
        .catch(error => console.error('Failed to load productions:', error));
});
