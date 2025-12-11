import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import Icons from '../../UI/Icons.js';
import { Button, ButtonTray } from '../../UI/Button';

const UserView = ({ user, onDelete, onModify }) => {
    const handleDelete = () => onDelete(user);

    const requestDelete = () =>
      Alert.alert(
        'Delete warning',
        `Are you sure that you want to delete user ${user.UserID} ${user.UserFirstname} ${user.UserLastname}`,
        [
          { text: 'Cancel' },
          { text: 'Delete', onPress: handleDelete },
        ]
      );
  
    const userTypeLabel = user.UserUsertypeName || user.UserUsertypeID;
    const yearLabel = user.UserYearName || user.YearName || user.UserYearID;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.UserImageURL }} style={styles.image} />
      <View style={styles.infoTray}>
        <Text style={styles.boldText}>
          {user.UserID} {user.UserFirstname} {user.UserLastname}
        </Text>
        <Text style={styles.text}>{user.UserEmail}</Text>
        <Text style={styles.text}>
          {userTypeLabel} <Text style={styles.dimText}>Level {user.UserLevel}</Text>
        </Text>
        {yearLabel ? <Text style={styles.text}>Year: {yearLabel}</Text> : null}
        {user.UserRegistered !== undefined && (
          <Text style={styles.text}>Registered: {user.UserRegistered ? 'Yes' : 'No'}</Text>
        )}
    </View>
      <ButtonTray>
      <Button icon={<Icons.Edit />} label="Modify" onClick={onModify} />
        <Button
          icon={<Icons.Delete />}
          label="Delete"
          onClick={requestDelete}
          styleButton={{ backgroundColor: 'mistyrose' }}
          styleLabel={{ color: 'red' }}
        />
      </ButtonTray>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
  infoTray: {
    gap: 5,
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dimText: {
    color: 'grey',
  },
});

export default UserView;