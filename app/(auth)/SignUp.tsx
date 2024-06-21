import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.username || !form.password || !form.email) {
      return Alert.alert("erorr", "Please fill in all the fields");
    }

    setIsLoading(true);

    try {
      const res = await createUser(form.email, form.password, form.username);

      setUser(res);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary min-h-[100vh] h-full justify-center">
      <ScrollView
        style={{
          height: "100%",
        }}
      >
        <View className="px-4 text-start justify-center min-h-[85vh]">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[85px] mb-5"
          />
          <Text className="font-psemibold text-2xl text-white">Sign Up</Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="write your username"
            handleChange={(e) =>
              setForm((prev) => {
                return { ...prev, username: e };
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="write your email"
            handleChange={(e) =>
              setForm((prev) => {
                return { ...prev, email: e };
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="write your password"
            value={form.password}
            handleChange={(e) =>
              setForm((prev) => {
                return { ...prev, password: e };
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
          <Text className="text-white text-center mt-3 text-md">
            Already have an account?{" "}
            <Link href={"/SignIn"} className=" text-secondary-100">
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
