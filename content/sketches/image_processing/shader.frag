precision mediump float;

uniform sampler2D texture;

uniform vec2 texOffset;
uniform float mask[9];
uniform float mask2[25];
uniform bool mask5;
uniform vec2 mousePos;
uniform int tool;
uniform int btool;
uniform float radius;
uniform vec2 tiling; 
uniform vec2 offset;

varying vec2 vTexCoord;

vec4 color_mask;
vec4 color_normal;
vec4 color_base;

vec4 applyMask2(vec2 vTexCoord) {
  vec2 tc0 = vTexCoord + vec2(-2.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc1 = vTexCoord + vec2(-1.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc2 = vTexCoord + vec2(             0.0, -2.0*texOffset.t);
  vec2 tc3 = vTexCoord + vec2(+1.0*texOffset.s, -2.0*texOffset.t);
  vec2 tc4 = vTexCoord + vec2(+2.0*texOffset.s, -2.0*texOffset.t);
  
  vec2 tc5 = vTexCoord + vec2(-2.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc6 = vTexCoord + vec2(-1.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc7 = vTexCoord + vec2(             0.0, -1.0*texOffset.t);
  vec2 tc8 = vTexCoord + vec2(+1.0*texOffset.s, -1.0*texOffset.t);
  vec2 tc9 = vTexCoord + vec2(+2.0*texOffset.s, -1.0*texOffset.t);
  
  vec2 tc10 = vTexCoord + vec2(-2.0*texOffset.s,              0.0);
  vec2 tc11 = vTexCoord + vec2(-1.0*texOffset.s,              0.0);
  vec2 tc12 = vTexCoord + vec2(             0.0,              0.0);
  vec2 tc13 = vTexCoord + vec2(+1.0*texOffset.s,              0.0);
  vec2 tc14 = vTexCoord + vec2(+2.0*texOffset.s,              0.0);
  
  vec2 tc15 = vTexCoord + vec2(-2.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc16 = vTexCoord + vec2(-1.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc17 = vTexCoord + vec2(             0.0, +1.0*texOffset.t);
  vec2 tc18 = vTexCoord + vec2(+1.0*texOffset.s, +1.0*texOffset.t);
  vec2 tc19 = vTexCoord + vec2(+2.0*texOffset.s, +1.0*texOffset.t);
  
  vec2 tc20 = vTexCoord + vec2(-2.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc21 = vTexCoord + vec2(-1.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc22 = vTexCoord + vec2(             0.0, +2.0*texOffset.t);
  vec2 tc23 = vTexCoord + vec2(+1.0*texOffset.s, +2.0*texOffset.t);
  vec2 tc24 = vTexCoord + vec2(+2.0*texOffset.s, +2.0*texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[25];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);
  rgba[9] = texture2D(texture, tc9);
  rgba[10] = texture2D(texture, tc10);
  rgba[11] = texture2D(texture, tc11);
  rgba[12] = texture2D(texture, tc12);
  rgba[13] = texture2D(texture, tc13);
  rgba[14] = texture2D(texture, tc14);
  rgba[15] = texture2D(texture, tc15);
  rgba[16] = texture2D(texture, tc16);
  rgba[17] = texture2D(texture, tc17);
  rgba[18] = texture2D(texture, tc18);
  rgba[19] = texture2D(texture, tc19);
  rgba[20] = texture2D(texture, tc20);
  rgba[21] = texture2D(texture, tc21);
  rgba[22] = texture2D(texture, tc22);
  rgba[23] = texture2D(texture, tc23);
  rgba[24] = texture2D(texture, tc24);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 25; i++) {
    convolution += rgba[i]*mask2[i];
  }
  
  vec4 color_mask = vec4(convolution.rgb, 1.0);
  return color_mask;
}

vec4 applyMask(vec2 vTexCoord) {
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = vTexCoord + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = vTexCoord + vec2(         0.0, -texOffset.t);
  vec2 tc2 = vTexCoord + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = vTexCoord + vec2(-texOffset.s,          0.0);
  
  // origin (current fragment texcoords)
  vec2 tc4 = vTexCoord + vec2(         0.0,          0.0);
  vec2 tc5 = vTexCoord + vec2(+texOffset.s,          0.0);
  vec2 tc6 = vTexCoord + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = vTexCoord + vec2(         0.0, +texOffset.t);
  vec2 tc8 = vTexCoord + vec2(+texOffset.s, +texOffset.t);

  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }
  
  vec4 color_mask = vec4(convolution.rgb, 1.0);
  return color_mask;
}

float intensity(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

float value(vec3 texel) {
  return max(max(texel.r, texel.g), texel.b);
}

float lightness(vec3 texel) {
  float mx = max(max(texel.r, texel.g), texel.b);
  float mn = min(min(texel.r, texel.g), texel.b);
  return (mx + mn)/2.0;
}

float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

void main() {
  if (mask5 == true) {
    color_mask = applyMask2(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask2(vTexCoord * tiling + offset);
  } else {
    color_mask = applyMask(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask(vTexCoord * tiling + offset);
  }
  
  if (btool == 2) {
    color_mask = vec4(vec3(intensity(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(intensity(color_normal.xyz)),1.0);
    color_base = vec4(vec3(intensity(color_base.xyz)),1.0);
  } else if (btool == 3) {
    color_mask = vec4(vec3(value(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(value(color_normal.xyz)),1.0);
    color_base = vec4(vec3(value(color_base.xyz)),1.0);
  } else if (btool == 4) {
    color_mask = vec4(vec3(lightness(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(lightness(color_normal.xyz)),1.0);
    color_base = vec4(vec3(lightness(color_base.xyz)),1.0);
  } else if (btool == 5) {
    color_mask = vec4(vec3(luma(color_mask.xyz)),1.0);
    color_normal = vec4(vec3(luma(color_normal.xyz)),1.0);
    color_base = vec4(vec3(luma(color_base.xyz)),1.0);
  } else if (mask5 == true){
    color_mask = applyMask2(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask2(vTexCoord * tiling + offset);
  } else {
    color_mask = applyMask(vTexCoord);
    color_normal = texture2D(texture, vTexCoord);
    color_base = applyMask(vTexCoord * tiling + offset);
  }
    
  // cálculo de la distancia tomado de https://stackoverflow.com/questions/45270803/webgl-shader-to-color-the-texture-according-to-mouse-position
  float dist = distance(mousePos, gl_FragCoord.xy);
  float mixAmount = clamp((dist - radius) , 0., 1.);
  
  if (tool == 1) {
    gl_FragColor = color_mask;
  } else if (tool == 2) {
    gl_FragColor = mix(color_mask, color_normal, mixAmount);
  } else {
    gl_FragColor = mix(color_base, color_mask, mixAmount);
  }
}