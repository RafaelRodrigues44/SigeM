import React from "react";
import { Text, View, Image } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-[#070419]">
      <Image
        source={require("../assets/images/sigem.png")}
        className="w-12 h-12 mb-3"
      />
      <Text className="text-2xl text-white font-bold ml-2 px-1">
        Bem-Vindo ao SIGeM
      </Text>
      <Text className="text-lg text-white mt-2 px-2">
        Sistema de Gerenciamento de Manutenção
      </Text>
    </View>
  );
}
