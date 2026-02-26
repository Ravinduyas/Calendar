/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Calendar as CalendarIcon, 
  Bell, 
  Mail, 
  Grid, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Maximize2, 
  User,
  Settings,
  HelpCircle,
  Menu,
  Plus,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ROOMS, ROOM_TYPES, INITIAL_BOOKINGS } from './constants';
import { Booking, BookingStatus, Room, RoomType } from './types';

// --- Utilities ---
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const getDayName = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' });
const getMonthName = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });

const STATUS_COLORS: Record<BookingStatus, string> = {
  occupied: 'bg-green-500 text-white',
  reserved: 'bg-green-400 text-white',
  blocked: 'bg-red-400 text-white',
  'due-out': 'bg-blue-400 text-white',
  dirty: 'bg-gray-400 text-white',
  vacant: 'bg-white text-gray-400',
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 9)); // Starting from April 9, 2022 as in image
  const [daysToShow, setDaysToShow] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>('all');
  const [isCozy, setIsCozy] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);

  // Generate dates for the header
  const dates = useMemo(() => {
    const result = [];
    for (let i = 0; i < daysToShow; i++) {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + i);
      result.push(d);
    }
    return result;
  }, [currentDate, daysToShow]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return INITIAL_BOOKINGS.filter(b => {
      if (selectedStatus !== 'all' && b.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedStatus]);

  const stats = {
    all: ROOMS.length,
    vacant: 26,
    occupied: 5,
    reserved: 5,
    blocked: 0,
    dueOut: 0,
    dirty: 36
  };

  const handlePrev = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  // Filter rooms based on search query
  const filteredRooms = useMemo(() => {
    if (!searchQuery) return ROOMS;
    return ROOMS.filter(r => 
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ROOM_TYPES.find(t => t.id === r.typeId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-slate-800">
      {/* --- Top Navigation --- */}
      <header className="h-14 bg-white border-bottom border-slate-200 flex items-center px-4 justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-xl tracking-tight text-blue-900">Grobern <span className="text-slate-500 font-medium">Calendar</span></span>
          </div>
          <div className="bg-blue-500 p-1.5 rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </div>
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-1.5 border border-slate-200 rounded-md bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              placeholder="Quick Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute inset-y-0 right-0 px-3 flex items-center bg-blue-600 rounded-r-md">
              <Search className="h-4 w-4 text-white" />
            </button>
          </div>
          <HelpCircle className="w-5 h-5 text-blue-500 cursor-pointer ml-2" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-slate-500">
            <CalendarIcon className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Grid className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Bell className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-blue-600" />
            <Maximize2 className="w-5 h-5 cursor-pointer hover:text-blue-600" />
          </div>
          <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-900">Admin User</div>
              <div className="text-[10px] text-slate-500">28604</div>
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <User className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </header>

      {/* --- Filter Bar --- */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between sticky top-14 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <div className="px-3 py-1.5 text-sm font-medium border-r border-slate-200 bg-slate-50">
              {currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>
            <div className="p-1.5 bg-white cursor-pointer hover:bg-slate-50">
              <CalendarIcon className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <StatusFilter label="All" count={stats.all} active={selectedStatus === 'all'} onClick={() => setSelectedStatus('all')} />
            <StatusFilter label="Vacant" count={stats.vacant} color="text-slate-500" active={selectedStatus === 'vacant'} onClick={() => setSelectedStatus('vacant')} />
            <StatusFilter label="Occupied" count={stats.occupied} color="text-green-600" active={selectedStatus === 'occupied'} onClick={() => setSelectedStatus('occupied')} />
            <StatusFilter label="Reserved" count={stats.reserved} color="text-green-400" active={selectedStatus === 'reserved'} onClick={() => setSelectedStatus('reserved')} />
            <StatusFilter label="Blocked" count={stats.blocked} color="text-red-500" active={selectedStatus === 'blocked'} onClick={() => setSelectedStatus('blocked')} />
            <StatusFilter label="Due Out" count={stats.dueOut} color="text-blue-500" active={selectedStatus === 'due-out'} onClick={() => setSelectedStatus('due-out')} />
            <StatusFilter label="Dirty" count={stats.dirty} color="text-gray-500" active={selectedStatus === 'dirty'} onClick={() => setSelectedStatus('dirty')} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-slate-50 focus:outline-none">
            <option>CP</option>
            <option>MAP</option>
            <option>AP</option>
          </select>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setIsCozy(true)}
              className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${isCozy ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Cozy
            </button>
            <button 
              onClick={() => setIsCozy(false)}
              className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${!isCozy ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'}`}
            >
              Compact
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><Plus className="w-4 h-4 text-slate-600" /></button>
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><Filter className="w-4 h-4 text-slate-600" /></button>
          </div>
        </div>
      </div>

      {/* --- Main Calendar Grid --- */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-auto bg-slate-100 p-0.5" ref={gridRef}>
          <div className="inline-block min-w-full bg-white shadow-sm rounded border border-slate-200">
            <table className="border-collapse table-fixed w-full">
              <thead>
                {/* Date Header */}
                <tr className="bg-white">
                  <th className="sticky left-0 z-30 bg-white border-b border-r border-slate-200 w-64 p-0">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={handlePrev} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Room Types</span>
                        <ChevronRight className="w-4 h-4 cursor-pointer hover:text-blue-600" onClick={handleNext} />
                      </div>
                    </div>
                  </th>
                  {dates.map((date, idx) => (
                    <th key={idx} className="border-b border-r border-slate-200 w-24 p-0 bg-white min-w-[96px]">
                      <div className="flex flex-col items-center py-1">
                        <span className="text-[10px] font-medium text-slate-500 uppercase">{getDayName(date)}</span>
                        <span className="text-sm font-bold text-slate-900">{date.getDate()}</span>
                        <span className="text-[10px] font-medium text-slate-500 uppercase">{getMonthName(date)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROOM_TYPES.map((type) => (
                  <React.Fragment key={type.id}>
                    {/* Room Type Row */}
                    <tr className="bg-slate-50">
                      <td className="sticky left-0 z-20 bg-slate-50 border-b border-r border-slate-200 px-3 py-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-[1px] bg-slate-400"></div>
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{type.name}</span>
                        </div>
                      </td>
                      {dates.map((_, idx) => (
                        <td key={idx} className="border-b border-r border-slate-200 bg-red-50/30">
                          <div className="flex flex-col items-center py-1">
                            <span className="text-[10px] font-bold text-red-600">4</span>
                            <span className="text-[9px] font-medium text-slate-500">{type.basePrice.toFixed(2)}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Individual Room Rows */}
                    {filteredRooms.filter(r => r.typeId === type.id).map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="sticky left-0 z-20 bg-white group-hover:bg-slate-50 border-b border-r border-slate-200 px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-600">{room.number}</span>
                            <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                              <Moon className="w-3 h-3 text-slate-400" />
                              <Sun className="w-3 h-3 text-slate-400" />
                            </div>
                          </div>
                        </td>
                        {dates.map((date, idx) => {
                          const dateStr = formatDate(date);
                          const booking = filteredBookings.find(b => b.roomId === room.id && b.startDate === dateStr);
                          
                          // Calculate span if it's the start of a booking
                          let colSpan = 1;
                          if (booking) {
                            const start = new Date(booking.startDate);
                            const end = new Date(booking.endDate);
                            colSpan = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                          }

                          // Skip rendering if this cell is covered by a previous booking span
                          const isCovered = filteredBookings.some(b => {
                            if (b.roomId !== room.id) return false;
                            const bStart = new Date(b.startDate);
                            const bEnd = new Date(b.endDate);
                            return date > bStart && date < bEnd;
                          });

                          if (isCovered) return null;

                          return (
                            <td 
                              key={idx} 
                              colSpan={colSpan}
                              className={`border-b border-r border-slate-200 relative h-12 ${isCozy ? 'h-12' : 'h-8'}`}
                            >
                              {booking && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`absolute inset-1 rounded-sm shadow-sm flex flex-col justify-center px-2 z-10 cursor-pointer overflow-hidden ${STATUS_COLORS[booking.status]}`}
                                >
                                  <div className="flex items-center gap-1 truncate">
                                    <Monitor className="w-3 h-3 shrink-0" />
                                    <span className="text-[10px] font-bold truncate leading-tight">{booking.guestName}</span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 border border-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-red-500 border border-white/20"></div>
                                  </div>
                                </motion.div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Footer Stats --- */}
        <footer className="bg-white border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider z-40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <ChevronLeft className="w-4 h-4" />
              <span>Family Duplex Mountain / Riv...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Room Occupancy %</span>
            </div>
          </div>
          <div className="flex items-center">
            {[28, 14, 11, 31, 28, 100, 97, 75, 53, 8, 6, 3, 3, 0, 28].map((val, idx) => (
              <div key={idx} className="w-24 text-center text-slate-900 border-l border-slate-100 first:border-0">
                {val}
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatusFilter({ label, count, color = "text-slate-600", active = false, onClick }: { label: string, count: number, color?: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded transition-colors ${active ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
    >
      <span className={`${color}`}>{label}</span>
      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500">{count}</span>
    </div>
  );
}
