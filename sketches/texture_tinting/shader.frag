precision mediump float;

uniform sampler2D uSampler;
uniform float R;
uniform float G;
uniform float B;

uniform float uTintAmount;

varying vec2 texcoords2;

uniform float uMouseX;

void main() {
    vec4 uTint = vec4(R, G, B, 1.0);
    // Sample the texture at the current UV coordinates
    vec4 texel = texture2D(uSampler, texcoords2);

    // Compare the x-coordinate of the current pixel with the mouse's x-coordinate
    if (texcoords2.x > uMouseX) {
        // Get the distance between the current pixel and the mouse's x-coordinate
        float distance = abs(texcoords2.x - uMouseX);
        // Mix the texture color with the tint color
        vec4 tintedTexel = mix(texel, uTint, uTintAmount * distance);

        // Set the output color to the tinted texture color
        gl_FragColor = tintedTexel;
    } else {
        // Set the output color to the original texture color
        gl_FragColor = texel;
    }
}