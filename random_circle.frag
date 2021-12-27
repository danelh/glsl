// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rnd(float i) {
	//return mod(4000.*sin(2945234.345*i+45.345),1.);
    return fract(sin(dot(vec2(i+272.0,i),  vec2(12.9898,78.233)))*
        43749.6453156);

}


float get_distance(vec2 center, vec2 st){
    vec2 v_distance = (st-center)*(st-center);
    return sqrt(v_distance.x + v_distance.y);
}

float plot_cirle(vec2 center, float r, vec2 st){    
    float distance = get_distance(center, st);
    return smoothstep(distance-0.01, distance, r);
}

vec2 get_center_location(float r_path, float u_time){
    return vec2(0.5,0.5) + r_path*vec2(sin(u_time*4.0), cos(u_time));
}


void main() {
    const int CIRCLE_COUNT = 250 ;
    float r_list[CIRCLE_COUNT];
    vec2 center_list[CIRCLE_COUNT];
    vec3 color_list[CIRCLE_COUNT];
    for(int i=0; i<CIRCLE_COUNT;++i){
    	r_list[i] = 0.01;
    }
    for(int i=0; i<CIRCLE_COUNT;++i){
    	center_list[i] = vec2(rnd(float(i+1)+9.3), rnd(0.1*float(i+1)+80.4));
    }
    for(int i=0; i<CIRCLE_COUNT;++i){
    	//vec3 current_color = vec3(0.0);
        //current_color[i] = 1.0;
        color_list[i] = vec3(rnd(float(i+1)+85.3), rnd(22.4*float(i+1)+0.4), rnd(9.82*float(i+1)+0.9));
    }


    
    float R = 0.03;
    float R_path = 0.2;
    
    float R2 = 0.03;
    float R2_path = 0.3;

    float R3 = 0.03;
    float R3_path = 0.4;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    //vec2 center_1 = get_center_location(R_path, u_time);
    //vec2 center_2 = get_center_location(R2_path, u_time);
    //vec2 center_3 = get_center_location(R3_path, u_time);
    //float c1 = plot_cirle(center_1, R, st);
    //float c2 = plot_cirle(center_2, R2, st);
    //float c3 = plot_cirle(center_3, R3, st);
    
    //vec3 color =c1*vec3(0.0, 1.0, 0.0) + c2*vec3(0.0, 0.0, 1.0) + c3*(vec3(1.0, 0.0, 0.0));
    
    vec3 color = vec3(0.0);
    for(int i=0; i<CIRCLE_COUNT;++i){
        color += plot_cirle(center_list[i], r_list[i], st)*color_list[i];        
    }
    
    
    
    
    

//    vec3 color = vec3(0.);
//    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(color,1.0);
}