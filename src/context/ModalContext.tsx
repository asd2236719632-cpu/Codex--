'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BookingPreset {
  service?: string;
  date?: string;
  timeslot?: string;
  petCategory?: 'dog' | 'cat';
  petName?: string;
  ownerName?: string;
  phone?: string;
}

interface ModalContextType {
  bookingModalOpen: boolean;
  defaultService: string;
  bookingPreset: BookingPreset | null;
  openBookingModal: (serviceOrPreset?: string | BookingPreset) => void;
  closeBookingModal: () => void;

  mapModalOpen: boolean;
  openMapModal: () => void;
  closeMapModal: () => void;

  contactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;

  toast: { show: boolean; message: string };
  showToast: (message: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('犬类活力清爽深层洗护');
  const [bookingPreset, setBookingPreset] = useState<BookingPreset | null>(null);

  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3500);
  };

  const openBookingModal = (serviceOrPreset?: string | BookingPreset) => {
    if (typeof serviceOrPreset === 'string') {
      setDefaultService(serviceOrPreset);
      setBookingPreset({ service: serviceOrPreset });
    } else if (serviceOrPreset && typeof serviceOrPreset === 'object') {
      if (serviceOrPreset.service) {
        setDefaultService(serviceOrPreset.service);
      }
      setBookingPreset(serviceOrPreset);
    } else {
      setBookingPreset(null);
    }
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setBookingPreset(null);
  };

  const openMapModal = () => setMapModalOpen(true);
  const closeMapModal = () => setMapModalOpen(false);

  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        bookingModalOpen,
        defaultService,
        bookingPreset,
        openBookingModal,
        closeBookingModal,
        mapModalOpen,
        openMapModal,
        closeMapModal,
        contactModalOpen,
        openContactModal,
        closeContactModal,
        toast,
        showToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
