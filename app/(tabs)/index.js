import { View, Image, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import NewsScreen from "../../screens/NewsScreen"; // Update path if necessary

const App = () => {
  const [showLogo, setShowLogo] = useState(true);

  const [fontsLoaded] = useFonts({
    Pothana: require("../../assets/fonts/Pothana2000 Pothana2000.ttf"),
    Mallanna: require("../../assets/fonts/Mandali-Regular.ttf"),
    Ponnala: require("../../assets/fonts/Ramabhadra-Regular.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {showLogo ? (
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      ) : (
        <NewsScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700", // Gold
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default App;
