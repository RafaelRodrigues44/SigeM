import { Maintenance } from './types';
import { StockItem, StockMovement } from '../stock/types'; 


export const mockMaintenances: Maintenance[] = [
  {
    id: 1,
    orderNumber: 'OS001',
    openingDate: '2024-08-01',
    completionDeadline: '2024-08-10',
    responsibleTeam: 'Equipe A',
    status: 'Em Andamento',
  },
  {
    id: 2,
    orderNumber: 'OS002',
    openingDate: '2024-08-05',
    completionDeadline: '2024-08-15',
    responsibleTeam: 'Equipe B',
    status: 'Concluída',
  },
  {
    id: 3,
    orderNumber: 'OS003',
    openingDate: '2024-08-07',
    completionDeadline: '2024-08-20',
    responsibleTeam: 'Equipe C',
    status: 'Pendente',
  },
  {
    id: 4,
    orderNumber: 'OS004',
    openingDate: '2024-08-10',
    completionDeadline: '2024-08-25',
    responsibleTeam: 'Equipe D',
    status: 'Em Andamento',
  },
];

export const mockStockItems: StockItem[] = [
  {
    id: 1,
    name: 'Peça A',
    code: 'PCA001',
    supplier: 'Fornecedor A',
    quantity: 100,
    unitPrice: 50.00,
  },
  {
    id: 2,
    name: 'Peça B',
    code: 'PCB002',
    supplier: 'Fornecedor B',
    quantity: 200,
    unitPrice: 30.00,
  },
  {
    id: 3,
    name: 'Peça C',
    code: 'PCC003',
    supplier: 'Fornecedor C',
    quantity: 150,
    unitPrice: 20.00,
  },
  {
    id: 4,
    name: 'Peça D',
    code: 'PCD004',
    supplier: 'Fornecedor D',
    quantity: 75,
    unitPrice: 40.00,
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: 1,
    itemId: 1,
    movementType: 'in',
    quantity: 50,
    date: '2024-08-01',
    notes: 'Entrada inicial',
  },
  {
    id: 2,
    itemId: 2,
    movementType: 'out',
    quantity: 20,
    date: '2024-08-05',
    notes: 'Venda de itens',
  },
  {
    id: 3,
    itemId: 3,
    movementType: 'in',
    quantity: 100,
    date: '2024-08-10',
    notes: 'Reabastecimento',
  },
  {
    id: 4,
    itemId: 4,
    movementType: 'out',
    quantity: 30,
    date: '2024-08-15',
    notes: 'Consumo interno',
  },
];
