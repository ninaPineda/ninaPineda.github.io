const galleryData = [
    {
      title: "Kopf",
      mediaType:"image",
      description:
        "Ein stylisiertes Kopfmodell, entstanden als erstes organisches Sculpting-Projekt in Blender. Statt Realismus lag der Fokus auf Struktur, Rhythmus und der Wirkung der Oberfläche. Die verwendeten Materialien stammen aus Assets – im Zentrum stand das Erlernen organischer Modellierung.",
      image: "./beispiele/kopf.png"
    },{
        title: "Fiete Animation",
        description: "Diese Animation entstand im Rahmen einer Hausarbeit im Modul 3D-Animation. Sie zeigt Fiete, den Storch, auf seinem Flug von Tansania nach Süddeutschland, um ein Geschenk nach Flensburg zu bringen. Alle gezeigten Szenen sind von mir erstellt – inklusive Modelle, Shading, Licht, Kameraführung und Rendering. Ausgenommen sind nur Adler, Taube, die fahrenden Züge sowie das Gras, welche aus externen Assets bzw. von Komilitonen stammen.",
        mediaType: "video",
        src: "./beispiele/fiete.mp4"
      },
    {
      title: "Boot",
      mediaType:"image",
      description:
        "Ein schlichtes Boot, inspiriert von nordischer Klarheit. Das Modell wurde komplett in Blender erstellt. Die Texturen stammen aus Assets – das Hauptaugenmerk lag auf der Formgestaltung, Proportion und dem strukturellen Aufbau des Modells.",
      image: "./beispiele/boot.png"
    },
    {
      title: "Lego-Figur",
      mediaType:"image",
      description:
        "Ein Fanmodell im Stil eines Produkt-Renderings. Die Geometrie wurde in Blender modelliert, die Texturen wie Kleidung und Verzierungen selbst mit Adobe Illustrator erstellt. Ziel war es, Modellierung und eigene Texturarbeit in einem stimmigen Gesamtergebnis zu vereinen.",
      image: "./beispiele/lego.png"
    },{
        title: "Meine Maus",
        mediaType:"image",
        description:
          "Ein Charaktermodell für eine fiktive Kinderserie. Der Fokus lag auf einer weichen, kindgerechten Formensprache und klaren Proportionen. Modelliert und gerendert in Blender. Die Texturierung basiert auf Standard-Assets – hier standen ausschließlich die Modellierungsfähigkeiten im Vordergrund.",
        image: "./beispiele/maus.png"
      }
  ];
  
  // 🔁 Galerie aufbauen
  const galleryContainer = document.getElementById("gallery-track");
  galleryData.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("gallery-item");
    if (item.mediaType === "image") {

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" /> `;

    } else if (item.mediaType === "video") {
        itemDiv.innerHTML = `
          <video controls muted loop playsinline style="max-width: 100%; border-radius: 0.5rem;">
            <source src="${item.src}" type="video/mp4" />
            Dein Browser unterstützt dieses Video nicht.
          </video>`;
      }
      galleryContainer.appendChild(itemDiv);
  });
  
  // ↔️ Pfeilnavigation
  let currentIndex = 0;
  function updateSlider() {
    galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  document.querySelector(".arrow.right").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateSlider();
  });
  
  document.querySelector(".arrow.left").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateSlider();
  });
  
  // 💬 Popup-Logik
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupText = document.getElementById("popup-text");
  const popupClose = document.getElementById("popup-close");
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("more-btn")) {
      const index = e.target.dataset.index;
      popupTitle.textContent = galleryData[index].title;
      popupText.textContent = galleryData[index].moreInfo;
      popup.classList.remove("hidden");
    }
  });
  
  popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  function updateSlider() {
    galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  
    // 👉 Textinhalt aktualisieren
    const titleEl = document.getElementById("detail-title");
    const infoEl = document.getElementById("detail-info");
  
    titleEl.textContent = galleryData[currentIndex].title;
    infoEl.textContent = galleryData[currentIndex].description;
  
    // Optional: Button-Daten aktualisieren, falls du den Mehr-Button behalten willst
    const moreBtn = document.getElementById("more-btn");
    moreBtn.dataset.index = currentIndex;
  }

  updateSlider();