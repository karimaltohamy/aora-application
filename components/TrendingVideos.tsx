import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppWrite } from "@/hooks/useAppWrite";
import { getLastestPosts } from "@/lib/appwrite";
import { icons } from "@/constants";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const AnimatableItem = ({ item, activeItem }) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View animation={activeItem == item.$id ? zoomIn : zoomOut}>
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
          className="relative flex items-center justify-center w-[190px] h-[260px] rounded-2xl shadow-xl"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative flex items-center justify-center w-[190px] h-[260px] rounded-2xl shadow-xl"
        >
          <Image
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-2xl "
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-10 h-10 absolute"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const TrendingVideos = () => {
  const { data: lastestPosts } = useAppWrite(getLastestPosts);
  const [activeItem, setActiveItem] = useState<any>(
    lastestPosts[0] && lastestPosts[0].$id
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };

  return (
    <View>
      {lastestPosts.length > 0 && (
        <Text className="text-lg text-gray-400 mb-3">TrendingVideos</Text>
      )}
      <FlatList
        data={lastestPosts}
        renderItem={({ item }) => (
          <AnimatableItem item={item} activeItem={activeItem} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 130 }}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
      />
    </View>
  );
};

export default TrendingVideos;
