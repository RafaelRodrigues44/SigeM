import React from 'react';
import { Machine } from '../../machines/types';  

interface MaintenanceHistory {
  date: string;
  description: string;
  partsUsed?: string[];
  materialsUsed?: string[];
}

interface MachineDetailProps {
  machine: {
    name: string;
    type: string;
    model: string;
    manufacturingDate: string;
    serialNumber: string;
    location: string;
    imageUrl: string;
    maintenanceHistory: MaintenanceHistory[];
    partsInfo: React.ReactNode; // Atualizado para React.ReactNode para aceitar qualquer tipo de conteúdo
  };
  onClose: () => void;
}

const MachineDetail: React.FC<MachineDetailProps> = ({ machine, onClose }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{machine.name}</h2>
      <p>Tipo: {machine.type}</p>
      <p>Modelo: {machine.model}</p>
      <p>Data de Fabricação: {machine.manufacturingDate}</p>
      <p>Número de Série: {machine.serialNumber}</p>
      <p>Localização: {machine.location}</p>
      <img src={machine.imageUrl} alt={machine.name} className="w-32 h-32 object-cover" />
      <h3 className="text-lg font-semibold">Histórico de Manutenção</h3>
      {machine.maintenanceHistory.map((entry, index) => (
        <div key={index}>
          <p>Data: {entry.date}</p>
          <p>Descrição: {entry.description}</p>
          {entry.partsUsed && <p>Peças Usadas: {entry.partsUsed.join(', ')}</p>}
          {entry.materialsUsed && <p>Materiais Usados: {entry.materialsUsed.join(', ')}</p>}
        </div>
      ))}
      <div>{machine.partsInfo}</div> {/* Adicione conteúdo sobre peças aqui */}
      <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Fechar</button>
    </div>
  );
};

export default MachineDetail;

