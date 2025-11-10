import React, { useState } from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onToggleTask }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <AlertCircle className="text-orange-500" size={24} />
          Görevlerim
        </h3>
        <div className="text-sm text-gray-600">
          {completedCount}/{tasks.length} tamamlandı
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">Harika! Tüm görevler tamamlandı 🎉</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition ${
                task.completed ? 'bg-gray-50 opacity-60' : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="mt-1">
                {task.completed ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <Circle className="text-gray-400" size={20} />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.text}
                </p>
                <p className="text-xs text-gray-600 mt-1">{task.details}</p>
                {task.completed && task.completedDate && (
                  <p className="text-xs text-green-600 mt-1">✓ {task.completedDate} tarihinde tamamlandı</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {pendingCount > 0 && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-900">
            ⏰ <strong>{pendingCount} bekleyen göreviniz</strong> var. AI Ajanınız size yardımcı olabilir!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
