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

  /* ---------- Work galleries: peek carousel ----------
     Each .work-gallery is a horizontally scrolling, scroll-snapped
     strip (pure CSS does the "peek the neighbour" layout). This just
     wraps it for positioning and adds prev/next buttons that nudge
     the scroll position by one slide. */
  document.querySelectorAll(".work-gallery").forEach(function (gallery) {
    const viewport = document.createElement("div");
    viewport.className = "work-gallery-viewport";
    gallery.parentNode.insertBefore(viewport, gallery);
    viewport.appendChild(gallery);

    function step(direction) {
      const slide = gallery.querySelector("img");
      if (!slide) return;
      const gap = parseFloat(getComputedStyle(gallery).columnGap || "0") || 0;
      const amount = slide.getBoundingClientRect().width + gap;
      gallery.scrollBy({ left: direction * amount, behavior: "smooth" });
    }

    [
      ["prev", "Previous image", "&#8249;", -1],
      ["next", "Next image", "&#8250;", 1],
    ].forEach(function (entry) {
      const [modifier, label, glyph, direction] = entry;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "work-gallery__nav work-gallery__nav--" + modifier;
      btn.setAttribute("aria-label", label);
      btn.innerHTML = glyph;
      btn.addEventListener("click", function () {
        step(direction);
      });
      viewport.appendChild(btn);
    });

    gallery.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    });
  });

  /* ---------- Works index: hover-preview background ----------
     Each row can carry data-bg="vimeo:ID" / "youtube:ID" / "image:path".
     The preview is built lazily on first hover/focus, and only one
     row's preview exists at a time — hovering a new row tears down
     the previous one — so nothing is decoding in the background and
     playback stays smooth instead of choppy. */
  const previewLinks = document.querySelectorAll(".index-link[data-bg]");
  if (previewLinks.length) {
    let activeLink = null;

    function buildPreview(spec) {
      const sep = spec.indexOf(":");
      const kind = spec.slice(0, sep);
      const value = spec.slice(sep + 1);

      if (kind === "vimeo") {
        const iframe = document.createElement("iframe");
        iframe.src =
          "https://player.vimeo.com/video/" +
          encodeURIComponent(value) +
          "?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1";
        iframe.allow = "autoplay; fullscreen";
        iframe.tabIndex = -1;
        return iframe;
      }
      if (kind === "youtube") {
        const iframe = document.createElement("iframe");
        iframe.src =
          "https://www.youtube-nocookie.com/embed/" +
          encodeURIComponent(value) +
          "?autoplay=1&mute=1&loop=1&playlist=" +
          encodeURIComponent(value) +
          "&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1";
        iframe.allow = "autoplay; encrypted-media";
        iframe.tabIndex = -1;
        return iframe;
      }
      if (kind === "image") {
        const img = document.createElement("img");
        img.src = value;
        img.alt = "";
        img.loading = "lazy";
        return img;
      }
      return null;
    }

    function activatePreview(link) {
      if (activeLink === link) return;
      if (activeLink) {
        const prevBg = activeLink.querySelector(".index-link__bg");
        if (prevBg) prevBg.innerHTML = "";
      }
      activeLink = link;
      const bg = link.querySelector(".index-link__bg");
      if (bg && !bg.firstChild) {
        const el = buildPreview(link.dataset.bg);
        if (el) bg.appendChild(el);
      }
    }

    previewLinks.forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        activatePreview(link);
      });
      link.addEventListener(
        "focus",
        function () {
          activatePreview(link);
        },
        true
      );
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
