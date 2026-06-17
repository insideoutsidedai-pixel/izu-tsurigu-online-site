const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");
const revealTargets = document.querySelectorAll(".reveal, .section-heading, .business-cards article, .product-list article, .channel-card, .contact-cards > *");
const lightbox = document.querySelector("[data-lightbox-dialog]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.classList.remove("menu-open");
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    const imageUrl = button.getAttribute("data-lightbox");
    const caption = button.getAttribute("data-caption") || "";
    lightboxImage.src = imageUrl || "";
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
