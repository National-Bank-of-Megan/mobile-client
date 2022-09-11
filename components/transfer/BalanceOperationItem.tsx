import {Pressable, StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Text, useTheme, withTheme} from "react-native-paper";

const BalanceOperationItem: React.FC<{ color: string, operationName: string, iconName: string }> = ({ operationName, color, iconName }) => {
  const { fonts, colors } = useTheme();

  let icon: any = <Text style={[styles.letterIcon, fonts.medium]}>{iconName}</Text>;
  if (iconName.length > 1) {
    icon = <MaterialCommunityIcons name={iconName} color={Colors.SECONDARY} size={24} />;
  }

  return (
    <View style={styles.container}>
      <Pressable>
        <View style={[styles.balanceOperationBlock, { backgroundColor: color }]}>
          {icon}
        </View>
      </Pressable>
      <Text style={[styles.operationName, fonts.medium, { color: colors.accent }]}>{operationName}</Text>
    </View>
  );
}

export default withTheme(BalanceOperationItem);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  balanceOperationBlock: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  operationName: {
    marginTop: 3,
    textAlign: 'center',
    color: Colors.SECONDARY,
    letterSpacing: 0.15,
    fontSize: 10
  },
  letterIcon: {
    color: Colors.SECONDARY,
    fontSize: 26
  }
});