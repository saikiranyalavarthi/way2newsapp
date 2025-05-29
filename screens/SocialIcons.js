import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-native-heroicons/outline"; // Replace with actual icons

export default function SocialIcons() {
  return (
    <View style={styles.socialsContainer}>
      <TouchableOpacity>
        <FacebookIcon size={40} color="#3b5998" />
      </TouchableOpacity>
      <TouchableOpacity>
        <TwitterIcon size={40} color="#1DA1F2" />
      </TouchableOpacity>
      <TouchableOpacity>
        <WhatsappIcon size={40} color="#25D366" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  socialsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
