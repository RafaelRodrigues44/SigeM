import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface StockItem {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
}

interface Machine {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
}

interface MaintenanceFormProps {
  onSave: (maintenance: any) => void;
  onClose: () => void;
  stockItems: StockItem[];
  services: Service[];
  machines: Machine[];
}

const teams: Team[] = [
  { id: '1', name: 'Equipe A' },
  { id: '2', name: 'Equipe B' },
  { id: '3', name: 'Equipe C' },
  { id: '4', name: 'Equipe D' },
];

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  onSave,
  onClose,
  stockItems,
  services,
  machines,
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [priority, setPriority] = useState<string>(''); 
  const [responsible, setResponsible] = useState<string>(''); 
  const [maintenanceType, setMaintenanceType] = useState<string>(''); 
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<StockItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [showMachineModal, setShowMachineModal] = useState<boolean>(false);

  const handleSave = () => {
    const maintenance = {
      description,
      date,
      priority,
      responsible,
      type: maintenanceType,
      files,
      comments,
      items: selectedItems,
      services: selectedServices,
      machine: selectedMachine,
    };
    onSave(maintenance);
  };

  const handleSelectItem = (item: StockItem) => {
    setSelectedItems([...selectedItems, item]);
    setShowItemModal(false);
  };

  const handleSelectService = (service: Service) => {
    setSelectedServices([...selectedServices, service]);
    setShowServiceModal(false);
  };

  const handleSelectMachine = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineModal(false);
  };

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={true}
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={{ padding: 20 }} contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Cadastro de Manutenção</Text>

          <Text>Data da Solicitação:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 20, padding: 10 }}
            value={date}
            onChangeText={setDate}
            placeholder="AAAA-MM-DD"
          />

          <Text>Prioridade:</Text>
          <Picker
            selectedValue={priority}
            style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 20 }}
            onValueChange={(itemValue: string) => setPriority(itemValue)}
          >
            <Picker.Item label="Selecione uma prioridade" value="" />
            <Picker.Item label="Baixa" value="Baixa" />
            <Picker.Item label="Média" value="Média" />
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Imediata" value="Imediata" />
          </Picker>

          <Text>Equipe Responsável:</Text>
          <Picker
            selectedValue={responsible}
            style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 20 }}
            onValueChange={(itemValue: string) => setResponsible(itemValue)}
          >
            <Picker.Item label="Selecione uma equipe" value="" />
            {teams.map(team => (
              <Picker.Item key={team.id} label={team.name} value={team.id} />
            ))}
          </Picker>

          <Text>Tipo de Manutenção:</Text>
          <Picker
            selectedValue={maintenanceType}
            style={{ height: 50, width: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 20 }}
            onValueChange={(itemValue: string) => setMaintenanceType(itemValue)}
          >
            <Picker.Item label="Selecione um tipo de manutenção" value="" />
            <Picker.Item label="Preventiva" value="Preventiva" />
            <Picker.Item label="Corretiva" value="Corretiva" />
          </Picker>

          <Text>Descrição do Problema:</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginBottom: 20, padding: 10, height: 100 }}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ borderWidth: 1, borderColor: '#070419', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Selecionar</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowMachineModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Máquina</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowItemModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Itens</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowServiceModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Serviços</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ borderWidth: 1, borderColor: '#070419', borderRadius: 10, padding: 10, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Máquina Selecionada:</Text>
            {selectedMachine ? (
              <Text>{selectedMachine.name}</Text>
            ) : (
              <Text>Nenhuma máquina selecionada</Text>
            )}
          </View>

          <View style={{ borderWidth: 1, borderColor: '#070419', borderRadius: 10, padding: 10, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Itens Selecionados:</Text>
            {selectedItems.map(item => (
              <Text key={item.id}>{item.name}</Text>
            ))}
          </View>

          <View style={{ borderWidth: 1, borderColor: '#070419', borderRadius: 10, padding: 10, marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Serviços Selecionados:</Text>
            {selectedServices.map(service => (
              <Text key={service.id}>{service.name}</Text>
            ))}
          </View>
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, marginRight: 10 }} onPress={handleSave}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1 }} onPress={onClose}>
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para selecionar itens */}
      {showItemModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showItemModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecionar Itens</Text>
              <FlatList
                data={stockItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectItem(item)} style={{ padding: 10 }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Fechar" onPress={() => setShowItemModal(false)} />
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para selecionar serviços */}
      {showServiceModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showServiceModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecionar Serviços</Text>
              <FlatList
                data={services}
                keyExtractor={service => service.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectService(item)} style={{ padding: 10 }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Fechar" onPress={() => setShowServiceModal(false)} />
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para selecionar máquinas */}
      {showMachineModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMachineModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selecionar Máquinas</Text>
              <FlatList
                data={machines}
                keyExtractor={machine => machine.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectMachine(item)} style={{ padding: 10 }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Fechar" onPress={() => setShowMachineModal(false)} />
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

export default MaintenanceForm;
