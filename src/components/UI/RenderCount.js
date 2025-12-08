import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

const RenderCount = () => {
  const renders = useRef(0);
  const [_, forceUpdate] = useState(false);

  useEffect(() => {
    renders.current += 1;
    forceUpdate((prev) => !prev);
  }, []);

  return <Text testID="render-count">Render count: {renders.current}</Text>;
};

export default RenderCount;