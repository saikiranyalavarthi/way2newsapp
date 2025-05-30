import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import NewsScreen from "../../screens/NewsScreen"; // Adjust path if needed

const App = () => {
  const [showLogo, setShowLogo] = useState(true);

  const [fontsLoaded] = useFonts({
    Pothana: require("../../assets/fonts/Pothana2000 Pothana2000.ttf"),
    Mallanna: require("../../assets/fonts/Mallanna-Regular.ttf"),
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor="#FFDD00" />
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
    </SafeAreaView>
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
    backgroundColor: "#FFDD00",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default App;
