import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import Ground from "./environment/Ground";
import { useEffect, useRef, useState } from "react";
import PlayerCamera, { currentPosition } from "./player/camera/PlayerCamera";
import Hud from "./player/camera/Hud";

import { useEventRegister } from "./event/EventRegister";
import { Physics, useBox } from "@react-three/cannon";
import PlayerEntity from "./player/camera/PlayerEntity";

export default function Game() {
  const gameRef = useRef();

  const eventRegister = useEventRegister();
  const [position, setPosition] = useState(currentPosition);
  const [playerEntityRef, setPlayerEntityRef] = useState();

  useEffect(() => {
    gameRef.current.style.height = "100vh";

    document.addEventListener("keydown", (e) =>
      eventRegister.execute("keydown", e)
    );
    document.addEventListener("keyup", (e) =>
      eventRegister.execute("keyup", e)
    );

    setInterval(() => eventRegister.execute("gametick"), 1);
  }, []);

  return (
    <div>
      <Hud />
      <Canvas
        ref={gameRef}
        onPointerDown={(e) => eventRegister.execute("clickdown", e)}
        onPointerUp={(e) => eventRegister.execute("clickup", e)}
      >
        <Physics gravity={[0, -30, 0]}>
          {/*<PlayerEntity />*/}
          <PlayerCamera gameRef={gameRef} movementSpeed={0.005} />
          <Ground />
        </Physics>

        

        <Grid
          renderOrder={-1}
          position={[0, 0.1, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={[0.5, 0.5, 10]}
        />
      </Canvas>
    </div>
  );
}
