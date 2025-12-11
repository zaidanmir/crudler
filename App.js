import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ModuleListScreen from './src/components/screens/ModuleListScreen';
import ModuleAddScreen from './src/components/screens/ModuleAddScreen';
import ModuleViewScreen from './src/components/screens/ModuleViewScreen';
import ModuleModifyScreen from './src/components/screens/ModuleModifyScreen';
import UserListScreen from './src/components/screens/UserListScreen';
import UserAddScreen from './src/components/screens/UserAddScreen';
import UserViewScreen from './src/components/screens/UserViewScreen';
import UserModifyScreen from './src/components/screens/UserModifyScreen';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
};

const ModulesStack = () => (
  <Stack.Navigator
    initialRouteName="ModuleListScreen"
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="ModuleListScreen"
      component={ModuleListScreen}
      options={{ title: 'List modules' }}
    />
    <Stack.Screen
      name="ModuleAddScreen"
      component={ModuleAddScreen}
      options={{ title: 'Add module' }}
    />
    <Stack.Screen
      name="ModuleViewScreen"
      component={ModuleViewScreen}
      options={{ title: 'View module' }}
    />
    <Stack.Screen
      name="ModuleModifyScreen"
      component={ModuleModifyScreen}
      options={{ title: 'Modify module' }}
    />
  </Stack.Navigator>
);

const UsersStack = () => (
  <Stack.Navigator
    initialRouteName="UserListScreen"
    screenOptions={stackScreenOptions}
  >
    <Stack.Screen
      name="UserListScreen"
      component={UserListScreen}
      options={{ title: 'List users' }}
    />
    <Stack.Screen
      name="UserAddScreen"
      component={UserAddScreen}
      options={{ title: 'Add user' }}
    />
    <Stack.Screen
      name="UserViewScreen"
      component={UserViewScreen}
      options={{ title: 'View user' }}
    />
    <Stack.Screen
      name="UserModifyScreen"
      component={UserModifyScreen}
      options={{ title: 'Modify user' }}
    />
  </Stack.Navigator>
);

export const App = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Modules">
        <Drawer.Screen name="Modules" component={ModulesStack} options={{ title: 'Module Crudler' }} />
        <Drawer.Screen name="Users" component={UsersStack} options={{ title: 'User Crudler' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;



