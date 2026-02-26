export type BookingStatus = 'occupied' | 'reserved' | 'blocked' | 'due-out' | 'dirty' | 'vacant';

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  status: BookingStatus;
  source?: string;
  amount?: number;
}

export interface Room {
  id: string;
  number: string;
  typeId: string;
  status: 'clean' | 'dirty' | 'maintenance';
}

export interface RoomType {
  id: string;
  name: string;
  basePrice: number;
}

export interface CalendarState {
  viewDate: string;
  daysToShow: number;
}
