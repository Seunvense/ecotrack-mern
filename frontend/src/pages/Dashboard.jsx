import { useEffect, useState } from "react";

export default function Dashboard({ user }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mock stats
    setStats({
      carbonSaved: 12.5,
      rank: 42,
      challenges: 3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
          Welcome, {user.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Carbon Saved
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats?.carbonSaved || 0} kg
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Global Rank
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              #{stats?.rank || "-"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Challenges
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats?.challenges || 0}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
            Log Activity
          </button>
        </div>
      </div>
    </div>
  );
}
