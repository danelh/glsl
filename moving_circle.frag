// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float R = 0.03;
    float R_path = 0.2;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 center = vec2(0.5,0.5) + R_path*vec2(sin(u_time), cos(u_time));
    vec2 v_distance = (st-center)*(st-center);
    float distance = sqrt(v_distance.x + v_distance.y);
    
    float x = smoothstep(distance-0.01, distance, R);
    vec3 color =(1.0-x)*vec3(0.5)+x*vec3(0.0, 1.0, 0.0);
    

//    vec3 color = vec3(0.);
//    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}