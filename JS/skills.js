// Add new software and skills separated by commas except last one in chain

const softwareString = "Blender, 3ds Max, Unity, Zbrush, Adobe Photoshop, Topogun, Substance 3d Painter, Marvelous Designer, Maya, Marmoset Toolbag";
const skillsString = "3D Modelling, Sculpting, Texturing, High Poly Modelling, UV-Unwrapping, Retopology, hand-painted texturing, weapon modelling, Environment Art, Tileable Materials";

// ignore everything below

function addSkillsAndSoftware() {
    const softwareContainer = document.querySelector('.skills-panel .software-tag-container:first-of-type');
    const skillsContainer = document.querySelector('.skills-panel .software-tag-container:last-of-type');

    // Split and trim the string data into arrays
    const softwareArray = softwareString.split(',').map(item => item.trim());
    const skillsArray = skillsString.split(',').map(item => item.trim());

    // Populate the software tags
    softwareArray.forEach(software => {
        const span = document.createElement("span");
        span.className = "software-tag";
        span.textContent = software;
        softwareContainer.appendChild(span);
    });

    // Populate the skills tags
    skillsArray.forEach(skill => {
        const span = document.createElement("span");
        span.className = "software-tag";
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });
}

document.addEventListener("DOMContentLoaded", addSkillsAndSoftware);
