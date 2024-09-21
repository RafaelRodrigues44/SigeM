import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Machine } from '../utils/machineTypes'; // Tipos das máquinas
import { StackScreenProps } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'; // Importar o Picker

type MachineListProps = StackScreenProps<any>;

const mockMachines: Machine[] = [
  {
    id: '1',
    nome: 'Escavadeira XYZ',
    status: 'ativo',
    tipo: 'escavadeira',
    dataCompra: '2023-01-15',
    localizacao: 'Canteiro 1',
    descricao: 'Escavadeira de grande porte para terraplanagem',
    fabricante: 'Fabricante A',
    modelo: 'Modelo 1234',
    anoFabricacao: 2020,
  },
  // Adicione outras máquinas conforme necessário
];

const sectors = ['Canteiro 1', 'Canteiro 2', 'Oficina', 'Depósito']; // Lista de setores

const MachineList: React.FC<MachineListProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredMachines, setFilteredMachines] = useState(mockMachines);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [newMachine, setNewMachine] = useState<Machine>({
    id: '',
    nome: '',
    status: 'ativo',
    tipo: '',
    dataCompra: '',
    localizacao: '',
    descricao: '',
    fabricante: '',
    modelo: '',
    anoFabricacao: new Date().getFullYear(),
  });

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filtered = text
      ? mockMachines.filter(machine =>
          machine.nome.toLowerCase().includes(text.toLowerCase())
        )
      : mockMachines;
    setFilteredMachines(filtered);
  };

  const handleLongPress = (machine: Machine) => {
    setSelectedMachine(machine);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedMachine) {
      setModalVisible(false);
      setDetailModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedMachine(null);
  };

  const renderMachine = ({ item, index }: { item: Machine; index: number }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={{
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e8e8e8',
      }}
    >
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.nome}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.tipo}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.localizacao || 'Não especificada'}</Text>
    </TouchableOpacity>
  );

  const handleAddMachine = () => {
    const newId = (mockMachines.length + 1).toString();
    const machineToAdd = { ...newMachine, id: newId };
    setFilteredMachines([...filteredMachines, machineToAdd]);
    setAddModalVisible(false);
    setNewMachine({
      id: '',
      nome: '',
      status: 'ativo',
      tipo: '',
      dataCompra: '',
      localizacao: '',
      descricao: '',
      fabricante: '',
      modelo: '',
      anoFabricacao: new Date().getFullYear(),
    });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#070419' }}>
        Máquinas
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#070419',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f8f8f8',
      }}>
        <Icon name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Buscar máquina..."
          style={{
            flex: 1,
            padding: 8,
            fontSize: 16,
            color: '#333',
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => setAddModalVisible(true)}
        style={{
          backgroundColor: '#070419',
          padding: 10,
          borderRadius: 5,
          marginBottom: 16,
        }}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cadastrar Máquina</Text>
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#070419',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 8,
      }}>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Nome</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Tipo</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Localização</Text>
      </View>
      <FlatList
        data={filteredMachines}
        keyExtractor={(item) => item.id}
        renderItem={renderMachine}
        ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#999' }}>Nenhuma máquina encontrada.</Text>}
      />

      {/* Modal de confirmação */}
      <Modal isVisible={isModalVisible}>
        <View style={{
          backgroundColor: '#070419',
          borderRadius: 8,
          padding: 20,
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>
            Deseja ver mais detalhes da máquina?
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity onPress={handleCancel} style={{
              backgroundColor: '#999',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginRight: 5,
            }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Não</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={{
              backgroundColor: '#999',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginLeft: 5,
            }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Sim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de detalhes da máquina */}
      <Modal isVisible={isDetailModalVisible}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 20,
        }}>
          {selectedMachine && (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMachine.nome}</Text>
              <Text>Status: {selectedMachine.status}</Text>
              <Text>Tipo: {selectedMachine.tipo}</Text>
              <Text>Data de Compra: {selectedMachine.dataCompra}</Text>
              <Text>Localização: {selectedMachine.localizacao}</Text>
              <Text>Descrição: {selectedMachine.descricao}</Text>
              <Text>Fabricante: {selectedMachine.fabricante}</Text>
              <Text>Modelo: {selectedMachine.modelo}</Text>
              <Text>Ano de Fabricação: {selectedMachine.anoFabricacao}</Text>
              <TouchableOpacity onPress={handleCloseDetailModal} style={{
                backgroundColor: '#070419',
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      {/* Modal para adicionar nova máquina */}
      <Modal isVisible={isAddModalVisible}>
        <ScrollView style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 20,
          maxHeight: '95%', 
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Adicionar Máquina</Text>
          <TextInput
            placeholder="Nome"
            value={newMachine.nome}
            onChangeText={text => setNewMachine({ ...newMachine, nome: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Tipo"
            value={newMachine.tipo}
            onChangeText={text => setNewMachine({ ...newMachine, tipo: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Data de Compra (YYYY-MM-DD)"
            value={newMachine.dataCompra}
            onChangeText={text => setNewMachine({ ...newMachine, dataCompra: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Text>Localização:</Text>
          <Picker
            selectedValue={newMachine.localizacao}
            onValueChange={(itemValue) => setNewMachine({ ...newMachine, localizacao: itemValue })}
            style={{
              height: 50,
              width: '100%',
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
          >
            <Picker.Item label="Selecione um setor" value="" />
            {sectors.map((sector, index) => (
              <Picker.Item key={index} label={sector} value={sector} />
            ))}
          </Picker>
          <TextInput
            placeholder="Descrição"
            value={newMachine.descricao}
            onChangeText={text => setNewMachine({ ...newMachine, descricao: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Fabricante"
            value={newMachine.fabricante}
            onChangeText={text => setNewMachine({ ...newMachine, fabricante: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Modelo"
            value={newMachine.modelo}
            onChangeText={text => setNewMachine({ ...newMachine, modelo: text })}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Text>Ano de Fabricação:</Text>
          <Picker
            selectedValue={newMachine.anoFabricacao}
            onValueChange={(itemValue) => setNewMachine({ ...newMachine, anoFabricacao: itemValue })}
            style={{
              height: 50,
              width: '100%',
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
          >
            {[...Array(30).keys()].map((_, index) => {
              const year = new Date().getFullYear() - index;
              return <Picker.Item key={year} label={String(year)} value={year} />;
            })}
          </Picker>

          <TouchableOpacity onPress={handleAddMachine} style={{
            backgroundColor: '#070419',
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
          }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Adicionar Máquina</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAddModalVisible(false)} style={{
            backgroundColor: '#999',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default MachineList;
