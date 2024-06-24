document.addEventListener('DOMContentLoaded', () => {
    let projects = [];

    const fetchProjects = async () => {
        try {
            const response = await fetch('../../Config/projects.txt');
            const text = await response.text();
            return text.split('\n').map(line => line.trim()).filter(line => line);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const fetchDescription = async () => {
        try {
            const response = await fetch('description.txt');
            const text = await response.text();
            const [title, description, tags] = text.split('---').map(line => line.trim());
            document.getElementById('project-title').textContent = title;
            document.title = title; // Set the document title as well
    
            const descriptionContainer = document.getElementById('project-description');
            const formattedDescription = convertUrlsToLinks(description);
    
            if (description.length > 420) {
                const shortDescription = formattedDescription.substring(0, 420);
                descriptionContainer.innerHTML = `${shortDescription}<span id="ellipsis">...</span><span id="full-description" style="display: none;">${formattedDescription.substring(420)}</span><br><span id="toggle-description">Read More</span>`;
    
                const toggleDescription = document.getElementById('toggle-description');
                const fullDescription = document.getElementById('full-description');
                const ellipsis = document.getElementById('ellipsis');
    
                toggleDescription.addEventListener('click', () => {
                    const isFullVisible = fullDescription.style.display === 'inline';
                    fullDescription.style.display = isFullVisible ? 'none' : 'inline';
                    ellipsis.style.display = isFullVisible ? 'inline' : 'none';
                    toggleDescription.textContent = isFullVisible ? 'Read More' : 'Read Less';
                });
            } else {
                descriptionContainer.innerHTML = formattedDescription;
            }
    
            renderTags(tags);
        } catch (error) {
            console.error('Error loading project description:', error);
        }
    };

    const convertUrlsToLinks = (text) => {
        const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        return text.replace(urlPattern, (url) => {
            const truncatedUrl = new URL(url).hostname;
            return `<a href="${url}" target="_blank" class="link-button">${truncatedUrl}</a>`;
        });
    };
    

    const renderTags = (tags) => {
        const tagsContainer = document.getElementById('project-tags');
        tags.split(',').map(tag => tag.trim()).forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'software-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    };

    const loadMedia = async () => {
        try {
            const response = await fetch('media.txt');
            const text = await response.text();
            const mediaContainer = document.getElementById('project-media');
            const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

            const basePath = window.location.pathname.split('/').slice(0, -1).join('/') + '/';
            const fragment = document.createDocumentFragment();

            let i = 0;
            while (i < lines.length) {
                let description = '';
                let urls = [lines[i]];

                // Check if the next line is a description
                if (i + 1 < lines.length && !lines[i + 1].match(/\.(jpeg|jpg|gif|png|mp4|webm|mview)$/) && !lines[i + 1].includes('youtube.com') && !lines[i + 1].includes('sketchfab.com') && !lines[i + 1].includes(' // ')) {
                    description = lines[i + 1];
                    i += 1;
                }

                // Check if the line contains a pair of images
                if (lines[i].includes(' // ')) {
                    urls = lines[i].split(' // ').map(url => url.trim());
                }

                // Adjust URLs for relative paths
                urls = urls.map(url => (url.startsWith('http') ? url : basePath + url));

                if (description.includes('(marmoset viewer)')) {
                    urls = [`${urls[0]}.mview`];
                }

                const mediaElement = createMediaElement(urls, description);
                if (mediaElement) fragment.appendChild(mediaElement);
                i += 1;
            }

            mediaContainer.appendChild(fragment);
        } catch (error) {
            console.error('Error loading project media:', error);
        }
    };

    const createMarmosetViewerElement = (url) => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item marmoset-item';

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.allow = 'autoplay; fullscreen';
        iframe.setAttribute('allowfullscreen', ''); // Ensure allowfullscreen is set correctly
        iframe.title = 'Marmoset Viewer';

        mediaElement.appendChild(iframe);
        return mediaElement;
    };

    const createMediaElement = (urls, description) => {
        let mediaElement;

        if (urls[0].match(/\.(jpeg|jpg|gif|png)$/) != null) {
            mediaElement = createImageElement(urls);
        } else if (urls[0].match(/\.(mp4|webm)$/) != null) {
            mediaElement = createVideoElement(urls[0]);
        } else if (urls[0].includes('youtube.com')) {
            mediaElement = createYouTubeElement(urls[0]);
        } else if (urls[0].includes('sketchfab.com')) {
            mediaElement = createSketchfabElement(urls[0]);
        } else if (urls[0].match(/\.mview$/) != null) {
            mediaElement = createMarmosetViewerElement(urls[0]);
        }

        if (mediaElement && description) {
            const descElement = document.createElement('p');
            descElement.className = 'media-description';
            descElement.textContent = description;
            mediaElement.appendChild(descElement);
        }

        return mediaElement;
    };

    const createImageElement = (urls) => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const imgElement1 = document.createElement('img');
        imgElement1.src = urls[0];
        imgElement1.className = 'image-1';
        imgElement1.alt = 'Primary image';
        imgContainer.appendChild(imgElement1);

        if (urls[1]) {
            const imgElement2 = document.createElement('img');
            imgElement2.src = urls[1];
            imgElement2.className = 'image-2';
            imgElement2.alt = 'Secondary image';
            imgContainer.appendChild(imgElement2);

            const sliderContainer = document.createElement('div');
            sliderContainer.className = 'slider-container';

            const sliderLine = document.createElement('div');
            sliderLine.className = 'slider-line';

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0';
            slider.max = '100';
            slider.value = '50';
            slider.className = 'image-slider';
            slider.setAttribute('aria-label', 'Image comparison slider');
            slider.addEventListener('input', () => {
                const value = slider.value;
                imgElement2.style.clipPath = `inset(0 0 0 ${value}%)`;
                sliderLine.style.left = `calc(${value}% - 1px)`; // Ensure the line is aligned with the thumb
            });

            sliderContainer.appendChild(sliderLine);
            sliderContainer.appendChild(slider);

            mediaElement.appendChild(imgContainer);
            mediaElement.appendChild(sliderContainer);
        } else {
            mediaElement.appendChild(imgContainer);
        }

        return mediaElement;
    };

    const createVideoElement = (url) => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item';

        const videoElement = document.createElement('video');
        videoElement.src = url;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.title = 'Video content';

        mediaElement.appendChild(videoElement);
        return mediaElement;
    };

    const createYouTubeElement = (url) => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item responsive-iframe-container';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${new URL(url).searchParams.get('v')}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.title = 'YouTube video';

        mediaElement.appendChild(iframe);
        return mediaElement;
    };

    const createSketchfabElement = (url) => {
        const mediaElement = document.createElement('div');
        mediaElement.className = 'media-item responsive-iframe-container';

        const sketchfabId = url.split('/').pop().split('-').pop();
        const iframe = document.createElement('iframe');
        iframe.src = `https://sketchfab.com/models/${sketchfabId}/embed`;
        iframe.allow = 'autoplay; fullscreen; vr';
        iframe.allowFullscreen = true;
        iframe.title = 'Sketchfab model';

        mediaElement.appendChild(iframe);
        return mediaElement;
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('stats.txt');
            const text = await response.text();
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
        } catch (error) {
            console.error('Error loading project stats:', error);
        }
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

    const navigateProjects = async (direction) => {
        const currentProject = window.location.pathname.split('/').slice(-2, -1)[0];
        const currentIndex = projects.indexOf(currentProject);

        if (currentIndex !== -1) {
            let newIndex = currentIndex + direction;
            if (newIndex < 0) newIndex = projects.length - 1;
            if (newIndex >= projects.length) newIndex = 0;

            const newProject = projects[newIndex];
            try {
                const response = await fetch(`../${newProject}/description.txt`);
                const text = await response.text();
                const htmlFileName = text.split('---')[4].trim(); // Extract the HTML filename from the description.txt
                window.location.href = `../${newProject}/${htmlFileName}`;
            } catch (error) {
                console.error('Error loading next project description:', error);
            }
        }
    };

    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('back-to-top');

    const mediaContainer = document.querySelector('.media-container');
    mediaContainer.addEventListener('scroll', () => {
        backToTopButton.style.display = mediaContainer.scrollTop > 1000 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        mediaContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            window.location.href = '../../index.html';
        } else if (event.key === 'ArrowLeft') {
            navigateProjects(-1);
        } else if (event.key === 'ArrowRight') {
            navigateProjects(1);
        } else if (event.key === 'ArrowUp') {
            mediaContainer.scrollBy({ top: -200, behavior: 'smooth' });
        } else if (event.key === 'ArrowDown') {
            mediaContainer.scrollBy({ top: 200, behavior: 'smooth' });
        }
    });

    // Initialize the app
    const init = async () => {
        projects = await fetchProjects();
        document.getElementById('prev-project').addEventListener('click', () => navigateProjects(-1));
        document.getElementById('next-project').addEventListener('click', () => navigateProjects(1));
        await fetchDescription();
        await loadMedia();
        await fetchStats(); // Fetch and display the stats
    };

    init();
});
