import React, { useState } from 'react';
import Form from '../interfaceComponents/fileUpload';
import DatePicker from '../interfaceComponents/datePicker';
import FileUpload from '../interfaceComponents/fileUpload';

const MaintenanceForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Descrição:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </label>
      <DatePicker label="Data da Solicitação" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>
        Prioridade:
        <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </label>
      <label>
        Responsável:
        <input
          type="text"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </label>
      <FileUpload label="Arquivos" onChange={handleFileChange} />
      <label>
        Comentários:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Salvar</button>
    </Form>
  );
};

export default MaintenanceForm;
