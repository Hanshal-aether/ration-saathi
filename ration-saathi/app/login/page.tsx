"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smartphone, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  function handlePhoneSubmit() {
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
  }

  function handleOtpSubmit() {
    if (otp !== "123456") {
      setError("Incorrect code. For this demo, use 123456.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-service-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-service-100 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-service-100 flex items-center justify-center">
            {step === "phone" ? (
              <Smartphone className="text-service-600" size={26} />
            ) : (
              <ShieldCheck className="text-service-600" size={26} />
            )}
          </div>
        </div>

        <h1 className="text-xl font-semibold text-center text-gray-900 mb-1">
          {step === "phone" ? "Welcome to Ration Saathi" : "Verify your number"}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          {step === "phone"
            ? "Enter your mobile number to continue"
            : `We sent a code to +91 ${phone}`}
        </p>

        {step === "phone" ? (
          <>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 mb-3 focus-within:border-service-500 transition-colors">
              <span className="text-gray-500 text-base mr-2">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="flex-1 outline-none text-base text-gray-900 placeholder:text-gray-300"
              />
            </div>
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            <button
              onClick={handlePhoneSubmit}
              className="w-full bg-service-600 hover:bg-service-700 text-white font-medium py-3 rounded-xl transition-colors"
            >
              Send code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full text-center text-2xl tracking-[0.5em] border border-gray-200 rounded-xl px-4 py-3 mb-3 outline-none focus:border-service-500 transition-colors"
            />
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-service-600 hover:bg-service-700 text-white font-medium py-3 rounded-xl transition-colors mb-3"
            >
              Verify
            </button>
            <button
              onClick={() => setStep("phone")}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Change number
            </button>
          </>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          Demo only — no real OTP is sent. Use 123456 to continue.
        </p>
      </div>
    </div>
  );
}
