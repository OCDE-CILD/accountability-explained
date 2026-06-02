document.addEventListener("DOMContentLoaded", () => {
  const sceneImage = document.getElementById("sceneImage");

  if (!sceneImage) return;

  const scenes = [
    "assets/images/california/long-beach.png",
    "assets/images/california/central-valley.png",
    "assets/images/california/san-francisco.png",
    "assets/images/california/sierras.png",
    "assets/images/california/central-coast.png"
  ];

  let currentScene = localStorage.getItem("caSceneIndex");

  if (currentScene === null) {
    currentScene = 0;
  } else {
    currentScene = (parseInt(currentScene, 10) + 1) % scenes.length;
  }

  localStorage.setItem("caSceneIndex", currentScene);

  sceneImage.src = scenes[currentScene];
});
