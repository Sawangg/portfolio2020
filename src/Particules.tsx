import Particles from 'react-particles-js';

export default function Particules() {
    return (
        <Particles
            style={{ opacity: "0.6" }}
            height="100vh"
            width="100%"
            params={{
                "particles": {
                    "number": {
                        "value": 160,
                        "density": {
                            "enable": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "speed": 4,
                            "size_min": 0.3
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "random": true,
                        "speed": 1,
                        "direction": "bottom",
                        "out_mode": "out"
                    },
                    //"color": "#000000"
                },
            }}
        />
    );
}