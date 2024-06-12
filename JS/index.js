// Array of artwork data
// Replace the URL, alt text, and galleryPageUrl with your own images, descriptions, and links
const artworkData = [
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 1", galleryPageUrl: "./gallery/test1.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 2", galleryPageUrl: "./gallery/test2.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 3", galleryPageUrl: "./gallery/test3.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 4", galleryPageUrl: "./gallery/test4.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 5", galleryPageUrl: "./gallery/test5.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 6", galleryPageUrl: "./gallery/test6.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 7", galleryPageUrl: "./gallery/test7.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 8", galleryPageUrl: "./gallery/test8.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 9", galleryPageUrl: "./gallery/test9.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 10", galleryPageUrl: "./gallery/test10.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 11", galleryPageUrl: "./gallery/test11.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 12", galleryPageUrl: "./gallery/test12.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 13", galleryPageUrl: "./gallery/test13.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 14", galleryPageUrl: "./gallery/test14.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 15", galleryPageUrl: "./gallery/test15.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 16", galleryPageUrl: "./gallery/test16.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 17", galleryPageUrl: "./gallery/test17.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 18", galleryPageUrl: "./gallery/test18.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 19", galleryPageUrl: "./gallery/test19.html" },
    { src: "https://files.facepunch.com/tom/1b/testthumb2.jpg", alt: "Test 20", galleryPageUrl: "./gallery/test20.html" },
];

// Function to create a thumbnail
// This function creates a thumbnail div, img element, and a title div for each artwork, and wraps it in a link
function createThumbnail(src, alt, galleryPageUrl) {
    // Create an anchor element for the link
    const thumbnailLink = document.createElement("a");
    thumbnailLink.href = galleryPageUrl;

    // Create a new thumbnail container div
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");

    // Create an img element for the artwork
    const thumbnailImg = document.createElement("img");
    thumbnailImg.src = src;
    thumbnailImg.alt = alt;

    // Create a div for the title
    const thumbnailTitle = document.createElement("div");
    thumbnailTitle.classList.add("thumbnail-title");
    thumbnailTitle.innerText = alt;

    // Append the img element and the title div to the thumbnail container div
    thumbnailDiv.appendChild(thumbnailImg);
    thumbnailDiv.appendChild(thumbnailTitle);

    // Append the thumbnail div to the anchor element
    thumbnailLink.appendChild(thumbnailDiv);

    return thumbnailLink;
}

// Get the thumbnail container element
const thumbnailContainer = document.getElementById("thumbnail-container");

// Iterate through the artwork data and create the thumbnails
// For each item in the artworkData array, call createThumbnail and append the result to the thumbnail container
artworkData.forEach((artwork) => {
    const thumbnail = createThumbnail(artwork.src, artwork.alt, artwork.galleryPageUrl);
    thumbnailContainer.appendChild(thumbnail);
});
