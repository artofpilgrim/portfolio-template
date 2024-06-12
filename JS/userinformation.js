function addUserInformation() {
    // Get the container where the user info should be added
    const container = document.querySelector('.top-container'); // Select the specific container

    // Create the user info panel
    const userInfoPanel = document.createElement("div");
    userInfoPanel.className = "user-info-panel";

    // Create and append the image
    const img = document.createElement("img");
    img.src = "https://i.imgur.com/JvDhawP.png"; // Your Profile Pic URL
    img.alt = "Profile Picture";
    img.className = "profile-pic";
    userInfoPanel.appendChild(img);

    // Create and append the user name
    const userName = document.createElement("h1");
    userName.className = "user-name";
    userName.textContent = "John Doe"; // Your Profile Name
    userInfoPanel.appendChild(userName);

    // Create and append the user role
    const userRole = document.createElement("h2");
    userRole.textContent = "Lead Duder @ Dude Studios"; // Your Current Title & Studio
    userInfoPanel.appendChild(userRole);

    // Create and append the social icons
    const socialIcons = document.createElement("div");
    socialIcons.className = "social-icons";
    userInfoPanel.appendChild(socialIcons);

    // Adding individual social links
    const socialLinks = [
        { class: "fab fa-twitter", url: "https://twitter.com/yourprofile" }, // Your Twitter Profile URL
        { class: "fas fa-envelope", url: "mailto:your.email@example.com" }, // Your Email Address
        { class: "fab fa-linkedin", url: "https://linkedin.com/in/yourprofile" } // Your LinkedIn Profile URL
        
    ];
    socialLinks.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        const icon = document.createElement("i");
        icon.className = link.class;
        a.appendChild(icon);
        socialIcons.appendChild(a);
    });

    // Append the user info panel to the top-container element
    container.appendChild(userInfoPanel);
}

// Call the function when the document is fully loaded
document.addEventListener("DOMContentLoaded", addUserInformation);
