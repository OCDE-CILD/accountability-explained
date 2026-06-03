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

if (sceneImage) {
  const lastIndex = Number(localStorage.getItem("lastSceneIndex"));

  let nextIndex;

  do {
    nextIndex = Math.floor(Math.random() * sceneImages.length);
  } while (
    sceneImages.length > 1 &&
    nextIndex === lastIndex
  );

  localStorage.setItem("lastSceneIndex", nextIndex);

  sceneImage.src = sceneImages[nextIndex];
}
