import { RigidBody, useRapier } from "@react-three/rapier"
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
const Players = () => {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const body = useRef()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())
    const { rapier, world } = useRapier()
    const rapierWorld = world
    const jump = () => {
        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)
        if (hit.timeOfImpact < 0.15) {
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 })

        }
    }
    useEffect(() => {
        const jumpSubscription = subscribeKeys(
            (state) => {
                return state.jump
            },
            (value) => {
                if (value) {
                    jump()
                }
            }
        )
        return () => {
            jumpSubscription()
        }
    }, [])
    // Track previous jump state for gamepad to prevent repeated jumps
    const prevGamepadJump = useRef(false);

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward } = getKeys();

        // Keyboard movement
        let impulse = { x: 0, y: 0, z: 0 };
        let torque = { x: 0, y: 0, z: 0 };
        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;
        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }
        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }
        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }
        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        const gamepads = navigator.getGamepads();
        const gp = gamepads[0]; 
        if (gp) {
            const deadzone = 0.15;
            let x = Math.abs(gp.axes[0]) > deadzone ? gp.axes[0] : 0;
            let y = Math.abs(gp.axes[1]) > deadzone ? gp.axes[1] : 0;
            impulse.x += x * impulseStrength;
            torque.z -= x * torqueStrength;
            impulse.z += y * impulseStrength;
            torque.x += y * torqueStrength;
            const gamepadJump = gp.buttons[4].pressed;
            
            if (gamepadJump && !prevGamepadJump.current) {
                jump();
            }
            prevGamepadJump.current = gamepadJump;
        }

        body.current.applyImpulse(impulse);
        body.current.applyTorqueImpulse(torque);

        const bodyPosition = body.current.translation();
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyPosition);
        cameraPosition.z += 2.25;
        cameraPosition.y += 0.65;
        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(bodyPosition);
        cameraTarget.y += 0.25;
        smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);
    });
    return (
        <>
            <RigidBody
                linearDamping={0.5}
                angularDamping={0.5}
                ref={body} canSleep={false} colliders='ball' restitution={0.2} friction={1} position={[0, 1, 0]}>
                <mesh castShadow>
                    <icosahedronGeometry args={[0.3, 1]} />
                    <meshStandardMaterial flatShading color='hotpink' />
                </mesh>
            </RigidBody>
        </>
    )

}

export default Players

