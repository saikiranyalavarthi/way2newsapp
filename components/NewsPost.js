import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useState } from "react";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  ShareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "react-native-heroicons/outline";
import Icon from "react-native-vector-icons/FontAwesome5";

const DeviceWidth = Dimensions.get("screen").width;
const DeviceHeight = Dimensions.get("screen").height;
const getTimeAgo = (isoDate) => {
  const now = new Date();
  const postTime = new Date(isoDate);
  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return postTime.toLocaleDateString(); // fallback for old posts
};

const cleanHtmlEntities = (html) => {
  if (!html) return "";
  return html
    .replace(/&nbsp;|&amp;nbsp;|&amp;/g, " ")
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
};

const NewsPost = ({ News }) => {
  const [isLiked, setisLiked] = useState(false);
  const [LikeCount, setLikeCount] = useState(0);
  const [isDisliked, setisDisliked] = useState(false);
  const [DisLikeCount, setDisLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [CommentsCount, setCommentsCount] = useState(0);
  const [showSocialSheet, setShowSocialSheet] = useState(false);

  const OnLikePress = () => {
    if (isDisliked) {
      setDisLikeCount(DisLikeCount - 1);
      setisDisliked(false);
      setisLiked(true);
      setLikeCount(LikeCount + 1);
    } else if (!isLiked) {
      setisLiked(true);
      setLikeCount(LikeCount + 1);
    }
  };

  const OnDisLikePress = () => {
    if (isLiked) {
      setLikeCount(LikeCount - 1);
      setisLiked(false);
      setDisLikeCount(DisLikeCount + 1);
      setisDisliked(true);
    } else if (!isDisliked) {
      setDisLikeCount(DisLikeCount + 1);
      setisDisliked(true);
    }
  };

  const handleSharePress = () => {
    setShowSocialSheet(true);
  };

  const openApp = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else alert("App not installed");
  };

  const title = News.title?.rendered || "No Title";
  const description = News.content?.rendered || "No Description";
  const imageUrl =
    News._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/150";

  const cleanedTitle = cleanHtmlEntities(title);
  const cleanedDescription = cleanHtmlEntities(description);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.downloadContainer}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={styles.logo}
        />
        <Text style={styles.downloadText}>
          Download App More NEWS ManaEnadu.
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.news}>
          <Text style={styles.heading}>{cleanedTitle}</Text>

          <Text style={styles.description} numberOfLines={expanded ? 10 : 8}>
            {cleanedDescription}
          </Text>

          {cleanedDescription.length > 300 && !expanded && (
            <TouchableOpacity onPress={() => setExpanded(true)}>
              <Text style={styles.readMore}>Read More ▼</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.top}>
          <ClockIcon color={"gray"} />
          <Text style={{ marginLeft: 5 }}>{getTimeAgo(News.date)}</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.left_btns}>
            <TouchableOpacity style={styles.action_btn} onPress={OnLikePress}>
              <HandThumbUpIcon color={isLiked ? "red" : "gray"} size={30} />
              <Text style={styles.count}>{LikeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.action_btn}
              onPress={OnDisLikePress}
            >
              <HandThumbDownIcon
                color={isDisliked ? "green" : "gray"}
                size={30}
              />
              <Text style={styles.count}>{DisLikeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action_btn}>
              <ChatBubbleLeftEllipsisIcon color={"gray"} size={30} />
              <Text style={styles.count}>{CommentsCount}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.right_btns}>
            <EllipsisVerticalIcon color={"gray"} size={30} />
            <TouchableOpacity onPress={handleSharePress}>
              <ShareIcon color={"blue"} size={25} />
            </TouchableOpacity>
          </View>

          <Modal
            visible={showSocialSheet}
            transparent
            animationType="slide"
            onRequestClose={() => setShowSocialSheet(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setShowSocialSheet(false)}
            />
            <View style={styles.sheet}>
              <Text style={styles.sheetTitle}>Share via</Text>
              <View style={styles.socialRow}>
                <TouchableOpacity
                  onPress={() =>
                    openApp("whatsapp://send?text=Check out this news")
                  }
                >
                  <Icon name="whatsapp" size={35} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    openApp(
                      "https://www.facebook.com/sharer/sharer.php?u=https://manaenadu.com"
                    )
                  }
                >
                  <Icon name="facebook" size={35} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    openApp(
                      "https://twitter.com/intent/tweet?text=Check+out+this+news"
                    )
                  }
                >
                  <Icon name="twitter" size={35} color="#00acee" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openApp("https://instagram.com/manaenadu")}
                >
                  <Icon name="instagram" size={35} color="#C13584" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default NewsPost;

const styles = StyleSheet.create({
  container: {
    height: DeviceHeight,
    width: DeviceWidth,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  image: {
    width: DeviceWidth,
    height: DeviceHeight * 0.4,
    resizeMode: "cover",
  },
  body: {
    height: DeviceHeight * 0.6,
    width: DeviceWidth,
  },
  news: {
    width: DeviceWidth * 0.85,
    alignSelf: "center",
    paddingVertical: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    fontFamily: "Pothana", // Ensure font is loaded
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 10,

    lineHeight: 23,
    textTransform: "capitalize",
    textAlign: "justify",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    fontSize: 18,

    margin: 5,
    lineHeight: 23,

    fontFamily: "Mallanna", // Ensure font is loaded
  },
  readMore: {
    color: "blue",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  footer: {
    justifyContent: "flex-end",
    width: DeviceWidth * 0.85,
    position: "absolute",
    bottom: 30,
    left: DeviceWidth * 0.075,
    paddingVertical: 5,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  bottom: {
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left_btns: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    marginHorizontal: 5,
  },
  action_btn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  right_btns: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Ponnala", // Ensure font is loaded
  },
  downloadContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});
