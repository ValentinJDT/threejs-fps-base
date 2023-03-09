import { DoubleSide } from "three";
import { usePlane } from '@react-three/cannon'

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

    return (
      <mesh ref={ref} position={[0, 0, 0]} scale={[50, 50, 50]}>
        <planeBufferGeometry />
        <meshBasicMaterial color="green" side={DoubleSide} />
      </mesh>
    );
  }