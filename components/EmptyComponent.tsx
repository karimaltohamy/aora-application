import { View, Text, Image } from "react-native";
import { images } from "@/constants";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyComponentProps {
  subtitle: string;
  title: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ subtitle, title }) => {
  return (
    <View className="text-white">
      <View className="mb-3">
        <Image
          source={images.empty}
          resizeMode="cover"
          className="w-full h-[160px]"
        />
      </View>
      <Text className="text-gray-200 text-sm text-center">{title}</Text>
      <Text className="text-lg font-psemibold text-white text-center">
        {title}
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyles="mt-5"
      />
    </View>
  );
};

export default EmptyComponent;
