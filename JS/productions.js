// Array of production data
const productionData = [
  {
    title: "Name of Production or Title", // The title you held
    company: "Company Name", // the company you work(ed) for
    time: "Time Spent or Current Position", // time you spent there or are still present
    thumbnail: "https://files.facepunch.com/tom/1b/thumb3.jpg", // Replace with actual URL for production thumbnail
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. I bet you haven't read this. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. But if you did then you're weird, who does that? Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
  },
  {
    title: "Name of Production or Title", // The title you held
    company: "Company Name", // the company you work(ed) for
    time: "Time Spent or Current Position", // time you spent there or are still present
    thumbnail: "https://files.facepunch.com/tom/1b/thumb3.jpg", // Replace with actual URL for production thumbnail
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. I bet you haven't read this. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. But if you did then you're weird, who does that? Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
  },
  {
    title: "Name of Production or Title", // The title you held
    company: "Company Name", // the company you work(ed) for
    time: "Time Spent or Current Position", // time you spent there or are still present
    thumbnail: "https://files.facepunch.com/tom/1b/thumb3.jpg", // Replace with actual URL for production thumbnail
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. I bet you haven't read this. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. But if you did then you're weird, who does that? Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
  },
  {
    title: "Name of Production or Title", // The title you held
    company: "Company Name", // the company you work(ed) for
    time: "Time Spent or Current Position", // time you spent there or are still present
    thumbnail: "https://files.facepunch.com/tom/1b/thumb3.jpg", // Replace with actual URL for production thumbnail
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. I bet you haven't read this. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. But if you did then you're weird, who does that? Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.",
  },
  // Add more productions as needed
];

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



// Append cards to the productions panel on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    const productionsContainer = document.querySelector(".productions-subpanels");
    productionData.forEach(production => {
        const card = createProductionCard(production.title, production.company, production.time, production.thumbnail, production.description);
        productionsContainer.appendChild(card);
    });
});

