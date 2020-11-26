import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import Logo from "./components/Logo";
import { AntDesign } from "@expo/vector-icons";
import RoomScreen from "./containers/RoomScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import AroundScreen from "./containers/AroundScreen";
import colors from "./assets/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen name="SignIn" options={{ headerShown: false }}>
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in

        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-home"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  options={{
                    headerTitle: () => <Logo />,
                    headerStatusBarHeight: 60,

                    headerTitleAlign: "center",
                  }}
                >
                  {() => <HomeScreen />}
                </Stack.Screen>

                <Stack.Screen
                  name="Room"
                  options={{
                    headerTitle: () => <Logo />,
                    headerBackTitleVisible: false,
                    headerTitleAlign: "center",
                    headerStatusBarHeight: 60,

                    headerBackImage: () => (
                      <AntDesign
                        name="arrowleft"
                        size={24}
                        color={colors.grey}
                      />
                    ),
                  }}
                >
                  {() => <RoomScreen />}
                </Stack.Screen>

                <Stack.Screen
                  name="Profile"
                  options={{
                    title: "User Profile",
                  }}
                >
                  {() => <ProfileScreen />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Around"
            options={{
              tabBarLabel: "Around me",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Around"
                  options={{
                    headerStatusBarHeight: 60,
                    title: "Around",
                    headerTitleAlign: "center",

                    tabBarLabel: "Around",
                    headerTitle: () => <Logo />,
                  }}
                >
                  {() => <AroundScreen />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-options"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Settings"
                  options={{ title: "Settings", tabBarLabel: "Settings" }}
                >
                  {() => <SettingsScreen setToken={setToken} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
