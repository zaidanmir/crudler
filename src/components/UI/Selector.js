import { Pressable, Vibration } from 'react-native';

const Selector = ({ children, onPress, style, pressedStyle }) => {
  // Initialisations ---------------------------
  // State -------------------------------------
  // Handlers ----------------------------------
  const handlePress = () => {
    Vibration.vibrate(5);
    onClick();
  };

  // View --------------------------------------
  return (
    <Pressable
      onLongPress={handlePress}
      style={({ pressed }) => [
        styles,
        pressed && pressedStyle,
      ]}
    >
        { children }
    </Pressable>
  );
};

export default Selector;
