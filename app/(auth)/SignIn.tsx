import {
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.password || !form.email) {
      return Alert.alert("erorr", "Please fill in all the fields");
    }

    setIsLoading(true);

    try {
      await signIn(form.email, form.password);

      const res = await getCurrentUser();

      setUser(res);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("error", error?.message);
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
          <Text className="font-psemibold text-2xl text-white">Sign In</Text>
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
            title="Login"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
          <Text className="text-white text-center mt-3 text-md">
            Don’t have an account?{" "}
            <Link href={"/SignIn"} className=" text-secondary-100">
              Signup
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
