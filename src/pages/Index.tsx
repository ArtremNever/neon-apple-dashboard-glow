import { Layout } from '@/components/Layout';
import { useState, useEffect } from 'react';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400">Welcome to your dashboard! Here's a quick overview.</p>

        <div className="bg-slate-900 rounded-lg shadow-md p-6 border border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4">Current Time</h2>
          <p className="text-green-400 text-2xl">{formattedTime}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-lg shadow-md p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-green-400 text-xl">1,234</p>
          </div>

          <div className="bg-slate-900 rounded-lg shadow-md p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">Campaigns Active</h3>
            <p className="text-green-400 text-xl">42</p>
          </div>

          <div className="bg-slate-900 rounded-lg shadow-md p-6 border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
            <p className="text-green-400 text-xl">$56,789</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
