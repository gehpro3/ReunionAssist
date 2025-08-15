// components/Sidebar.tsx

import { HomeIcon, UsersIcon, CalendarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon },
  { name: 'Guest List', href: '#', icon: UsersIcon },
  { name: 'Schedule', href: '#', icon: CalendarIcon },
  { name: 'AI Assist', href: '#', icon: ChatBubbleLeftRightIcon },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 p-5 flex flex-col">
      {/* Logo/Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-cyan-400">Reunion Assist</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white group"
              >
                <item.icon className="h-6 w-6 mr-3 text-gray-400 group-hover:text-white" />
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer/User Profile (Optional) */}
      <div className="mt-auto">
        <p className="text-sm text-gray-500">&copy; 2025</p>
      </div>
    </div>
  );
}
