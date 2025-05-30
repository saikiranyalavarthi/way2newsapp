import React, { useState } from "react";
import he from "he";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
  Alert,
} from "react-native";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  ShareIcon,
  ChatBubbleLeftEllipsisIcon,
} from "react-native-heroicons/outline";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

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
  return postTime.toLocaleDateString();
};

const cleanHtmlEntities = (html) => {
  if (!html) return "";
  const decoded = he.decode(html); // all entities decoded
  return decoded
    .replace(/<[^>]*>?/gm, "") // remove HTML tags
    .replace(/\s+/g, " ") // normalize whitespace
    .trim();
};

const NewsPost = ({ News }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisliked, setIsDisliked] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentsCount] = useState(0);
  const [showSocialSheet, setShowSocialSheet] = useState(false);

  const title = News.title?.rendered || "No Title";
  const url = News.url || "";
  const description = News.content?.rendered || "No Description";
  const imageUrl =
    News._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://via.placeholder.com/150";

  const cleanedTitle = cleanHtmlEntities(title);
  const cleanedDescription = cleanHtmlEntities(description);

  const onLikePress = () => {
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    } else if (!isLiked) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const onDisLikePress = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);
    } else if (!isDisliked) {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);
    }
  };

  const handleSharePress = () => setShowSocialSheet(true);

  const handleShare = (platform) => {
    const encoded = encodeURIComponent(url);

    switch (platform) {
      case "whatsapp": {
        const whatsappURL = `whatsapp://send?text=${encoded}`;
        const whatsappWebURL = `https://wa.me/?text=${encoded}`;

        Linking.canOpenURL(whatsappURL)
          .then((supported) => {
            if (supported) {
              Linking.openURL(whatsappURL);
            } else {
              Linking.openURL(whatsappWebURL);
            }
          })
          .catch(() => Alert.alert("Error", "Cannot open WhatsApp"));
        break;
      }
      case "telegram": {
        const telegramURL = `https://t.me/share/url?url=${url}&text=${encodeURIComponent(
          title
        )}`;
        Linking.openURL(telegramURL).catch(() =>
          Alert.alert("Error", "Cannot open Telegram")
        );
        break;
      }
      case "facebook": {
        const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
        Linking.openURL(facebookURL).catch(() =>
          Alert.alert("Error", "Cannot open Facebook")
        );
        break;
      }
      case "twitter": {
        const twitterURL = `https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(
          title
        )}`;
        Linking.openURL(twitterURL).catch(() =>
          Alert.alert("Error", "Cannot open Twitter")
        );
        break;
      }
      case "instagram":
        Alert.alert("Note", "Instagram doesn't support direct link sharing.");
        break;
      default:
        break;
    }
    setShowSocialSheet(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.downloadContainer}>
        <Image
          source={require("../assets/images/logo1.png")}
          style={styles.logo}
        />
        <Text style={styles.downloadText}>
          Download More News on Manaenadu App
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.news}>
          <Text style={styles.heading}>{cleanedTitle}</Text>
          <Text style={styles.description} numberOfLines={8}>
            {cleanedDescription}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.top}>
          <ClockIcon color={"gray"} />
          <Text style={{ marginLeft: 5 }}>{getTimeAgo(News.date)}</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.left_btns}>
            <TouchableOpacity style={styles.action_btn} onPress={onLikePress}>
              <HandThumbUpIcon color={isLiked ? "red" : "gray"} size={30} />
              <Text style={styles.count}>{likeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.action_btn}
              onPress={onDisLikePress}
            >
              <HandThumbDownIcon
                color={isDisliked ? "green" : "gray"}
                size={30}
              />
              <Text style={styles.count}>{dislikeCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action_btn}>
              <ChatBubbleLeftEllipsisIcon color={"gray"} size={30} />
              <Text style={styles.count}>{commentsCount}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.right_btns}>
            <EllipsisVerticalIcon color={"gray"} size={30} />
            <TouchableOpacity onPress={handleSharePress}>
              <ShareIcon color={"blue"} size={25} />
            </TouchableOpacity>
          </View>
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
              <TouchableOpacity onPress={() => handleShare("whatsapp")}>
                <Icon name="whatsapp" size={28} color="green" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare("telegram")}>
                <Icon name="telegram" size={28} color="blue" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare("twitter")}>
                <Icon name="twitter" size={28} color="#1DA1F2" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShare("facebook")}>
                <Icon name="facebook" size={28} color="#3b5998" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#ffffff",
  },
  image: {
    width: width,
    height: height * 0.4,
    resizeMode: "cover",
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
  downloadText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Ponnala",
  },
  body: {
    width: width,
    flex: 1,
  },
  news: {
    width: width * 0.9,
    alignSelf: "center",
    paddingVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#002B5E",
    fontFamily: "Pothana",
    marginVertical: 10,
    textShadowColor: "rgba(37, 28, 28, 0.2)",
    textShadowRadius: 3,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: "black",
    fontFamily: "Mallanna",
  },
  footer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left_btns: {
    flexDirection: "row",
    alignItems: "center",
  },
  action_btn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  count: {
    marginLeft: 5,
    fontSize: 14,
  },
  right_btns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default NewsPost;
