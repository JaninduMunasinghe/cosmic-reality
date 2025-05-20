window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("sizeSlider");
  const modelEntity = document.getElementById("dynamicModel");
  const buttons = document.querySelectorAll(".model-btn");
  const sound = document.querySelector("#roverSound");
  const marker = document.querySelector("a-marker");
  const rotateLeftBtn = document.getElementById("rotateLeft");
  const rotateRightBtn = document.getElementById("rotateRight");

  let currentRotation = 0;

  let currentModel = "Perseverance.glb";

  function applyRotation() {
    modelEntity.setAttribute("rotation", `0 ${currentRotation} 0`);
  }

  rotateLeftBtn.addEventListener("click", () => {
    currentRotation -= 15; // rotate left
    applyRotation();
  });

  rotateRightBtn.addEventListener("click", () => {
    currentRotation += 15; // rotate right
    applyRotation();
  });

  // Map each model to its sound effect
  const modelSoundMap = {
    "Perseverance.glb": "rover.wav",
    "astronaut.glb": "mars.mp3",
    "planet_earth.glb": "mars.mp3",
    "space_shuttle.glb": "mars.mp3",
  };

  function loadModel(fileName) {
    currentModel = fileName;
    currentRotation = 0; // reset rotation on new model

    // Load the 3D model
    modelEntity.setAttribute("gltf-model", `models/${fileName}`);
    modelEntity.setAttribute("rotation", `0 ${currentRotation} 0`);
    modelEntity.setAttribute("animation-mixer", ""); // reset animation

    // Update the sound src
    const soundFile = modelSoundMap[fileName] || "default.wav";
    sound.setAttribute("src", `url(sounds/${soundFile})`);

    // Play the new sound if the marker is visible
    if (marker.object3D.visible) {
      sound.components.sound.stopSound(); // stop previous sound
      sound.components.sound.playSound(); // start new sound
    }
  }

  // Initial load
  loadModel(currentModel);

  // Switch model on button click
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedModel = button.dataset.model;
      loadModel(selectedModel);
    });
  });

  // Update model scale
  slider.addEventListener("input", (e) => {
    const scale = e.target.value;
    modelEntity.setAttribute("scale", `${scale} ${scale} ${scale}`);
  });

  // Play/stop sound on marker events
  marker.addEventListener("markerFound", () => {
    sound.components.sound.playSound();
  });

  marker.addEventListener("markerLost", () => {
    sound.components.sound.stopSound();
  });
});
