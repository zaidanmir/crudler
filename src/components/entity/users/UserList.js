import { ScrollView, StyleSheet } from 'react-native';
import UserItem from './UserItem';

const UserList = ({ users, onSelect }) => (
  <ScrollView style={styles.container}>
    {users.map((user) => (
      <UserItem key={user.UserID} user={user} onSelect={onSelect} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({});

export default UserList;