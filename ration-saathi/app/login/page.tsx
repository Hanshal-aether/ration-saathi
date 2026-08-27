"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!phone) {
      setError("Please enter your phone number");
      setLoading(false);
      return;
    }

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 600));
      localStorage.setItem("ration_saathi_logged_in", "true");
      localStorage.setItem("ration_saathi_phone", phone);
      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-600 via-purple-500 to-blue-400">
      {/* Blur overlay effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl"></div>

      {/* Content */}
      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ration Saathi</h1>
          <p className="text-blue-100 text-base">Manage your ration services</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Phone Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition text-lg tracking-wider"
              />
              <p className="text-xs text-blue-100 mt-2">We'll send an OTP for verification</p>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 backdrop-blur">
                <p className="text-sm font-medium text-red-100">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-white text-blue-600 font-bold transition duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Continue
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 mb-6">
          <p className="text-xs text-blue-100 font-semibold mb-1">Demo Phone Number:</p>
          <p className="text-sm font-mono text-white">9876543210</p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-blue-100">
          Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}
