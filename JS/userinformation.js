function addUserInformation() {
    // Determine the base path dynamically
    let basePath = '';
    if (window.location.pathname.includes('/Projects/')) {
        basePath = '../../Config/userinformation.txt';
    } else if (window.location.pathname.includes('/HTML/')) {
        basePath = '../Config/userinformation.txt';
    } else {
        basePath = 'Config/userinformation.txt'; // Default case if in root or unexpected location
    }

    fetch(basePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').map(line => line.trim());
            const [profilePicUrl, profileName, profileRole, location, ...socials] = lines;

            // Get the container where the user info should be added
            const container = document.querySelector('.top-container'); // Select the specific container

            // Create a document fragment for better performance
            const fragment = document.createDocumentFragment();

            // Create the user info panel
            const userInfoPanel = document.createElement("div");
            userInfoPanel.className = "user-info-panel";

            // Create and append the image
            const img = document.createElement("img");
            img.src = profilePicUrl; // Your Profile Pic URL from txt
            img.alt = "Profile Picture";
            img.className = "profile-pic";
            userInfoPanel.appendChild(img);

            // Create and append the user name as a link
            const userNameLink = document.createElement("a");
            userNameLink.href = "../../index.html";
            userNameLink.className = "user-name-link";

            const userName = document.createElement("h1");
            userName.className = "user-name";
            userName.textContent = profileName; // Your Profile Name from txt
            userNameLink.appendChild(userName);
            userInfoPanel.appendChild(userNameLink);

            // Create and append the user role
            const userRole = document.createElement("h2");
            userRole.textContent = profileRole; // Your Current Title & Studio from txt
            userInfoPanel.appendChild(userRole);

            // Create and append the location
            const userLocationContainer = document.createElement("div");
            userLocationContainer.className = "user-location-container";

            const locationIcon = document.createElement("span");
            locationIcon.className = "material-symbols-outlined";
            locationIcon.textContent = "near_me";
            userLocationContainer.appendChild(locationIcon);

            const userLocation = document.createElement("h2");
            userLocation.textContent = location; // Your Location from txt
            userLocationContainer.appendChild(userLocation);

            userInfoPanel.appendChild(userLocationContainer);

            // Create and append the social icons
            const socialIcons = document.createElement("div");
            socialIcons.className = "social-icons";
            userInfoPanel.appendChild(socialIcons);

            // Define the mapping of keywords to icon classes
            const socialIconMap = {
                'x.com': "fa-brands fa-x-twitter",
                'facebook.com': "fa-brands fa-square-facebook",
                'discord.com': "fa-brands fa-discord",
                'discord.gg': "fa-brands fa-discord",
                'dsc.gg': "fa-brands fa-discord",
                'instagram.com': "fa-brands fa-instagram",
                'youtube.com': "fa-brands fa-youtube",
                'linkedin.com': "fab fa-linkedin",
                'artstation.com': "fa-brands fa-artstation",
                'github.com': "fab fa-github",
                'wordpress.com': "fab fa-wordpress",
                'vimeo.com': "fab fa-vimeo",
                'behance.net': "fab fa-behance",
                'playstation.com': "fab fa-playstation",
                'xbox.com': "fab fa-xbox",
                'vk.com': "fab fa-vk",
                'steamcommunity.com': "fab fa-steam",
                'tumblr.com': "fab fa-tumblr",
                'threads.net': "fab fa-threads",
                'patreon.com': "fab fa-patreon",
                'twitch.tv': "fab fa-twitch",
                'mixer.com': "fab fa-mixer",
                'mastodon.social': "fab fa-mastodon",
                'mailchimp.com': "fab fa-mailchimp",
                'email': "fas fa-envelope"
            };

            // Adding social links based on the detected type
            socials.forEach(social => {
                let iconClass;
                let url = social;

                // Detect the type of social link
                const socialType = Object.keys(socialIconMap).find(key => social.includes(key)) || 'email';
                iconClass = socialIconMap[socialType];
                if (socialType === 'email') {
                    url = `mailto:${social}`;
                }

                if (iconClass) {
                    const a = document.createElement("a");
                    a.href = url;
                    a.target = "_blank";
                    const icon = document.createElement("i");
                    icon.className = iconClass;
                    a.appendChild(icon);
                    socialIcons.appendChild(a);
                }
            });

            // Append the user info panel to the fragment
            fragment.appendChild(userInfoPanel);

            // Append the fragment to the container
            container.appendChild(fragment);
        })
        .catch(error => console.error('Error loading user information:', error));
}

// Call the function when the document is fully loaded
document.addEventListener("DOMContentLoaded", addUserInformation);
