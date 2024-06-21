import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchInputProps {
  initialQuery: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialQuery }) => {
  const [search, setSearch] = useState<string>(initialQuery);
  const pathname = usePathname();

  return (
    <View className={``}>
      <View className=" relative border-2 border-black-200 bg-black-100 h-[55px] p-3 rounded-lg focus:border-secondary-100 flex-row items-center">
        <TextInput
          className="flex-1 text-white"
          value={search}
          onChangeText={(e) => {
            setSearch(e);
          }}
          placeholder={"Search for a video topic"}
          placeholderTextColor={"#7b7b8b"}
        />
        <TouchableOpacity
          onPress={() => {
            if (!search) {
              return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
              );
            }

            if (pathname.startsWith("/search")) {
              return router.setParams({ query: search });
            } else {
              router.push(`/search/${search}`);
            }
          }}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            className="w-[20px] h-[20px]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
