// AÇIKLAMA EKLEME ALANI:
const customTitles = {
  1: "En güzel gülüşün ♡",
  2: "Birlikte geçirdiğimiz günler",
};

const categories = ["anilar", "geziler", "ozel"];

// 1'den 500'e kadar tüm fotoğrafları oluştur
const allPhotos = [];
for (let i = 1; i <= 500; i++) {
  allPhotos.push({
    src: `fotograflar/foto${i}.jpg`,
    title: customTitles[i] || "",
    category: categories[(i - 1) % 3]
  });
}

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");

let currentCategory = "all";
let loadedPhotos = [];
let currentIndex = 0;

function renderGallery() {
  gallery.innerHTML = "";
  loadedPhotos = [];

  const filteredList = currentCategory === "all"
    ? allPhotos
    : allPhotos.filter(p => p.category === currentCategory);

  filteredList.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.title || "Fotoğraf";
    img.loading = "lazy";

    img.onerror = () => {
      card.remove();
    };

    img.onload = () => {
      loadedPhotos.push(photo);

      card.addEventListener("click", () => openPhoto(photo));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPhoto(photo);
        }
      });
    };

    if (photo.title) {
      const overlay = document.createElement("div");
      overlay.className = "photo-overlay";

      const title = document.createElement("span");
      title.textContent = photo.title;

      overlay.appendChild(title);
      card.append(img, overlay);
    } else {
      card.append(img);
    }

    gallery.appendChild(card);
  });
}

function openPhoto(photo) {
  currentIndex = loadedPhotos.indexOf(photo);
  if (currentIndex === -1) currentIndex = 0;

  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("close").focus();
}

function updateLightbox() {
  if (!loadedPhotos.length) return;
  const photo = loadedPhotos[currentIndex];

  largeImage.src = photo.src;
  largeImage.alt = photo.title || "Fotoğraf";
  
  if (photo.title) {
    caption.textContent = photo.title;
    caption.style.display = "block";
  } else {
    caption.textContent = "";
    caption.style.display = "none";
  }

  counter.textContent = `${currentIndex + 1} / ${loadedPhotos.length}`;
}

function changePhoto(direction) {
  if (!loadedPhotos.length) return;

  currentIndex = (currentIndex + direction + loadedPhotos.length) % loadedPhotos.length;
  updateLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("close").addEventListener("click", closeLightbox);
document.getElementById("prev").addEventListener("click", () => changePhoto(-1));
document.getElementById("next").addEventListener("click", () => changePhoto(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") changePhoto(1);
  if (event.key === "ArrowLeft") changePhoto(-1);
});

// Filtreleme
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    renderGallery();
  });
});

renderGallery();

// Bizim Şarkımız MP3 Çalar Kodları
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Müziği duraklat");
      musicStatus.textContent = "Şimdi çalıyor ♡";
    } catch (error) {
      musicStatus.textContent = "Müzik dosyasını kontrol et";
    }
  } else {
    music.pause();
    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Müziği başlat");
    musicStatus.textContent = "Müzik duraklatıldı";
  }
});

music.addEventListener("ended", () => {
  musicToggle.textContent = "▶";
  musicStatus.textContent = "Müzik sona erdi";
});

music.addEventListener("error", () => {
  musicStatus.textContent = "sarki.mp3 dosyası bulunamadı";
});

// Sayaç Fonksiyonu
function updateCounter() {
  const startDate = new Date("2026-05-04T04:38:00"); 
  const now = new Date();
  
  let diff = now - startDate;
  if (diff < 0) diff = 0;

  const totalHours = Math.floor(diff / (1000 * 60 * 60));

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const elYears = document.getElementById('c-years');
  const elMonths = document.getElementById('c-months');
  const elDays = document.getElementById('c-days');
  const elHours = document.getElementById('c-hours');
  const elMinutes = document.getElementById('c-minutes');
  const elSeconds = document.getElementById('c-seconds');
  const elTotal = document.getElementById('c-total-hours');

  if (elYears) elYears.innerText = years;
  if (elMonths) elMonths.innerText = months;
  if (elDays) elDays.innerText = days;
  if (elHours) elHours.innerText = hours;
  if (elMinutes) elMinutes.innerText = minutes;
  if (elSeconds) elSeconds.innerText = seconds;
  if (elTotal) elTotal.innerText = totalHours.toLocaleString('tr-TR');
}

