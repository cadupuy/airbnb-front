import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import SwiperFlatList from "react-native-swiper-flatlist";

import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import colors from "../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

export default function RoomScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();

  const id = params.id;

  const [room, setRoom] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isClicked, setisClicked] = useState(false);

  const handlePress = () => {
    if (isClicked) {
      setisClicked(false);
    } else {
      setisClicked(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setRoom(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar style="dark" />
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
          <View style={styles.homeContainer}>
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              ></Image>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
                style={styles.arrow}
              >
                <AntDesign
                  style={styles.arrow}
                  name="arrowleft"
                  size={24}
                  color={colors.grey}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.roomCard}>
              <View style={styles.container}>
                <SwiperFlatList
                  autoplay
                  autoplayDelay={2}
                  autoplayLoop
                  index={2}
                  showPagination
                >
                  {room.photos.map((item, index) => {
                    return (
                      <View key={index} style={[styles.child]}>
                        <Image
                          source={{
                            uri: item.url,
                          }}
                          style={styles.roomPicture}
                          resizeMode="cover"
                        ></Image>
                      </View>
                    );
                  })}
                </SwiperFlatList>
                <Text style={styles.roomPrice}>{room.price} €</Text>
              </View>

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
                      room.ratingValue > 0
                        ? colors.yellowStar
                        : colors.ligthgreyStar
                    }
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={
                      room.ratingValue > 1
                        ? colors.yellowStar
                        : colors.ligthgreyStar
                    }
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={
                      room.ratingValue > 2
                        ? colors.yellowStar
                        : colors.ligthgreyStar
                    }
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={
                      room.ratingValue > 3
                        ? colors.yellowStar
                        : colors.ligthgreyStar
                    }
                  />
                  <Entypo
                    name="star"
                    size={20}
                    style={styles.star}
                    color={
                      room.ratingValue > 4
                        ? colors.yellowStar
                        : colors.ligthgreyStar
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
            <View style={styles.description}>
              {isClicked === false ? (
                <>
                  <Text numberOfLines={3}>{room.description}</Text>
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={handlePress}
                  >
                    <Text style={styles.show}>Show more</Text>
                    <AntDesign name="caretdown" size={14} color={colors.grey} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text numberOfLines={20}>{room.description}</Text>

                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={handlePress}
                  >
                    <Text style={styles.show}>Show less</Text>
                    <AntDesign name="caretup" size={14} color={colors.grey} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  child: {
    width: width,
    height: 270,
    justifyContent: "center",
    position: "relative",
  },
  text: {
    fontSize: width * 0.5,
    textAlign: "center",
  },

  SafeAreaView: {
    paddingBottom: 0,
    flex: 1,
    backgroundColor: colors.white,
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  color: {
    color: colors.grey,
  },

  dark: {
    color: colors.black,
  },

  header: {
    paddingBottom: 10,
    alignItems: "center",
    position: "relative",
  },

  arrow: {
    position: "absolute",
    paddingLeft: 5,
    paddingRight: 5,
    left: 0,
    top: "25%",
  },

  logo: {
    width: 40,
    height: 40,
  },

  color: {
    color: colors.grey,
  },

  dark: {
    color: colors.black,
  },

  roomCard: {
    position: "relative",
  },

  roomPicture: {
    width: "100%",
    height: 270,
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
    paddingRight: 25,
    paddingLeft: 25,
    fontSize: 20,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },

  roomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    marginHorizontal: 20,
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

  description: {
    marginHorizontal: 20,
    paddingTop: 10,
  },

  showButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 12,
  },

  show: {
    color: colors.grey,
    paddingRight: 5,
  },
});
