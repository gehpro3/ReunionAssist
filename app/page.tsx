// app/page.tsx

export default function HomePage() {
  return (
    // Main container with a dark background color and full screen height
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Header Section */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-cyan-400">
            Reunion Assist Dashboard
          </h1>
          <p className="mt-1 text-gray-400">
            Welcome! Manage your event details below.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Grid for Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Guest List */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2 text-white">Guest List</h2>
            <p className="text-gray-400 mb-4">View and manage all registered guests.</p>
            <a href="#" className="inline-block bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600">
              Manage Guests
            </a>
          </div>

          {/* Card 2: Event Schedule */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2 text-white">Event Schedule</h2>
            <p className="text-gray-400 mb-4">Organize the timeline of events for the reunion.</p>
            <a href="#" className="inline-block bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600">
              View Schedule
            </a>
          </div>

          {/* Card 3: AI Chat Assist */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2 text-white">AI Chat Assist</h2>
            <p className="text-gray-400 mb-4">Get help and insights from your AI assistant.</p>
            <a href="#" className="inline-block bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600">
              Open Chat
            </a>
          </div>
          
          {/* You can add more cards here */}

        </div>
      </main>

      {/* Footer Section (Optional) */}
      <footer className="text-center py-6 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Reunion Dashboard. All rights reserved.</p>
      </footer>
      
    </div>
  );
}
