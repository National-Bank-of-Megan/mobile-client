import { StyleSheet } from 'react-native';
import Colors from "./constants/colors";

const GlobalStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20
  },
  headline: {
    fontSize: 34,
    textAlign: 'center',
    letterSpacing: 0.25
  },
  buttonLabel: {
    fontSize: 18,
    letterSpacing: 0.46
  },
  formView: {
    borderRadius: 10,
    paddingVertical: 30,
    paddingTop: 0,
    paddingHorizontal: 20,
    backgroundColor: Colors.COMPONENT_BACKGROUND,
    marginTop: 40
  },
  inputStyle: {
    marginTop: 20,
    backgroundColor: 'none',
    height: 60,
    paddingHorizontal: 0
  },
  inputHelperText: {
    paddingHorizontal: 0
  }
});

export default GlobalStyles;