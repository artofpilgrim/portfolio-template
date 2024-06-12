function addSkillsAndSoftware() {
    const softwareContainer = document.querySelector('.skills-panel .software-tag-container:first-of-type');
    const skillsContainer = document.querySelector('.skills-panel .software-tag-container:last-of-type');

    // Fetch software data
    fetch('../Config/software.txt')
        .then(response => response.text())
        .then(text => {
            const softwareArray = text.split('\n').map(item => item.trim()).filter(item => item);
            // Populate the software tags
            softwareArray.forEach(software => {
                const span = document.createElement("span");
                span.className = "software-tag";
                span.textContent = software;
                softwareContainer.appendChild(span);
            });
        })
        .catch(error => console.error('Failed to load software:', error));

    // Fetch skills data
    fetch('../Config/skills.txt')
        .then(response => response.text())
        .then(text => {
            const skillsArray = text.split('\n').map(item => item.trim()).filter(item => item);
            // Populate the skills tags
            skillsArray.forEach(skill => {
                const span = document.createElement("span");
                span.className = "software-tag";
                span.textContent = skill;
                skillsContainer.appendChild(span);
            });
        })
        .catch(error => console.error('Failed to load skills:', error));
}

document.addEventListener("DOMContentLoaded", addSkillsAndSoftware);
