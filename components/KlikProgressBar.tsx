import {ProgressBar, Text} from "react-native-paper";
import {KLIK_CODE_TIME} from "../constants/contansts";
import {StyleSheet, View} from "react-native";
import Colors from "../constants/colors";
import {useEffect, useState} from "react";

const KlikProgressBar: React.FC<{
  duration: number,
  marginTop?: number
}> = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.duration);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(previousTimeLeft => previousTimeLeft - 1)
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <View style={{...styles.container, marginTop: props.marginTop}}>
      <Text style={styles.validText}>Valid for the next: {timeLeft}s</Text>
      <ProgressBar progress={timeLeft / props.duration} style={styles.progressBar}/>
    </View>
  );
}

export default KlikProgressBar;

const styles = StyleSheet.create({
  container: {
 
  },
  validText: {
    fontSize: 16,
    color: Colors.SECONDARY
  },
  progressBar: {
    marginTop: 10
  }
});