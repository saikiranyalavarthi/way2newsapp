import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Dimensions } from "react-native";
import NewsPost from "../components/NewsPost";

const { height } = Dimensions.get("window");

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://manaenadu.com/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&per_page=20"
      );
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={newsData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <NewsPost News={item} />}
      pagingEnabled
      snapToInterval={height}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

export default NewsScreen;
