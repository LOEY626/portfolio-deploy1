/* ============================
   Portfolio 2.0 — Restyled JS
   3D Perspective Tilt · Parallax · Mouse Effects
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-transition");

  // ============================
  // Mobile Nav Toggle
  // ============================
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      toggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  // ============================
  // 3D Perspective Tilt (Cards)
  // ============================
  const tiltCards = document.querySelectorAll(".project-card, .stat-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    });
  });

  // ============================
  // 3D Hero Image Tilt
  // ============================
  const heroImgWrap = document.querySelector(".hero-image-wrapper");
  if (heroImgWrap) {
    const heroSection = heroImgWrap.closest(".hero");
    if (heroSection) {
      let rafId = null;
      heroSection.addEventListener("mousemove", (e) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          heroImgWrap.style.transform =
            `perspective(1200px) rotateY(${x * 3}deg) rotateX(${y * -2}deg) translateZ(10px)`;
          rafId = null;
        });
      });
      heroSection.addEventListener("mouseleave", () => {
        heroImgWrap.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      });
    }
  }

  // ============================
  // 3D About Image Tilt
  // ============================
  const aboutImgWrap = document.querySelector(".about-image-wrapper");
  if (aboutImgWrap) {
    const aboutSec = aboutImgWrap.closest(".about-grid");
    if (aboutSec) {
      aboutSec.addEventListener("mousemove", (e) => {
        const rect = aboutSec.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        aboutImgWrap.style.transform =
          `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${y * -1.5}deg) translateZ(8px)`;
      });
      aboutSec.addEventListener("mouseleave", () => {
        aboutImgWrap.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      });
    }
  }

  // ============================
  // Parallax Project Hero Image
  // ============================
  const projectHero = document.querySelector(".project-hero");
  if (projectHero) {
    const heroImg = projectHero.querySelector("img");
    if (heroImg) {
      window.addEventListener("scroll", () => {
        const rect = projectHero.getBoundingClientRect();
        const scrollPercent = 1 - rect.bottom / window.innerHeight;
        const translateY = Math.max(0, Math.min(scrollPercent * 80, 60));
        heroImg.style.transform = `translateY(${translateY}px)`;
      }, { passive: true });
    }
  }

  // ============================
  // Mouse-follow gradient on Hero
  // ============================
  const heroEl = document.querySelector(".hero");
  if (heroEl) {
    let rafGrad = null;
    heroEl.addEventListener("mousemove", (e) => {
      if (rafGrad) cancelAnimationFrame(rafGrad);
      rafGrad = requestAnimationFrame(() => {
        const rect = heroEl.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroEl.style.setProperty("--mouse-x", x + "%");
        heroEl.style.setProperty("--mouse-y", y + "%");
        rafGrad = null;
      });
    });
  }

  // ============================
  // Scroll Reveal
  // ============================
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  // ============================
  // Lightbox
  // ============================
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  if (lightbox && lightboxImg) {
    document.querySelectorAll(".project-gallery img, .project-card-image, .clickable-image").forEach((img) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // ============================
  // Navbar shadow on scroll
  // ============================
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.style.boxShadow = window.scrollY > 20 ? "0 1px 8px rgba(0,0,0,0.3)" : "none";
      },
      { passive: true }
    );
  }

  // ============================
  // Active Nav Link
  // ============================
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // ============================
  // Count-up Animation for Stat Numbers
  // ============================
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const fullText = el.textContent.trim();
            const match = fullText.match(/(\d+)(.*)/);
            if (!match) return;
            const target = parseInt(match[1]);
            const suffix = match[2] || "";
            const duration = 1000;
            const startTime = performance.now();

            function update(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.round(progress * target);
              el.textContent = current + suffix;
              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }

            requestAnimationFrame(update);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNumbers.forEach((el) => countObserver.observe(el));
  }
});
