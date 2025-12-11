// StatCard.jsx (updated)
import React from 'react';

const StatCard = ({ title, value, subText, icon, colorClass }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-md flex justify-between items-start hover:shadow-lg transition-shadow duration-300">
            <div>
                <p className="text-gray-500 font-medium mb-1 text-sm">{title}</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-0.5">{value}</h2>
                <p className={`text-sm ${colorClass} font-medium`}>{subText}</p>
            </div>
            <div className={`p-3 rounded-xl ${colorClass.replace('text-', 'bg-')} bg-opacity-10`}>
                {icon}
            </div>
        </div>
    );
};

export default StatCard;