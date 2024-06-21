import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Flag } from "react-native-appwrite";
import { icons, images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import EmptyComponent from "@/components/EmptyComponent";
import TrendingVideos from "@/components/TrendingVideos";
import { useAppWrite } from "@/hooks/useAppWrite";
import {
  getAllPosts,
  getLastestPosts,
  handleSearchResult,
} from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refecthData } = useAppWrite(() =>
    handleSearchResult(query)
  );

  useEffect(() => {
    refecthData();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-4"
        data={posts}
        renderItem={({ item }) => {
          return <VideoCard item={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="my-8">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-sm text-gray-300">Search results</Text>
                <Text className="text-2xl font-pbold text-white">{query}</Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        ItemSeparatorComponent={() => <Text style={{ height: 20 }}></Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
