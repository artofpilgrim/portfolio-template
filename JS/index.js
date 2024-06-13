// Array of paths to description.txt files
const projectPaths = [
    "../Projects/NorincoSKS/description.txt",
    "../Projects/PipeWrench/description.txt",
    "../Projects/M24Grenade/description.txt",
];

// Function to create a thumbnail
function createThumbnail(src, alt, galleryPageUrl) {
    const thumbnailLink = document.createElement("a");
    thumbnailLink.href = galleryPageUrl;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");

    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = src;
    thumbnailImg.alt = alt;

    const thumbnailTitle = document.createElement("div");
    thumbnailTitle.classList.add("thumbnail-title");
    thumbnailTitle.innerText = alt;

    thumbnailDiv.appendChild(thumbnailImg);
    thumbnailDiv.appendChild(thumbnailTitle);
    thumbnailLink.appendChild(thumbnailDiv);

    return thumbnailLink;
}

// Get the thumbnail container element
const thumbnailContainer = document.getElementById("thumbnail-container");

// Function to fetch and parse the description.txt file
function fetchProjectData(path) {
    return fetch(path)
        .then(response => response.text())
        .then(text => {
            const [title, description, tags, thumbnailUrl, htmlFileName] = text.split('---').map(line => line.trim());
            const galleryPageUrl = path.replace('description.txt', htmlFileName);
            return { src: thumbnailUrl, alt: title, galleryPageUrl };
        })
        .catch(error => console.error('Error loading project description:', error));
}

// Iterate through the project paths and create the thumbnails
projectPaths.forEach((path) => {
    fetchProjectData(path).then((artwork) => {
        const thumbnail = createThumbnail(artwork.src, artwork.alt, artwork.galleryPageUrl);
        thumbnailContainer.appendChild(thumbnail);
    });
});
