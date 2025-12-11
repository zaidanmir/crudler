import { Pressable, Vibration } from 'react-native';

const Selector = ({ children, onPress, style, pressedStyle }) => {

  const handlePress = () => {
    Vibration.vibrate(5);
    if (onPress) {
        onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        style,
        pressed && pressedStyle,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default Selector;
