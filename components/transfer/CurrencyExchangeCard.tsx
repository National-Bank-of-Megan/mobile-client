import React from "react";
import {View} from "react-native";
import {Text, useTheme, withTheme} from "react-native-paper";
import CurrencyExchangeHistory from "../../model/currencyExchangeHistory";
import recentActivityCardStyles from "../../model/styles/recentActivityCardStyles";

const CurrencyExchangeCard: React.FC<{ item: CurrencyExchangeHistory }> = ({item}) => {
    const {fonts, colors} = useTheme();

    return (
        <View style={recentActivityCardStyles.cardContainer}>
            <View style={recentActivityCardStyles.cardContent}>
                <View>
                    <Text
                        style={[recentActivityCardStyles.cardTitle, fonts.regular]}>{'+' + item.bought.toFixed(2) + ' ' + item.currencyBought}</Text>
                    <Text
                        style={[recentActivityCardStyles.cardDate, fonts.regular]}>{new Date(item.requestDate).toLocaleDateString('en-us', {
                        year: "numeric",
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "numeric"
                    })}</Text>
                </View>
                <View style={[recentActivityCardStyles.amountContainer]}>
                    <Text
                        style={recentActivityCardStyles.amount}>{'-' + item.sold.toFixed(2) + ' ' + item.currencySold}</Text>
                </View>
            </View>
        </View>
    );
}

export default withTheme(CurrencyExchangeCard);