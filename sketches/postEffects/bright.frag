precision mediump float;

uniform sampler2D texture;
uniform vec2 iMouse;
uniform float distanceThreshold;

varying vec2 texcoords2;

void main() {
    float pct = distance(gl_FragCoord.xy, iMouse);
    pct = 1.0 - pct / distanceThreshold;
    pct = clamp(pct, 0.0, 1.0);
    vec4 color = texture2D(texture, texcoords2);
    gl_FragColor = color + vec4(pct, pct, pct, 0.0);
}
