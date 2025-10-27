import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import Filters from './components/Filters';
import TaskList from './components/TaskList';

const STORAGE_KEY = 'taskflow.tasks.v1';

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [tasks, setTasks] = useLocalStorageState(STORAGE_KEY, []);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('created_desc');

  const addTask = ({ title, description, priority }) => {
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const newTask = { id, title, description, priority, createdAt, completed: false };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTask = (id, payload) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...payload } : t)));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const visibleTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === 'active') filtered = tasks.filter((t) => !t.completed);
    if (filter === 'completed') filtered = tasks.filter((t) => t.completed);

    const byPriority = { high: 3, medium: 2, low: 1 };

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'created_asc':
          return a.createdAt - b.createdAt;
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'priority':
          return byPriority[b.priority] - byPriority[a.priority];
        case 'created_desc':
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return sorted;
  }, [tasks, filter, sort]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 text-gray-900">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <section className="flex flex-col gap-4">
          <TaskForm onAdd={addTask} />
          <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-900">{stats.active}</span> pending •{' '}
              <span className="font-medium text-gray-900">{stats.completed}</span> completed •{' '}
              <span className="font-medium text-gray-900">{stats.total}</span> total
            </p>
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg"
              >
                Clear completed
              </button>
            )}
          </div>

          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        </section>
      </main>

      <footer className="py-10 text-center text-xs text-gray-400">
        Built for speed. Data saves locally in your browser.
      </footer>
    </div>
  );
}
