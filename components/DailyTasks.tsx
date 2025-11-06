import React from 'react';
// FIX: Import TaskType enum to use in switch statement.
import { Task, TaskType } from '../types';
import { CheckCircle2, PlayCircle, FileText, BadgePercent } from 'lucide-react';

const TaskCard = ({ task, onComplete }: { task: Task, onComplete: (id: number) => void }) => {
    const getIcon = () => {
        // FIX: Use TaskType enum instead of magic strings for better type safety and maintainability.
        switch (task.type) {
            case TaskType.VIDEO: return <PlayCircle className="text-red-500" />;
            case TaskType.QUIZ: return <CheckCircle2 className="text-green-500" />;
            case TaskType.SURVEY: return <FileText className="text-yellow-500" />;
            case TaskType.AD: return <BadgePercent className="text-purple-500" />;
            default: return <CheckCircle2 className="text-gray-500" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 transition-transform hover:scale-105">
            <div className="p-2 bg-slate-100 rounded-full">{getIcon()}</div>
            <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="font-bold text-blue-600 text-lg">+{task.reward}</div>
                <button
                    onClick={() => onComplete(task.id)}
                    disabled={task.completed}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {task.completed ? 'Done' : 'Start'}
                </button>
            </div>
        </div>
    );
};

const AdPlaceholder = () => (
    <div className="bg-gray-200 rounded-lg p-4 my-4 text-center">
        <p className="text-gray-500 font-semibold">Advertisement</p>
        <p className="text-sm text-gray-400">Support us by viewing ads!</p>
    </div>
);


const DailyTasks = ({ tasks, onCompleteTask }: { tasks: Task[], onCompleteTask: (id: number) => void }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Daily Tasks</h2>
            <p className="text-gray-600">Complete these tasks to earn coins and climb the leaderboard!</p>
            
            {tasks.slice(0, 2).map(task => (
                <TaskCard key={task.id} task={task} onComplete={onCompleteTask} />
            ))}

            <AdPlaceholder />

            {tasks.slice(2).map(task => (
                <TaskCard key={task.id} task={task} onComplete={onCompleteTask} />
            ))}
        </div>
    );
};

export default DailyTasks;
