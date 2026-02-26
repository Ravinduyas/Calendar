import { Room, RoomType, Booking } from './types';

export const ROOM_TYPES: RoomType[] = [
  { id: 'deluxe-garden', name: 'Deluxe Room Garden Facing', basePrice: 4000 },
  { id: 'executive-suite', name: 'Executive Suite Mountain View', basePrice: 6000 },
  { id: 'family-duplex', name: 'Family Duplex Garden Facing', basePrice: 8000 },
];

export const ROOMS: Room[] = [
  // Deluxe
  { id: '110', number: '110', typeId: 'deluxe-garden', status: 'clean' },
  { id: '111', number: '111', typeId: 'deluxe-garden', status: 'clean' },
  { id: '112', number: '112', typeId: 'deluxe-garden', status: 'clean' },
  { id: '113', number: '113', typeId: 'deluxe-garden', status: 'clean' },
  { id: '114', number: '114', typeId: 'deluxe-garden', status: 'clean' },
  { id: '115', number: '115', typeId: 'deluxe-garden', status: 'clean' },
  { id: '116', number: '116', typeId: 'deluxe-garden', status: 'clean' },
  { id: '117', number: '117', typeId: 'deluxe-garden', status: 'clean' },
  { id: '118', number: '118', typeId: 'deluxe-garden', status: 'clean' },
  { id: '210', number: '210', typeId: 'deluxe-garden', status: 'clean' },
  // Executive
  { id: '101', number: '101', typeId: 'executive-suite', status: 'clean' },
  { id: '201', number: '201', typeId: 'executive-suite', status: 'clean' },
  // Family
  { id: '211', number: '211', typeId: 'family-duplex', status: 'clean' },
  { id: '212', number: '212', typeId: 'family-duplex', status: 'clean' },
  { id: '213', number: '213', typeId: 'family-duplex', status: 'clean' },
  { id: '214', number: '214', typeId: 'family-duplex', status: 'clean' },
  { id: '215', number: '215', typeId: 'family-duplex', status: 'clean' },
  { id: '216', number: '216', typeId: 'family-duplex', status: 'clean' },
  { id: '217', number: '217', typeId: 'family-duplex', status: 'clean' },
  { id: '218', number: '218', typeId: 'family-duplex', status: 'clean' },
];

const today = new Date();
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    roomId: '110',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    status: 'occupied',
    amount: 4000
  },
  {
    id: 'b2',
    roomId: '111',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    status: 'occupied',
    amount: 4000
  },
  {
    id: 'b3',
    roomId: '112',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    status: 'occupied',
    amount: 4000
  },
  {
    id: 'b4',
    roomId: '113',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    status: 'occupied',
    amount: 4000
  },
  {
    id: 'b5',
    roomId: '114',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    status: 'occupied',
    amount: 4000
  },
  {
    id: 'b6',
    roomId: '111',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 15)),
    status: 'reserved',
    amount: 4000
  },
  {
    id: 'b7',
    roomId: '112',
    guestName: 'Mr. BALBIR/TRAVEL ...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 12)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 15)),
    status: 'reserved',
    amount: 4000
  },
  {
    id: 'b8',
    roomId: '118',
    guestName: 'Mr. AMIT J VE...',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 9)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 11)),
    status: 'blocked',
    amount: 4000
  },
  {
    id: 'b9',
    roomId: '110',
    guestName: 'Vikash Singh',
    startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 13)),
    endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), 16)),
    status: 'occupied',
    amount: 4000
  }
];
