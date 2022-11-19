import {Button, HelperText, TextInput} from "react-native-paper";
import Colors from "../../constants/colors";
import {NativeSyntheticEvent, StyleSheet, TextInputFocusEventData, View} from "react-native";
import InputTheme from "../../constants/input-theme";
import GlobalStyles from "../../global-styles";

const BalanceAmountInput: React.FC<{
    showDialog: () => void;
    selectedCurrencySymbol: string;
    value: string;
    onChangeText: (value: string) => void;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    error: boolean;
}> = ({showDialog, selectedCurrencySymbol, value, onChangeText, onBlur, error}) => {

    return (
        <View>
            <View style={styles.amountContainer}>
                <TextInput keyboardType='numeric' label='Amount' style={[GlobalStyles.inputStyle, styles.inputStyle]}
                           theme={InputTheme}
                           onChangeText={onChangeText}
                           onBlur={onBlur}
                           value={value}
                           error={error}/>
                <Button icon="chevron-down" labelStyle={{fontSize: 17}} color={Colors.COMPONENT_TEXT} uppercase={false}
                        style={styles.rightButton}
                        onPress={showDialog} contentStyle={styles.buttonIcon}>{selectedCurrencySymbol}</Button>
            </View>
            <HelperText type="error" visible={error} style={GlobalStyles.inputHelperText}>
                Provide correct amount of money.
            </HelperText>
        </View>
    );
}

export default BalanceAmountInput;

const styles = StyleSheet.create({
    inputStyle: {
        flex: 1
    },
    amountContainer: {
        flexDirection: 'row',
        position: 'relative'
    },
    rightButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        maxWidth: '80%'
        // alignSelf: 'flex-end',
        // borderBottomColor: Colors.HELPER_TEXT,
        // borderBottomWidth: 1
    },
    buttonIcon: {
        flexDirection: 'row-reverse'
    }
});