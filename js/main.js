const body = document.body;
const header = document.querySelector("#siteHeader");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

function closeMenu() {
  body.classList.remove("nav-open");
  navMenu.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú de navegación");
}

function toggleMenu() {
  const isOpen = navMenu.classList.toggle("is-open");
  body.classList.toggle("nav-open", isOpen);
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
  );
}

navToggle.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    closeMenu();
  }
});

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);

      navLinks.forEach((link) => link.classList.remove("is-active"));

      if (activeLink) {
        activeLink.classList.add("is-active");
      }
    });
  },
  {
    rootMargin: "-38% 0px -52% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));
