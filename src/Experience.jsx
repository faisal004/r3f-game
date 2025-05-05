import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Levels from './Levels.jsx'
import { Physics } from "@react-three/rapier";

export default function Experience() {
    return <>

        <OrbitControls makeDefault />
        <Physics debug>
            <Lights />
            <Levels />

        </Physics>


    </>
}