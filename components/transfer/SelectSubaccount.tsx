import {HelperText, Provider, withTheme} from "react-native-paper";
import {StyleSheet, View} from "react-native";
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
      <Provider theme={theme}>
        <View style={styles.dropDownContainer}>
          <DropDown
            theme={{ colors: { text: Colors.SECONDARY } }}
            mode={"flat"}
            inputProps={{
              underlineColor: Colors.PRIMARY,
              style: {
                backgroundColor: Colors.MAIN_BACKGROUND,
                fontSize: 20,
                height: 50
              },
            }}
            dropDownItemTextStyle={{
              color: Colors.SECONDARY
            }}
            dropDownStyle={{
              backgroundColor: Colors.MAIN_BACKGROUND
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
      </Provider>
    </>
  );
}

export default withTheme(SelectSubaccount);

const styles = StyleSheet.create({
  dropDownContainer: {
    minWidth: '90%'
  },
  helperTextStyle: {
    color: Colors.HELPER_TEXT,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 40
  }
});