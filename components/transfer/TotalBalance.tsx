import {StyleSheet, View} from "react-native";
import {Headline, Subheading, withTheme} from "react-native-paper";

const TotalBalance: React.FC<{ theme: ReactNativePaper.Theme }> = ({ theme }) => {
  const { fonts, colors } = theme;

  return (
    <View style={styles.totalBalanceContainer}>
      <Headline style={[styles.headline, fonts.regular]}>Total balance</Headline>
      <Subheading style={[{ color: colors.accent }, styles.subhead, fonts.light]}>PLN 15,456.78</Subheading>
    </View>
  );
}

const styles = StyleSheet.create({
  totalBalanceContainer: {
    alignItems: 'center'
  },
  headline: {
    fontSize: 34,
    letterSpacing: 0.25
  },
  subhead: {
    fontSize: 24,
    letterSpacing: 0,
    marginTop: 10
  }
});

export default withTheme(TotalBalance);