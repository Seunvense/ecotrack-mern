// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

let socket;

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    carbonScore: user.carbonScore || 0,
    rank: 0,
    activities: 0,
  });

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("carbonUpdate", (data) => {
      if (data.userId === user.id) {
        setStats((prev) => ({ ...prev, carbonScore: data.carbonScore }));
      }
    });

    return () => socket.disconnect();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Welcome, {user.name.split(" ")[0]}!
          </h1>
          <Link
            to="/log"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            + Log Activity
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Carbon
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {stats.carbonScore.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Global Rank
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              #{stats.rank || "—"}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Activities
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.activities}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Tip</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {stats.carbonScore > 50
              ? "Try biking or eating plant-based this week!"
              : "Great job! You're below average!"}
          </p>
        </div>
      </div>
    </div>
  );
}
