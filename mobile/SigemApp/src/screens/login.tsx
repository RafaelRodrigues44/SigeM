import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputField from '../components/inputField';
import Button from '../components/button';

// Definir os tipos de navegação
type StackParamList = {
  Login: undefined;
  HomeTabs: undefined;  
};

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProps>(); 

  // Função de login
  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    if (username && password) {
      navigation.navigate('HomeTabs'); // Direciona para a HomeTabs
    } else {
      console.log('Preencha todos os campos');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password');
  };

  const handleHelp = () => {
    console.log('Help');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#070419', padding: 20 }}>
      <StatusBar hidden={false} />
      <Text style={{ fontSize: 40, color: 'white', marginBottom: 32 }}>Login</Text>
      <InputField
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 16 }} 
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ marginBottom: 16 }} 
      />
      <Button
        title="Login"
        onPress={handleLogin}  
        color="#FF5733"
        textColor="#FFFFFF"
        fontSize={18}
        height={50}
        width={200}
        style={{ marginBottom: 16 }} 
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={{ color: 'blue', fontSize: 14, marginBottom: 8 }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHelp}>
        <Text style={{ color: 'blue', fontSize: 14 }}>Help</Text>
      </TouchableOpacity>
    </View>
  );
}
