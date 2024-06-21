import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import EmptyComponent from "@/components/EmptyComponent";
import { useAppWrite } from "@/hooks/useAppWrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  const handleSignOut = async () => {
    const res = await signOut();

    if (res) {
      setUser(null);
      setIsLoggedIn(false);

      router.replace("/SignIn");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="px-4"
        data={posts}
        renderItem={({ item }) => {
          return <VideoCard item={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="mb-10 mt-4">
            <TouchableOpacity
              onPress={handleSignOut}
              className="items-end mb-5"
            >
              <Image
                source={icons.logout}
                className="w-7 h-7"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View>
              <View className="border-2 border-secondary-100 rounded-lg w-[60px] h-[60px] mx-auto mb-3">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-full h-full rounded-md"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-white text-2xl text-center">
                {user?.username}
              </Text>
              <View className="flex items-center justify-center flex-row gap-x-5 mt-4">
                <View>
                  <Text className="text-2xl font-pbold text-white text-center">
                    {posts?.length}
                  </Text>
                  <Text className="text-sm text-gray-300 text-center">
                    Posts
                  </Text>
                </View>
                <View>
                  <Text className="text-2xl font-pbold text-white text-center">
                    1.2K
                  </Text>
                  <Text className="text-sm text-gray-300 text-center">
                    Views
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            subtitle="No Videos Found"
            title=" Be the first one to upload a video"
          />
        )}
        ItemSeparatorComponent={() => <Text style={{ height: 20 }}></Text>}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
