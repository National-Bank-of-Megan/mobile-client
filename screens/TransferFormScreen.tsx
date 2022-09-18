import {StyleSheet, View} from "react-native";
import {Button, Dialog, Headline, Paragraph, Portal, Subheading, Text, TextInput, withTheme} from "react-native-paper";
import Colors from "../constants/colors";
import GlobalStyles from "../global-styles";
import {useState} from "react";
import InputTheme from "../constants/input-theme";
import BalanceAmountInput from "../components/input/BalanceAmountInput";
import TransferForm from "../components/form/TransferForm";

const TransferFormScreen = () => {

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
      <Headline style={GlobalStyles.headline}>New transfer</Headline>
      <TransferForm showDialog={showDialog} />
      <Button mode='contained' style={styles.transferButton} labelStyle={GlobalStyles.buttonLabel}>TRANSFER MONEY</Button>
    </View>
    </>
  );
}

export default TransferFormScreen;

const styles = StyleSheet.create({
  transferButton: {
    marginTop: 50
  }
});