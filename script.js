document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(
    ".fullpage-wrapper, .fullpage-wrapper-1, .fullpage-wrapper-2, .fullpage-wrapper-3, .fullpage-wrapper-4, .fullpage-wrapper-5, .fullpage-wrapper-6, .fullpage-wrapper-7"
  );

  const colors = [
    "#f6e3ab",
    "rgb(251, 121, 143)",
    "#fff",
    "#00c1b5",
    "#ff651a",
    "#ffbe00",
    "#1d3fbb",
    "#e30512",
  ];

  sections.forEach((section, idx) => {
    section.setAttribute("data-bg", colors[idx]);
  });

  // Observe .cover divs and map them to their parent section
  const covers = document.querySelectorAll(".cover");
  const coverToSection = new Map();
  covers.forEach((cover) => {
    let parentSection = cover.closest(
      ".fullpage-wrapper, .fullpage-wrapper-1, .fullpage-wrapper-2, .fullpage-wrapper-3, .fullpage-wrapper-4, .fullpage-wrapper-5, .fullpage-wrapper-6, .fullpage-wrapper-7"
    );
    if (parentSection) {
      coverToSection.set(cover, parentSection);
    }
  });

  let currentBg = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = coverToSection.get(entry.target);
          if (section) {
            const bg = section.getAttribute("data-bg");
            if (bg && bg !== currentBg) {
              document.body.style.background = bg;
              currentBg = bg;
            }
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  covers.forEach((cover) => observer.observe(cover));
});
