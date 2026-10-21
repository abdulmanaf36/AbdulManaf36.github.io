(function () {
  // ── Places visited. To add one: { name, region, country, note, lat, lng }
  var REGIONS = {
    pk: { label: "Pakistan", note: "Home country — from the Thar Desert to Skardu" },
    sa: { label: "Saudi Arabia", note: "Umrah in 2018 and 2024" },
    no: { label: "Norway", note: "2025 – present" },
    eu: { label: "Europe", note: "2025" }
  };

  var PLACES = [
    { name: "Thar Desert", region: "pk", country: "Pakistan", lat: 24.74, lng: 69.8 },
    { name: "Karachi", region: "pk", country: "Pakistan", lat: 24.86, lng: 67.01 },
    { name: "Hyderabad", region: "pk", country: "Pakistan", lat: 25.4, lng: 68.37 },
    { name: "Sukkur", region: "pk", country: "Pakistan", lat: 27.7, lng: 68.86 },
    { name: "Punjab", region: "pk", country: "Pakistan", lat: 31.17, lng: 72.7 },
    { name: "Islamabad", region: "pk", country: "Pakistan", lat: 33.68, lng: 73.05 },
    { name: "Peshawar", region: "pk", country: "Pakistan", lat: 34.01, lng: 71.58 },
    { name: "Skardu", region: "pk", country: "Pakistan", lat: 35.3, lng: 75.63 },

    { name: "Makkah", region: "sa", country: "Saudi Arabia", note: "2018, 2024", lat: 21.42, lng: 39.83 },
    { name: "Madinah", region: "sa", country: "Saudi Arabia", note: "2018, 2024", lat: 24.47, lng: 39.61 },
    { name: "Jeddah", region: "sa", country: "Saudi Arabia", note: "2018, 2024", lat: 21.49, lng: 39.19 },

    { name: "Gjøvik", region: "no", country: "Norway", note: "Home base", lat: 60.795, lng: 10.692 },
    { name: "Oslo", region: "no", country: "Norway", lat: 59.913, lng: 10.752 },
    { name: "Lillehammer", region: "no", country: "Norway", lat: 61.115, lng: 10.466 },
    { name: "Beitostølen", region: "no", country: "Norway", lat: 61.248, lng: 8.907 },
    { name: "Hamar", region: "no", country: "Norway", lat: 60.795, lng: 11.068 },
    { name: "Stavanger", region: "no", country: "Norway", lat: 58.97, lng: 5.733 },
    { name: "Ås", region: "no", country: "Norway", note: "NMBU", lat: 59.664, lng: 10.792 },
    { name: "Vestby", region: "no", country: "Norway", lat: 59.603, lng: 10.749 },
    { name: "Ski", region: "no", country: "Norway", lat: 59.719, lng: 10.835 },
    { name: "Roa", region: "no", country: "Norway", lat: 60.29, lng: 10.62 },
    { name: "Kapp", region: "no", country: "Norway", lat: 60.704, lng: 10.866 },
    { name: "Raufoss", region: "no", country: "Norway", lat: 60.726, lng: 10.612 },

    { name: "Katowice", region: "eu", country: "Poland", lat: 50.264, lng: 19.024 },
    { name: "Budapest", region: "eu", country: "Hungary", lat: 47.498, lng: 19.04 },
    { name: "Prague", region: "eu", country: "Czech Republic", lat: 50.075, lng: 14.437 },
    { name: "Vienna", region: "eu", country: "Austria", lat: 48.208, lng: 16.373 },
    { name: "Munich", region: "eu", country: "Germany", lat: 48.137, lng: 11.575 },
    { name: "Barcelona", region: "eu", country: "Spain", lat: 41.388, lng: 2.17 },
    { name: "Palma de Mallorca", region: "eu", country: "Spain", lat: 39.57, lng: 2.65 }
  ];


  var root = document.documentElement;
  var GREEN = "#16a34a";

  // ── Stats
  var placesStat = document.querySelector('[data-stat="places"]');
  if (placesStat) placesStat.textContent = PLACES.length;
  var countriesStat = document.querySelector('[data-stat="countries"]');
  if (countriesStat) {
    var seen = {};
    PLACES.forEach(function (p) { seen[p.country] = 1; });
    countriesStat.textContent = Object.keys(seen).length;
  }

  // ── Region list (always rendered, works without the map)
  var list = document.getElementById("region-list");
  Object.keys(REGIONS).forEach(function (key) {
    var r = REGIONS[key];
    var items = PLACES.filter(function (p) { return p.region === key; });
    var block = document.createElement("div");
    block.className = "region";
    block.innerHTML =
      '<h3>' + r.label + ' <span>' + r.note + '</span></h3><ul class="place-list"></ul>';
    var ul = block.querySelector("ul");
    items.forEach(function (p) {
      var li = document.createElement("li");
      li.innerHTML = '<button type="button" class="place"><span class="map-dot" aria-hidden="true"></span>' +
        p.name + (key === "eu" ? '<small>' + p.country + "</small>" : "") + "</button>";
      li.querySelector("button").addEventListener("click", function () { focusPlace(p); });
      ul.appendChild(li);
    });
    list.appendChild(block);
  });

  // ── Map (Leaflet + Esri gray canvas basemaps, no API key needed)
  var map = null, tiles = null, markers = [];
  function tileUrl() {
    var dark = root.getAttribute("data-theme") === "dark";
    return "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_" +
      (dark ? "Dark" : "Light") + "_Gray_Base/MapServer/tile/{z}/{y}/{x}";
  }

  if (window.L && document.getElementById("travel-map")) {
    map = L.map("travel-map", { scrollWheelZoom: false, worldCopyJump: true });
    tiles = L.tileLayer(tileUrl(), {
      maxZoom: 16,
      attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors"
    }).addTo(map);

    PLACES.forEach(function (p) {
      var m = L.circleMarker([p.lat, p.lng], {
        radius: 7, color: "#ffffff", weight: 2, fillColor: GREEN, fillOpacity: 0.95
      }).bindPopup(
        "<strong>" + p.name + "</strong><br>" + p.country + (p.note ? " · " + p.note : "")
      ).bindTooltip(p.name, { direction: "top", offset: [0, -6] });
      m.place = p;
      m.addTo(map);
      markers.push(m);
    });
    fitTo("all");

    // swap basemap when the theme toggles
    new MutationObserver(function () { tiles.setUrl(tileUrl()); })
      .observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  }

  function fitTo(region) {
    if (!map) return;
    var pts = [];
    markers.forEach(function (m) {
      var show = region === "all" || m.place.region === region;
      if (show) { m.addTo(map); pts.push(m.getLatLng()); } else { map.removeLayer(m); }
    });
    if (!pts.length) return;
    var opts = { padding: [40, 40], maxZoom: 9 };
    // flyTo needs an existing view, so the first fit is instant
    if (map._loaded) map.flyToBounds(L.latLngBounds(pts), Object.assign({ duration: 0.8 }, opts));
    else map.fitBounds(L.latLngBounds(pts), opts);
  }

  function focusPlace(p) {
    if (!map) return;
    var m = markers.filter(function (x) { return x.place === p; })[0];
    setRegion(p.region);
    document.getElementById("travel-map").scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(function () {
      map.flyTo([p.lat, p.lng], 10, { duration: 0.8 });
      m.openPopup();
    }, 350);
  }

  var regionChips = Array.prototype.slice.call(document.querySelectorAll("[data-region]"));
  function setRegion(region) {
    regionChips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-region") === region)); });
    fitTo(region);
  }
  regionChips.forEach(function (c) {
    c.addEventListener("click", function () { setRegion(c.getAttribute("data-region")); });
  });

})();
