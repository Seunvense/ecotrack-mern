// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

let socket;

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({
    carbonScore: 0,
    rank: "—",
    activities: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actRes, leaderRes] = await Promise.all([
          axios.get("http://localhost:5000/api/activities", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/activities/leaderboard"),
        ]);

        const activities = actRes.data;
        const totalCarbon = activities.reduce(
          (sum, act) => sum + act.carbon,
          0
        );
        const leaderboard = leaderRes.data;
        const userRank =
          leaderboard.findIndex((u) => u.name === user.name) + 1 || "—";

        setStats({
          carbonScore: totalCarbon,
          activities: activities.length,
          rank: userRank,
        });
      } catch (err) {
        console.log("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.name]);

  // Socket.IO live update
  useEffect(() => {
    socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("carbonUpdate", (data) => {
      if (data.userId === user.id) {
        setStats((prev) => ({ ...prev, carbonScore: data.carbonScore }));
      }
    });

    return () => socket.disconnect();
  }, [user.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            Welcome, {user.name.split(" ")[0]}!
          </h1>
          <Link
            to="/log"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            + Log Activity
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Carbon
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {stats.carbonScore.toFixed(1)} kg
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Global Rank
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              #{stats.rank}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Activities
            </h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              {stats.activities}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-400">
            Eco Tip
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {stats.carbonScore > 20
              ? "Try public transport or plant-based meals this week!"
              : stats.carbonScore > 0
              ? "You're doing great! Keep it up!"
              : "Start logging to track your impact!"}
          </p>
          <button
            onClick={async () => {
              if (window.confirm("Reset your carbon footprint to 0?")) {
                await axios.delete(
                  "http://localhost:5000/api/activities/reset",
                  {
                    withCredentials: true,
                  }
                );
                setStats((prev) => ({
                  ...prev,
                  carbonScore: 0,
                  activities: 0,
                }));
              }
            }}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
          >
            Reset Footprint
          </button>
        </div>
      </div>
    </div>
  );
}
