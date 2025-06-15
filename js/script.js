    const infos = [
      {
        title: "Beatmarker",
        desc: "BeatMarker ist eine minimalistische App, mit der du Musikstücke ganz einfach analysieren und die Beats visuell markieren kannst. Ideal für Tänzer:innen, Choreograf:innen oder Musiker:innen, die Takte zählen, Bewegungen timen oder rhythmische Abläufe planen wollen.",
        link: "https://ninapineda.github.io/beatmarker/index.html",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-0')
      },
      {
        title: "Adventskalender",
        desc: "Dieser digitale Adventskalender überrascht dich jeden Tag mit einem neuen interaktiven Rätsel, Spiel oder einer kleinen Überraschung. Ob Knobelfans, Familien oder neugierige Entdecker:innen – hier kommt jeder auf seine Kosten.",
        link: "https://ninapineda.github.io/adventskalender_website/adventskalender/home.html",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-1')
      },
      {
        title: "Projekt 3",
        desc: "Beschreibung von Projekt 3.",
        link: "#",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-2')
      },
      {
        title: "Projekt 4",
        desc: "Beschreibung von Projekt 4.",
        link: "#",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-3')
      },
      {
        title: "Projekt 5",
        desc: "Beschreibung von Projekt 5.",
        link: "#",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-4')
      },
      {
        title: "Projekt 6",
        desc: "Beschreibung von Projekt 6.",
        link: "#",
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-5')
      }
    ];
    let current = 0;
    let rotating = false;

    function rotate(direction) {
      if (rotating) return;
      rotating = true;

      current = (current + direction + 6) % 6;
      const rad = document.getElementById('rad');
      rad.style.transform = `translate(-50%, -50%) rotate(${current * -60}deg)`;

      const info = infos[current];
      document.body.style.backgroundColor = info.color;
      document.getElementById('title').textContent = info.title;
      document.getElementById('desc').textContent = info.desc;
      document.getElementById('link').href = info.link;

      setTimeout(() => rotating = false, 700);
    }

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      rotate(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });