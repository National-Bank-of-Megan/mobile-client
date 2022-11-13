import React from "react";
import { useTheme, withTheme,Text } from "react-native-paper";
import TransactionSummary from "../../model/transactionSummary";
import recentActivityCardStyles from "../../model/styles/recentActivityCardStyles";
import { View } from "react-native";

const TransactionCard: React.FC<{item :TransactionSummary}> = ({item}) =>{
    const { fonts, colors } = useTheme();

    return (
      <View style={recentActivityCardStyles.cardContainer}>
        <View style={recentActivityCardStyles.cardContent}>
          <View>
            <Text style={[recentActivityCardStyles.cardTitle, fonts.regular]}>{item.title}</Text>
            <Text style={[recentActivityCardStyles.cardDate, fonts.regular]}>{new Date(item.requestDate).toLocaleDateString('en-us', {
                            year: "numeric",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric"
                        })}</Text>
          </View>
          <View style={[recentActivityCardStyles.amountContainer]}>
            <Text style={recentActivityCardStyles.amount}>{'-'+item.amount+' '+item.currency}</Text>
          </View>
        </View>
      </View>
    );
  }
  
  export default withTheme(TransactionCard);
  