setInterval(updateCounter, 1000);
updateCounter();

// Kenardaki Spotify Kutu Aç/Kapa Butonu
const spotifyBtn = document.getElementById("toggle-spotify-btn");
const spotifyBody = document.getElementById("spotify-body");

if (spotifyBtn && spotifyBody) {
  spotifyBtn.addEventListener("click", () => {
    spotifyBody.classList.toggle("collapsed");
    spotifyBtn.textContent = spotifyBody.classList.contains("collapsed") ? "+" : "−";
  });
}

// --- TXT DOSYASINDAN ŞİİR YÜKLEME ALANI ---
let poems = [];
let currentPoemIndex = 0;

const poemModal = document.getElementById("poemModal");
const openPoemFloatingBtn = document.getElementById("openPoemFloatingBtn");
const closePoemBtn = document.getElementById("closePoemBtn");
const poemTitle = document.getElementById("poemTitle");
const poemText = document.getElementById("poemText");
const poemCounter = document.getElementById("poemCounter");
const prevPoemBtn = document.getElementById("prevPoemBtn");
const nextPoemBtn = document.getElementById("nextPoemBtn");

// siirler.txt dosyasını oku ve ayrıştır
async function loadPoemsFromTxt() {
  try {
    const response = await fetch('siirler.txt');
    if (!response.ok) throw new Error('siirler.txt bulunamadı');
    const rawText = await response.text();

    const rawPoems = rawText.split('---');
    
    poems = rawPoems.map((block) => {
      const lines = block.trim().split('\n');
      let title = "";
      let contentLines = [];

      lines.forEach(line => {
        if (line.trim().startsWith('#')) {
          title = line.replace('#', '').trim();
        } else {
          contentLines.push(line);
        }
      });

      return {
        title: title, // Başlık yoksa boş kalır
        text: contentLines.join('\n').trim()
      };
    }).filter(p => p.text.length > 0);

    updatePoem();
  } catch (error) {
    poemTitle.textContent = "Hata";
    poemText.textContent = "siirler.txt dosyası okunamadı veya bulunamadı.";
  }
}

function updatePoem() {
  if (!poems.length) return;
  const poem = poems[currentPoemIndex];

  // Başlık varsa gösterir, yoksa gizler (otomatik isim atanmaz)
  if (poem.title) {
    poemTitle.textContent = poem.title;
    poemTitle.style.display = "block";
  } else {
    poemTitle.textContent = "";
    poemTitle.style.display = "none";
  }

  poemText.textContent = poem.text;
  poemCounter.textContent = `${currentPoemIndex + 1} / ${poems.length}`;
}

if (openPoemFloatingBtn && poemModal) {
  openPoemFloatingBtn.addEventListener("click", () => {
    currentPoemIndex = 0;
    loadPoemsFromTxt();
    poemModal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  closePoemBtn.addEventListener("click", () => {
    poemModal.classList.remove("open");
    document.body.style.overflow = "";
  });

  poemModal.addEventListener("click", (e) => {
    if (e.target === poemModal) {
      poemModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  prevPoemBtn.addEventListener("click", () => {
    if (!poems.length) return;
    currentPoemIndex = (currentPoemIndex - 1 + poems.length) % poems.length;
    updatePoem();
  });

  nextPoemBtn.addEventListener("click", () => {
    if (!poems.length) return;
    currentPoemIndex = (currentPoemIndex + 1) % poems.length;
    updatePoem();
  });
}