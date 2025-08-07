"use client";

import { useState, useEffect, useMemo } from 'react';

// --- Step 1: Import All Necessary Components ---
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import GuestTable from './components/GuestTable';
import Modal from './components/Modal';
import GuestForm from './components/GuestForm';
import { UserGroupIcon, CurrencyDollarIcon, CheckCircleIcon, InboxStackIcon } from '@heroicons/react/24/outline';

// --- Main Page Component ---
export default function Home() {
  // --- State Management ---
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for controlling the modal window
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null); // To hold the guest being edited

  // --- Data Fetching Logic ---
  useEffect(() => {
    const fetchGuests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/guests');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const data = await response.json();
        setGuests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuests();
  }, []);

  // --- Dashboard Stats Calculation ---
  const stats = useMemo(() => {
    if (!guests || guests.length === 0) {
      return { totalAttendees: 0, totalRevenue: 0, outstandingBalance: 0, paidPercentage: '0' };
    }
    const totalAttendees = guests.filter(g => g.rsvpStatus === 'Yes').reduce((sum, g) => sum + (g.numberOfAttendees || 0), 0);
    const totalRevenue = guests.reduce((sum, g) => sum + (g.totalPaid || 0), 0);
    const totalOwed = guests.reduce((sum, g) => sum + (g.totalOwed || 0), 0);
    const outstandingBalance = totalOwed - totalRevenue;
    const guestsWithFees = guests.filter(g => g.totalOwed > 0);
    const fullyPaid = guestsWithFees.filter(g => g.paymentStatus === 'Paid').length;
    const paidPercentage = guestsWithFees.length > 0 ? ((fullyPaid / guestsWithFees.length) * 100).toFixed(0) : '100';
    return { totalAttendees, totalRevenue, outstandingBalance, paidPercentage };
  }, [guests]);

  // --- CRUD Handlers ---

  const handleOpenGuestEditor = (guest) => {
    setEditingGuest(guest); // Set the guest to be edited
    setIsModalOpen(true);   // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGuest(null); // Clear the editing state
  };

  // This function sends the updated guest data to our backend API
  const handleSaveGuest = async (updatedGuest) => {
    // Optimistic UI Update: Instantly update the table for a great user experience
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === updatedGuest.id ? updatedGuest : guest
      )
    );
    handleCloseModal(); // Close the modal immediately

    // Send the update to the backend
    try {
      const response = await fetch('/api/guests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGuest),
      });

      if (!response.ok) {
        // If the server fails, revert the change and show an error
        console.error("Failed to save guest update to server.");
        // Optional: you could add logic here to revert the UI change and show an error message
      }
    } catch (error) {
      console.error("An error occurred while updating the guest:", error);
    }
  };

  // --- Render the UI ---
  return (
    <div className="bg-bg-dark min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {isLoading && (
          <div className="text-center py-20">
            <p className="text-lg text-text-secondary">Loading Reunion Data from Database...</p>
          </div>
        )}

        {error && (
           <div className="bg-red-900/50 border border-red-500/50 text-red-300 p-4 rounded-lg text-center">
             <p><strong>Error:</strong> {error}</p>
           </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <DashboardCard
                title="Total Attendees (RSVP Yes)"
                value={stats.totalAttendees}
                icon={<UserGroupIcon className="w-8 h-8" />}
              />
              <DashboardCard
                title="Total Revenue Collected"
                value={stats.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                icon={<CurrencyDollarIcon className="w-8 h-8" />}
                footer={`${stats.paidPercentage}% have fully paid`}
              />
               <DashboardCard
                title="Outstanding Balance"
                value={stats.outstandingBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                icon={<InboxStackIcon className="w-8 h-8" />}
              />
              <DashboardCard
                title="Fully Paid Families"
                value={`${stats.paidPercentage}%`}
                icon={<CheckCircleIcon className="w-8 h-8" />}
              />
            </div>
            
            <GuestTable guests={guests} onEditGuest={handleOpenGuestEditor} />
          </>
        )}

        {/* --- The Modal for Editing Guests --- */}
        {/* This section will only be visible when isModalOpen is true */}
        {isModalOpen && editingGuest && (
            <Modal onClose={handleCloseModal}>
                <GuestForm 
                    guest={editingGuest}
                    onSave={handleSaveGuest}
                    onCancel={handleCloseModal}
                />
            </Modal>
        )}
      </main>
    </div>
  );
}
