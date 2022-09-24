import {HelperText, Provider, Surface, withTheme, TextInput} from "react-native-paper";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import DropDown from "react-native-paper-dropdown";
import Colors from "../../constants/colors";
import {Dispatch, SetStateAction, useState} from "react";
import { useTheme } from 'react-native-paper';
import {SubAccountCurrencyBalance} from "../../screens/TransfersScreen";

const SelectSubaccount: React.FC<{
  subAccountBalanceList: SubAccountCurrencyBalance[];
  setSubAccountBalanceList: Dispatch<SetStateAction<SubAccountCurrencyBalance[]>>;
}> = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCurrencyName, setSelectedCurrencyName] = useState("PLN");

  const mapSelectedCurrencyToString = (accountCurrencyBalance: SubAccountCurrencyBalance) => {
    return `${accountCurrencyBalance.currency} - ${accountCurrencyBalance.balance} ${accountCurrencyBalance.symbol}`;
  }

  const getDropDownList = () => {
    return props.subAccountBalanceList.map((subAccountBalance) => {
      return {
        'label': mapSelectedCurrencyToString(subAccountBalance),
        'value': subAccountBalance.currency
      }
    })
  }

  const dropDownSubAccountBalanceList = getDropDownList();

  return (
    <>
      {/*<HelperText type="info" style={styles.helperTextStyle}>*/}
      {/*  Currency balance*/}
      {/*</HelperText>*/}
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
                flex: 1,
                paddingHorizontal: 0
              },
              right: <TextInput.Icon style={{ marginTop: 25 }} name={showDropDown ? "menu-up" : "menu-down"} />
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
            value={selectedCurrencyName}
            setValue={setSelectedCurrencyName}
            list={dropDownSubAccountBalanceList}
            label={<Text style={styles.helperTextStyle}>Select currency</Text>}
          />
        </View>
      </Surface>
    </>
  );
}

export default withTheme(SelectSubaccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  dropDownContainer: {
    minWidth: '90%',

  },
  helperTextStyle: {
    color: Colors.HELPER_TEXT,
    // alignSelf: 'flex-start',
    // marginLeft: 5,
    // marginTop: 40,
    // marginBottom: 0,
    // paddingBottom: 0
  }
});