document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display project description, title, and tags
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

    // Function to load media files from media.txt
    const loadMedia = () => {
        fetch('media.txt')
            .then(response => response.text())
            .then(text => {
                const mediaContainer = document.getElementById('project-media');
                const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));

                let i = 0;
                while (i < lines.length) {
                    const url = lines[i];
                    let description = '';
                    
                    // Check if the next line is a description
                    if (i + 1 < lines.length && !lines[i + 1].match(/\.(jpeg|jpg|gif|png|mp4|webm)$/) && !lines[i + 1].includes('youtube.com')) {
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

    // Initialize the functions
    fetchDescription();
    loadMedia();
});
