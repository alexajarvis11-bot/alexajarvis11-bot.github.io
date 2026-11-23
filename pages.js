// pages.js — interactive extras for the About, Interests, Experience and Contact pages.
// The homepage does not load this file.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Page transition: fade out before moving to another page of this site ----------
  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (reduceMotion || link.target === "_blank" || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(() => { window.location.href = link.href; }, 220);
    });
  });
  // When coming back with the browser's Back button, show the page again
  window.addEventListener("pageshow", () => document.body.classList.remove("leaving"));

  // ---------- Disguise meter (About): fills up when it scrolls into view ----------
  document.querySelectorAll("[data-meter]").forEach((meter) => {
    const fill = meter.querySelector(".meter-fill");
    const show = () => { fill.style.width = meter.dataset.meter + "%"; };
    if (!("IntersectionObserver" in window)) return show();
    const watcher = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { show(); watcher.disconnect(); }
    }, { threshold: 0.4 });
    watcher.observe(meter);
  });

  // ---------- Fun facts (About): button shows the next fact from the list ----------
  const factBox = document.getElementById("fact");
  const factButton = document.getElementById("nextFact");
  const factList = document.getElementById("factList");
  if (factBox && factButton && factList) {
    const facts = [...factList.querySelectorAll("li")].map((li) => li.textContent.trim());
    let current = 0;
    factBox.textContent = facts[0];
    factButton.addEventListener("click", () => {
      current = (current + 1) % facts.length;
      factBox.classList.remove("decrypt");
      void factBox.offsetWidth; // restart the animation
      factBox.classList.add("decrypt");
      factBox.textContent = facts[current];
    });
  }

  // ---------- Contact form: opens the visitor's email app (there is no server) ----------
  const form = document.getElementById("transmission");
  const sent = document.getElementById("transmissionSent");
  if (form && sent) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = data.get("name").trim();
      const email = data.get("email").trim();
      const message = data.get("message").trim();
      const subject = "Transmission from " + name;
      const body = message + "\n\n— " + name + " (" + email + ")";
      window.location.href = "mailto:" + form.dataset.to +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      form.hidden = true;
      sent.hidden = false;
    });
    document.getElementById("sendAnother").addEventListener("click", () => {
      form.reset();
      sent.hidden = true;
      form.hidden = false;
      form.querySelector("input").focus();
    });
  }
})();
