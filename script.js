// ================== NHẠC ==================
const bgm = document.getElementById("bgm");
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  bgm.volume = 0.5;
  bgm.play().then(() => {
    musicStarted = true;
  }).catch(() => {});
}

document.addEventListener("pointerdown", startMusic, { once: true });


// ================== VẬT RƠI ==================
const tetItems = ["🎆", "✨", "🎇", "🌟"];

const cards = [
  { img: "tet1.jpg", text: "Chúc bạn năm mới 2026 phát tài phát lộc!" },
  { img: "tet2.jpg", text: "Xuân an khang – Gia đình hạnh phúc!" },
  { img: "tet3.jpg", text: "Tết rộn ràng – Niềm vui ngập tràn!" }
];

// preload ảnh để tránh lag
window.addEventListener("load", () => {
  cards.forEach(c => {
    const img = new Image();
    img.src = c.img;
  });
});

let lastIndex = -1;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");
const popupContent = document.querySelector(".popup-content");

function createTetItem() {
  const item = document.createElement("div");
  item.className = "flower";
  item.textContent = tetItems[Math.floor(Math.random() * tetItems.length)];
  item.style.left = Math.random() * window.innerWidth + "px";
  item.style.animationDuration = 8 + Math.random() * 3 + "s";

  item.onclick = () => {
    let i;
    do {
      i = Math.floor(Math.random() * cards.length);
    } while (i === lastIndex);
    lastIndex = i;

    popupImg.classList.remove("show");
    popupImg.src = cards[i].img;
    popupText.innerText = cards[i].text;
    popup.style.display = "flex";

    setTimeout(() => popupImg.classList.add("show"), 50);
  };

  document.body.appendChild(item);
  setTimeout(() => item.remove(), 13000);
}

setInterval(createTetItem, 1000);

popup.onclick = () => popup.style.display = "none";
popupContent.onclick = e => e.stopPropagation();


// ================== PHÁO HOA ==================
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.6;
    this.particles = [];
    this.color = `hsla(${Math.random() * 360},80%,65%,0.8)`;

    for (let i = 0; i < 18; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 1.4 + 0.4,
        l: 60
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;
      p.l--;
    });
    this.particles = this.particles.filter(p => p.l > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    });
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(0,0,20,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.03) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    const f = fireworks[i];
    f.update();
    f.draw();
    if (f.particles.length === 0) {
      fireworks.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
