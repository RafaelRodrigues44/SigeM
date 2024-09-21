import React from 'react';
import { View, Text } from 'react-native';
import CardButton from '../components/cardButton'; 
import { useNavigation } from '@react-navigation/native'; 

const Dashboard: React.FC = () => {
  const navigation = useNavigation(); 
  return (
    <View style={{ flex: 1, backgroundColor: '#070419', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', marginBottom: 60 }}>Menu</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <CardButton screen="machineList" iconName="list" text="Máquinas" iconColor="#070419"/>
        <CardButton screen="MaintenanceHistory" iconName="time" text="Histórico de Manutenções" iconColor="#070419"/>
        <CardButton screen="orderService" iconName="construct" text="Solicitações de Manutenção" iconColor="#070419"/>
        <CardButton screen="machineDetail" iconName="information-circle" text="Detalhes da Máquina" iconColor="#070419"/>
        <CardButton screen="PartsRegistry" iconName="pencil" text="Registro de Peças" iconColor="#070419"/>
        <CardButton screen="StockInquiry" iconName="archive" text="Consulta de Estoque" iconColor="#070419"/>
      </View>
    </View>
  );
};

export default Dashboard;
