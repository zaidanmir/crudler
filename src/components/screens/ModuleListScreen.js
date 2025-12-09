import { ActivityIndicator, LogBox, Alert, StyleSheet, Text } from 'react-native';
import useLoad from '../API/useLoad';
import API from '../API/API';
import RenderCount from '../UI/RenderCount.js';
import Icons from '../UI/Icons.js';
import { Button, ButtonTray } from '../UI/Button.js';
import ModuleList from '../entity/modules/ModuleList.js';
import Screen from '../layout/Screen';


const ModuleListScreen = ({ navigation }) => {
  // Initialisations ---------------------------
  LogBox.ignoreLogs(["test"]);
  const modulesEndpoint = 'https://softwarehub.uk/unibase/api/modules';

  // State -------------------------------------

  const [modules, , isLoading, loadModules] = useLoad(modulesEndpoint);

  // Handlers ----------------------------------
  
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
      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({
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
