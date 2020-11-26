import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import colors from "../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import RoomCard from "../components/RoomCard";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setRooms(response.data);
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
        <View style={styles.roomCards}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rooms}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", {
                      id: item._id,
                    });
                  }}
                >
                  <RoomCard room={item} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingBottom: 0,
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

  homeContainer: {
    marginHorizontal: 15,
    paddingTop: 20,
  },

  header: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: colors.ligthgreyText,
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
  },

  roomCards: {
    marginHorizontal: 20,
  },
});
