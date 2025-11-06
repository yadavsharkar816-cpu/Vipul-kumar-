import React from 'react';
import { LeaderboardUser } from '../types';
import { Award, Coins } from 'lucide-react';

const Leaderboard = ({ users }: { users: LeaderboardUser[] }) => {
    
    const getRankColor = (rank: number) => {
        if (rank === 0) return 'text-yellow-400';
        if (rank === 1) return 'text-gray-400';
        if (rank === 2) return 'text-yellow-600';
        return 'text-gray-500';
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {/* FIX: Create a shallow copy of the users array before sorting to avoid mutating props directly. */}
                    [...users].sort((a, b) => b.coins - a.coins).map((user, index) => (
                        <li key={user.id} className={`p-4 flex items-center space-x-4 ${index < 3 ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-center space-x-3 w-16">
                                <span className={`font-bold text-lg w-6 text-center ${getRankColor(index)}`}>{index + 1}</span>
                                {index < 3 && <Award size={24} className={getRankColor(index)} />}
                            </div>
                            <img className="w-12 h-12 rounded-full" src={user.avatar} alt={user.name} />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900">{user.name}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-yellow-500">
                                <Coins size={16} />
                                <span className="font-bold">{user.coins.toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;
