// app/page.tsx

import { UsersIcon, CalendarDaysIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

// A reusable Card component for our dashboard stats
function DashboardCard({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex items-center space-x-4">
      <div className="bg-gray-700 p-3 rounded-full">
        <Icon className="h-8 w-8 text-cyan-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">An overview of your reunion event.</p>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Guests" value="128" icon={UsersIcon} />
        <DashboardCard title="Days Until Event" value="42" icon={CalendarDaysIcon} />
        <DashboardCard title="Funds Raised" value="$5,420" icon={CurrencyDollarIcon} />
      </div>

      {/* Placeholder for future charts or tables */}
      <div className="mt-10 bg-gray-800 rounded-lg p-6 h-64 flex items-center justify-center">
        <p className="text-gray-500">More content and charts will go here.</p>
      </div>
    </div>
  );
}
