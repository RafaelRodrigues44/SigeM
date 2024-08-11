import React, { useState, useEffect } from 'react';
import Modal from '../interfaceComponents/modal'; 
import Form from '../interfaceComponents/form';
import DatePicker from '../interfaceComponents/datePicker';
import FileUpload from '../interfaceComponents/fileUpload';
import { Machine } from '../../pages/machines/types';

interface MachineFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (machine: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null }) => Promise<void>;
  initialData: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null } | null;
  mode: 'create' | 'edit';
}

const MachineForm: React.FC<MachineFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setModel(initialData.model);
      setManufacturingDate(initialData.manufacturingDate);
      setSerialNumber(initialData.serialNumber);
      setLocation(initialData.location);
      setImage(initialData.image);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ name, type, model, manufacturingDate, serialNumber, location, image });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="500px"
      height="650px"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold mb-4">{mode === 'create' ? 'Add Machine' : 'Edit Machine'}</h2>
        <Form onSubmit={handleSubmit} className="flex-1" width="100%" height="100%">
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Tipo:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Modelo:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <DatePicker label="Data de Fabricação" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} width="100%" />
          <label>
            Número de Série:
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <label>
            Localização:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </label>
          <FileUpload label="Imagem" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} width="100%" />
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Salvar</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancelar</button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default MachineForm;
