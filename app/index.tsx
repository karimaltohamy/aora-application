import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { Redirect, router, useRouter } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";

// com.karim.aora

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;
  return (
    <SafeAreaView className="bg-primary min-h-[100vh] h-full items-center justify-center">
      <ScrollView
        style={{
          height: "100%",
        }}
      >
        <View className="w-full min-h-[85vh] flex-1 justify-center items-center mb-2 px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[85px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="w-[350px] h-[300px]"
          />
          <View className="relative mt-5 mb-5">
            <Text className="text-3xl text-white text-center font-psemibold">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              resizeMode="contain"
              className="w-[100px] h-[15px] absolute -bottom-1 -right-2"
            />
          </View>
          <Text className="text-gray-400 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/SignIn");
            }}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={"#161622"} barStyle={"light-content"} />
    </SafeAreaView>
  );
}
