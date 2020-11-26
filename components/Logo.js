import React from "react";
import { Image, StyleSheet } from "react-native";
const Logo = () => {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    ></Image>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
  },
});
