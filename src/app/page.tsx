'use client';

import { useState } from 'react';

type Task = {
  text: string;
  completed: boolean;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { text: inputValue.trim(), completed: false }]);
    setInputValue('');
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* タイトルとサブタイトル */}
        <h1 className="text-3xl font-bold text-center mb-2">TODOアプリ</h1>
        <p className="text-center text-base mb-8">タスクの管理と整理を簡単に</p>

        {/* カード部分 */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {/* 入力欄 */}
          <div className="flex items-center border-b pb-4">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-2" />
            <input
              type="text"
              placeholder="新しいリマインダー"
              className="flex-1 border-none outline-none text-gray-500 placeholder-gray-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
          </div>

          {/* タスクリスト */}
          {tasks.length === 0 ? (
            <div className="text-center text-gray-400">リマインダーがありません</div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* ✅ チェック丸（開閉タグ） */}
                    <div
                      onClick={() => toggleTask(idx)}
                      className={`w-5 h-5 rounded-full border-2 cursor-pointer ${
                        task.completed
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-400'
                      }`}
                    ></div>
                    <span
                      className={`${
                        task.completed ? 'text-red-500' : ''
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(idx)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}