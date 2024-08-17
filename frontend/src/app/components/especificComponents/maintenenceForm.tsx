import React, { useState } from 'react';
import Modal from '../interfaceComponents/modal';
import Notification from '../interfaceComponents/customNotification.tsx';
import ItemSelectionModal from '../especificComponents/itemSelectionModal'; 
import { StockItem } from '../../pages/stock/types'; 

interface MaintenanceFormProps {
  onSave: (maintenance: any) => void;
  onClose: () => void;
  stockItems: StockItem[]; 
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onSave, onClose, stockItems }) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [priority, setPriority] = useState<string>('Baixa');
  const [responsible, setResponsible] = useState<string>('');
  const [maintenanceType, setMaintenanceType] = useState<'Preventiva' | 'Corretiva'>('Preventiva'); // Alterado para selecionar entre Preventiva e Corretiva
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<StockItem[]>([]); 
  const [showItemModal, setShowItemModal] = useState<boolean>(false); 
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info'; } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleItemSelect = (item: StockItem) => {
    if (selectedItems.find(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSave = () => {
    const maintenance = {
      description,
      date,
      priority,
      responsible,
      type: maintenanceType, // Inclui o tipo de manutenção
      files,
      comments,
      items: selectedItems, 
    };
    onSave(maintenance);
  };

  return (
    <>
      <Modal isOpen={true} onClose={onClose} width="800px" height="auto">
        <div className="p-4">
          {/* Notificação */}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
              className="mb-4"
            />
          )}

          <h2 className="text-2xl font-bold mb-4">Cadastro de Manutenção</h2>
          <label className="block mb-2">
            Data da Solicitação:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Prioridade:
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </label>
          <label className="block mb-2">
            Equipe Responsável:
            <input
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Tipo de Manutenção:
            <select
              value={maintenanceType}
              onChange={(e) => setMaintenanceType(e.target.value as 'Preventiva' | 'Corretiva')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
            </select>
          </label>
          <label className="block mb-2">
            Descrição do Problema:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setShowItemModal(true)}
              className="px-4 py-2 bg-blue-950 text-white rounded-md"
            >
              Adicionar Itens
            </button>
          </div>
          <ul className="mt-2">
            {selectedItems.map(item => (
              <li key={item.id} className="border p-2 mb-2">{item.name}</li>
            ))}
          </ul>
          <label className="block mb-2 mt-4">
            Arquivos:
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-950 text-white rounded-md mr-2"
            >
              Salvar
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para seleção de itens */}
      <ItemSelectionModal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        stockItems={stockItems}
        selectedItems={selectedItems}
        onSelectItem={handleItemSelect}
      />
    </>
  );
};

export default MaintenanceForm;
