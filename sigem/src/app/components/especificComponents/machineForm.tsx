import React, { useState } from 'react';
import Form from '../interfaceComponents/form';
import DatePicker from '../interfaceComponents/datePicker';
import FileUpload from '../interfaceComponents/fileUpload';

const MachineForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <DatePicker label="Data de Fabricação" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} />
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
      <FileUpload label="Imagem" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Salvar</button>
    </Form>
  );
};

export default MachineForm;
