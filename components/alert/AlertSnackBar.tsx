import {Snackbar, Text} from "react-native-paper";
import {UseStateType} from "../../model/UseStateType";
import {StyleSheet} from "react-native";
import Colors from "../../constants/colors";

export type AlertState = {
  isOpen: boolean;
  message: string;
  color: string;
}

const AlertSnackBar: React.FC<{ alertState: UseStateType<AlertState> }> = ({alertState}) => {

  return (
    <Snackbar
      visible={alertState.state.isOpen}
      onDismiss={() => alertState.setState(prevState => ({
        ...prevState,
        isOpen: false
      }))}
      theme={{ colors: { surface: Colors.SECONDARY } }}
      style={[styles.snackBar, { backgroundColor: alertState.state.color }]}
    >
      <Text style={styles.message}>{alertState.state.message}</Text>
    </Snackbar>
  );
}

export default AlertSnackBar;

const styles = StyleSheet.create({
  snackBar: {
    borderRadius: 5
  },
  message: {
    color: Colors.SECONDARY
  }
});