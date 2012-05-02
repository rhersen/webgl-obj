uniform mat4 perspective;
uniform mat4 view;
uniform mat4 xRotation;
uniform mat4 yRotation;
varying vec4 color;
attribute vec4 pos;

void main() {
  gl_Position = perspective * view * xRotation * yRotation * pos;
  color = pos;
}
