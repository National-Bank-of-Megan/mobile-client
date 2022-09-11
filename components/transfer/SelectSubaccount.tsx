import {HelperText, Provider, Surface, withTheme} from "react-native-paper";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import DropDown from "react-native-paper-dropdown";
import Colors from "../../constants/colors";
import {useState} from "react";
import { useTheme } from 'react-native-paper';

const genderList = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

const SelectSubaccount = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState({
    label: "Female",
    value: "female",
  });
  const theme = useTheme();

  return (
    <>
      <HelperText type="info" style={styles.helperTextStyle}>
        Currency balance
      </HelperText>
      <Surface style={styles.container}>
        <View style={styles.dropDownContainer}>
          <DropDown
            theme={{ colors: { text: Colors.SECONDARY } }}
            mode={"flat"}
            inputProps={{
              underlineColor: Colors.PRIMARY,
              style: {
                backgroundColor: Colors.MAIN_BACKGROUND,
                fontSize: 18,
                height: 50
              },
            }}
            dropDownItemTextStyle={{
              color: Colors.SECONDARY
            }}
            dropDownItemStyle={{
              borderColor: Colors.PRIMARY
            }}
            activeColor={Colors.PRIMARY}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
          />
        </View>
      </Surface>
    </>
  );
}

export default withTheme(SelectSubaccount);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dropDownContainer: {
    minWidth: '90%',
    flex: 1
  },
  helperTextStyle: {
    color: Colors.HELPER_TEXT,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 40
  }
});