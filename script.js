// ====== YEAR ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== MOBILE MENU ======
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "block" ? "none" : "block";
});

mobileMenu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => (mobileMenu.style.display = "none"));
});

// close menu when click outside
document.addEventListener("click", (e) => {
  const isInMenu = mobileMenu.contains(e.target);
  const isHamburger = hamburger.contains(e.target);
  if (!isInMenu && !isHamburger) mobileMenu.style.display = "none";
});

// ====== TABS (SAMPLES) ======
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");

    const id = btn.dataset.tab;
    panels.forEach((p) => p.classList.remove("show"));
    document.getElementById(id)?.classList.add("show");
  });
});

// ====== BUBBLES FX ======
const bubbles = document.querySelector(".bubbles");

function spawnBubble() {
  const b = document.createElement("div");
  b.className = "bubble";

  const size = Math.floor(Math.random() * 26) + 12; // 12 - 38px
  b.style.width = size + "px";
  b.style.height = size + "px";

  const left = Math.random() * 100;
  b.style.left = left + "vw";
  b.style.bottom = "-60px";

  const dur = Math.random() * 6 + 6; // 6 - 12s
  b.style.animationDuration = dur + "s";

  b.style.opacity = (Math.random() * 0.55 + 0.3).toFixed(2);

  bubbles?.appendChild(b);

  setTimeout(() => b.remove(), dur * 1000);
}

// spawn bubbles smoothly
setInterval(spawnBubble, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnBubble, i * 350);
