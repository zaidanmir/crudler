import { MaterialIcons } from '@expo/vector-icons';

const Icons = {};

const Add = () => <MaterialIcons name="add" size={16} />;
const Delete = () => <MaterialIcons name="delete" size={16} />;
const Edit = () => <MaterialIcons name="edit" size={16} />;
const Favourite = () => <MaterialIcons name="favorite" size={18} color="crimson" />;
const Notfavourite = () => <MaterialIcons name="favorite-border" size={18} color="grey" />;
const Close = () => <MaterialIcons name="close" size={16} />;
const Menu = () => <MaterialIcons name="menu" size={24} color="white" />;

// Compose
Icons.Add = Add;
Icons.Delete = Delete;
Icons.Edit = Edit;
Icons.Favourite = Favourite;
Icons.Notfavourite = Notfavourite;
Icons.Close = Close;
Icons.Menu = Menu;

export default Icons;
