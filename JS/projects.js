document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display project description
    const fetchDescription = () => {
        fetch('description.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);
                document.getElementById('project-description').textContent = lines.join(' ');
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

    // Function to set the project title based on the folder name or HTML file name
    const setProjectTitle = () => {
        const pathArray = window.location.pathname.split('/');
        const folderName = pathArray[pathArray.length - 2];
        const htmlFileName = pathArray[pathArray.length - 1].split('.')[0];
        const projectTitle = folderName || htmlFileName;
        document.getElementById('project-title').textContent = projectTitle.replace(/-/g, ' ');
        document.title = projectTitle.replace(/-/g, ' '); // Set the document title as well
    };

    // Initialize the functions
    setProjectTitle();
    fetchDescription();
    loadMedia();
});
