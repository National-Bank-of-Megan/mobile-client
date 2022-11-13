import React from "react";
import { View } from "react-native";
import { useTheme, withTheme, Text } from "react-native-paper";
import Colors from "../../constants/colors";
import CurrencyExchangeHistory from "../../model/currencyExchangeHistory";
import recentActivityCardStyles from "../../model/styles/recentActivityCardStyles";

const CurrencyExchangeCard: React.FC<{item :CurrencyExchangeHistory}> = ({item}) =>{
    const { fonts, colors } = useTheme();

    return (
      <View style={recentActivityCardStyles.cardContainer}>
        <View style={recentActivityCardStyles.cardContent}>
          <View>
            <Text style={[recentActivityCardStyles.cardTitle, fonts.regular]} selectionColor={'#7fffd4'}>{'+'+item.bought.toFixed(2)+' '+item.currencyBought}</Text>
            <Text style={[recentActivityCardStyles.cardDate, fonts.regular]}>{new Date(item.requestDate).toLocaleDateString('en-us', {
                            year: "numeric",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric"
                        })}</Text>
          </View>
          <View style={[recentActivityCardStyles.amountContainer]}>
            <Text style={recentActivityCardStyles.amount} selectionColor={Colors.RECENT_ACTIVITY_RED}>{'-'+item.sold.toFixed(2)+' '+item.currencySold}</Text>
          </View>
        </View>
      </View>
    );
  }
  
  export default withTheme(CurrencyExchangeCard);