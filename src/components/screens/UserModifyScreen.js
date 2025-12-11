import { StyleSheet } from 'react-native';
import Screen from '../layout/Screen';
import UserForm from '../entity/users/UserForm';

const UserModifyScreen = ({ navigation, route }) => {
  const { user, onModify } = route.params;

  const handleSubmit = (updated) => {
    onModify(updated);
  };

  const handleCancel = () => navigation.goBack();

  return (
    <Screen>
      <UserForm initialUser={user} submitLabel="Modify" onSubmit={handleSubmit} onCancel={handleCancel} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default UserModifyScreen;