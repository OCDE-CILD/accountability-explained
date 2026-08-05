const SCENE_ROTATE_MS = 9000;
const SCENE_FADE_MS = 1000;

const sceneImages = [
  "assets/images/california/sacramento-capitol.png",
  "assets/images/california/long-beach.png",
  "assets/images/california/huntington-pier.png",
  "assets/images/california/mission-san-juan.png",
  "assets/images/california/coronado-bridge.png",
  "assets/images/california/griffith-observatory.png",
  "assets/images/california/mt-rubidoux.png",
  "assets/images/california/fresno-underground-gardens.png",
  "assets/images/california/fresno-downtown.png",
  "assets/images/california/fresno-japanese-gardens.png",
  "assets/images/california/central-valley.png",
  "assets/images/california/san-francisco.png",
  "assets/images/california/northern-coast.png",
  "assets/images/california/sierras.png",
  "assets/images/california/central-coast.png",
  "assets/images/california/tower-bridge.png"
];

const STORAGE_KEY = "californiaSceneIndex";
const sceneBand = document.querySelector(".scene-band");
const sceneA = document.getElementById("sceneImageA");
const sceneB = document.getElementById("sceneImageB");

let currentIndex = 0;
let activeImage = sceneA;
let inactiveImage = sceneB;
let rotationTimer = null;
let isTransitioning = false;

function getStoredIndex() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = Number.parseInt(value ?? "0", 10);
    if (Number.isInteger(parsed) && parsed >= 0) {
      return parsed % sceneImages.length;
    }
  } catch {}
  return 0;
}

function setStoredIndex(index) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index % sceneImages.length));
  } catch {}
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
  if (!sceneBand || !activeImage || !inactiveImage || isTransitioning) return;
  isTransitioning = true;

  try {
    const img = new Image();
    img.src = src;
    if (typeof img.decode === "function") {
      await img.decode();
    } else {
      await preloadImage(src);
    }

    inactiveImage.src = src;
    inactiveImage.alt = alt;
    sceneBand.classList.add("is-ready");

    requestAnimationFrame(() => {
      inactiveImage.classList.add("is-active");
      activeImage.classList.remove("is-active");
    });

    window.setTimeout(() => {
      const temp = activeImage;
      activeImage = inactiveImage;
      inactiveImage = temp;
      isTransitioning = false;
    }, SCENE_FADE_MS);
  } catch {
    if (sceneImages.length > 0) {
      activeImage.src = sceneImages[0];
      activeImage.alt = "California scenic illustration";
      activeImage.classList.add("is-active");
    }
    sceneBand.classList.add("is-ready");
    isTransitioning = false;
  }
}

function advanceScene() {
  if (!sceneBand || sceneImages.length === 0 || isTransitioning) return;

  const src = sceneImages[currentIndex];
  const nextIndex = (currentIndex + 1) % sceneImages.length;

  void showScene(src, "California scenic illustration").then(() => {
    currentIndex = nextIndex;
    setStoredIndex(currentIndex);
  });
}

function initSceneRotation() {
  if (!sceneBand || sceneImages.length === 0) return;

  currentIndex = getStoredIndex();

  activeImage.src = sceneImages[currentIndex];
  activeImage.alt = "California scenic illustration";
  activeImage.classList.add("is-active");
  sceneBand.classList.add("is-ready");

  currentIndex = (currentIndex + 1) % sceneImages.length;
  setStoredIndex(currentIndex);

  rotationTimer = window.setInterval(advanceScene, SCENE_ROTATE_MS);
}

window.addEventListener("load", initSceneRotation);