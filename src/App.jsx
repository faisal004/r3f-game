// App.js
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import { Perf } from 'r3f-perf'
import { KeyboardControls } from '@react-three/drei';
function App() {
  useEffect(() => {
    const onConnect = (e) => console.log('Gamepad connected:', e.gamepad);
    const onDisconnect = (e) => console.log('Gamepad disconnected:', e.gamepad);
    window.addEventListener('gamepadconnected', onConnect);
    window.addEventListener('gamepaddisconnected', onDisconnect);
    return () => {
      window.removeEventListener('gamepadconnected', onConnect);
      window.removeEventListener('gamepaddisconnected', onDisconnect);
    };
  }, []);
  return (
    <KeyboardControls
        map={ [
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
        { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
        { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
        { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
        { name: 'jump', keys: [ 'Space' ] },
    ] }
    >

      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6]
        }}
      >
        <Perf />

        <Experience />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;