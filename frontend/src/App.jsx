import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Backend not running"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-green-700 mb-4">EcoTrack</h1>
        <p className="text-gray-600">{message}</p>
        <p className="mt-4 text-sm text-gray-500">SDG 13: Climate Action</p>
      </div>
    </div>
  );
}

export default App;
