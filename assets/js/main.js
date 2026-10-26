(function () {
  var root = document.documentElement;

  // ── Icon sprite (referenced in HTML as <svg class="ic"><use href="#i-name"/></svg>)
  var BRAND = ' fill="currentColor" stroke="none"';
  var ICONS = {
    github: '<path' + BRAND + ' d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>',
    linkedin: '<path' + BRAND + ' d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
    scholar: '<path' + BRAND + ' d="M5.24 13.77 0 9.5 12 0l12 9.5-5.24 4.27A7.45 7.45 0 0 0 12 9.5c-2.98 0-5.55 1.75-6.76 4.27zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>',
    hf: '<circle cx="12" cy="12" r="9.5"/><path d="M8 14.5c1 1.6 2.4 2.4 4 2.4s3-.8 4-2.4"/><circle' + BRAND + ' cx="9" cy="10" r="1.2"/><circle' + BRAND + ' cx="15" cy="10" r="1.2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/>',
    paper: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    demo: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5 3.5-5 3.5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    // category glyphs for generated project covers
    medical: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    vision: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    llm: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
    agentic: '<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4M9 13h.01M15 13h.01M9 16.5h6M3 13v2M21 13v2"/><circle cx="12" cy="3.5" r="1"/>',
    web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    // project-type tabs
    flask: '<path d="M9 3h6M10 3v6.5L4.6 18.4A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.4-2.6L14 9.5V3"/><path d="M7 15h10"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    // concept glyphs for the home-page skills strip
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    sparkles: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16v4M17 18h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    rag: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><path d="M14 3v5h5v3"/><circle cx="16.5" cy="16.5" r="3"/><path d="m21 21-2.2-2.2"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    wand: '<path d="m15 4 5 5L9 20l-5-5z"/><path d="m12 7 5 5M5 3v3M3.5 4.5h3M20 15v3M18.5 16.5h3"/>',
    cloud: '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/>'
  };
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">';
  for (var k in ICONS) sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>";
  document.body.insertAdjacentHTML("afterbegin", sprite + "</svg>");

  // ── Theme toggle
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ── Mobile menu
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menu-toggle");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  // ── Header border on scroll
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Search + category filter (projects and publications pages)
  //    Items: [data-filter-item] with data-cat="a b"; chips: [data-filter] buttons.
  //    Optional type tabs: [data-filter-type] buttons match the item's [data-group] ancestor;
  //    [data-type-count="x"] shows how many items of type x pass the topic + search filters.
  var list = document.querySelector("[data-filter-list]");
  if (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll("[data-filter-item]"));
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var types = Array.prototype.slice.call(document.querySelectorAll("[data-filter-type]"));
    var typeCounts = Array.prototype.slice.call(document.querySelectorAll("[data-type-count]"));
    var input = document.querySelector("[data-search]");
    var count = document.querySelector("[data-count]");
    var empty = document.querySelector("[data-empty]");
    var groups = Array.prototype.slice.call(list.querySelectorAll("[data-filter-group]"));
    var noun = list.getAttribute("data-noun") || "items";
    var active = "all", activeType = "all";

    function apply() {
      var q = input ? input.value.trim().toLowerCase() : "";
      var shown = 0, perType = { all: 0 };
      items.forEach(function (el) {
        var cats = (el.getAttribute("data-cat") || "").split(" ");
        var g = el.closest("[data-group]"), type = g ? g.getAttribute("data-group") : "";
        var match = (active === "all" || cats.indexOf(active) !== -1) &&
                    (!q || el.textContent.toLowerCase().indexOf(q) !== -1);
        if (match) { perType.all++; perType[type] = (perType[type] || 0) + 1; }
        var ok = match && (activeType === "all" || type === activeType);
        el.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) {
        g.hidden = !g.querySelector("[data-filter-item]:not([hidden])");
      });
      typeCounts.forEach(function (el) { el.textContent = perType[el.getAttribute("data-type-count")] || 0; });
      if (count) count.textContent = shown + " " + (shown === 1 ? noun.replace(/s$/, "") : noun);
      if (empty) empty.classList.toggle("show", shown === 0);
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        active = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        apply();
      });
    });
    types.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activeType = tab.getAttribute("data-filter-type");
        types.forEach(function (t) { t.setAttribute("aria-pressed", String(t === tab)); });
        apply();
      });
    });
    // deep links like projects.html#client open on that type
    var hashTab = location.hash && document.querySelector('[data-filter-type="' + location.hash.slice(1) + '"]');
    if (hashTab) hashTab.click();
    if (input) input.addEventListener("input", apply);
    apply();
  }

  // ── Motion: reading progress, scroll reveal, count-up stats
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  header.appendChild(bar);
  function onProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty("--progress", max > 0 ? Math.min(window.scrollY / max, 1) : 0);
  }
  window.addEventListener("scroll", onProgress, { passive: true });
  window.addEventListener("resize", onProgress);
  onProgress();

  if (!reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("js-motion");

    var REVEAL = [
      ".section-head", ".row-head", ".prose", ".interests li", ".news li", ".pub",
      ".project", ".entry", ".rows > li", ".skills > div", ".certs a", ".contact-card",
      ".stats", ".orgs", ".marquees", ".toolbar", ".pub-year-label", ".feature-card",
      ".map-wrap", ".region", ".hobby-card", ".type-tabs", ".group-head"
    ].join(",");

    var targets = Array.prototype.slice.call(document.querySelectorAll(REVEAL)).filter(function (el) {
      return !el.closest(".hero, .page-hero");
    });
    targets.forEach(function (el) {
      el.setAttribute("data-reveal", "");
      // stagger siblings of the same kind (capped so long lists don't lag)
      var i = 0, s = el;
      while ((s = s.previousElementSibling)) if (s.matches(REVEAL)) i++;
      el.style.setProperty("--reveal-delay", Math.min(i, 5) * 70 + "ms");
    });

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.classList.add("is-visible");
          revealer.unobserve(el);
          // hand control back to normal styles (e.g. hover lifts) once revealed
          setTimeout(function () {
            el.removeAttribute("data-reveal");
            el.classList.remove("is-visible");
            el.style.removeProperty("--reveal-delay");
          }, 1200);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { revealer.observe(el); });

    // Count up numeric stats ("8", "140+") when they scroll into view
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        counter.unobserve(e.target);
        var el = e.target, m = el.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!m) return;
        var end = parseInt(m[1], 10), suffix = m[2], t0 = null, dur = 1200;
        function tick(t) {
          if (t0 === null) t0 = t;
          var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".stats dd").forEach(function (dd) { counter.observe(dd); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
