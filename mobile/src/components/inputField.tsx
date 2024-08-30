import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string; 
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  className, 
}) => {
  return (
    <View className={`w-full ${className}`}>
      <Text className="text-white text-lg mb-2">{label}</Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-lg p-3 text-white bg-gray-800"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={`Enter your ${label}`}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default InputField;
