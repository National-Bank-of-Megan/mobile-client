import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import {KLIK_CODE_TIME} from "../../constants/constants";
import KlikProgressBar from "../KlikProgressBar";
import {UseStateType} from "../../model/UseStateType";
import {AlertState} from "../alert/AlertSnackBar";

const KlikCode: React.FC<{ duration: number, code: string }> = (props)=> {

    return (
        <View style={styles.container}>
            <KlikProgressBar duration={props.duration}/>
            <View style={styles.codeContainer}>
                <Text style={styles.codeTextStyle}>{props.code}</Text>
            </View>
        </View>
    );
}

export default KlikCode;

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    codeContainer: {
        marginTop: 25,
        backgroundColor: Colors.COMPONENT_BACKGROUND,
        padding: 20,
        borderRadius: 3
    },
    codeTextStyle: {
        fontSize: 48,
        letterSpacing: 18,
        color: Colors.SECONDARY,
        textAlign: 'center'
    }
});
