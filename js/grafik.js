// 1. Outer Wrapper vorbereiten
const flipWrapper = document.createElement("div");
flipWrapper.id = "flipbook-wrapper";
flipWrapper.style.position = "relative";
flipWrapper.style.display = "flex";
flipWrapper.style.justifyContent = "center";
flipWrapper.style.alignItems = "center";
flipWrapper.style.marginTop = "5rem";
flipWrapper.style.gap = "2rem";

// 2. Buch-Container (Seiten nebeneinander)
const container = document.createElement("div");
container.id = "flipbook-container";
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.gap = "0.2rem";

// 3. Füge Wrapper ins DOM (z. B. direkt ins body)
document.body.insertBefore(flipWrapper, document.querySelector(".footer"));
flipWrapper.appendChild(container);

// 4. Buttons erstellen
const prevBtn = document.createElement("button");
prevBtn.textContent = "<";
prevBtn.id = "prev-btn";

const nextBtn = document.createElement("button");
nextBtn.textContent = ">";
nextBtn.id = "next-btn";

// Button-Logik
prevBtn.onclick = () => {
  if (currentPage > 2) {
    currentPage -= 2;
    renderSpread();
  }
};
nextBtn.onclick = () => {
  if (currentPage + 2 <= pdfDoc.numPages) {
    currentPage += 2;
    renderSpread();
  }
};

// Buttons zum Wrapper hinzufügen
flipWrapper.appendChild(prevBtn);
flipWrapper.appendChild(nextBtn);

// PDF laden
const pdfUrl = "../beispiele/editorial.pdf";
let currentPage = 1;
let pdfDoc = null;

function renderPage(pageNumber, canvas) {
    pdfDoc.getPage(pageNumber).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // 👇 Responsive Styling
      if (isMobile()) {
        canvas.style.width = "100vw";
        canvas.style.maxWidth = "100%";
        canvas.style.padding = "1rem";
        canvas.style.boxSizing = "border-box";
      } else {
        canvas.style.maxWidth = "35vw";
        canvas.style.height = "auto";
      }
  
      const ctx = canvas.getContext("2d");
      page.render({ canvasContext: ctx, viewport: viewport });
    });
  }
function renderSpread() {
    container.innerHTML = "";
  
    const leftCanvas = document.createElement("canvas");
    renderPage(currentPage, leftCanvas);
  
    // 👉 Mobile: Seite soll möglichst breit sein
    if (isMobile()) {
      leftCanvas.style.width = "100vw";
      leftCanvas.style.maxWidth = "100%";
      leftCanvas.style.padding = "1rem";
      leftCanvas.style.boxSizing = "border-box";
    } else {
      leftCanvas.style.maxWidth = "45vw";
      leftCanvas.style.height = "auto";
    }
  
    container.appendChild(leftCanvas);
  
    if (!isMobile() && currentPage + 1 <= pdfDoc.numPages) {
      const rightCanvas = document.createElement("canvas");
      renderPage(currentPage + 1, rightCanvas);
      rightCanvas.style.maxWidth = "45vw";
      rightCanvas.style.height = "auto";
      container.appendChild(rightCanvas);
    }
  }

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  pdfDoc = pdf;
  renderSpread();
});

prevBtn.onclick = () => {
    currentPage -= isMobile() ? 1 : 2;
    if (currentPage < 1) currentPage = 1;
    renderSpread();
  };
  
  nextBtn.onclick = () => {
    const step = isMobile() ? 1 : 2;
    if (currentPage + step <= pdfDoc.numPages) {
      currentPage += step;
      renderSpread();
    }
  };

  function isMobile() {
    return window.innerWidth <= 768;
  }