document.addEventListener("DOMContentLoaded", () => {
  fetch('../Config/recommendations.txt')
      .then(response => response.text())
      .then(text => {
          const recommendations = text.split('---').map(rec => rec.trim()).filter(rec => rec);
          const recommendationContent = document.querySelector('.recommendation-content');
          const dotsContainer = document.getElementById('recommendation-dots');

          console.log("Adding recommendations and dots...");

          recommendations.forEach((rec, index) => {
              const lines = rec.split('\n').map(line => line.trim()).filter(line => line);
              const recommendation = document.createElement("div");
              recommendation.className = "recommendation";
              if (index === 0) recommendation.classList.add("active");
              recommendation.innerHTML = `
                  <h2>${lines[0]}</h2>
                  <h3>${lines[1]}</h3>
                  <p class="recommendation-date">${lines[2]}</p>
                  <p class="recommendation-quote">"${lines[3]}"</p>
              `;

              recommendationContent.appendChild(recommendation);

              const dot = document.createElement("span");
              dot.classList.add("dot");
              if (index === 0) dot.classList.add("active");
              dot.dataset.index = index;
              dotsContainer.appendChild(dot);

              dot.addEventListener("click", () => showRecommendation(index));
          });

          const recommendationsElements = document.querySelectorAll(".recommendation");
          const dots = document.querySelectorAll(".dot");

          console.log(`Recommendations count: ${recommendationsElements.length}`);
          console.log(`Dots count: ${dots.length}`);

          function showRecommendation(index) {
              recommendationsElements.forEach((rec, i) => {
                  rec.classList.toggle("active", i === index);
              });
              dots.forEach((dot, i) => {
                  dot.classList.toggle("active", i === index);
              });
          }
      })
      .catch(error => console.error('Failed to load recommendations:', error));
});
