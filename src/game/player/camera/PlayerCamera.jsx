import { useEffect, useRef, useState } from "react";

import { PointerLockControls } from "@react-three/drei";
import { useEventRegister } from "../../event/EventRegister";

var currentPosition = { x: 0, y: 2, z: 0 };

export default function PlayerCamera({
  gameRef,
  movementSpeed = 0.02,
  defaultPosition = currentPosition,
}) {
  const ref = useRef();

  const eventRegister = useEventRegister();
  const keys = {
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    ShiftLeft: false,
  };

  useEffect(() => {
    const camera = ref.current.camera;
    camera.position.set(
      defaultPosition.x,
      defaultPosition.y,
      defaultPosition.z
    );
  }, [ref.current]);


  useEffect(() => {
    eventRegister.register("click", (e) => {
      console.log("click");
    });

    eventRegister.register("keydown", (e) => {
      keys[e[0].code] = true;
    });

    eventRegister.register("keyup", (e) => {
      keys[e[0].code] = false;
    });

    eventRegister.register("gametick", () => {
      const sprint = movementSpeed * (keys.ShiftLeft ? 3 : 1);

      Object.entries(keys)
        .filter((entry) => entry[0] !== "ShiftLeft")
        .forEach((entry) => {
          if (entry[1]) {
            switch (entry[0]) {
              case "KeyW":
                ref.current.moveForward(sprint);
                onMove();
                break;
              case "KeyS":
                ref.current.moveForward(-movementSpeed);
                onMove();
                break;
              case "KeyA":
                ref.current.moveRight(-movementSpeed);
                onMove();
                break;
              case "KeyD":
                ref.current.moveRight(movementSpeed);
                onMove();
                break;
              case "Space":
                break;
              default:
                break;
            }
          }
        });
    });
  }, []);

  const onMove = () => {
    const camera = ref.current.camera;

    camera.updateMatrixWorld();
    currentPosition = camera.position.clone();
    currentPosition.applyMatrix3(camera.matrixWorld);

    // console.log(camera.position);
    currentPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    // const playerEntity = playerEntityRef.current;
    // playerEntity.position.set(currentPosition.x, playerEntity.position.y, currentPosition.z);
    // playerEntity.updateMatrixWorld();

    eventRegister.execute("playermove", currentPosition);
  };

  return <PointerLockControls ref={ref} />;
}

export { currentPosition };
