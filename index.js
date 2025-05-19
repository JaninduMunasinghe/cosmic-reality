window.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("sizeSlider");
  const model = document.getElementById("model");
  const sound = document.querySelector("#roverSound");
  const marker = document.querySelector("a-marker");

  slider.addEventListener("input", (e) => {
    const scale = e.target.value;
    model.setAttribute("scale", `${scale} ${scale} ${scale}`);
  });

  marker.addEventListener("markerFound", () => {
    sound.components.sound.playSound();
  });

  marker.addEventListener("markerLost", () => {
    sound.components.sound.stopSound();
  });
});
