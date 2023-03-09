import { useEffect } from "react";
import { Capsule } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useEventRegister } from "../../event/EventRegister";

export default function PlayerEntity({ position }) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 1.5, -5] }));

  const eventRegister = useEventRegister();

  useEffect(() => {
    eventRegister.register("playermove", ([location]) => {
        // api.position.set(location.x+5, location.y, location.z+5);
        // api.fixedRotation = true;
    });
  }, []);

  return <Capsule ref={ref} args={[0.5, 2]}></Capsule>;
}
