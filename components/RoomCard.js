import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";

import {
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import colors from "../assets/colors";

const RoomCard = ({ room }) => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
      onPress={() => {
        navigation.navigate("Settings");
      }}
    >
      <View style={styles.roomCard}>
        <Image
          source={{
            uri: room.photos[0].url,
          }}
          style={styles.roomPicture}
          resizeMode="cover"
        ></Image>
        <Text style={styles.roomPrice}>{room.price} €</Text>
      </View>
      <View style={styles.roomDetails}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.roomTitle}>
            {room.title}
          </Text>
          <View style={styles.rating}>
            <Entypo
              name="star"
              size={20}
              style={styles.star}
              color={
                room.ratingValue > 0 ? colors.yellowStar : colors.ligthgreyStar
              }
            />
            <Entypo
              name="star"
              size={20}
              style={styles.star}
              color={
                room.ratingValue > 1 ? colors.yellowStar : colors.ligthgreyStar
              }
            />
            <Entypo
              name="star"
              size={20}
              style={styles.star}
              color={
                room.ratingValue > 2 ? colors.yellowStar : colors.ligthgreyStar
              }
            />
            <Entypo
              name="star"
              size={20}
              style={styles.star}
              color={
                room.ratingValue > 3 ? colors.yellowStar : colors.ligthgreyStar
              }
            />
            <Entypo
              name="star"
              size={20}
              style={styles.star}
              color={
                room.ratingValue > 4 ? colors.yellowStar : colors.ligthgreyStar
              }
            />
            <Text style={styles.reviews}>{room.reviews} reviews</Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: room.user.account.photo.url,
            }}
            style={styles.avatar}
            resizeMode="contain"
          ></Image>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  color: {
    color: colors.grey,
  },

  dark: {
    color: colors.black,
  },

  container: {
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 20,
    borderColor: colors.ligthgreyText,
  },
  roomCard: {
    position: "relative",
  },

  roomPicture: {
    width: "100%",
    height: 200,
  },

  roomTitle: {
    fontSize: 20,
  },

  roomPrice: {
    position: "absolute",
    backgroundColor: colors.black,
    bottom: 10,
    color: colors.white,
    paddingBottom: 15,
    paddingTop: 15,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 18,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  roomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  star: {
    marginRight: 4,
  },
  reviews: {
    marginLeft: 5,
    color: colors.grey,
  },
});

export default RoomCard;
