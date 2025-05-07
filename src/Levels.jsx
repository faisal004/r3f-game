import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
// const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

function BlockStart({ position = [0, 0, 0] }) {
    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor1Material} position={[0, - 0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />

    </group>

}
function BlockEnd({ position = [0, 0, 0] }) {

    const trophy = useGLTF('/model.gltf')
    const { scene } = useGLTF('/model.gltf')

    console.log(trophy)
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true // optional
        }
      })
    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor1Material} position={[0, 0, 0]} scale={[4, 0.2, 4]} receiveShadow />
        <primitive object={trophy.scene}  scale={0.6}/>
    </group>

}
function BlockSpinner({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? - 1 : 1))
    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })
    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor2Material} position={[0, - 0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0.2}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow />

        </RigidBody>
    </group>

}
function BlockLimbo({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [timeOffSet] = useState(() => Math.random() * Math.PI * 2)
    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const y = Math.sin(time + timeOffSet) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
    })
    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor2Material} position={[0, - 0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0.2}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow />

        </RigidBody>
    </group>

}
function BlockAxe({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2] })
    })

    return <group position={position}>
        <mesh geometry={boxGeometry} material={floor2Material} position={[0, - 0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
        <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow receiveShadow />        </RigidBody>
    </group>
}
const Levels = () => {
    return <>

        <BlockStart position={[0, 0, 12]} />
        <BlockSpinner position={[0, 0, 8]} />
        <BlockLimbo position={[0, 0, 4]} />
        <BlockAxe position={[0, 0, 0]} />
        <BlockEnd position={[0, 0, -4]} />

    </>
}

export default Levels