import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "@/constants";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";

interface VideoCardProps {
  item: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ item }) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <View className="">
      <View className="items-center justify-between flex-row">
        <View className="flex-row items-center gap-3">
          <View className="border-2 border-secondary-100 rounded-lg">
            <Image
              source={{ uri: item.creator.avatar }}
              className="w-[35px] h-[35px] rounded-md"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text
              className="text-white font-psemibold text-[16px]"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="text-gray-300 text-sm" numberOfLines={1}>
              {item.creator.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image source={icons.menu} className="h-5" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: item.video }}
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          className="relative mt-3 w-full h-60 flex items-center justify-center rounded-2xl"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative mt-3 w-full h-60 flex items-center justify-center rounded-2xl"
        >
          <Image
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-2xl"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
