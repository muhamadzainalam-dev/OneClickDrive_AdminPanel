"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      router.push("/pages/Dashboard");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    const validUser = "admin";
    const validPass = "admin123";

    if (username === validUser && password === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setError("");
      router.push("/pages/Dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl w-[90vw] max-w-[450px] p-8"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <img
            src="/Logo.png"
            alt="Admin Logo"
            className="h-20 object-contain mb-3"
          />
          <h1 className="text-2xl font-bold text-center">
            Welcome Back, Admin
          </h1>
          <p className="text-sm text-gray-300">
            Sign in to manage your car listings
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-5">
          <motion.input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          {error && (
            <motion.p
              className="text-red-400 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-[#f58220] text-white rounded-md font-semibold shadow hover:bg-orange-600 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Log In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
