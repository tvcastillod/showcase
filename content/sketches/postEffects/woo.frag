#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform sampler2D iChannel0;

uniform float radio;

uniform float scale;

//function to calculate the curvature of the distortion
vec2 curvatureGenerator(vec2 toPow, float dis) {
    float x = dis / radio;
    return toPow * (1.0 - x) * exp(-2.0 * x * x);
}

void main() {
    vec2 uv = vec2(gl_FragCoord.x / iResolution.x, 1.0 - (gl_FragCoord.y / iResolution.y));//1 - y / height (porque la y esta invertida)

    vec4 fragColor = texture2D(iChannel0, uv);

    vec2 center = iMouse.xy;

    float dis = distance(gl_FragCoord.xy, center);

    vec2 disV = gl_FragCoord.xy - center;

    if (dis < radio) {

        //apply the curvature
        vec2 trueUV = (gl_FragCoord.xy - (curvatureGenerator(disV, dis) * scale)) / iResolution.xy;

        //invert the y axis
        trueUV.y = 1.0 - trueUV.y; 

        fragColor = texture2D(iChannel0, trueUV);
    }

    gl_FragColor = fragColor;
}