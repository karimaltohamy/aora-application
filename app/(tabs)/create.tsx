import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";

const create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const create = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert("error", "Please fill in all the fields");
    }

    setIsLoading(true);

    try {
      const res = await createPost({ ...form, userId: user.$id });
      if (res) {
        Alert.alert("Success", "Post Uploaded successfully");
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setForm({
      //   title: "",
      //   thumbnail: null,
      //   video: null,
      //   prompt: "",
      // });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4">
        <Text className="font-psemibold text-2xl text-white my-5">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChange={(e) =>
            setForm((prev) => {
              return { ...prev, title: e };
            })
          }
          otherStyles="mt-7"
        />

        <View className="mt-7">
          <Text className="text-lg text-gray-300 mb-2">Upload Video</Text>
          {form.video ? (
            <Video
              source={{ uri: form.video.uri }}
              shouldPlay
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              className="relative flex items-center justify-center h-40 rounded-2xl shadow-xl"
            />
          ) : (
            <TouchableOpacity
              onPress={() => openPicker("video")}
              className="relative border-2 border-black-200 bg-black-100 h-40 p-3 rounded-lg focus:border-secondary-100 items-center justify-center"
            >
              <View className="w-[50px] h-[50px] border border-dashed border-secondary-100 rounded-lg flext items-center justify-center">
                <Image
                  source={icons.upload}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View className="mt-7">
          <Text className="text-lg text-gray-300 mb-2">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="relative border-2 border-black-200 bg-black-100 h-[55px] p-3 rounded-lg items-center justify-center flex-row gap-x-2">
                <Image
                  source={icons.upload}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Text className="text-white font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChange={(e) =>
            setForm((prev) => {
              return { ...prev, prompt: e };
            })
          }
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={create}
          containerStyles="mt-7"
          isLoading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
