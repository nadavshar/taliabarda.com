/* Talia Barda — Portfolio
   Minimal, dependency-free interactions. */

(function () {
  "use strict";

  /* ---------- Vimeo background (hero) ----------
     The hero section carries data-vimeo-id; we build the iframe here
     so the page works (with a plain dark backdrop) even before a
     real video ID is set. */
  const hero = document.querySelector(".hero[data-vimeo-id]");
  if (hero) {
    const id = hero.dataset.vimeoId.trim();
    const media = hero.querySelector("[data-hero-media]");
    if (id && media) {
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://player.vimeo.com/video/" +
        encodeURIComponent(id) +
        "?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1";
      iframe.allow = "autoplay; fullscreen";
      iframe.title = "Background video";
      iframe.setAttribute("tabindex", "-1");
      iframe.addEventListener("load", function () {
        media.classList.add("is-loaded");
      });
      media.appendChild(iframe);
    }
  }

  /* ---------- Navigation overlay ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const overlay = document.querySelector("[data-nav-overlay]");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    overlay.setAttribute("aria-hidden", String(!open));
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", function () {
      setNav(!document.body.classList.contains("nav-open"));
    });

    overlay.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Header color swap after the hero ---------- */
  const header = document.querySelector("[data-header]");
  if (header && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle("is-past-hero", !entries[0].isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px" }
    ).observe(hero);
  }

  /* ---------- Scroll reveal ---------- */
  const revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealables.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
