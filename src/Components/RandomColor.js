import { useState } from "react";

export default function RandomColor(name) {
  const [color] = useState(stringToHslColor(name, 80, 50));
  return color;
}

function stringToHslColor(str, s, l) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}
