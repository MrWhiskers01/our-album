
const photos = [
  {
    src: "fotograflar/foto1.jpg",
    title: "En güzel gülüşün ♡",
    category: "anilar"
  },
  {
    src: "fotograflar/foto2.jpg",
    title: "Birlikte geçirdiğimiz günler",
    category: "geziler"
  },
  {
    src: "fotograflar/foto3.jpg",
    title: "Sadece sen...",
    category: "ozel"
  },
  {
    src: "fotograflar/foto4.jpg",
    title: "Güzel bir anı",
    category: "anilar"
  },
  {
    src: "fotograflar/foto5.jpg",
    title: "En sevdiğim manzara",
    category: "geziler"
  },
  {
    src: "fotograflar/foto6.jpg",
    title: "İyi ki varsın ❤️",
    category: "ozel"
  },
  {
    src: "fotograflar/foto7.jpg",
    title: "Mutlu anlarımız",
    category: "anilar"
  },
  {
    src: "fotograflar/foto8.jpg",
    title: "Birlikte her yer güzel",
    category: "geziler"
  },
  {
    src: "fotograflar/foto9.jpg",
    title: "Kalbimin en güzel köşesi",
    category: "ozel"
  },
  {
    src: "fotograflar/foto10.jpg",
    title: "Gülüşüne sakladım",
    category: "anilar"
  },
  {
    src: "fotograflar/foto11.jpg",
    title: "Küçük mutluluklar",
    category: "geziler"
  },
  {
    src: "fotograflar/foto12.jpg",
    title: "Hep böyle gül ❤️",
    category: "ozel"
  }
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");

let visiblePhotos = [...photos];
let currentIndex = 0;

function renderGallery() {
  gallery.innerHTML = "";

  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.title;
    img.loading = "lazy";

    // Eksik fotoğraflar için anlaşılır bir mesaj
    img.onerror = () => {
      img.alt = "Fotoğraf bulunamadı: " + photo.src;
      img.style.opacity = "0.25";
    };

    const overlay = document.createElement("div");
    overlay.className = "photo-overlay";

    const title = document.createElement("span");
    title.textContent = photo.title;

    overlay.appendChild(title);
    card.append(img, overlay);

    card.addEventListener("click", () => openPhoto(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto(index);
      }
    });

    gallery.appendChild(card);
  });
}

function openPhoto(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("close").focus();
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];

  largeImage.src = photo.src;
  largeImage.alt = photo.title;
  caption.textContent = photo.title;
  counter.textContent =
    `${currentIndex + 1} / ${visiblePhotos.length}`;
}

function changePhoto(direction) {
  if (!visiblePhotos.length) return;

  currentIndex =
    (currentIndex + direction + visiblePhotos.length)
    % visiblePhotos.length;

  updateLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("close").addEventListener(
  "click", closeLightbox
);

document.getElementById("prev").addEventListener(
  "click", () => changePhoto(-1)
);

document.getElementById("next").addEventListener(
  "click", () => changePhoto(1)
);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") changePhoto(1);
  if (event.key === "ArrowLeft") changePhoto(-1);
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    visiblePhotos = category === "all"
      ? [...photos]
      : photos.filter(photo => photo.category === category);

    renderGallery();
  });
});

renderGallery();


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
