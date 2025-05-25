import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Levels from './Levels.jsx'
import { Physics } from "@react-three/rapier";
import Players from './Player.jsx';

export default function Experience() {
    return <>

        <OrbitControls makeDefault />
        <Physics>
            <Lights />
            <Levels />
<Players/>
        </Physics>


    </>
}