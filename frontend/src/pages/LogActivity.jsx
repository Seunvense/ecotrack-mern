// frontend/src/pages/LogActivity.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ACTIVITY_OPTIONS = {
  transport: [
    { label: "Car (km)", value: "car", unit: "km" },
    { label: "Bus (km)", value: "bus", unit: "km" },
    { label: "Train (km)", value: "train", unit: "km" },
    { label: "Bike (km)", value: "bike", unit: "km" },
    { label: "Walk (km)", value: "walk", unit: "km" },
  ],
  food: [
    { label: "Beef (kg)", value: "beef", unit: "kg" },
    { label: "Chicken (kg)", value: "chicken", unit: "kg" },
    { label: "Vegetarian (kg)", value: "vegetarian", unit: "kg" },
    { label: "Vegan (kg)", value: "vegan", unit: "kg" },
  ],
  energy: [
    { label: "Electricity (kWh)", value: "electricity", unit: "kWh" },
    { label: "Gas (kWh)", value: "gas", unit: "kWh" },
  ],
};

export default function LogActivity({ user }) {
  const [type, setType] = useState("transport");
  const [category, setCategory] = useState(ACTIVITY_OPTIONS.transport[0].value);
  const [value, setValue] = useState("");
  const [carbon, setCarbon] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/activities",
        {
          type,
          category,
          value: parseFloat(value),
          unit: ACTIVITY_OPTIONS[type].find((c) => c.value === category).unit,
        },
        {
          withCredentials: true,
        }
      );
      setCarbon(res.data.carbon);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
            Log Activity
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory(ACTIVITY_OPTIONS[e.target.value][0].value);
                }}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="transport">Transport</option>
                <option value="food">Food</option>
                <option value="energy">Energy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                {ACTIVITY_OPTIONS[type].map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder={`Enter ${
                  ACTIVITY_OPTIONS[type].find((c) => c.value === category).unit
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
            >
              Log Activity
            </button>
          </form>

          {carbon !== null && (
            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg text-center">
              <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                {carbon} kg CO₂
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Added to your footprint
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
