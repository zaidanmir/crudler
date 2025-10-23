import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

// ModuleItem component
const ModuleItem = ({ module, onSelect }) => {
  return (
    <Pressable onPress={() => onSelect(module)}>
      <View style={styles.item}>
        <Text style={styles.text}>
          {module.ModuleCode} {module.ModuleName}
        </Text>
      </View>
    </Pressable>
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
});

export default ModuleItem;
