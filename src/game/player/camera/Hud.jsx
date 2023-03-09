import { useEffect, useState } from "react";
import { useEventRegister } from "../../event/EventRegister";

export default function Hud() {

  const [position, setPosition] = useState({x: 0.0, y: 0.0, z: 0.0});

  const eventRegister = useEventRegister();

  useEffect(() => {
    eventRegister.register("playermove", ([position]) => {
      setPosition(position);
    });
  }, []);

  return (
    <div style={{ display: "flex", position: "absolute" }}>
      <ul>
        <li>X : {position.x.toFixed(2)}</li>
        <li>Y : {position.y.toFixed(2)}</li>
        <li>Z : {position.z.toFixed(2)}</li>
      </ul>
    </div>
  );
}
