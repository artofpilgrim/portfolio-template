const recommendationData = [
  {
    name: "John Doe",
    role: "Senior Developer",
    date: "January 10, 2023",
    quote:
      "Nulla facilisi morbi tempus iaculis. Blandit massa enim nec dui nunc mattis enim. Cursus sit amet dictum sit amet justo donec enim diam. Ac turpis egestas integer eget aliquet nibh praesent. Etiam erat velit scelerisque in. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Vel turpis nunc eget lorem dolor. Sed blandit libero volutpat sed. Mattis molestie a iaculis at erat pellentesque.",
  },
  {
    name: "Jane Smith",
    role: "Project Manager",
    date: "February 15, 2023",
    quote:
      "Et malesuada fames ac turpis egestas maecenas pharetra convallis. At quis risus sed vulputate. Tempus imperdiet nulla malesuada pellentesque. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Integer vitae justo eget magna fermentum. Enim ut sem viverra aliquet eget sit amet. Odio ut sem nulla pharetra diam. Consectetur a erat nam at lectus urna duis. Convallis aenean et tortor at. Nisi quis eleifend quam adipiscing vitae proin sagittis.",
  },
  {
    name: "Michael Brown",
    role: "Lead Designer",
    date: "March 20, 2023",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Specialist",
    date: "April 25, 2023",
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Chris Davis",
    role: "Art Director",
    date: "May 30, 2023",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const recommendationContent = document.querySelector(
    ".recommendation-content"
  );
  const dotsContainer = document.getElementById("recommendation-dots");

  console.log("Adding recommendations and dots...");

  recommendationData.forEach((rec, index) => {
    const recommendation = document.createElement("div");
    recommendation.className = "recommendation";
    if (index === 0) recommendation.classList.add("active");
    recommendation.innerHTML = `
            <h2>${rec.name}</h2>
            <h3>${rec.role}</h3>
            <p class="recommendation-date">${rec.date}</p>
            <p class="recommendation-quote">"${rec.quote}"</p>
        `;

    recommendationContent.appendChild(recommendation);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => showRecommendation(index));
  });

  const recommendations = document.querySelectorAll(".recommendation");
  const dots = document.querySelectorAll(".dot");

  console.log(`Recommendations count: ${recommendations.length}`);
  console.log(`Dots count: ${dots.length}`);

  function showRecommendation(index) {
    recommendations.forEach((rec, i) => {
      rec.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }
});
