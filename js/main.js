/* Rapport Institute for Psychoeducation
   Menu, header, accordion, in-page tabs and the programme request form.
   Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var WHATSAPP = "2348147549034";
  var EMAIL = "rapportng@gmail.com";

  var PROGRAMMES = {
    schools: [
      "Emotional Literacy for Teachers and Students",
      "Teacher Well-being and Burnout Management",
      "Mental Health and Psychological Literacy in Schools",
      "Psychology of Learning",
      "Positive Learning Environments",
      "Mental Health Outreach and School Programmes"
    ],
    workplaces: [
      "Workplace Psychological Well-being",
      "Emotional Intelligence in the Workplace",
      "Stress and Burnout Management",
      "Leadership and Organisational Behaviour",
      "Workplace Relationships and Communication",
      "Productivity and Human Performance",
      "Mental Health Awareness and Workplace Programmes"
    ],
    communities: [
      "Community Psychoeducation",
      "Youth Mental Health and Development",
      "Family and Relationship Education",
      "Personal Development and Life Skills",
      "Mental Health Outreach and Advocacy",
      "Community Capacity Development",
      "Public Education and Engagement"
    ]
  };
  var AUDIENCE_LABEL = { schools: "Schools", workplaces: "Workplaces", communities: "Communities" };

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Header: background after scrolling ---------- */
  var header = document.querySelector("[data-header]");
  var onBlue = header && header.hasAttribute("data-on-blue");
  var menuOpen = false;
  function syncHeader() {
    if (!header) return;
    var scrolled = window.scrollY > 8;
    header.classList.toggle("is-scrolled", scrolled);
    if (onBlue) header.classList.toggle("header-on-blue", !scrolled && !menuOpen);
  }
  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var panel = document.querySelector("[data-menu-panel]");
  var label = document.querySelector("[data-menu-label]");
  var outside = [document.getElementById("main"), document.querySelector(".site-footer"), document.querySelector(".skip-link")];

  function setMenu(open) {
    if (!toggle || !panel) return;
    menuOpen = open;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", open);
    header.classList.toggle("menu-open", open);
    outside.forEach(function (el) { if (el) el.inert = open; });
    syncHeader();
    if (open) {
      var first = panel.querySelector("a");
      if (first) first.focus();
    }
  }
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      setMenu(!menuOpen);
      if (!menuOpen) toggle.focus();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuOpen) { setMenu(false); toggle.focus(); }
    });
    // Keep focus inside header + panel while open
    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var items = panel.querySelectorAll("a");
      var last = items[items.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggle.focus(); }
    });
    toggle.addEventListener("keydown", function (e) {
      if (!menuOpen || e.key !== "Tab") return;
      var items = panel.querySelectorAll("a");
      e.preventDefault();
      (e.shiftKey ? items[items.length - 1] : items[0]).focus();
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
      if (mq.matches && menuOpen) setMenu(false);
    });
  }

  /* ---------- Current page in nav ---------- */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a:not(.btn), .menu-panel ul a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll("[data-accordion] .acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.closest(".acc-item").classList.toggle("is-open", !open);
    });
  });

  /* ---------- Services: in-page tabs ---------- */
  var tabLinks = Array.prototype.slice.call(document.querySelectorAll("[data-tabs] a"));
  if (tabLinks.length && "IntersectionObserver" in window) {
    var sections = tabLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
    var setActive = function (id) {
      tabLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        if (on) {
          a.setAttribute("aria-current", "true");
          // keep the active tab visible on narrow screens
          var list = a.closest("ul");
          var l = a.offsetLeft, r = l + a.offsetWidth;
          if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth) list.scrollLeft = l - 24;
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { setActive(sections[i].id); return; }
      }
    }, { rootMargin: "-150px 0px -55% 0px" });
    sections.forEach(function (s) { if (s) io.observe(s); });
    tabLinks.forEach(function (a) {
      a.addEventListener("click", function () { setActive(a.getAttribute("href").slice(1)); });
    });
  }

  /* ---------- Programme request form ---------- */
  var form = document.querySelector("[data-request-form]");
  if (!form) return;

  var programmeSelect = form.querySelector("#programme");
  var audienceGroup = form.querySelector("[data-audience]");
  var programmeHint = form.querySelector("#programme-hint");

  function fillProgrammes(audience) {
    var current = programmeSelect.value;
    programmeSelect.innerHTML = "";
    var list = PROGRAMMES[audience] || [];
    list.forEach(function (name) { programmeSelect.add(new Option(name, name)); });
    programmeSelect.add(new Option("Not sure yet", "Not sure yet"));
    programmeSelect.value = list.indexOf(current) > -1 ? current : (list[0] ? list[0] : "Not sure yet");
    if (!list.length) programmeSelect.value = "Not sure yet";
    if (programmeHint) programmeHint.hidden = !!list.length;
  }
  form.querySelectorAll('input[name="audience"]').forEach(function (r) {
    r.addEventListener("change", function () {
      fillProgrammes(r.value);
      validate("audience");
    });
  });

  // Pre-select audience from ?audience=
  var param = new URLSearchParams(location.search).get("audience");
  if (param && PROGRAMMES[param]) {
    var radio = form.querySelector('input[name="audience"][value="' + param + '"]');
    if (radio) radio.checked = true;
    fillProgrammes(param);
  } else {
    fillProgrammes(null);
  }

  var RULES = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Enter your full name"; },
    email: function (v) {
      v = v.trim();
      if (!v) return "Enter an email address, like name@school.edu.ng";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Enter an email address in the right format, like name@school.edu.ng";
    },
    whatsapp: function (v) {
      var digits = v.replace(/[^\d]/g, "");
      if (!v.trim()) return "Enter a WhatsApp number, like 0814 754 9034";
      if (/[^\d\s+()-]/.test(v) || digits.length < 10 || digits.length > 15) return "Enter a WhatsApp number using digits only, like 0814 754 9034";
      return "";
    },
    institution: function (v) { return v.trim() ? "" : "Enter the name of your school, organisation or community group"; },
    audience: function () {
      return form.querySelector('input[name="audience"]:checked') ? "" : "Choose who the programme is for";
    },
    participants: function (v) {
      if (!v.trim()) return "";
      var n = Number(v);
      return Number.isInteger(n) && n > 0 && n < 100000 ? "" : "Enter a whole number, like 40";
    }
  };

  function fieldEl(name) {
    return name === "audience" ? audienceGroup : form.querySelector("#" + name);
  }
  function validate(name) {
    var el = fieldEl(name);
    var value = name === "audience" ? "" : el.value;
    var msg = RULES[name](value);
    var err = form.querySelector("#" + name + "-error");
    if (msg) {
      el.setAttribute("aria-invalid", "true");
      err.querySelector("span").textContent = msg;
      err.hidden = false;
    } else {
      el.removeAttribute("aria-invalid");
      err.hidden = true;
    }
    return !msg;
  }

  Object.keys(RULES).forEach(function (name) {
    if (name === "audience") return;
    var el = fieldEl(name);
    var touched = false;
    el.addEventListener("input", function () {
      touched = true;
      if (el.getAttribute("aria-invalid") === "true") validate(name);
    });
    el.addEventListener("blur", function () {
      if (touched || el.value) validate(name);
    });
  });

  function v(id) { var el = form.querySelector("#" + id); return el ? el.value.trim() : ""; }
  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }
  function buildMessage() {
    var aud = (form.querySelector('input[name="audience"]:checked') || {}).value;
    var lines = ["Hello Rapport, I would like to request a programme.", "", "*About me*"];
    lines.push("Name: " + v("name"));
    if (v("role")) lines.push("Role: " + v("role"));
    lines.push("Email: " + v("email"));
    lines.push("WhatsApp: " + v("whatsapp"));
    lines.push("", "*About the programme*");
    lines.push("Institution: " + v("institution"));
    lines.push("Audience: " + AUDIENCE_LABEL[aud]);
    lines.push("Programme: " + v("programme"));
    if (v("format")) lines.push("Format: " + v("format"));
    if (v("participants")) lines.push("Estimated participants: " + v("participants"));
    if (v("date")) lines.push("Preferred date: " + formatDate(v("date")));
    if (v("message")) lines.push("", "Message:", v("message"));
    return lines.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var order = ["name", "email", "whatsapp", "institution", "audience", "participants"];
    var firstBad = null;
    order.forEach(function (name) {
      if (!validate(name) && !firstBad) firstBad = name;
    });
    if (firstBad) {
      var target = firstBad === "audience" ? form.querySelector('input[name="audience"]') : fieldEl(firstBad);
      target.focus();
      return;
    }
    var text = buildMessage();
    var waUrl = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text);
    var mailUrl = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Programme request: " + v("institution")) + "&body=" + encodeURIComponent(text);
    window.open(waUrl, "_blank", "noopener");

    var success = document.querySelector("[data-form-success]");
    success.querySelector("[data-wa-again]").href = waUrl;
    success.querySelector("[data-mail]").href = mailUrl;
    form.hidden = true;
    success.hidden = false;
    success.querySelector("h3").focus();
  });
})();
