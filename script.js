// ===== Theme =====
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "light") root.classList.add("light");
  else root.classList.remove("light");
  localStorage.setItem("theme", mode);
  themeBtn.textContent = mode === "light" ? "🌞" : "🌙";
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const next = root.classList.contains("light") ? "dark" : "light";
  setTheme(next);
});

// ===== Mobile menu =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => nav.classList.toggle("open"));
nav
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

const projects = [
  {
    title: "EmoCare Vietnam",
    desc: "Mental health support platform with modern UI, responsive design, and user-friendly experience.",
    tags: ["web"],
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://emocarevn.vercel.app",
    code: "",
  },
  {
    title: "Tanca",
    desc: "Corporate website for a technology company, focusing on clean layout, branding, and performance.",
    tags: ["corporate"],
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://tanca.io",
    code: "",
  },
  {
    title: "MKSoft Channel",
    desc: "Landing page for showcasing services and products with a modern, minimal design.",
    tags: ["landing"],
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://channel.mksoft.io",
    code: "",
  },
  {
    title: "DQH Architects",
    desc: "Architecture firm website with elegant layout, bilingual support, and strong visual presentation.",
    tags: ["corporate"],
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://dqharchitects.vn/en/home",
    code: "",
  },
  {
    title: "Shinzen Mechanical",
    desc: "Corporate website for a mechanical engineering company, focusing on industrial branding, clarity, and performance.",
    tags: ["corporate"],
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://shinzen-mechanical.com",
    code: "",
  },
];

const grid = document.getElementById("projectGrid");
const tabs = document.getElementById("tabs");
const searchInput = document.getElementById("projectSearch");
const clearSearch = document.getElementById("clearSearch");

let activeTag = "all";
let keyword = "";

function matches(p) {
  const tagOk = activeTag === "all" || p.tags.includes(activeTag);
  const key = keyword.trim().toLowerCase();
  const keyOk =
    !key ||
    p.title.toLowerCase().includes(key) ||
    p.desc.toLowerCase().includes(key) ||
    p.tech.join(" ").toLowerCase().includes(key);
  return tagOk && keyOk;
}

function render() {
  const items = projects.filter(matches);
  grid.innerHTML = items
    .map(
      (p) => `
      <article class="project">
        <div class="thumb" aria-hidden="true"></div>
        <div>
          <h3>${p.title}</h3>
          <p class="muted" style="margin:6px 0 0;">${p.desc}</p>
        </div>
        <div class="tags">
          ${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="actions">
  <a class="btn primary" href="${p.demo}" target="_blank" rel="noreferrer">
    Live Website
  </a>
</div>

      </article>
    `
    )
    .join("");

  // update numbers
  document.getElementById("projectsCount").textContent = `${projects.length}+`;
}

render();

// tabs
tabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;

  tabs.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  activeTag = btn.dataset.tag;
  render();
});

// search
searchInput.addEventListener("input", (e) => {
  keyword = e.target.value;
  render();
});

clearSearch.addEventListener("click", () => {
  keyword = "";
  searchInput.value = "";
  render();
});

// contact form demo
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");

  hint.textContent = `✅ Cảm ơn ${name}! (Demo) Bạn hãy thay bằng gửi email thật qua Formspree / backend.`;
  form.reset();
});

// ===== Back to top (clean version) =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
