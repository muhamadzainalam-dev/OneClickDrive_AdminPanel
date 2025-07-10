"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // already logged in? go to dashboard directly
    const ok = localStorage.getItem("isLoggedIn");
    if (ok === "true") {
      router.push("/pages/Dashboard");
    }
  }, []);

  const loginUser = (e) => {
    e.preventDefault();

    // for demo only - static creds
    const validUser = "admin";
    const validPass = "admin123";

    if (user === validUser && pass === validPass) {
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true);
      setErrorMsg("");
      router.push("/pages/Dashboard");
    } else {
      setErrorMsg("Wrong username or password");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md rounded-xl w-[90vw] max-w-[440px] p-7"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-20 object-contain mb-2"
          />
          <h1 className="text-xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-300">Login to continue</p>
        </div>

        <form onSubmit={loginUser} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {errorMsg && (
            <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
          )}

          <motion.button
            type="submit"
            className="w-full py-3 bg-[#f58220] text-white rounded font-semibold hover:bg-orange-600 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
