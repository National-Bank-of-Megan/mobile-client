import GlobalStyles from "../global-styles";
import {Button, Headline} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import KlikCode from "../components/transfer/KlikCode";

const KlikCodeScreen = () => {
    return (
        <View style={GlobalStyles.container}>
            <Headline style={GlobalStyles.headline}>KLIK code</Headline>
            <KlikCode/>
            <Button mode='contained' icon="content-copy" contentStyle={styles.copyButtonContent}
                    style={styles.copyButton}
                    labelStyle={GlobalStyles.buttonLabel}>Copy code</Button>
        </View>
    );
}

export default KlikCodeScreen;

const styles = StyleSheet.create({
    copyButton: {
        marginTop: 30
    },
    copyButtonContent: {
        flexDirection: 'row-reverse'
    }
});