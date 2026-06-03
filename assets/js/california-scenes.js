const sceneImages = [
  "assets/images/california/long-beach.png",
  "assets/images/california/huntington-pier.png",
  "assets/images/california/coronado-bridge.png",

  "assets/images/california/central-valley.png",

  "assets/images/california/griffith-observatory.png",
  "assets/images/california/hollywood.png",

  "assets/images/california/mt-rubidoux.png",

  "assets/images/california/golden-gate.png",

  "assets/images/california/sierra-lake.png",

  "assets/images/california/central-coast.png",

  "assets/images/california/tower-bridge.png"
];

const sceneImage = document.getElementById("sceneImage");

let currentIndex = 0;
const ROTATION_INTERVAL = 5000; // 5 seconds
const FADE_DURATION = 450; // matches CSS transition

// Preload all images for smoother transitions
sceneImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

function changeScene(nextIndex) {
  if (!sceneImage) return;

  sceneImage.classList.add("is-fading");

  window.setTimeout(() => {
    sceneImage.src = sceneImages[nextIndex];
    sceneImage.classList.remove("is-fading");
  }, FADE_DURATION / 2);
}

function rotateScene() {
  currentIndex = (currentIndex + 1) % sceneImages.length;
  changeScene(currentIndex);
}

if (sceneImage) {
  // Ensure first image is loaded
  sceneImage.src = sceneImages[0];

  // Start rotation
  window.setInterval(rotateScene, ROTATION_INTERVAL);
}
