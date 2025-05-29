import React, { useState } from "react";
import { View } from "react-native";

import SocialIcons from "./SocialIcons";
import NewsPost from "../components/NewsPost";

export default function ShareButton() {
  const [showSocials, setShowSocials] = useState(false);

  const handleShare = () => {
    console.log("Share button clicked"); // Debug log
    setShowSocials(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <NewsPost onShare={handleShare} />
      {showSocials && <SocialIcons />}
    </View>
  );
}
