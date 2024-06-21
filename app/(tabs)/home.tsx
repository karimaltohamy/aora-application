import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import EmptyComponent from "@/components/EmptyComponent";
import TrendingVideos from "@/components/TrendingVideos";
import { useAppWrite } from "@/hooks/useAppWrite";
import { getAllPosts, getUserPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { useFocusEffect } from "@react-navigation/native";

const home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data: posts, refecthData } = useAppWrite(getAllPosts);

  const onRefrech = async () => {
    setRefreshing(true);
    await refecthData();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS == "android" && StatusBar.setBackgroundColor("#161622");
      return () => {
        StatusBar.setBarStyle("default");
      };
    }, [])
  );

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
                <Text className="text-sm text-gray-300">Welcome Back</Text>
                <Text className="text-2xl font-pbold text-white">
                  {user?.username}
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="mt-8">
              <TrendingVideos />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            subtitle="No Videos Found"
            title=" Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefrech}
            tintColor={"white"}
            colors={["white"]}
          />
        }
        ItemSeparatorComponent={() => <Text style={{ height: 20 }}></Text>}
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
