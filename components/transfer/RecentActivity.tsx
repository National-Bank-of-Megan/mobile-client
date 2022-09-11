import {StyleSheet, View} from "react-native";
import {Divider, Subheading, useTheme, withTheme, Text} from "react-native-paper";
import Colors from "../../constants/colors";
import RecentActivityCard from "./RecentActivityCard";
import recentActivityCard from "./RecentActivityCard";

const recentActivityCards = [
  {
    id: 0,
    title: 'Spotify subscription',
    amount: '-20.00 PLN',
    date: '01.01.2000, 12:00'
  },
  {
    id: 1,
    title: 'Spotify subscription',
    amount: '-20.00 PLN',
    date: '01.01.2000, 12:00'
  },
  {
    id: 2,
    title: 'Spotify subscription',
    amount: '-20.00 PLN',
    date: '01.01.2000, 12:00'
  },
  {
    id: 3,
    title: 'Spotify subscription',
    amount: '-20.00 PLN',
    date: '01.01.2000, 12:00'
  },
  {
    id: 4,
    title: 'Spotify subscription',
    amount: '-20.00 PLN',
    date: '01.01.2000, 12:00'
  }
]

const RecentActivity = () => {
  const {colors, fonts} = useTheme();

  return (
    <View style={styles.container}>
      <Subheading style={[styles.activityHeader, fonts.regular]}>Recent activity</Subheading>
      <Divider style={styles.divider}/>
      <View style={styles.recentActivityListContainer}>
        {recentActivityCards.map(recentActivityCardItem => 
          <RecentActivityCard key={recentActivityCardItem.id}
                              title={recentActivityCardItem.title}
                              amount={recentActivityCardItem.amount}
                              date={recentActivityCardItem.date}  />
        )}
      </View>
    </View>
  );
}

export default withTheme(RecentActivity);

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    minWidth: "90%",
    marginTop: 40
  },
  activityHeader: {
    textAlign: 'center',
    fontSize: 24
  },
  divider: {
    backgroundColor: Colors.PRIMARY,
    marginTop: 5,
    height: 1.5
  },
  recentActivityListContainer: {
    marginTop: 20,
    marginBottom: 10
  }
});