import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import NewsPost from "../components/NewsPost";

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from WordPress API with _embed for featured image
  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://manaenadu.com/wp-json/wp/v2/posts?_embed"
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
      pagingEnabled={true}
    />
  );
};

export default NewsScreen;
