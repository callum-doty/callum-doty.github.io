document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      // Ignore links that don't navigate away from the page
      if (!href || href.startsWith("#") || link.target === "_blank") {
        return;
      }

      e.preventDefault();
      const main = document.querySelector("main");
      if (main) {
        main.classList.add("fade-out");
      }
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });
});
