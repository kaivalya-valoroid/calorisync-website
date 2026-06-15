(function () {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Only one FAQ panel open at a time
  document.querySelectorAll(".faq details").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        document.querySelectorAll(".faq details").forEach(function (other) {
          if (other !== d) other.open = false;
        });
      }
    });
  });

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll-reveal animation
  if ("IntersectionObserver" in window && !prefersReduced) {
    const reveals = document.querySelectorAll(".reveal");
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // Stagger siblings within the same parent for a wave effect
        const sibs = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target);
        entry.target.style.transitionDelay = (Math.min(sibs, 5) * 80) + "ms";
        entry.target.classList.add("is-visible");
        revealObs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Count-up animation for .counter[data-target="N"]
  if ("IntersectionObserver" in window && !prefersReduced) {
    const counters = document.querySelectorAll(".counter[data-target]");
    const counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic for a satisfying decel
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(eased * target).toString();
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObs.observe(el); });
  } else {
    document.querySelectorAll(".counter[data-target]").forEach(function (el) {
      el.textContent = el.dataset.target;
    });
  }

  // Active nav-link highlight based on the section currently in view
  if ("IntersectionObserver" in window) {
    const sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
    const targets = sectionLinks
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    if (targets.length) {
      const sectionObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sectionLinks.forEach(function (a) { a.classList.remove("is-active"); });
            const link = sectionLinks.find(function (a) {
              return a.getAttribute("href") === "#" + entry.target.id;
            });
            if (link) link.classList.add("is-active");
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
      targets.forEach(function (t) { sectionObs.observe(t); });
    }
  }
})();
