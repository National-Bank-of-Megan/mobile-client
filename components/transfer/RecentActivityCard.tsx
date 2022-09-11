import {Avatar, Button, Card, Title, Paragraph, Text, withTheme, useTheme} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import Colors from "../../constants/colors";

const RecentActivityCard: React.FC<{ title: string, amount: string, date: string }> = ({title, amount, date}) => {
  const { fonts, colors } = useTheme();

  return (
    // <Card style={styles.cardContainer}>
    //   <Card.Content style={styles.cardContainer}>
    //     <Title style={{ color: 'green' }}>Card title</Title>
    //     <Paragraph>Card content</Paragraph>
    //   </Card.Content>
    // </Card>
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text style={[styles.cardTitle, fonts.regular]}>{title}</Text>
          <Text style={[styles.cardDate, fonts.regular]}>{date}</Text>
        </View>
        <View style={[styles.amountContainer]}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </View>
  );
}

export default withTheme(RecentActivityCard);

const styles = StyleSheet.create({
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
    color: Colors.DATE,
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