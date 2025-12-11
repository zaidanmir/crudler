import { Text, View, StyleSheet } from 'react-native';
import Selector from '../../UI/Selector';

const UserItem = ({ user, onSelect }) => (
  <Selector pressedStyle={styles.pressedItem} onPress={() => onSelect(user)}>
    <View style={styles.item}>
      <Text style={styles.text}>
        {user.UserFirstname} {user.UserLastname} ({user.UserType})
      </Text>
    </View>
  </Selector>
);

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
  },
});

export default UserItem;