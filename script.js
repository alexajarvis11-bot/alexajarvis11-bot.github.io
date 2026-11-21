// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Dark / light toggle (remembers your choice)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}

toggle.addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Fade sections in as you scroll
const items = document.querySelectorAll(".section, .card");
items.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
items.forEach((el) => io.observe(el));
