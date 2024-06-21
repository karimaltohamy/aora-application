import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppWrite = (fn: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      console.log(error);
      Alert.alert("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refecthData = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refecthData };
};
