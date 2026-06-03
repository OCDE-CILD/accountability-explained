const sceneImages = [
  "assets/images/california/long-beach.png",
  "assets/images/california/huntington-pier.png",
  "assets/images/california/coronado-bridge.png",
  "assets/images/california/central-valley.png",
  "assets/images/california/griffith-observatory.png",
  "assets/images/california/hollywood.png",
  "assets/images/california/mt-rubidoux.png",
  "assets/images/california/golden-gate.png",
  "assets/images/california/sierras.png",
  "assets/images/california/central-coast.png",
  "assets/images/california/tower-bridge.png"
];

const sceneImage = document.getElementById("sceneImage");
const STORAGE_KEY = "lastSceneIndex";

function pickSceneIndex() {
  const lastIndex = Number(localStorage.getItem(STORAGE_KEY));
  let nextIndex = Math.floor(Math.random() * sceneImages.length);

  while (sceneImages.length > 1 && nextIndex === lastIndex) {
    nextIndex = Math.floor(Math.random() * sceneImages.length);
  }

  localStorage.setItem(STORAGE_KEY, String(nextIndex));
  return nextIndex;
}

if (sceneImage) {
  const src = sceneImages[pickSceneIndex()];

  const preload = new Image();
  preload.onload = () => {
    sceneImage.src = src;
    sceneImage.alt = "California scenic illustration";
  };

  preload.onerror = () => {
    sceneImage.src = "assets/images/california/long-beach.png";
    sceneImage.alt = "California scenic illustration";
  };

  preload.src = src;
}
