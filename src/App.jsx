// App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import { Perf } from 'r3f-perf'
function App() {
  return (
    <Canvas
    shadows
    camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ 2.5, 4, 6 ]
    } }
>
<Perf />

    <Experience />
</Canvas>
  );
}

export default App;