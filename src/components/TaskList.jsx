import React, { useState } from 'react';
import { Trash2, PencilLine, Save, X, GripVertical, CheckCircle, Circle } from 'lucide-react';

function priorityBadge(priority) {
  const map = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  return map[priority] || map.medium;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-dashed border-gray-300">
        No tasks yet. Add your first task above!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={(payload) => onEdit(task.id, payload)}
        />)
      )}
    </ul>
  );
}

function TaskListItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority || 'medium');

  const save = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onEdit({ title: trimmed, description: description.trim(), priority });
    setIsEditing(false);
  };

  return (
    <li className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 transition-opacity ${task.completed ? 'opacity-80' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          className={`mt-1 p-1 rounded-full border ${task.completed ? 'text-emerald-600 border-emerald-300' : 'text-gray-400 border-gray-300 hover:text-gray-600'} transition-colors`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${priorityBadge(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
              {task.description ? (
                <p className={`mt-1 text-sm text-gray-600 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
              ) : null}
              <p className="mt-2 text-xs text-gray-400">Added {new Date(task.createdAt).toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={save}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => { setIsEditing(false); setTitle(task.title); setDescription(task.description || ''); setPriority(task.priority || 'medium'); }}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <X size={16} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <PencilLine size={16} /> Edit
              </button>
              <button
                onClick={onDelete}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
