window.addEventListener("DOMContentLoaded", () => {
  const scaleSlider = document.getElementById("scaleSlider");
  const rotateButton = document.getElementById("rotateButton");

  const models = [
    {
      modelId: "astronautModel",
      soundId: "astronautSound",
      markerSelector: 'a-marker[preset="kanji"]',
    },
    {
      modelId: "roverModel",
      soundId: "roverSound",
      markerSelector: 'a-marker[preset="hiro"]',
    },
    {
      modelId: "planetModel",
      soundId: "planetSound",
      markerSelector: 'a-marker[url="markers/pattern-planet.patt"]',
    },
    {
      modelId: "shuttleModel",
      soundId: "shuttleSound",
      markerSelector: 'a-marker[url="markers/wizard.patt"]',
    },
  ];

  // Slider logic
  scaleSlider.addEventListener("input", (event) => {
    const scaleValue = parseFloat(event.target.value);
    const scaleStr = `${scaleValue} ${scaleValue} ${scaleValue}`;
    models.forEach(({ modelId }) => {
      const model = document.getElementById(modelId);
      if (model) {
        model.setAttribute("scale", scaleStr);
      }
    });
  });

  // Rotate button logic
  rotateButton.addEventListener("click", () => {
    models.forEach(({ modelId }) => {
      const model = document.getElementById(modelId);
      if (model && model.object3D.visible) {
        const rotation = model.getAttribute("rotation");
        model.setAttribute("rotation", {
          x: rotation.x,
          y: rotation.y + 45,
          z: rotation.z,
        });
      }
    });
  });

  // Sound control logic
  models.forEach(({ markerSelector, soundId }) => {
    const marker = document.querySelector(markerSelector);
    const sound = document.getElementById(soundId);

    if (marker && sound) {
      marker.addEventListener("markerFound", () => {
        sound.components.sound.playSound();
      });

      marker.addEventListener("markerLost", () => {
        sound.components.sound.stopSound();
      });
    }
  });
});
