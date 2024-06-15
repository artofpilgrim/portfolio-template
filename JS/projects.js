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
                document.getElementById('project-description').textContent = description;
                
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
                    
                    if (i + 1 < lines.length && !lines[i + 1].match(/\.(jpeg|jpg|gif|png|mp4|webm)$/) && !lines[i + 1].includes('youtube.com') && !lines[i + 1].includes('sketchfab.com')) {
                        description = lines[i + 1];
                        i += 1;
                    }

                    let mediaElement;

                    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
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
                    'Target Engine': 'gamepad',
                    'Workflow': 'brush'
                };

                const iconClassMap = {
                    'Triangles': 'triangle-icon',
                    'Materials': 'material-icon',
                    'Texture Size': 'size-icon',
                    'Target Engine': 'engine-icon',
                    'Workflow': 'workflow-icon'
                };

                lines.forEach(line => {
                    const [key, value] = line.split(':').map(part => part.trim());
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

                        statsContainer.appendChild(statElement);
                    }
                });
            })
            .catch(error => console.error('Error loading project stats:', error));
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
