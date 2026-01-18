// ====== YEAR ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== MOBILE MENU ======
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger?.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
});

mobileMenu?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => (mobileMenu.style.display = "none"));
});

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

  const dur = Math.random() * 6 + 7; // 7 - 13s
  b.style.animationDuration = dur + "s";

  b.style.opacity = (Math.random() * 0.45 + 0.2).toFixed(2);

  bubbles?.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000);
}

setInterval(spawnBubble, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnBubble, i * 350);

// ====== MOCK ACTION (Open -> samples, Scroll -> album) ======
document.querySelectorAll(".mock-action").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-go");
    const el = document.querySelector(target);

    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 380);

    spawnHeart(btn);

    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function spawnHeart(btn) {
  const heart = document.createElement("span");
  heart.textContent = "💗";
  heart.style.position = "absolute";
  heart.style.pointerEvents = "none";
  heart.style.fontSize = "16px";
  heart.style.transform = "translate(-50%, -50%)";
  heart.style.left = "50%";
  heart.style.top = "50%";
  heart.style.filter = "drop-shadow(0 8px 18px rgba(255, 122, 182, .28))";
  heart.style.opacity = "1";

  btn.style.position = "relative";
  btn.appendChild(heart);

  const dx = Math.random() * 50 - 25;
  const dy = -(Math.random() * 55 + 45);

  heart.animate(
    [
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      {
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.35)`,
        opacity: 0,
      },
    ],
    { duration: 650, easing: "cubic-bezier(.2,.9,.2,1)" }
  );

  setTimeout(() => heart.remove(), 700);
}

// ====== ALBUM LIGHTBOX ======
const albumItems = document.querySelectorAll(".album-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCap = document.getElementById("lightboxCap");
const lightboxClose = document.getElementById("lightboxClose");

albumItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const cap = item.querySelector("figcaption");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Album";
    lightboxCap.textContent = cap?.textContent || "";

    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  lightboxCap.textContent = "";
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
});


