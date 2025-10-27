import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 border-b border-gray-200 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-600 text-white">
          <CheckSquare size={20} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Taskflow</h1>
          <p className="text-sm text-gray-500">Lightweight, fast, and focused to-do list</p>
        </div>
      </div>
    </header>
  );
}
