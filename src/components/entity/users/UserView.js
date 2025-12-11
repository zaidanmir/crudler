import { StyleSheet, Text, View } from 'react-native';
import Icons from '../../UI/Icons';
import { Button, ButtonTray } from '../../UI/Button';

const UserView = ({ user, onDelete, onModify }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.UserFirstname} {user.UserLastname}</Text>
      <Text style={styles.detail}>Type: {user.UserUsertypeName}</Text>
      <ButtonTray>
        <Button label="Modify" icon={<Icons.Edit />} onClick={() => onModify(user)} />
        <Button label="Delete" icon={<Icons.Delete />} onClick={() => onDelete(user)} />
      </ButtonTray>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
  },
});

export default UserView;