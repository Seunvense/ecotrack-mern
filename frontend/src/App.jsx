import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Backend offline"));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.theme = newTheme;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-3">
          EcoTrack
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {message}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SDG 13: Climate Action
        </p>

        <button
          onClick={toggleTheme}
          className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;
