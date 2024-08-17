'use client';

import React, { useState, useEffect } from 'react';
import Table from '../../components/interfaceComponents/table';
import SearchBar from '../../components/interfaceComponents/searchBar';
import Modal from '../../components/interfaceComponents/modal';
import MachineForm from '../../components/especificComponents/machineForm';
import Button from '../../components/interfaceComponents/button';
import Notification from '../../components/interfaceComponents/customNotification.tsx';
import { Machine } from './types';

const MachinesPage: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    // Fetch machines from API
    fetch('/api/machines')
      .then(response => response.json())
      .then(data => {
        setMachines(data);
        setFilteredMachines(data);
      })
      .catch(error => console.error('Error fetching machines:', error));
  }, []);

  const handleSearch = () => {
    setFilteredMachines(machines.filter(machine => 
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  const handleSave = async (machine: Omit<Machine, 'id' | 'maintenanceHistory'> & { image: File | null }) => {
    try {
      if (formMode === 'create') {
        const response = await fetch('/api/machines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            ...machine, 
            maintenanceHistory: [] 
          }),
        });
        const newMachine = await response.json();
        setMachines([...machines, newMachine]); 
        setNotification({ message: 'Machine added successfully!', type: 'success' });
      } else if (selectedMachine) {
        await fetch(`/api/machines/${selectedMachine.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            ...machine, 
            id: selectedMachine.id, 
            maintenanceHistory: selectedMachine.maintenanceHistory 
          }),
        });
        setMachines(machines.map(m => m.id === selectedMachine.id ? { ...machine, id: selectedMachine.id, maintenanceHistory: selectedMachine.maintenanceHistory } : m));
        setNotification({ message: 'Machine updated successfully!', type: 'success' });
      }
      setFormOpen(false);
      setSelectedMachine(null);
    } catch (error) {
      console.error('Error saving machine:', error);
      setNotification({ message: 'Error saving machine!', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/machines/${id}`, {
        method: 'DELETE',
      });
      setMachines(machines.filter(machine => machine.id !== id));
      setNotification({ message: 'Machine deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting machine:', error);
      setNotification({ message: 'Error deleting machine!', type: 'error' });
    }
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedMachine(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleCloseModal = () => {
    setFormOpen(false);
    setSelectedMachine(null);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button label="Adicionar Máquina" onClick={handleCreate} />
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSubmit={handleSearch}
          placeholder="Procurar Máquinas"
        />
      </div>

      <Table 
        columns={['Nome', 'Tipo', 'Modelo', 'Ações']}
        data={filteredMachines}
        renderRow={(machine) => (
          <>
            <td className="p-2">{machine.name}</td>
            <td className="p-2">{machine.type}</td>
            <td className="p-2">{machine.model}</td>
            <td className="p-2">
              <Button label="Editar" onClick={() => handleEdit(machine)} />
              <Button label="Deletar" onClick={() => handleDelete(machine.id)} />
            </td>
          </>
        )}
      />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}

      <Modal isOpen={isFormOpen} onClose={handleCloseModal}>
        <MachineForm
          isOpen={isFormOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          initialData={selectedMachine ? {
            name: selectedMachine.name,
            type: selectedMachine.type,
            model: selectedMachine.model,
            manufacturingDate: selectedMachine.manufacturingDate,
            serialNumber: selectedMachine.serialNumber,
            location: selectedMachine.location,
            image: null, 
          } : null}
          mode={formMode}
        />
      </Modal>
    </div>
  );
};

export default MachinesPage;
