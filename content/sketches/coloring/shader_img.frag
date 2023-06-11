precision mediump float;

uniform float brightness;
uniform int blendMode;

varying vec2 vTexCoord;
uniform sampler2D base;
uniform sampler2D layer;

void main() {
  vec2 uv = vTexCoord;
  vec4 color = vec4(1.0);
  vec4 color2 = vec4(1.0);
  uv.y = 1.0 - uv.y;
  color = texture2D(base, uv);
  color2 = texture2D(layer, uv);
  vec4 uMaterial1 = color;
  vec4 uMaterial2 = color2;
  vec4 material;
  if (blendMode == 1){
    // BLEND
    material = brightness * uMaterial1 + uMaterial2;
  } else if (blendMode == 2) {
    // DARKEST
    material = min(brightness * uMaterial1, uMaterial2);
  } else if (blendMode == 3){
    // LIGHTEST
    material = max(brightness * uMaterial1, uMaterial2);
  } else if (blendMode == 4) {
    // ADDITION
    material = uMaterial1 + uMaterial2;
  } else if (blendMode == 5) {
    // PLUS DARKER
    material = uMaterial1 + uMaterial2 - vec4(1.0);
  } else if (blendMode == 6){
    // SUBSTRACT
    material = uMaterial1 - uMaterial2;
  } else if (blendMode == 7){
    // MULTIPLY
    material = uMaterial1 * uMaterial2;
  } else if (blendMode == 8){
    // SCREEN
    material = vec4(1.0)-(vec4(1.0)-uMaterial1)*(vec4(1.0)-uMaterial2);
  } else if (blendMode == 9) {
    // OVERLAY
    material = vec4(1.0);
    if (uMaterial1.r < 0.5) { material.r = 2.0 * uMaterial1.r * uMaterial1.r;
    } else { material.r = 1.0-2.0*(1.0-uMaterial1.r)*(1.0-uMaterial2.r);}
    if (uMaterial1.g < 0.5) { material.g = 2.0 * uMaterial1.g * uMaterial1.g;
    } else { material.g = 1.0-2.0*(1.0-uMaterial1.g)*(1.0-uMaterial2.g);}
    if (uMaterial1.b < 0.5) { material.b = 2.0 * uMaterial1.b * uMaterial1.b;
    } else { material.b = 1.0-2.0*(1.0-uMaterial1.b)*(1.0-uMaterial2.b);}
  } else {
    material = vec4(1.0);
  }
  gl_FragColor = vec4(material.rgb, 1.0);
}