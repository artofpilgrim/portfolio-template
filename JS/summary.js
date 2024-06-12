document.addEventListener('DOMContentLoaded', () => {
    fetch('../Config/summary.txt')
        .then(response => response.text())
        .then(text => {
            const summaryElement = document.querySelector('.summary-panel p');
            if (summaryElement) {
                summaryElement.textContent = text;
            } else {
                console.error('Summary element not found');
            }
        })
        .catch(error => console.error('Failed to load summary:', error));
});
