'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  bookingModalOpen: boolean;
  defaultService: string;
  openBookingModal: (serviceName?: string) => void;
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

  const openBookingModal = (serviceName?: string) => {
    if (serviceName) {
      setDefaultService(serviceName);
    }
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
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
