import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import {Headline} from "react-native-paper";

const NotReleasedMessage = () => {
    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Headline>Not released yet.</Headline>
            </ScrollView></>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 80
    }
});

export default NotReleasedMessage;