document.addEventListener("DOMContentLoaded", async () => {
    const recommendationContent = document.querySelector('.recommendation-content');
    const dotsContainer = document.getElementById('recommendation-dots');

    if (!recommendationContent || !dotsContainer) {
        console.error('Recommendation content or dots container not found');
        return;
    }

    try {
        const response = await fetch('../Config/recommendations.txt');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const text = await response.text();
        const recommendations = text.split('---').map(rec => rec.trim()).filter(rec => rec);

        const recommendationFragment = document.createDocumentFragment();
        const dotsFragment = document.createDocumentFragment();

        recommendations.forEach((rec, index) => {
            const lines = rec.split('\n').map(line => line.trim()).filter(line => line);
            const hasAvatar = lines[1].startsWith('http');
            const name = lines[0];
            const avatar = hasAvatar ? lines[1] : '';
            const position = hasAvatar ? lines[2] : lines[1];
            const date = hasAvatar ? lines[3] : lines[2];
            const quote = hasAvatar ? lines[4] : lines[3];

            const recommendation = document.createElement("div");
            recommendation.className = "recommendation";
            if (index === 0) recommendation.classList.add("active");

            recommendation.innerHTML = `
                <div class="recommendation-header">
                    ${avatar ? `<img src="${avatar}" alt="${name}" class="recommendation-avatar">` : ''}
                    <div class="recommendation-details">
                        <h2>${name}</h2>
                        <h3>${position}</h3>
                        <p class="recommendation-date">${date}</p>
                    </div>
                </div>
                <p class="recommendation-quote">"${quote}"</p>
            `;

            recommendationFragment.appendChild(recommendation);

            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.dataset.index = index;
            dotsFragment.appendChild(dot);
        });

        recommendationContent.appendChild(recommendationFragment);
        dotsContainer.appendChild(dotsFragment);

        const recommendationsElements = document.querySelectorAll(".recommendation");
        const dots = document.querySelectorAll(".dot");
        let currentIndex = 0;
        let isTransitioning = false;

        function showRecommendation(index, direction) {
            if (isTransitioning) return;
            isTransitioning = true;

            const current = recommendationsElements[currentIndex];
            const next = recommendationsElements[index];

            if (direction === 'left') {
                current.classList.add('recommendation-exit-left');
                next.classList.add('recommendation-enter-right');
            } else if (direction === 'right') {
                current.classList.add('recommendation-exit-right');
                next.classList.add('recommendation-enter-left');
            }

            setTimeout(() => {
                current.classList.remove('active', 'recommendation-exit-left', 'recommendation-exit-right');
                next.classList.add('active');
                next.classList.remove('recommendation-enter-left', 'recommendation-enter-right');
                currentIndex = index;
                isTransitioning = false;
            }, 500); // Match the CSS transition duration

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        }

        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        const debouncedShowRecommendation = debounce((index, direction) => showRecommendation(index, direction), 500);

        dotsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains('dot')) {
                const index = parseInt(event.target.dataset.index, 10);
                if (index > currentIndex) {
                    debouncedShowRecommendation(index, 'left');
                } else if (index < currentIndex) {
                    debouncedShowRecommendation(index, 'right');
                }
            }
        });

        // Swipe detection
        let startX;
        let isSwiping = false;

        recommendationContent.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            isSwiping = true;
        });

        recommendationContent.addEventListener('touchmove', (event) => {
            if (!isSwiping) return;
            const moveX = event.touches[0].clientX;
            const diffX = startX - moveX;

            if (Math.abs(diffX) > 50) {
                let newIndex;
                if (diffX > 0) {
                    // Swiped left
                    newIndex = (currentIndex + 1) % recommendations.length;
                } else {
                    // Swiped right
                    newIndex = (currentIndex - 1 + recommendations.length) % recommendations.length;
                }
                showRecommendation(newIndex);
                isSwiping = false;
            }
        });

        recommendationContent.addEventListener('touchend', () => {
            isSwiping = false;
        });

        // Adjust height to ensure dots are always visible
        function adjustHeight() {
            const activeRecommendation = document.querySelector('.recommendation.active');
            if (activeRecommendation) {
                const activeHeight = activeRecommendation.getBoundingClientRect().height;
                recommendationContent.style.minHeight = `${activeHeight + 60}px`; // Add space for dots
            }
        }

        window.addEventListener('resize', adjustHeight);
        adjustHeight(); // Initial call to set height

    } catch (error) {
        console.error('Failed to load recommendations:', error);
    }
});
