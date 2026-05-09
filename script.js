// ============================================
// PROJECTS DATA
// ============================================
const projects = [
  {
    name: "Calculator",
    emoji: "🧮",
    tag: "tool",
    desc: "A clean, working calculator that handles your everyday math without the clutter. Buttons, screen, vibes.",
    live: "https://calculator-mauve-ten-45.vercel.app/",
    code: "https://github.com/ravisharma-09/Calculator",
  },
  {
    name: "Counter",
    emoji: "🔢",
    tag: "tool",
    desc: "Click up, click down, reset. The hello-world of state — but I made it look good.",
    live: "https://counter-eta-murex.vercel.app/",
    code: "https://github.com/ravisharma-09/counter",
  },
  {
    name: "Tic Tac Toe",
    emoji: "❌",
    tag: "game",
    desc: "Classic 2-player Xs and Os. Keeps score, picks winners, refuses to let you cheat.",
    live: "https://tic-tac-toe-liart-five.vercel.app/",
    code: "https://github.com/ravisharma-09/tic-tac-toe",
  },
  {
    name: "Live Clock",
    emoji: "⏰",
    tag: "util",
    desc: "A real-time clock ticking right in your browser. Hours, minutes, seconds — synced and smooth.",
    live: "https://clocfk.vercel.app/",
    code: "https://github.com/ravisharma-09/clock",
  },
  {
    name: "Guess It",
    emoji: "🎯",
    tag: "game",
    desc: "Guess the secret number. The game tells you higher or lower until you nail it.",
    live: "https://guess-it-phi.vercel.app/",
    code: "https://github.com/ravisharma-09/guess_it",
  },
  {
    name: "Color Suggestion",
    emoji: "🎨",
    tag: "tool",
    desc: "Random color palettes on demand. Hit the button, get hex codes, copy and ship.",
    live: "https://color-suggestion.vercel.app/",
    code: "https://github.com/ravisharma-09/color-suggestion",
  },
  {
    name: "Feedback Form",
    emoji: "💬",
    tag: "tool",
    desc: "A clean feedback form with input validation. Send thoughts, get a confirmation, simple as that.",
    live: "https://feedback-nu-henna.vercel.app/",
    code: "https://github.com/ravisharma-09/feedback",
  },
  {
    name: "Height Converter",
    emoji: "📏",
    tag: "util",
    desc: "Switch between feet, inches, cm and meters instantly. No more google searches mid-conversation.",
    live: "https://height-converter.vercel.app/",
    code: "https://github.com/ravisharma-09/Height-converter",
  },
  {
    name: "Weight Converter",
    emoji: "⚖️",
    tag: "util",
    desc: "Kg to lbs and back, plus a few extras. Type a number, get the answer — no fuss.",
    live: "https://weight-converter-nine.vercel.app/",
    code: "https://github.com/ravisharma-09/weight-converter",
  },
  {
    name: "Stone Paper Scissors",
    emoji: "✊",
    tag: "game",
    desc: "Best of luck against the machine. Rock, paper, scissors with a running scoreboard.",
    live: "https://stone-paper-nine.vercel.app/",
    code: "https://github.com/ravisharma-09/Stone-Paper",
  },
  {
    name: "Password Generator",
    emoji: "🔐",
    tag: "tool",
    desc: "Generate strong, random passwords instantly. Pick your length, mix in symbols, numbers, and cases — copy and go.",
    live: "https://password-genrator-murex.vercel.app/",
    code: "https://github.com/ravisharma-09/password-genrator",
  },
];

// ============================================
// RENDER PROJECT CARDS
// ============================================
const grid = document.getElementById("grid");

function renderCards(filter = "all") {
  grid.innerHTML = "";
  const filtered = filter === "all" ? projects : projects.filter((p) => p.tag === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;font-weight:700;font-size:18px;">no projects in this category yet — check back soon!</p>`;
    return;
  }

  filtered.forEach((p, idx) => {
    const realIdx = projects.indexOf(p) + 1;
    const card = document.createElement("article");
    card.className = `card c-${realIdx}`;
    card.style.animationDelay = `${idx * 0.05}s`;
    card.innerHTML = `
      <div class="card-num">${String(realIdx).padStart(2, "0")}</div>
      <div class="card-emoji">${p.emoji}</div>
      <h3 class="card-title">${p.name}</h3>
      <span class="card-tag">${p.tag.toUpperCase()}</span>
      <p class="card-desc">${p.desc}</p>
      <div class="card-actions">
        <a class="card-btn live" href="${p.live}" target="_blank" rel="noopener">LIVE DEMO ↗</a>
        <a class="card-btn code" href="${p.code}" target="_blank" rel="noopener">CODE ↗</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderCards();

// ============================================
// FILTERS
// ============================================
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  });
});

// ============================================
// COUNTER ANIMATION (intersection observer)
// ============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".stat-num[data-target]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
counters.forEach((c) => counterObserver.observe(c));

// ============================================
// PARALLAX ENGINE
// ============================================
const parallaxEls = document.querySelectorAll("[data-parallax]");
let scrollY = window.scrollY;
let parallaxTicking = false;

function applyParallax() {
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;
    const rotate = parseFloat(el.dataset.rotate) || 0;
    const offset = scrollY * speed;
    el.style.transform = `translate3d(0, ${-offset}px, 0) rotate(${rotate}deg)`;
  });
  parallaxTicking = false;
}

function onScrollParallax() {
  scrollY = window.scrollY;
  if (!parallaxTicking) {
    requestAnimationFrame(applyParallax);
    parallaxTicking = true;
  }
}

window.addEventListener("scroll", onScrollParallax, { passive: true });
applyParallax();

// ============================================
// MOUSE PARALLAX on hero (subtle)
// ============================================
const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    document.querySelectorAll(".stat-card").forEach((card, i) => {
      const factor = (i + 1) * 4;
      card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
  hero.addEventListener("mouseleave", () => {
    document.querySelectorAll(".stat-card").forEach((card) => {
      card.style.transform = "";
    });
  });
}

// ============================================
// CARD TILT ON MOUSE MOVE (subtle)
// ============================================
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const distX = (e.clientX - cardCenterX) / rect.width;
    const distY = (e.clientY - cardCenterY) / rect.height;
    const dist = Math.sqrt(distX * distX + distY * distY);
    if (dist < 0.7) {
      const tx = -distX * 4;
      const ty = -distY * 4;
      card.style.setProperty("--tx", `${tx}px`);
      card.style.setProperty("--ty", `${ty}px`);
    }
  });
});

// ============================================
// KONAMI-LITE: type "ravi" to flip the page
// ============================================
let buf = "";
window.addEventListener("keydown", (e) => {
  buf = (buf + e.key.toLowerCase()).slice(-4);
  if (buf === "ravi") {
    document.body.style.transition = "transform 0.6s ease";
    document.body.style.transform = "rotate(360deg)";
    setTimeout(() => {
      document.body.style.transform = "rotate(0)";
    }, 700);
  }
});

// ============================================
// STAGGERED CARD REVEAL
// ============================================
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

new MutationObserver(() => {
  document.querySelectorAll(".card").forEach((card) => {
    if (!card.dataset.observed) {
      card.dataset.observed = "1";
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease";
      cardObserver.observe(card);
    }
  });
}).observe(grid, { childList: true });

// trigger initial reveal
document.querySelectorAll(".card").forEach((card) => {
  card.dataset.observed = "1";
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease";
  cardObserver.observe(card);
});
