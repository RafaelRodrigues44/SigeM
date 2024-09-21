import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

// Tipos para a manutenção
type Maintenance = {
  id: string;
  nome: string;
  status: string;
  data: string;
  descricao: string;
};

// Dados simulados de manutenções
const mockMaintenances: Maintenance[] = [
  {
    id: '1',
    nome: 'Escavadeira XYZ',
    status: 'em preparo',
    data: '2023-09-01',
    descricao: 'Troca de óleo e revisão geral',
  },
  {
    id: '2',
    nome: 'Retroescavadeira ABC',
    status: 'pronto para execução',
    data: '2023-09-05',
    descricao: 'Verificação de sistemas hidráulicos',
  },
  {
    id: '3',
    nome: 'Pá Carregadeira DEF',
    status: 'em serviço',
    data: '2023-09-10',
    descricao: 'Reparo de motor',
  },
];

// Status disponíveis para seleção
const statusOptions = [
  'em preparo',
  'pronto para execução',
  'em serviço',
  'concluído',
  'cancelado',
];

const MaintenanceList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState(mockMaintenances);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filtered = text
      ? mockMaintenances.filter(maintenance =>
          maintenance.nome.toLowerCase().includes(text.toLowerCase())
        )
      : mockMaintenances;
    setFilteredMaintenances(filtered);
  };

  const handleLongPress = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setNewStatus(maintenance.status);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedMaintenance) {
      setModalVisible(false);
      setDetailModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedMaintenance(null);
  };

  const handleSaveStatus = () => {
    if (selectedMaintenance) {
      selectedMaintenance.status = newStatus; // Atualiza o status
      setDetailModalVisible(false);
      setSelectedMaintenance(null);
    }
  };

  const renderMaintenance = ({ item }: { item: Maintenance }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={{
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}
    >
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.nome}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.status}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#070419' }}>
        Manutenções
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
          placeholder="Buscar manutenção..."
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
      }}>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Máquina</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Status</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Data</Text>
      </View>
      <FlatList
        data={filteredMaintenances}
        keyExtractor={(item) => item.id}
        renderItem={renderMaintenance}
        ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#999' }}>Nenhuma manutenção encontrada.</Text>}
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
            Deseja ver mais detalhes da manutenção?
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

      {/* Modal de detalhes da manutenção */}
      <Modal isVisible={isDetailModalVisible}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 20,
        }}>
          {selectedMaintenance && (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMaintenance.nome}</Text>
              <Text>Status: {selectedMaintenance.status}</Text>
              <Text>Data: {selectedMaintenance.data}</Text>
              <Text>Descrição: {selectedMaintenance.descricao}</Text>
              <Text style={{ marginTop: 10 }}>Novo Status:</Text>
              <Picker
                selectedValue={newStatus}
                onValueChange={(itemValue) => setNewStatus(itemValue)}
                style={{
                  borderWidth: 1,
                  borderColor: '#070419',
                  borderRadius: 4,
                  marginTop: 5,
                }}
              >
                {statusOptions.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
              <TouchableOpacity onPress={handleSaveStatus} style={{
                backgroundColor: '#070419',
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Salvar Status</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseDetailModal} style={{
                backgroundColor: '#999',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
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

export default MaintenanceList;
