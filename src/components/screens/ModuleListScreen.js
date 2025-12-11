import { useEffect } from 'react';
import { ActivityIndicator, LogBox, Alert, StyleSheet, Text } from 'react-native';
import useLoad from '../API/useLoad';
import useStore from '../store/useStore';
import API from '../API/API';
import RenderCount from '../UI/RenderCount.js';
import Icons from '../UI/Icons.js';
import { Button, ButtonTray } from '../UI/Button.js';
import ModuleList from '../entity/modules/ModuleList.js';
import Screen from '../layout/Screen';
import RenderCount from '../UI/RenderCount';


const ModuleListScreen = ({ navigation }) => {
  // Initialisations ---------------------------
  LogBox.ignoreLogs(["test"]);
  const modulesEndpoint = 'https://softwarehub.uk/unibase/api/modules';
  const loggedinUserkey = 'loggedinUser';
  const favouritesKey = 'moduleFavourites';
  //const graeme = {"UserID":820,"UserFirstname":"Graeme","UserLastname":"Jones","UserEmail":"Ku06696@kingston.ac.uk","UserRegistered":1,"UserLevel":0,"UserYearID":null,"UserUsertypeID":1,"UserImageURL":"https://images.generated.photos/Zx-gNUWFq9NPQDPRLEJQQPWx19QhpKGSAnzIPFUDz3k/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92Ml8w/MDM4MjcxLmpwZw.jpg","UserUsertypeName":"Staff","UserYearName":null};

  // State -------------------------------------

  const [modules, setModules, isLoading, loadModules] = useLoad(modulesEndpoint);
  const [loggedinUser, saveLoggedinUser] = useStore(loggedinUserKey, null);
  const [favourites, saveFavourites] = useStore(favouritesKey, []);

  const augmentModulesWithFavourites = () => {
    const modifyModule = (module) => ({
      ...module,
      ModuleFavourite: favourites.includes(module.ModuleID),
    });

    const augmentedModules = modules.map(modifyModule);
    setModules(augmentedModules);
  };

  useEffect (() => {
    augmentModulesWithFavourites();
  }, [isLoading]);
  
  
  //AsyncStorage.setItem(loggedinUserKey, JSON.stringify(loggedinUser));

  // Handlers ----------------------------------
  
  const handleFavourite = (module) => {
    // Update the module state
    const isFavourite = !module.ModuleFavourite;
    const updateModule = (item) =>
      item.ModuleID === module.ModuleID ? { ...item, ModuleFavourite: isFavourite } : item;
    const updatedModuleList = modules.map(updateModule);
    setModules(updatedModuleList);
  
    // Save the new favourites
    const updatedFavouritesList = updatedModuleList
      .filter((item) => item.ModuleFavourite)
      .map((item) => item.ModuleID);
    saveFavourites(updatedFavouritesList);
  };
  
  const onAdd = async (module) => {
    const result = await API.post(modulesEndpoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndpoint);
      navigation.goBack();
    } else {
      Alert.alert(result.message);
    }
  };
  
  const onDelete = async (module) => {
    const deleteEndpoint = `${modulesEndpoint}/${module.ModuleID}`;
    const result = await API.delete(deleteEndpoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndpoint);
      navigation.goBack();
    } else {
      Alert.alert(result.message);
    }
  };
  
  const onModify = async (module) => {
    const putEndpoint = `${modulesEndpoint}/${module.ModuleID}`;
    const result = await API.put(putEndpoint, module);
    if (result.isSuccess) {
      loadModules(modulesEndpoint);
      navigation.navigate('ModuleViewScreen', {module, onDelete, onModify});
    } else {
      Alert.alert(result.message);
    }
  };

  const gotoViewScreen = (module) => navigation.navigate('ModuleViewScreen', { module, onDelete, onModify });
  const gotoAddScreen = () => navigation.navigate('ModuleAddScreen', {onAdd});

  // View --------------------------------------
  return (
    <Screen>
      <Text>{favourites.map((favourite) => `$(favourite), `)}</Text>
      <RenderCount />
      {loggedinUser && <Text style={styles.welcome}>Welcome {loggedinUser.UserFirstname}</Text>}
      <RenderCount />
      <ButtonTray>
        <Button label="Add" icon={<Icons.Add />} onClick={gotoAddScreen} />
      </ButtonTray>
      {
      isLoading && (
        <View style={styles.loading}>
        
        <Text>
          Retrieving records from {modulesEndpoint} ...
        </Text>
        <ActivityIndicator size="large" />

        </View>
      )}
      <ModuleList modules={modules} onSelect={gotoViewScreen} onFavourite={handleFavourite}/>
    </Screen>
  );
};

const styles = StyleSheet.create({
  welcome: {
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    gap: 15,
  },
  loading: {
    height: 100,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ModuleListScreen;
