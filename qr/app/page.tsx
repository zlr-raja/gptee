"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ FIXED
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Copy, Download, Send, Sun, Moon } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState("");
  const upiId = "lokatir@fifederal";
  const upiLink = `upi://pay?pa=${upiId}&pn=Payment&am=${amount}&cu=INR`;

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches); // ✅ FIXED
  }, []);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    toast.success("UPI ID Copied!", { icon: "📋" });
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "upi_qr_code.png";
    link.click();
    toast.success("QR Code Downloaded!", { icon: "📥" });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Dark Mode Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Glassmorphism QR Card */}
      <div className="relative p-6 rounded-2xl shadow-lg bg-white/10 backdrop-blur-lg border border-white/20">
        {amount && (
          <p className="absolute top-2 right-3 text-sm bg-gray-800 text-white px-2 py-1 rounded-lg">
            ₹{amount}
          </p>
        )}

        {/* QR Code */}
        <QRCodeCanvas id="qr-code" value={upiLink} size={200} className="m-4" /> {/* ✅ FIXED */}

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            toast.success("Amount Updated!", { icon: "💰" });
          }}
          className="w-full p-2 mt-2 text-center border rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          {/* Copy UPI ID */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyUPI}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Copy size={16} /> Copy UPI
          </motion.button>

          {/* Download QR */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDownloadQR}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <Download size={16} /> Download QR
          </motion.button>
        </div>

        {/* Pay Now */}
        <motion.a
          whileTap={{ scale: 0.9 }}
          href={upiLink}
          className="mt-4 flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          <Send size={16} /> Pay Now
        </motion.a>
      </div>
    </div>
  );
}