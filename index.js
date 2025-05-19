window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("sizeSlider");
  const modelEntity = document.getElementById("dynamicModel");
  const buttons = document.querySelectorAll(".model-btn");
  const sound = document.querySelector("#roverSound");
  const marker = document.querySelector("a-marker");

  let currentModel = "Perseverance.glb";

  function loadModel(fileName) {
    currentModel = fileName;
    modelEntity.setAttribute("gltf-model", `models/${fileName}`);
    modelEntity.setAttribute("animation-mixer", ""); // Reset animation
  }

  // Load default model
  loadModel(currentModel);

  // Handle model switch
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedModel = button.dataset.model;
      loadModel(selectedModel);
    });
  });

  // Handle size slider
  slider.addEventListener("input", (e) => {
    const scale = e.target.value;
    modelEntity.setAttribute("scale", `${scale} ${scale} ${scale}`);
  });

  // Marker events for sound
  marker.addEventListener("markerFound", () => {
    sound.components.sound.playSound();
  });

  marker.addEventListener("markerLost", () => {
    sound.components.sound.stopSound();
  });
});
