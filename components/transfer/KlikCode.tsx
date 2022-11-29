import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import KlikProgressBar from "../KlikProgressBar";
import {UseStateType} from "../../model/UseStateType";
import Spinner from "../../common/Spinner";

const KlikCode: React.FC<{
    code: string,
    klikToggle: UseStateType<boolean>,
    isLoading: boolean,
    timeLeft: UseStateType<number>,
}> = (props) => {

    return (
        <View style={styles.container}>
            {
                props.isLoading &&
                <View style={styles.spinnerStyle}>
                    <Spinner isVisible={props.isLoading}/>
                </View>
            }
            {
                !props.isLoading &&
                <>
                    <KlikProgressBar klikToggle={props.klikToggle} timeLeft={props.timeLeft}/>
                    <View style={styles.codeContainer}>
                        {props.isLoading &&
                            <Text style={styles.codeTextStyle}>{props.code}</Text>
                        }
                    </View>
                </>
            }
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
    },
    spinnerStyle: {
        marginBottom: 80
    }
});
