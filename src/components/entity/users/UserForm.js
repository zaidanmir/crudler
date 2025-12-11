import { useMemo, useState } from 'react';
import Form from '../../UI/Form';
import Icons from '../../UI/Icons';

const defaultUser = {
  UserID: null,
  UserFirstname: '',
  UserLastname: '',
  UserUsertypeName: 'Student',
};

const roles = [
  { value: 'Student', label: 'Student' },
  { value: 'Staff', label: 'Staff' },
];

const UserForm = ({ initialUser, submitLabel = 'Add', onSubmit, onCancel }) => {
  const initialState = useMemo(() => {
    if (initialUser) {
      return initialUser;
    }
    return { ...defaultUser, UserID: `u-${Date.now()}` };
  }, [initialUser]);

  const [user, setUser] = useState(initialState);

  const handleChange = (field, value) => setUser({ ...user, [field]: value });
  const handleSubmit = () => onSubmit(user);

  const icon = submitLabel === 'Modify' ? <Icons.Edit /> : <Icons.Add />;

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitLabel={submitLabel} submitIcon={icon}>
      <Form.InputText
        label="First name"
        value={user.UserFirstname}
        onChange={(value) => handleChange('UserFirstname', value)}
      />
      <Form.InputText
        label="Last name"
        value={user.UserLastname}
        onChange={(value) => handleChange('UserLastname', value)}
      />
      <Form.InputSelect
        label="User type"
        prompt="Select user type ..."
        options={roles}
        value={user.UserUsertypeName}
        onChange={(value) => handleChange('UserUsertypeName', value)}
      />
    </Form>
  );
};

export default UserForm;