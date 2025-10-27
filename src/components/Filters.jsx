import React from 'react';
import { ListChecks, Clock, CheckCircle2, ArrowDownAZ, Calendar, ArrowUpAZ } from 'lucide-react';

export default function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ListChecks size={16} /> All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'active' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <Clock size={16} /> Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <CheckCircle2 size={16} /> Completed
        </button>
      </div>

      <div className="flex items-center gap-2 sm:ml-auto">
        <label className="text-sm text-gray-600">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="created_desc">Newest first</option>
          <option value="created_asc">Oldest first</option>
          <option value="title_asc">Title A→Z</option>
          <option value="title_desc">Title Z→A</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
