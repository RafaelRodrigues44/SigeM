import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Machine } from '../utils/machineTypes'; // Tipos das máquinas
import { StackScreenProps } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

// Definindo o tipo para as props que recebe
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
  {
    id: '2',
    nome: 'Retroescavadeira ABC',
    status: 'em manutenção',
    tipo: 'retroescavadeira',
    dataCompra: '2022-05-10',
    localizacao: 'Canteiro 2',
    descricao: 'Retroescavadeira para obras urbanas',
    fabricante: 'Fabricante B',
    modelo: 'Modelo 5678',
    anoFabricacao: 2019,
  },
  {
    id: '3',
    nome: 'Pá Carregadeira DEF',
    status: 'inativo',
    tipo: 'pá carregadeira',
    dataCompra: '2021-03-20',
    localizacao: 'Canteiro 3',
    descricao: 'Pá carregadeira para movimentação de terra',
    fabricante: 'Fabricante C',
    modelo: 'Modelo 9012',
    anoFabricacao: 2018,
  },
];

const MachineList: React.FC<MachineListProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredMachines, setFilteredMachines] = useState(mockMachines);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

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
      setDetailModalVisible(true); // Abre o modal de detalhes
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedMachine(null); // Limpa a máquina selecionada ao fechar
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
    </View>
  );
};

export default MachineList;
