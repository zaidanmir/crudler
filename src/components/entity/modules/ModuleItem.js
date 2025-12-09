import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Selector from '../../UI/Selector';

// ModuleItem component
const ModuleItem = ({ module, onSelect }) => {
  return (
  <Selector onPress={handleSelect} pressedStyle={styles.pressedItem}>
    <View style={styles.item}>
      <Text style={styles.text}>
        {module.ModuleCode} {module.ModuleName}
      </Text>
    </View>
  </Selector>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 16,
  },
  pressedItem: {
    backgroundColor: 'azure',
  }
});

export default ModuleItem;
