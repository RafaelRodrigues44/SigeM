import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputField from '../../components/inputField';
import Button from '../../components/button';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  const handleHelp = () => {
    console.log('Help');
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#070419] p-5 gap-y-4">
      <Text className="text-3xl text-white mb-6">Login</Text>
      <InputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        className="mb-10" 
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        className="mb-10" 
      />
      <Button
        title="Login"
        onPress={handleLogin}
        color="#FF5733"
        textColor="#FFFFFF"
        fontSize={18}
        height={50}
        width={200}
        className="mb-5" 
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text className="text-blue-500">Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHelp}>
        <Text className="text-blue-500">Help</Text>
      </TouchableOpacity>
    </View>
  );
}
