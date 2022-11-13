import {ProgressBar, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import {useEffect, useState} from "react";
import {KLIK_CODE_TIME} from "../../constants/constants";
import KlikProgressBar from "../KlikProgressBar";

const KlikCode = () => {

  return (
    <View style={styles.container}>
      <KlikProgressBar duration={KLIK_CODE_TIME} />
      <View style={styles.codeContainer}>
        <Text style={styles.codeTextStyle}>123456</Text>
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
