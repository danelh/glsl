// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float get_distance(vec2 center, vec2 st){
    vec2 v_distance = (st-center)*(st-center);
    return sqrt(v_distance.x + v_distance.y);
}

float plot_cirle(float r_path, float r, float u_time, vec2 st){
    vec2 center = vec2(0.5,0.5) + r_path*vec2(sin(u_time*2.0), cos(u_time));
    float distance = get_distance(center, st);
    return smoothstep(distance-0.01, distance, r);

}


void main() {
    float R = 0.03;
    float R_path = 0.2;
    
    float R2 = 0.03;
    float R2_path = 0.3;

    float R3 = 0.03;
    float R3_path = 0.4;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float c1 = plot_cirle(R_path, R, u_time, st);
    float c2 = plot_cirle(R2_path, R2, u_time, st);
    float c3 = plot_cirle(R3_path, R3, u_time, st);
    
    vec3 color =c1*vec3(0.0, 1.0, 0.0) + c2*vec3(0.0, 0.0, 1.0) + c3*(vec3(1.0, 0.0, 0.0));
    

//    vec3 color = vec3(0.);
//    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}