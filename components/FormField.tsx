import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FormFieldProps {
  title: string;
  handleChange: (e: any) => void;
  value: string;
  placeholder: string;
  otherStyles: string;
  keyboardType?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  handleChange,
  placeholder,
  value,
  otherStyles,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`${otherStyles}`}>
      <Text className="text-lg text-gray-300 mb-2">{title}</Text>
      <View className=" relative border-2 border-black-200 bg-black-100 h-[55px] p-3 rounded-lg focus:border-secondary-100 flex-row items-center">
        <TextInput
          className="flex-1 text-white"
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={title == "Password" && !showPassword}
          keyboardType={keyboardType ? keyboardType : "default"}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="w-[25px] h-[25px]"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
