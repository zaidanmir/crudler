import { LogBox, StyleSheet, Text } from 'react-native';
import useLoad from '../API/useLoad';
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

  const [modules, setModules, isLoading, loadModules] = useLoad(modulesEndpoint);

  // Handlers ----------------------------------
  const handleDelete = (module) =>
    setModules(modules.filter((item) => item.ModuleID !== module.ModuleID));

  const handleAdd = (module) => setModules( [...modules, module] );  

  const handleModify = (updatedModule) =>
    setModules(
      modules.map((module) =>
        module.ModuleID === updatedModule.ModuleID ? updatedModule : module
      )
    );

  const onDelete = (module) => {
    handleDelete(module);
    navigation.goBack();
  };

  const onAdd = (module) => {
    handleAdd(module);
    navigation.goBack();
  };

  const onModify = (module) => {
    handleModify(module);
    navigation.replace('ModuleViewScreen', {module, onDelete, onModify });
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
        isLoading && <Text>Loading records ...</Text>
      }
      <ModuleList modules={modules} onSelect={gotoViewScreen} />
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default ModuleListScreen;
