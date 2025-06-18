const galleryData = [
    {
      title: "Sonne im Kaffee",
      description: "Composing aus verschiedenen Bildelementen: Die Szene wurde aus einem Foto einer Kaffeetasse, Himmelsaufnahmen und mehreren Wolken- und Licht-Ebenen zusammengesetzt. Auch die Tropfen an der Tasse sind digital hinzugefügt. Ziel war es, eine surreal-poetische Bildwelt zu erschaffen.",
      image: "./beispiele/photoshop1.jpg"
    },
    {
      title: "Skyscraper trifft Natur",
      description: "Fotomontage, in der ein moderner Wolkenkratzer mitten in eine Naturaufnahme gesetzt wurde. Die Reflexionen und Lichtstimmung wurden angepasst, um das Gebäude möglichst realistisch in die Landschaft zu integrieren.",
      image: "./beispiele/photoshop2.png"
    },
    {
      title: "Meeresinsekten aus Alltagsobjekten",
      description: "Gestaltung von fantasievollen Tierwesen aus analogen Gegenständen (z. B. Steine, Muscheln, Flaschen), die digital ausgeschnitten, kombiniert und farblich angeglichen wurden. Ziel war eine glaubwürdige Hybridform aus Fotografie und Collage.",
      image: "./beispiele/photoshop3.png"
    }
  ];
  
  // 🔁 Galerie aufbauen
  const galleryContainer = document.getElementById("gallery-track");
  galleryData.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("gallery-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}" /> `;
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