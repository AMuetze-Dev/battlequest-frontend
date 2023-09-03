const primaryDark = "17,17,17";
const secondaryDark = "51,51,51";
const contrast = "252, 163, 17";
const secondaryLight = "229, 229, 229";
const primaryLight = "255,255,255";

const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const root = document.documentElement;
root.style.setProperty("--primary-dark", defaultDark ? primaryDark : primaryLight);
root.style.setProperty("--secondary-dark", defaultDark ? secondaryDark : secondaryLight);
root.style.setProperty("--contrast", defaultDark ? contrast : primaryDark);
root.style.setProperty("--secondary-light", defaultDark ? secondaryLight : secondaryDark);
root.style.setProperty("--primary-light", defaultDark ? primaryLight : primaryDark);

root.style.setProperty("--primary-dark-color", "rgb(var(--primary-dark))");
root.style.setProperty("--secondary-dark-color", "rgb(var(--secondary-dark))");
root.style.setProperty("--contrast-color", "rgb(var(--contrast))");
root.style.setProperty("--secondary-light-color", "rgb(var(--secondary-light))");
root.style.setProperty("--primary-light-color", "rgb(var(--primary-light))");

const particlesOptions = {
    "background": {
        "color": `rgb(${defaultDark ? primaryDark : primaryLight})`
    },
    "interactivity": {
        "events": {
            "onClick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "push": {
                "quantity": 1,
                "maxQuantity": 300
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            }
        }
    },
    "particles": {
        "color": {
            "value": `rgb(${defaultDark ? secondaryDark : secondaryLight})`
        },
        "links": {
            "color": `rgb(${defaultDark ? secondaryDark : secondaryLight})`,
            "distance": 150,
            "enable": true,
            "opacity": 0.5,
            "width": 1
        },
        "collisions": {
            "enable": true
        },
        "move": {
            "direction": "none",
            "enable": true,
            "outModes": {
                "default": "bounce"
            },
            "random": true,
            "speed": 0.5,
            "straight": false
        },
        "number": {
            "density": {
                "enable": true
            },
            "value": 350,
            "max": 400
        },
        "opacity": {
            "value": 0.5
        },
        "shape": {
            "type": "circle"
        },
        "size": {
            "random": true,
            "value": 5
        }
    }
}

export default particlesOptions;