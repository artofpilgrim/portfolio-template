document.addEventListener('DOMContentLoaded', () => {
    let projects = [];

    const fetchProjects = () => {
        return fetch('../../Config/projects.txt')
            .then(response => response.text())
            .then(text => text.split('\n').map(line => line.trim()).filter(line => line))
            .catch(error => console.error('Error loading projects:', error));
    };

    const fetchDescription = () => {
        fetch('description.txt')
            .then(response => response.text())
            .then(text => {
                const [title, description, tags] = text.split('---').map(line => line.trim());
                document.getElementById('project-title').textContent = title;
                document.title = title; // Set the document title as well

                const descriptionContainer = document.getElementById('project-description');
                if (description.length > 420) {
                    const shortDescription = description.substring(0, 420);
                    descriptionContainer.innerHTML = `${shortDescription}<span id="ellipsis">...</span><span id="full-description" style="display: none;">${description.substring(420)}</span><br><span id="toggle-description">Read More</span>`;
                    
                    const toggleDescription = document.getElementById('toggle-description');
                    const fullDescription = document.getElementById('full-description');
                    const ellipsis = document.getElementById('ellipsis');
                    
                    toggleDescription.addEventListener('click', () => {
                        if (fullDescription.style.display === 'none') {
                            fullDescription.style.display = 'inline';
                            ellipsis.style.display = 'none';
                            toggleDescription.textContent = 'Read Less';
                        } else {
                            fullDescription.style.display = 'none';
                            ellipsis.style.display = 'inline';
                            toggleDescription.textContent = 'Read More';
                        }
                    });
                } else {
                    descriptionContainer.textContent = description;
                }
                
                const tagsContainer = document.getElementById('project-tags');
                const tagsArray = tags.split(',').map(tag => tag.trim());
                tagsArray.forEach(tag => {
                    const tagElement = document.createElement('div');
                    tagElement.className = 'software-tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
            })
            .catch(error => console.error('Error loading project description:', error));
    };

    const loadMedia = () => {
        fetch('media.txt')
            .then(response => response.text())
            .then(text => {
                const mediaContainer = document.getElementById('project-media');
                const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

                let i = 0;
                while (i < lines.length) {
                    const url = lines[i].replace('*', '').trim();  // Remove asterisk if present
                    let description = '';
                    
                    if (i + 1 < lines.length && !lines[i + 1].match(/\.(jpeg|jpg|gif|png|mp4|webm)$/) && !lines[i + 1].includes('youtube.com') && !lines[i + 1].includes('sketchfab.com') && !lines[i + 1].includes('(')) {
                        description = lines[i + 1];
                        i += 1;
                    }

                    let mediaElement;

                    if (url.includes('(') && url.includes(')')) {
                        const images = url.slice(1, -1).split(' / ');
                        if (images.length === 2) {
                            mediaElement = document.createElement('div');
                            mediaElement.className = 'twentytwenty-container';
                            mediaElement.innerHTML = `
                                <img src="${images[0]}" alt="Before">
                                <img src="${images[1]}" alt="After">
                            `;
                        }
                    } else if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                        mediaElement = document.createElement('div');
                        const imgElement = document.createElement('img');
                        imgElement.src = url;
                        mediaElement.appendChild(imgElement);
                    } else if (url.match(/\.(mp4|webm)$/) != null) {
                        mediaElement = document.createElement('div');
                        const videoElement = document.createElement('video');
                        videoElement.src = url;
                        videoElement.controls = true;
                        mediaElement.appendChild(videoElement);
                    } else if (url.includes('youtube.com')) {
                        mediaElement = document.createElement('div');
                        mediaElement.className = 'responsive-iframe-container';
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.youtube.com/embed/${new URL(url).searchParams.get('v')}`;
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;
                        mediaElement.appendChild(iframe);
                    } else if (url.includes('sketchfab.com')) {
                        const sketchfabId = url.split('/').pop().split('-').pop();
                        mediaElement = document.createElement('div');
                        mediaElement.className = 'responsive-iframe-container';
                        const iframe = document.createElement('iframe');
                        iframe.src = `https://sketchfab.com/models/${sketchfabId}/embed`;
                        iframe.allow = 'autoplay; fullscreen; vr';
                        iframe.allowFullscreen = true;
                        mediaElement.appendChild(iframe);
                    }

                    if (description) {
                        const descElement = document.createElement('p');
                        descElement.className = 'media-description';
                        descElement.textContent = description;
                        mediaElement.appendChild(descElement);
                    }

                    mediaContainer.appendChild(mediaElement);
                    i += 1;
                }

                // Initialize all twentytwenty containers
                $('.twentytwenty-container').twentytwenty();
            })
            .catch(error => console.error('Error loading project media:', error));
    };

    const fetchStats = () => {
        fetch('stats.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);
                const statsContainer = document.getElementById('project-stats');
                const iconMap = {
                    'Triangles': 'change_history',
                    'Materials': 'texture',
                    'Texture Size': 'straighten',
                    'Texel Density': 'square_foot',
                    'Target Engine': 'gamepad',
                    'Workflow': 'brush',
                    'Collaborators': 'groups'
                };

                const iconClassMap = {
                    'Triangles': 'triangle-icon',
                    'Materials': 'material-icon',
                    'Texture Size': 'size-icon',
                    'Texel Density': 'td-icon',
                    'Target Engine': 'engine-icon',
                    'Workflow': 'workflow-icon',
                    'Collaborators': 'collab-icon'
                };

                lines.forEach(line => {
                    let [key, value] = line.split(':').map(part => part.trim());
                    let info = '';

                    if (value.includes('(') && value.includes(')')) {
                        info = value.substring(value.indexOf('(') + 1, value.indexOf(')'));
                        value = value.substring(0, value.indexOf('(')).trim();
                    }

                    if (value) {
                        const statElement = document.createElement('div');
                        statElement.className = 'stat';
                        
                        const icon = iconMap[key];
                        const iconClass = iconClassMap[key];
                        if (icon) {
                            const iconElement = document.createElement('span');
                            iconElement.className = `material-icons stat-icon ${iconClass}`;
                            iconElement.textContent = icon;
                            statElement.appendChild(iconElement);
                        }

                        const textElement = document.createElement('span');
                        textElement.innerHTML = `<strong>${key}:</strong> ${value}`;
                        statElement.appendChild(textElement);

                        if (info) {
                            const infoIcon = document.createElement('i');
                            infoIcon.className = 'fa-solid fa-circle-info stat-info-icon';
                            infoIcon.removeAttribute('title');  // Remove the title attribute to avoid default tooltip

                            const tooltip = document.createElement('div');
                            tooltip.className = 'tooltip';
                            tooltip.textContent = info;

                            statElement.appendChild(infoIcon);
                            statElement.appendChild(tooltip);

                            infoIcon.addEventListener('mouseover', (event) => {
                                tooltip.style.display = 'block';
                                positionTooltip(event, tooltip);
                            });

                            infoIcon.addEventListener('mousemove', (event) => {
                                positionTooltip(event, tooltip);
                            });

                            infoIcon.addEventListener('mouseout', () => {
                                tooltip.style.display = 'none';
                            });
                        }

                        statsContainer.appendChild(statElement);
                    }
                });
            })
            .catch(error => console.error('Error loading project stats:', error));
    };

    const positionTooltip = (event, tooltip) => {
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = event.clientY - tooltipRect.height - 10;
        let left = event.clientX;

        if (top < 0) {
            top = event.clientY + 10;
        }

        if (left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    };

    const navigateProjects = (direction) => {
        const currentProject = window.location.pathname.split('/').slice(-2, -1)[0];
        const currentIndex = projects.indexOf(currentProject);

        if (currentIndex !== -1) {
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = projects.length - 1;
            if (newIndex >= projects.length) newIndex = 0;

            const newProject = projects[newIndex];
            fetch(`../${newProject}/description.txt`)
                .then(response => response.text())
                .then(text => {
                    const htmlFileName = text.split('---')[4].trim(); // Extract the HTML filename from the description.txt
                    window.location.href = `../${newProject}/${htmlFileName}`;
                })
                .catch(error => console.error('Error loading next project description:', error));
        }
    };

    fetchProjects().then(projectList => {
        projects = projectList;

        document.getElementById('prev-project').addEventListener('click', () => navigateProjects(-1));
        document.getElementById('next-project').addEventListener('click', () => navigateProjects(1));

        fetchDescription();
        loadMedia();
        fetchStats(); // Fetch and display the stats
    });
});
