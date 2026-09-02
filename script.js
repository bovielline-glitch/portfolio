document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");
  const revealElements = document.querySelectorAll(".reveal");
  const cursorGlow = document.querySelector(".cursor-glow");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const icon = menuToggle.querySelector("i");
      if (navLinks.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      const icon = menuToggle?.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  });

 
  const updateNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  
  const activateLink = () => {
    let current = "Home";

    sections.forEach(section => {
      const top = section.offsetTop - 180;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateLink, { passive: true });
  activateLink();

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => observer.observe(element));

  if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  } else if (cursorGlow) {
    cursorGlow.style.display = "none";
  }

  /* Petit effet de mouvement sur la photo */
  const photoCard = document.querySelector(".photo-card");

  if (photoCard && window.matchMedia("(pointer:fine)").matches) {
    photoCard.addEventListener("mousemove", event => {
      const rect = photoCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      photoCard.style.transform =
        `rotate(2deg) perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    photoCard.addEventListener("mouseleave", () => {
      photoCard.style.transform = "rotate(2deg)";
    });
  }

  document.querySelectorAll(".skill-row").forEach(row => {
    row.addEventListener("mouseenter", () => {
      row.style.setProperty("--skill-hover", "1");
    });

    row.addEventListener("mouseleave", () => {
      row.style.setProperty("--skill-hover", "0");
    });
  });
});
