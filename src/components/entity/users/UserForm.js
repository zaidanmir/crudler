import { useMemo, useState } from 'react';
import useLoad from '../../API/useLoad';
import Form from '../../UI/Form';
import Icons from '../../UI/Icons';

const defaultUser = {
  UserID: null,
  UserFirstname: '',
  UserLastname: '',
  UserUsertypeID: null,
  UserUsertypeName: '',
  UserEmail: '',
  UserImageURL: '',
  UserYearID: null,
  UserLevel: null,
  UserRegistered: 0,
  UserPassword: '',
};

const levelOptions = [
    { value: 3, label: '3 (Foundation)' },
    { value: 4, label: '4 (First year)' },
    { value: 5, label: '5 (Second year)' },
    { value: 6, label: '6 (Final year)' },
    { value: 7, label: '7 (Masters)' },
];

const registrationOptions = [
    { value: 0, label: 'Not registered' },
    { value: 1, label: 'Registered' },
  ];
  
  const usertypesEndpoint = 'https://softwarehub.uk/unibase/api/usertypes';
  const yearsEndpoint = 'https://softwarehub.uk/unibase/api/years';

const UserForm = ({ initialUser, submitLabel = 'Add', onSubmit, onCancel }) => {
  const initialState = useMemo(() => {
    if (initialUser) return { ...initialUser };
    return { ...defaultUser, UserID: Date.now() };
  }, [initialUser]);

  const [user, setUser] = useState(initialState);
  const [usertypes] = useLoad(usertypesEndpoint);
  const [years, , isYearsLoading] = useLoad(yearsEndpoint);

  const handleChange = (field, value) => {
    const numericFields = ['UserUsertypeID', 'UserYearID', 'UserLevel', 'UserRegistered'];
    const parsedValue = numericFields.includes(field) && value !== null ? Number(value) : value;
    setUser((current) => ({ ...current, [field]: parsedValue }));
  };

  const handleUsertypeChange = (value) => {
    const selectedType = usertypes.find((type) => type.UsertypeID === value);
    handleChange('UserUsertypeID', value);
    setUser((current) => ({
      ...current,
      UserUsertypeName: selectedType ? selectedType.UsertypeName : '',
    }));
  };

  const handleSubmit = () => onSubmit(user);

  const icon = submitLabel === 'Modify' ? <Icons.Edit /> : <Icons.Add />;

  const usertypeOptions = usertypes.map((type) => ({
    value: type.UsertypeID,
    label: type.UsertypeName,
  }));

  const yearOptions = years.map((year) => ({
    value: year.YearID,
    label: year.YearName,
  }));

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
        options={usertypeOptions}
        value={user.UserUsertypeID}
        onChange={handleUsertypeChange}
      />
      <Form.InputSelect
        label="Academic year"
        prompt="Select academic year ..."
        options={yearOptions}
        value={user.UserYearID}
        onChange={(value) => handleChange('UserYearID', value)}
        isLoading={isYearsLoading}
      />
      <Form.InputSelect
        label="User level"
        prompt="Select user level ..."
        options={levelOptions}
        value={user.UserLevel}
        onChange={(value) => handleChange('UserLevel', value)}
      />
      <Form.InputSelect
        label="Registration status (optional)"
        prompt="Select registration status ..."
        options={registrationOptions}
        value={user.UserRegistered}
        onChange={(value) => handleChange('UserRegistered', value)}
      />
      <Form.InputText
        label="Password (optional)"
        value={user.UserPassword}
        onChange={(value) => handleChange('UserPassword', value)}
        secureTextEntry
      />
    </Form>
  );
};

export default UserForm;