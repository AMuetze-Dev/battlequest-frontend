import { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import particlesOptions from "../../utils/theme";

export default function ParticlesContainer() {
    const particlesInit = useCallback(main => { loadFull(main); }, []);
    return (<Particles id="tsparticles" options={particlesOptions} init={particlesInit} />)
}