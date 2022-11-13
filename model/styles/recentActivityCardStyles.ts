import Colors from "../../constants/colors";
import {StyleSheet} from "react-native";

const recentActivityCardStyles = StyleSheet.create({
    cardContainer: {
      backgroundColor: Colors.COMPONENT_BACKGROUND,
      height: 75,
      paddingVertical: 12,
      paddingHorizontal: 14,
      marginBottom: 20,
      borderRadius: 4
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: Colors.SECONDARY
    },
    cardTitle: {
      color: Colors.SECONDARY,
      fontSize: 18
    },
    cardDate: {
      color: Colors.COMPONENT_TEXT,
      fontSize: 14,
    },
    amountContainer: {
  
    },
    amount: {
      color: Colors.SECONDARY,
      fontSize: 14,
      letterSpacing: 0.15
    }
  });

  export default recentActivityCardStyles;