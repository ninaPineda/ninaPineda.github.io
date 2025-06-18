const infos = [
  {
    title: "Beatmarker",
    desc:
      "BeatMarker ist eine minimalistische App, mit der du Musikstücke ganz einfach analysieren und die Beats visuell markieren kannst. Ideal für Tänzer:innen, Choreograf:innen oder Musiker:innen, die Takte zählen, Bewegungen timen oder rhythmische Abläufe planen wollen.",
    link: "https://ninapineda.github.io/beatmarker/index.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-0"),
    buttonText: "Zur App"
  },
  {
    title: "Adventskalender",
    desc:
      "Dieser digitale Adventskalender überrascht dich jeden Tag mit einem neuen interaktiven Rätsel, Spiel oder einer kleinen Überraschung. Ob Knobelfans, Familien oder neugierige Entdecker:innen – hier kommt jeder auf seine Kosten.",
    link: "https://ninapineda.github.io/adventskalender_website/adventskalender/home.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-1"),
    buttonText: "Türchen öffnen"
  },
  {
    title: "Spiele",
    desc:
      "Eine Sammlung von kleinen Browser-Games – darunter ein Memory-Spiel, ein Reaktionstest und ein Minispiel mit Apple TV Feeling. Alles mit HTML, CSS und JavaScript umgesetzt.",
    link: "https://ninapineda.github.io/funGame/index.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-2"),
    buttonText: "Spiele starten"
  },
  {
    title: "3D & Animation",
    desc:
      "Hier zeige ich einige meiner Arbeiten mit Blender – von modellierten Objekten bis zu animierten Szenen im Pixar-Look. Alles selfmade und mit viel Liebe zum Detail.",
    link: "/3d.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-3"),
    buttonText: "Mehr sehen"
  },
  {
    title: "Grafik & Editorial",
    desc:
      "Printdesigns, Logos und Editorials – unter anderem gestaltete Buchprojekte, Magazine und Infografiken. Fokus: Typografie, Struktur und visuelle Klarheit.",
    link: "/grafik.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-4"),
    buttonText: "Designs ansehen"
  },
  {
    title: "Photoshop Projekte",
    desc:
      "Mockups, Composings und Retuschen – ein Einblick in meine Photoshop-Projekte, von atmosphärischen Postern bis zu kreativen Bildideen.",
    link: "/photoshop.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-5"),
    buttonText: "Vorschau öffnen"
  },
  {
    title: "Programmierung",
    desc:
      "Hier geht's um Apps und Spiele, die ich mit Java, JavaScript, C#, ... entwickelt habe – von kleinen Tools bis zu komplexeren Prototypen.",
    link: "/programmierung.html",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-6"),
    buttonText: "Code ansehen"
  },
  {
    title: "GitHub",
    desc:
      "Mein GitHub-Profil zeigt die technischen Seiten meiner Projekte – von kleinen Skripten bis zu kompletten Webanwendungen.",
    link: "https://github.com/ninaPineda",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-7"),
    buttonText: "Zum GitHub-Profil"
  },
  {
    title: "LinkedIn",
    desc:
      "Hier findest du meinen Lebenslauf, meine beruflichen Stationen und wofür ich stehe – let’s connect!",
    link: "https://www.linkedin.com/in/nina-heinrich-197329250",
    color: getComputedStyle(document.documentElement).getPropertyValue("--color-8"),
    buttonText: "Profil ansehen"
  }
];
let current = 0;
let rotating = false;
let angle = 0;

let scrollBuffer = 0;
const scrollThreshold = 60;
let lastScrollTime = 0;
const scrollCooldown = 400; // in ms

window.addEventListener("wheel", (e) => {
  const now = Date.now();
  if (now - lastScrollTime < scrollCooldown) return;

  e.preventDefault();
  scrollBuffer += e.deltaY;

  if (scrollBuffer > scrollThreshold) {
    rotate(1);
    scrollBuffer = 0;
    lastScrollTime = now;
  } else if (scrollBuffer < -scrollThreshold) {
    rotate(-1);
    scrollBuffer = 0;
    lastScrollTime = now;
  }
}, { passive: false });

window.addEventListener("wheel", (e) => {
  e.preventDefault();
  angle += e.deltaY * 0.2; // etwas feiner

  const rad = document.getElementById("rad");
  rad.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(snapToNearest, 80);
}, { passive: false });

let scrollTimeout;

function snapToNearest() {
  const rad = document.getElementById("rad");
  rad.style.transition = "transform 0.4s ease-out";

  const step = 360 / infos.length;
  const snappedAngle = Math.round(angle / step) * step;
  angle = snappedAngle;

  rad.style.transform = `translate(-50%, -50%) rotate(${snappedAngle}deg)`;

  // Highlight Info + Icon
  current = ((-Math.round(snappedAngle / step)) % infos.length + infos.length) % infos.length;
  const info = infos[current];
  document.body.style.backgroundColor = info.color;
  document.getElementById("title").textContent = info.title;
  document.getElementById("desc").textContent = info.desc;
  document.getElementById("link").href = info.link;

  document.querySelectorAll('.icon').forEach(icon => icon.classList.remove('active'));
  document.getElementById(`icon${current}`).classList.add('active');

  // Transition wieder aus
  setTimeout(() => {
    rad.style.transition = "none";
  }, 500);
}

let touchY = 0;
let lastTouchY = 0;
let isTouching = false;

window.addEventListener("touchstart", (e) => {
  isTouching = true;
  touchY = e.touches[0].clientY;
  lastTouchY = touchY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  if (!isTouching) return;

  const currentY = e.touches[0].clientY;
  const deltaY = lastTouchY - currentY;
  lastTouchY = currentY;

  angle += deltaY * -0.4;
  const rad = document.getElementById("rad");
  rad.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(snapToNearest, 100);
}, { passive: true });

window.addEventListener("touchend", () => {
  isTouching = false;
  snapToNearest();
});

window.addEventListener("load", () => {
    const rad = document.getElementById("rad");

    // 1. Wobble: Vor → Mitte
    rad.style.transition = "transform 0.2s ease-out";
    rad.style.transform = `translate(-50%, -50%) rotate(10deg)`;
  
    setTimeout(() => {
      rad.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    }, 200);
  
    setTimeout(() => {
      rad.style.transition = "none"; // zurücksetzen
    }, 400);
  
    document.body.style.backgroundColor = infos[0].color;
  document.getElementById(`icon0`).classList.add('active');
});