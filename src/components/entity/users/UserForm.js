import { useMemo, useState } from 'react';
import Form from '../../UI/Form';
import Icons from '../../UI/Icons';

const defaultUser = {
  UserID: null,
  UserFirstname: '',
  UserLastname: '',
  UserUsertypeName: 'Student',
  UserEmail: '',
  UserImageURL: '',
  UserType: 'Student',
  UserYear: '',
};

const roles = [
  { value: 'Student', label: 'Student' },
  { value: 'Staff', label: 'Staff' },
];

const UserForm = ({ initialUser, submitLabel = 'Add', onSubmit, onCancel }) => {
  const initialState = useMemo(() => {
    if (initialUser) {
        return { ...initialUser };
    }
    return { ...defaultUser, UserID: Date.now() };
  }, [initialUser]);

  const [user, setUser] = useState(initialState);

  const handleChange = (field, value) => {
    if (field === 'UserType' && value !== 'Student') {
      setUser({ ...user, [field]: value, UserYear: null });
    } else {
      setUser({ ...user, [field]: value });
    }
  };

  const handleSubmit = () => {
    const preparedUser = {
      ...user,
      UserYear: user.UserType === 'Student' ? user.UserYear || null : null,
    };

    onSubmit(preparedUser);
  };

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
      <Form.InputText
        label="Email"
        value={user.UserEmail}
        onChange={(value) => handleChange('UserEmail', value)}
      />
      <Form.InputText
        label="Image URL"
        value={user.UserImageURL}
        onChange={(value) => handleChange('UserImageURL', value)}
      />
      <Form.InputSelect
        label="User type"
        prompt="Select user type ..."
        options={roles}
        value={user.UserType}
        onChange={(value) => handleChange('UserType', value)}
      />
      {user.UserType === 'Student' && (
        <Form.InputText
          label="Academic year"
          value={user.UserYear ?? ''}
          onChange={(value) => handleChange('UserYear', value)}
        />
      )}
    </Form>
  );
};

export default UserForm;