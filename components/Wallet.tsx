
import React, { useContext } from 'react';
import { RedemptionOption } from '../types';
import { UserContext } from '../App';
import { Coins } from 'lucide-react';

const RedemptionCard = ({ option }: { option: RedemptionOption }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform hover:scale-105">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
            {option.icon}
        </div>
        <h3 className="font-semibold text-gray-800">{option.name}</h3>
        <p className="text-sm text-gray-500">{option.value}</p>
        <button className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-sm hover:bg-blue-600 transition-colors">
            Redeem
        </button>
    </div>
);

const WalletComponent = ({ options }: { options: RedemptionOption[] }) => {
    const { userCoins } = useContext(UserContext);

    return (
        <div>
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 mb-8 text-center">
                <p className="text-sm opacity-80">Total Balance</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                    <Coins className="text-yellow-300" size={32} />
                    <h2 className="text-4xl font-bold">{userCoins.toLocaleString()}</h2>
                </div>
                <p className="text-sm opacity-80 mt-2">100 Coins = ₹1</p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Redemption Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {options.map(option => (
                    <RedemptionCard key={option.id} option={option} />
                ))}
            </div>
        </div>
    );
};

export default WalletComponent;
