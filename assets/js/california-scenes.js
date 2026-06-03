const sceneImages = [
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

const sceneImage = document.getElementById("sceneImage");
const STORAGE_KEY = "californiaSceneIndex";

function getStoredIndex() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = Number.parseInt(value ?? "0", 10);

    if (Number.isInteger(parsed) && parsed >= 0) {
      return parsed;
    }
  } catch {
    // localStorage may be unavailable; fall through to 0
  }

  return 0;
}

function setStoredIndex(index) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // ignore storage failures
  }
}

function showScene(src, alt) {
  if (!sceneImage) return;

  const preload = new Image();

  preload.onload = () => {
    sceneImage.src = src;
    sceneImage.alt = alt;
  };

  preload.onerror = () => {
    // Fallback to the first image if the chosen file is missing
    sceneImage.src = sceneImages[0];
    sceneImage.alt = "California scenic illustration";
  };

  preload.src = src;
}

if (sceneImage && sceneImages.length > 0) {
  const currentIndex = getStoredIndex() % sceneImages.length;
  const nextIndex = (currentIndex + 1) % sceneImages.length;

  showScene(sceneImages[currentIndex], "California scenic illustration");
  setStoredIndex(nextIndex);
}
