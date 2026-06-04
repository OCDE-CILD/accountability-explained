const sceneImages = [
  "assets/images/california/sacramento-capitol.png", // put your Sacramento image here
  "assets/images/california/long-beach.png",
  "assets/images/california/huntington-pier.png",
  "assets/images/california/coronado-bridge.png",
  "assets/images/california/griffith-observatory.png",
  "assets/images/california/hollywood.png",
  "assets/images/california/mt-rubidoux.png",
  "assets/images/california/central-valley.png",
  "assets/images/california/golden-gate.png",
  "assets/images/california/sierras.png",
  "assets/images/california/central-coast.png",
  "assets/images/california/tower-bridge.png"
];

const STORAGE_KEY = "californiaSceneIndex";
const sceneImage = document.getElementById("sceneImage");

function getStoredIndex() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = Number.parseInt(value ?? "0", 10);

    if (Number.isInteger(parsed) && parsed >= 0) {
      return parsed % sceneImages.length;
    }
  } catch {
    // localStorage may be unavailable; fall through to 0
  }

  return 0;
}

function setStoredIndex(index) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index % sceneImages.length));
  } catch {
    // ignore storage failures
  }
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

async function showScene(src, alt) {
  if (!sceneImage) return;

  try {
    await preloadImage(src);

    sceneImage.classList.add("is-fading");

    window.setTimeout(() => {
      sceneImage.src = src;
      sceneImage.alt = alt;
      sceneImage.classList.remove("is-fading");
    }, 150);
  } catch {
    if (sceneImages.length > 0) {
      sceneImage.src = sceneImages[0];
      sceneImage.alt = "California scenic illustration";
    }
  }
}

function initSceneRotation() {
  if (!sceneImage || sceneImages.length === 0) return;

  const currentIndex = getStoredIndex();
  const nextIndex = (currentIndex + 1) % sceneImages.length;

  showScene(sceneImages[currentIndex], "California scenic illustration");
  setStoredIndex(nextIndex);
}

document.addEventListener("DOMContentLoaded", initSceneRotation);
