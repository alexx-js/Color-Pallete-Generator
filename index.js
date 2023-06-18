const form = document.querySelector("form");
const input = document.querySelector("#hex");
const colorsDiv = document.querySelector("#colors");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const hex = input.value;

  if (!isValidHex(hex)) {
    alert("Ingrese un código hexadecimal válido.");
    return;
  }

  const colors = generateColors(hex);

  renderColors(colors);
});

function isValidHex(hex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

function generateColors(hex) {
  const baseRgb = hexToRgb(hex);
  const colorVariations = [
    { r: -30, g: 0, b: 0 },
    { r: 0, g: -30, b: 0 },
    { r: 0, g: 0, b: -30 },
    { r: 30, g: 0, b: 0 },
    { r: 0, g: 30, b: 0 },
    { r: 0, g: 0, b: 30 },
  ];

  const colors = colorVariations.map((variation) => {
    return {
      r: Math.min(255, Math.max(0, baseRgb.r + variation.r)),
      g: Math.min(255, Math.max(0, baseRgb.g + variation.g)),
      b: Math.min(255, Math.max(0, baseRgb.b + variation.b)),
    };
  });

  return colors;
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

function renderColors(colors) {
  colorsDiv.innerHTML = "";

  colors.forEach((color) => {
    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    const colorCode = document.createElement("div");
    colorCode.className = "color-code";
    colorCode.innerText = `RGB: ${color.r}, ${color.g}, ${
      color.b
    }\nHEX: ${rgbToHex(color.r, color.g, color.b)}`;

    colorBox.appendChild(colorCode);
    colorsDiv.appendChild(colorBox);
  });
}

function rgbToHex(r, g, b) {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}

