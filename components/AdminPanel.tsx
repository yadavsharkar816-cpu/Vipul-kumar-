
import React, { useState } from 'react';
import { Task, TaskType } from '../types';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';

const AdminPanel = ({ tasks, setTasks }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        reward: 10,
        type: TaskType.VIDEO
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTask(prev => ({
            ...prev,
            [name]: name === 'reward' ? parseInt(value) : value
        }));
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title || !newTask.description) return;

        const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
        const taskToAdd: Task = {
            id: newId,
            ...newTask,
            completed: false
        };
        setTasks(prev => [...prev, taskToAdd]);
        setNewTask({ title: '', description: '', reward: 10, type: TaskType.VIDEO });
    };
    
    const handleDeleteTask = (taskId: number) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
                <button onClick={() => navigate('/')} className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600">
                    Exit Admin
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h3>
                <form onSubmit={handleAddTask} className="space-y-4">
                    <input type="text" name="title" value={newTask.title} onChange={handleInputChange} placeholder="Task Title" className="w-full p-2 border rounded" required />
                    <input type="text" name="description" value={newTask.description} onChange={handleInputChange} placeholder="Task Description" className="w-full p-2 border rounded" required />
                    <div className="flex space-x-4">
                        <input type="number" name="reward" value={newTask.reward} onChange={handleInputChange} placeholder="Reward" className="w-1/2 p-2 border rounded" required />
                        <select name="type" value={newTask.type} onChange={handleInputChange} className="w-1/2 p-2 border rounded">
                            {Object.values(TaskType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="w-full flex justify-center items-center space-x-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                        <PlusCircle size={20} />
                        <span>Add Task</span>
                    </button>
                </form>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Manage Existing Tasks</h3>
                <div className="space-y-3">
                    {tasks.map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-bold">{task.title} (+{task.reward})</p>
                                <p className="text-sm text-gray-500">{task.type}</p>
                            </div>
                            <button onClick={() => handleDeleteTask(task.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
