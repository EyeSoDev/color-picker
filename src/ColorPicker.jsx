import React, { useState } from "react";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

  function handleClick(color) {
    setSelectedColor(color);
  }

  function handleMouseEnter(hex) {
    setSelectedColor({ hex, name: null });
  }

  function handleMouseLeave() {
    setSelectedColor({ hex: null, name: null });
  }

  function handleFocus(index) {
    setFocusedIndex(index);
  }

  function handleBlur() {
    setFocusedIndex(null);
  }

  function handleKeyDown(event, index) {
    if (event.key === "ArrowLeft") {
      if (index > 0) {
        setSelectedColor(colors[index - 1]);
        setFocusedIndex(index - 1);
      } else {
        setSelectedColor(colors[0]);
        setFocusedIndex(0);
      }
    } else if (event.key === "ArrowRight") {
      if (index < colors.length - 1) {
        setSelectedColor(colors[index + 1]);
        setFocusedIndex(index + 1);
      } else {
        setSelectedColor(colors[colors.length - 1]);
        setFocusedIndex(colors.length - 1);
      }
    }
  }

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, focusedIndex)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className="color-code">{selectedColor.name || color.hex}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
