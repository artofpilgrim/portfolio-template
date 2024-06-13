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

                lines.forEach(line => {
                    if (line.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                        const imgElement = document.createElement('img');
                        imgElement.src = line;
                        mediaContainer.appendChild(imgElement);
                    } else if (line.match(/\.(mp4|webm)$/) != null) {
                        const videoElement = document.createElement('video');
                        videoElement.src = line;
                        videoElement.controls = true;
                        mediaContainer.appendChild(videoElement);
                    } else if (line.includes('youtube.com')) {
                        const iframeContainer = document.createElement('div');
                        iframeContainer.className = 'responsive-iframe-container';

                        const iframe = document.createElement('iframe');
                        iframe.src = `https://www.youtube.com/embed/${new URL(line).searchParams.get('v')}`;
                        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                        iframe.allowFullscreen = true;

                        iframeContainer.appendChild(iframe);
                        mediaContainer.appendChild(iframeContainer);
                    }
                });
            })
            .catch(error => console.error('Error loading project media:', error));
    };

    // Initialize the functions
    fetchDescription();
    loadMedia();
});
