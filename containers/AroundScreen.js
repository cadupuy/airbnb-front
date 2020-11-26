import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import colors from "../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoomScreen() {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [permission, setPermission] = useState("");
  const [waitPermission, setWaitPermission] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status === "granted") {
          setPermission(true);
          let location = await Location.getCurrentPositionAsync();
          setLongitude(location.coords.longitude);
          setLatitude(location.coords.latitude);
        } else {
          setPermission(false);
        }

        setWaitPermission(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (waitPermission === false) {
          if (permission) {
            const response = await axios.get(
              `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
            );
            setRooms(response.data);
          } else {
            const response = await axios.get(
              `https://express-airbnb-api.herokuapp.com/rooms/`
            );

            setRooms(response.data);
          }
          setisLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [waitPermission, permission]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar style="dark" />
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.red} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.homeContainer}>
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
                {rooms.map((room) => {
                  return (
                    <MapView.Marker
                      key={room.id}
                      onPress={() => {
                        navigation.navigate("Room", {
                          id: room._id,
                        });
                      }}
                      coordinate={{
                        latitude: room.location[1],
                        longitude: room.location[0],
                      }}
                    />
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
    paddingTop: 0,
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

  map: {
    height: height * 0.9,
    width: width,
  },
});
