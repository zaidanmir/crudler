import { Alert, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Screen from '../layout/Screen';
import { Button, ButtonTray } from '../UI/Button';
import Icons from '../UI/Icons';
import API from '../API/API';
import useLoad from '../API/useLoad';
import UserList from '../entity/users/UserList';

const usersEndpoint = 'https://softwarehub.uk/unibase/api/users';

const UserListScreen = ({ navigation }) => {
  const [users, , isLoading, loadUsers] = useLoad(usersEndpoint);

  const handleAdd = async (user) => {
    const result = await API.post(usersEndpoint, user);
    if (result.isSuccess) {
      loadUsers(usersEndpoint);
      navigation.goBack();
    } else {
      Alert.alert(result.message);
    }
  };

  const handleDelete = async (user) => {
    const deleteEndpoint = `${usersEndpoint}/${user.UserID}`;
    const result = await API.delete(deleteEndpoint, user);
    if (result.isSuccess) {
      loadUsers(usersEndpoint);
      navigation.goBack();
    } else {
      Alert.alert(result.message);
    }
  };

  const handleModify = async (updatedUser) => {
    const putEndpoint = `${usersEndpoint}/${updatedUser.UserID}`;
    const result = await API.put(putEndpoint, updatedUser);
    if (result.isSuccess) {
      loadUsers(usersEndpoint);
      navigation.navigate('UserViewScreen', {
        user: updatedUser,
        onDelete: handleDelete,
        onModify: handleModify,
      });
    } else {
      Alert.alert(result.message);
    }
  };

  const gotoViewScreen = (user) =>
    navigation.navigate('UserViewScreen', { user, onDelete: handleDelete, onModify: handleModify });

  const gotoAddScreen = () => navigation.navigate('UserAddScreen', { onAdd: handleAdd });

  return (
    <Screen>
      <ButtonTray>
        <Button label="Add user" icon={<Icons.Add />} onClick={gotoAddScreen} />
      </ButtonTray>
      {isLoading && (
        <View style={styles.loading}>
          <Text>Retrieving records from {usersEndpoint} ...</Text>
          <ActivityIndicator size="large" />
        </View>
      )}
      <UserList users={users} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({
    loading: {
      height: 100,
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default UserListScreen;