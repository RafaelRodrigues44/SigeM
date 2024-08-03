import React from 'react';

interface MachineDetailProps {
  name: string;
  type: string;
  model: string;
  manufactureDate: string;
  serialNumber: string;
  location: string;
  imageUrl: string;
  maintenanceHistory: React.ReactNode;
  partsInfo: React.ReactNode;
}

const MachineDetail: React.FC<MachineDetailProps> = ({
  name,
  type,
  model,
  manufactureDate,
  serialNumber,
  location,
  imageUrl,
  maintenanceHistory,
  partsInfo
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <img src={imageUrl} alt="Machine" className="w-32 h-32 object-cover rounded-md" />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <p>Tipo: {type}</p>
          <p>Modelo: {model}</p>
          <p>Data de Fabricação: {manufactureDate}</p>
          <p>Número de Série: {serialNumber}</p>
          <p>Localização: {location}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Histórico de Manutenções</h3>
        {maintenanceHistory}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Informações sobre Peças</h3>
        {partsInfo}
      </div>
    </div>
  );
};

export default MachineDetail;
