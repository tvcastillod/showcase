precision mediump float;

uniform sampler2D texture;
uniform float uDivisor;

varying vec2 texcoords2;

void main() {
  vec4 color = texture2D(texture, texcoords2);
  color.rgb = floor(color.rgb * uDivisor) / uDivisor; //change color depth
  gl_FragColor = color;
}