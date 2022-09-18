import {Button, Dialog, Headline, Paragraph, Portal} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import GlobalStyles from "../global-styles";
import TransferForm from "../components/form/TransferForm";
import {useState} from "react";
import AddMoneyForm from "../components/form/AddMoneyForm";

const AddMoneyScreen = () => {

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This is simple dialog</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={GlobalStyles.container}>
        <Headline style={GlobalStyles.headline}>Add money</Headline>
        <AddMoneyForm showDialog={showDialog} />
        <Button mode='contained' style={styles.addMoneyButton} labelStyle={GlobalStyles.buttonLabel}>add money</Button>
      </View>
    </>
  );
}

export default AddMoneyScreen;

const styles = StyleSheet.create({
  addMoneyButton: {
    marginTop: 50
  }
});