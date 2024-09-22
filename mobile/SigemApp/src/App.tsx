import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/splash_screen';
import LoginScreen from './screens/login';
import Dashboard from './screens/dashboard';
import Settings from './screens/settings';
import MachineList from './screens/machineList';
import MaintenanceForm from './screens/orderService';
import MaintenanceList from './screens/maintenanceList';
import StockManagement from './screens/stockList';
import RegisterScreen from './screens/siginUp';
import ForgotPasswordScreen from './screens/passwordRetriever';

import Icon from 'react-native-vector-icons/Ionicons';

// Mock de dados para estoque
const stockItems = [
  { id: 1, name: 'Parafuso', quantity: 100, unit: 'unidades' },
  { id: 2, name: 'Arruela', quantity: 200, unit: 'unidades' },
  { id: 3, name: 'Óleo lubrificante', quantity: 50, unit: 'litros' },
  { id: 4, name: 'Filtro de ar', quantity: 30, unit: 'unidades' },
];

// Mock de dados para serviços
const services = [
  { id: 1, name: 'Troca de óleo', duration: '1 hora', cost: 50 },
  { id: 2, name: 'Manutenção preventiva', duration: '2 horas', cost: 100 },
  { id: 3, name: 'Reparo de motor', duration: '3 horas', cost: 200 },
];

// Mock de dados para máquinas
const machines = [
  { id: 1, name: 'Máquina de corte', model: 'C-2022', status: 'Funcionando' },
  { id: 2, name: 'Fresadora', model: 'F-2020', status: 'Em manutenção' },
  { id: 3, name: 'Prensa hidráulica', model: 'P-2021', status: 'Funcionando' },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'home-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D3D3D3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#070419', 
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};



// Componente separado para o MaintenanceForm
const OrderServiceScreen = (props: any) => {
  return (
    <MaintenanceForm 
      {...props} 
      onSave={(maintenance) => {
      }}
      onClose={() => {
      }}
      stockItems={stockItems}
      services={services}
      machines={machines}
    />
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="machineList" component={MachineList} options={{ headerShown: false }} />
        <Stack.Screen name="maintenanceList" component={MaintenanceList} options={{ headerShown: false }} />
        <Stack.Screen name="stockList" component={StockManagement} options={{ headerShown: false }} />
        <Stack.Screen 
          name="orderService" 
          component={OrderServiceScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
