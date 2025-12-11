import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../layout/Screen';
import { Button, ButtonTray } from '../UI/Button';
import Icons from '../UI/Icons';
import { initialUsers } from '../../data/users';
import UserList from '../entity/users/UserList';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState(initialUsers);

  const handleAdd = (user) => {
    setUsers((currentUsers) => [...currentUsers, user]);
    navigation.goBack();
  };

  const handleDelete = (user) => {
    setUsers((currentUsers) => currentUsers.filter((item) => item.UserID !== user.UserID));
    navigation.goBack();
  };

  const handleModify = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => (user.UserID === updatedUser.UserID ? updatedUser : user))
    );
    navigation.navigate('UserViewScreen', { user: updatedUser, onDelete: handleDelete, onModify: handleModify });
  };

  const gotoViewScreen = (user) =>
    navigation.navigate('UserViewScreen', { user, onDelete: handleDelete, onModify: handleModify });

  const gotoAddScreen = () => navigation.navigate('UserAddScreen', { onAdd: handleAdd });

  return (
    <Screen>
      <ButtonTray>
        <Button label="Add user" icon={<Icons.Add />} onClick={gotoAddScreen} />
      </ButtonTray>
      <UserList users={users} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default UserListScreen;