"use client";

const GuestTable = ({ guests, onEditGuest }) => {
  if (!guests || guests.length === 0) {
    return (
      <div className="bg-bg-light p-6 rounded-xl shadow-lg border border-border-color text-center">
        <p className="text-text-secondary">No guest data found. Your guest list will appear here once it's loaded or added.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-light p-4 rounded-xl shadow-lg border border-border-color overflow-x-auto">
      <h2 className="text-xl font-bold text-text-primary mb-4 px-2">Guest List</h2>
      <table className="w-full text-left">
        <thead className="border-b border-border-color">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">RSVP Status</th>
            <th className="p-2">Attendees</th>
            <th className="p-2">Payment Status</th>
            <th className="p-2">Total Paid</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} className="border-b border-border-color/50 hover:bg-bg-dark">
              <td className="p-2 font-medium">{guest.name}</td>
              <td className="p-2">{guest.rsvpStatus}</td>
              <td className="p-2">{guest.numberOfAttendees}</td>
              <td className="p-2">{guest.paymentStatus}</td>
              <td className="p-2">{guest.totalPaid?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="p-2">
                <button
                  onClick={() => onEditGuest(guest)}
                  className="text-brand-primary hover:underline text-sm"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
