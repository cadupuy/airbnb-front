import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import {
  Image,
  StyleSheet,
  View,
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
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";

export default function RoomScreen() {
  const navigation = useNavigation();

  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [latitude, setLatitue] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync();
          setLongitude(location.coords.longitude);
          setLatitue(location.coords.latitude);

          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          setRooms(response.data);
        } else {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/`
          );
          console.log("HELLO");

          setRooms(response.data);
        }

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

            <View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 48.856614,
                  longitude: 2.3522219,
                  latitudeDelta: 0.2,
                  longitudeDelta: 0.2,
                }}
                showsUserLocation={true}
              >
                {rooms.map((marker) => {
                  return (
                    <TouchableOpacity
                      key={marker.id}
                      onPress={() => {
                        console.log("hello");
                        navigation.navigate("Room", {
                          id: marker._id,
                        });
                      }}
                    >
                      <MapView.Marker
                        coordinate={{
                          latitude: marker.location[1],
                          longitude: marker.location[0],
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </MapView>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
    marginLeft: 10,
  },

  roomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
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

  map: {
    height: height * 0.8,
    width: width,
    marginTop: 5,
  },
});
