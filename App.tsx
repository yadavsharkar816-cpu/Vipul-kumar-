
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, Wallet, UserCog, Coins } from 'lucide-react';
import DailyTasks from './components/DailyTasks';
import Leaderboard from './components/Leaderboard';
import WalletComponent from './components/Wallet';
import AdminPanel from './components/AdminPanel';
import QuizModal from './components/QuizModal';
import { Task, LeaderboardUser, RedemptionOption, TaskType } from './types';
import { INITIAL_TASKS, LEADERBOARD_DATA, REDEMPTION_OPTIONS } from './constants';

export const UserContext = React.createContext<{
  userCoins: number;
  addCoins: (amount: number) => void;
}>({
  userCoins: 0,
  addCoins: () => {},
});

const Header = ({ onAdminToggle }: { onAdminToggle: () => void }) => {
    const { userCoins } = React.useContext(UserContext);

    return (
        <header className="sticky top-0 bg-blue-600 text-white shadow-md z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wider">CoinRush</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-blue-700 px-3 py-1.5 rounded-full">
                        <Coins className="text-yellow-300" size={20} />
                        <span className="font-semibold">{userCoins}</span>
                    </div>
                    <button onClick={onAdminToggle} className="p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <UserCog size={22} />
                    </button>
                </div>
            </div>
        </header>
    );
};


const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navItems = [
        { path: '/', label: 'Tasks', icon: <Home size={24} /> },
        { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={24} /> },
        { path: '/wallet', label: 'Wallet', icon: <Wallet size={24} /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
            <div className="container mx-auto px-4 flex justify-around">
                {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center w-1/3 py-2 transition-colors ${
                                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
                            }`}
                        >
                            {item.icon}
                            <span className="text-xs font-medium mt-1">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};


function App() {
  const [userCoins, setUserCoins] = useState(1250);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>(LEADERBOARD_DATA);
  const [redemptionOptions, setRedemptionOptions] = useState<RedemptionOption[]>(REDEMPTION_OPTIONS);
  const [isQuizVisible, setQuizVisible] = useState(false);
  const [currentQuizTask, setCurrentQuizTask] = useState<Task | null>(null);

  const addCoins = useCallback((amount: number) => {
    setUserCoins(prev => prev + amount);
  }, []);

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.type === TaskType.QUIZ) {
      setCurrentQuizTask(task);
      setQuizVisible(true);
    } else {
      addCoins(task.reward);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );
    }
  };

  const handleQuizComplete = (success: boolean) => {
    if (success && currentQuizTask) {
       addCoins(currentQuizTask.reward);
       setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === currentQuizTask.id ? { ...t, completed: true } : t
        )
      );
    }
    setQuizVisible(false);
    setCurrentQuizTask(null);
  }

  return (
    <UserContext.Provider value={{ userCoins, addCoins }}>
      <HashRouter>
          <MainContent
              tasks={tasks}
              setTasks={setTasks}
              leaderboardData={leaderboardData}
              redemptionOptions={redemptionOptions}
              onCompleteTask={completeTask}
          />
          {isQuizVisible && <QuizModal onClose={() => setQuizVisible(false)} onComplete={handleQuizComplete} />}
      </HashRouter>
    </UserContext.Provider>
  );
}

const MainContent = ({ tasks, setTasks, leaderboardData, redemptionOptions, onCompleteTask }: {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    leaderboardData: LeaderboardUser[],
    redemptionOptions: RedemptionOption[],
    onCompleteTask: (taskId: number) => void
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header onAdminToggle={() => navigate('/admin')} />
            <main className="flex-grow container mx-auto px-4 py-6 pb-24">
                <Routes>
                    <Route path="/" element={<DailyTasks tasks={tasks} onCompleteTask={onCompleteTask} />} />
                    <Route path="/leaderboard" element={<Leaderboard users={leaderboardData} />} />
                    <Route path="/wallet" element={<WalletComponent options={redemptionOptions} />} />
                    <Route path="/admin" element={<AdminPanel tasks={tasks} setTasks={setTasks} />} />
                </Routes>
            </main>
            {useLocation().pathname !== '/admin' && <BottomNav />}
        </div>
    );
}

export default App;
