document.addEventListener('DOMContentLoaded', async () => {
    const summaryElement = document.querySelector('.summary-panel p');
    
    if (!summaryElement) {
        console.error('Summary element not found');
        return;
    }

    try {
        const response = await fetch('../Config/summary.txt');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const text = await response.text();
        summaryElement.textContent = text;
    } catch (error) {
        console.error('Failed to load summary:', error);
    }
});
