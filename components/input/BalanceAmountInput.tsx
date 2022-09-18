import {Button, TextInput} from "react-native-paper";
import Colors from "../../constants/colors";
import {StyleSheet, View} from "react-native";
import {Dispatch, SetStateAction} from "react";
import InputTheme from "../../constants/input-theme";

const BalanceAmountInput: React.FC<{
  showDialog: () => void;
}> = ({showDialog}) => {
  return (
    <View style={styles.amountContainer}>
      <TextInput keyboardType = 'numeric' label='Amount' style={[styles.inputStyle, styles.leftInput]} theme={InputTheme} />
      <Button icon="chevron-down" labelStyle={{ fontSize: 17 }} color={Colors.COMPONENT_TEXT} uppercase={false} style={styles.rightButton}
              onPress={showDialog} contentStyle={styles.buttonIcon}>$</Button>
    </View>
  );
}

export default BalanceAmountInput;

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 20,
    backgroundColor: 'none',
    height: 60,
    paddingHorizontal: 0
  },
  amountContainer: {
    flexDirection: 'row',
    position: 'relative'
  },
  leftInput: {
    flex: 1
  },
  rightButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    maxWidth: '80%'
  },
  buttonIcon: {
    flexDirection: 'row-reverse'
  }
});