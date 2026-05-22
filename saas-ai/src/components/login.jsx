import React, { useState, useEffect, useRef } from "react";
import {
    Sparkles,
    Mail,
    Lock,
    User,
    Phone,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast";

function LoginPage() {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotStep, setForgotStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const inputRefs = useRef([]);
    const [loginLoading, setLoginLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async () => {
        if (loginLoading) return;
        setLoginLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/login`,
                { email, password },
                { withCredentials: true }
            );
            setTimeout(() => {
                navigate("/generate");
            }, 2000);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const createAccount = async () => {
        if (createLoading) return;
        setCreateLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/create`,
                {
                    userName,
                    phoneNumber,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            setTimeout(() => {
                navigate("/generate");
            }, 2000);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Create User failed"
            );
        } finally {
            setCreateLoading(false);
        }
    };
    const sendOtp = async () => {
        if (otpLoading) return;
        setOtpLoading(true);
        try {
            await axios.post(
               `${import.meta.env.VITE_API_URL}/user/send-otp`,
                { email },
                { withCredentials: true }
            );
            setForgotStep(2);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Failed to Send OTP"
            );
        } finally {
            setOtpLoading(false);
        }
    };
    const verifyOtp = async () => {
        if (verifyLoading) return;
        setVerifyLoading(true);
        try {
            await axios.post(
               `${import.meta.env.VITE_API_URL}/user/verify-otp`,
                { otp },
                { withCredentials: true }
            );
            setForgotStep(3);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Failed to Verify OTP"
            );
        } finally {
            setVerifyLoading(false);
        }
    };
    const resetPassword = async () => {
        if (resetLoading) return;
        setResetLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/user/reset-password`,
                { password },
                { withCredentials: true }
            );
            setForgotStep(1);
            setShowForgotPassword(false);
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                "Failed to Reset Password"
            );
        } finally {
            setResetLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const otpArray = otp.split("");
        otpArray[index] = value;
        const finalOtp = otpArray.join("");
        setOtp(finalOtp);
        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };
    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 2600);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleGoogleLogin = () => {
        if (googleLoading) return;
        setGoogleLoading(true);
        window.location.href =
           `${import.meta.env.VITE_API_URL}user/google`;
    };

    return (
        <div className="min-h-screen bg-[#050B1F] flex items-center justify-center px-5 py-10 overflow-hidden relative">
            {/* ================= ANIMATION ================= */}
            <style>
                {`
          @keyframes successToast {
            0% {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
            }
            15% {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
            85% {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
            }
          }
          .success-animation {
            animation: successToast 2.6s ease forwards;
          }
            @keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}
        `}
            </style>

            {/* ================= BG GLOW ================= */}
            <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-violet-500/20 blur-[160px] rounded-full" />
            <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />
            {/* ================= SUCCESS TOAST ================= */}
            {showSuccess && (
                <div className="fixed top-8 right-8 z-[100] success-animation">
                    <div className="bg-[#101a38]/95 backdrop-blur-xl border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.25)] rounded-2xl px-6 py-5 flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                            <CheckCircle2
                                className="text-green-400"
                                size={28}
                            />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">
                                Account Created
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Welcome to JasFlow AI
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* ================= FORGOT PASSWORD MODAL ================= */}
            {showForgotPassword && (
                <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center px-5">
                    <div className="w-full max-w-md rounded-[32px] bg-[#0B122B] border border-white/10 p-8 relative overflow-hidden">
                        {/* Glow */}
                        <div className="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-violet-500/20 blur-[100px] rounded-full" />
                        {/* STEP 1 */}
                        {forgotStep === 1 && (
                            <>
                                <h2 className="text-3xl font-black text-white">
                                    Forgot Password
                                </h2>
                                <p className="text-gray-400 mt-3">
                                    Enter your email to receive OTP
                                </p>
                                <div className="mt-8">
                                    <label className="text-sm text-gray-400 mb-3 block">
                                        Email Address
                                    </label>
                                    <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                        <Mail className="text-gray-500" size={20} />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                            style={{
                                                WebkitBoxShadow:
                                                    "0 0 0px 1000px #101a38 inset",
                                                WebkitTextFillColor: "white",
                                                caretColor: "white",
                                            }}
                                        />
                                    </div>
                                    <button
                                        onClick={sendOtp}
                                        disabled={otpLoading}
                                        className="w-full mt-7 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold"
                                    >
                                        {
                                            otpLoading ? (
                                                <>
                                                    <div className="loader mx-auto"></div>
                                                </>
                                            ) : (
                                                "Send OTP"
                                            )
                                        }
                                    </button>
                                </div>
                            </>
                        )}
                        {/* STEP 2 */}
                        {forgotStep === 2 && (
                            <>
                                <h2 className="text-3xl font-black text-white">
                                    Verify OTP
                                </h2>
                                <p className="text-gray-400 mt-3">
                                    Enter the 6 digit OTP sent to your email
                                </p>
                                <div className="flex gap-3 mt-10 justify-center">
                                    {[0, 1, 2, 3, 4].map((item, index) => (
                                        <input
                                            key={item}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            maxLength={1}
                                            value={otp[index] || ""}
                                            onChange={(e) =>
                                                handleOtpChange(e.target.value, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleOtpKeyDown(e, index)
                                            }
                                            className="w-14 h-16 rounded-2xl bg-[#101a38] border border-white/10 text-center text-white text-xl font-bold outline-none focus:border-violet-500"
                                            style={{
                                                WebkitBoxShadow:
                                                    "0 0 0px 1000px #101a38 inset",
                                                WebkitTextFillColor: "white",
                                                caretColor: "white",
                                            }}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={verifyOtp}
                                    disabled={verifyLoading}
                                    className="w-full mt-8 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold"
                                >
                                    {
                                        verifyLoading ? (
                                            <>
                                                <div className="loader mx-auto"></div>
                                            </>
                                        ) : (
                                            "Verify OTP"
                                        )
                                    }
                                </button>
                                <button className="w-full mt-4 text-cyan-400 text-sm">
                                    Resend OTP
                                </button>
                            </>
                        )}
                        {/* STEP 3 */}
                        {forgotStep === 3 && (
                            <>
                                <h2 className="text-3xl font-black text-white">
                                    Reset Password
                                </h2>
                                <p className="text-gray-400 mt-3">
                                    Create a new secure password
                                </p>
                                <div className="mt-8 space-y-5">
                                    {/* New Password */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            New Password
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Lock className="text-gray-500" size={20} />
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Confirm Password */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Confirm Password
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Lock className="text-gray-500" size={20} />
                                            <input
                                                type="password"
                                                placeholder="Confirm password"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetPassword}
                                        disabled={resetLoading}
                                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold"
                                    >
                                        {
                                            resetLoading ? (
                                                <>
                                                    <div className="loader mx-auto"></div>
                                                </>
                                            ) : (
                                                "Reset Password"
                                            )
                                        }
                                    </button>
                                </div>
                            </>
                        )}
                        {/* Close */}
                        <button
                            onClick={() => {
                                setShowForgotPassword(false);
                                setForgotStep(1);
                            }}
                            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-[#101a38] text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* ================= MAIN CARD ================= */}
            <div className="relative z-10 w-full max-w-lg lg:max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[30px] lg:rounded-[40px] border border-white/10 bg-[#0B122B] shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                {/* ================= LEFT SIDE ================= */}
                <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden bg-gradient-to-br from-[#0B122B] to-[#08152f] border-r border-white/5">
                    <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-violet-500/20 blur-[120px] rounded-full" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg">
                                <Sparkles className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-white">
                                    Jas<span className="text-cyan-400">Flow AI</span>
                                </h1>
                                <p className="text-gray-400 mt-1">
                                    Next Generation AI Platform
                                </p>
                            </div>
                        </div>
                        <div className="mt-15">
                            <h2 className="text-6xl font-black leading-tight text-white">
                                Write at the
                                <br />
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    Speed of Thought
                                </span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mt-8 max-w-lg">
                                Generate blogs, articles, and creative content
                                with the power of AI-driven writing tools.
                            </p>
                        </div>
                        <div className="relative z-10 flex gap-10 mt-5">
                            <div>
                                <h3 className="text-3xl font-bold text-cyan-400">
                                    50K+
                                </h3>
                                <p className="text-gray-500 mt-2 text-sm">
                                    Active Users
                                </p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-violet-400">
                                    10M+
                                </h3>
                                <p className="text-gray-500 mt-2 text-sm">
                                    AI Articles
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ================= RIGHT SIDE ================= */}
                <div className="p-8 lg:p-14 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Top */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-white">
                                        {isLogin ? "Welcome Back" : "Create Account"}
                                    </h2>
                                    <p className="text-gray-400 mt-3 text-base lg:text-lg">
                                        {isLogin
                                            ? "Login to continue your AI workflow."
                                            : "Join JasFlow AI and start creating."}
                                    </p>
                                </div>
                                <div className="lg:hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                        {/* ================= FORM ================= */}
                        <div className="space-y-6">
                            {!isLogin ? (
                                <>
                                    {/* Name */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Full Name
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <User className="text-gray-500" size={20} />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter your full name"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-00"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Phone Number
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Phone className="text-gray-500" size={20} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your phone number"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Email Address
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Mail className="text-gray-500" size={20} />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Password
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Lock className="text-gray-500" size={20} />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Email */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Email Address
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Mail className="text-gray-500" size={20} />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div>
                                        <label className="text-sm text-gray-400 mb-3 block">
                                            Password
                                        </label>
                                        <div className="h-16 rounded-2xl bg-[#101a38] border border-white/10 flex items-center px-5 gap-4">
                                            <Lock className="text-gray-500" size={20} />
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
                                                style={{
                                                    WebkitBoxShadow:
                                                        "0 0 0px 1000px #101a38 inset",
                                                    WebkitTextFillColor: "white",
                                                    caretColor: "white",
                                                }}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Login Options */}
                            {isLogin && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-gray-400">
                                        <input type="checkbox" className="accent-violet-500" />
                                        Remember me
                                    </label>
                                    <button
                                        onClick={() => setShowForgotPassword(true)}
                                        className="text-cyan-400 hover:text-cyan-300 transition"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                            {/* Submit */}
                            {isLogin ?
                                (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loginLoading}
                                        className="w-full h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 text-white text-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_0_30px_rgba(139,92,246,0.35)] disabled:opacity-70"
                                    >
                                        {
                                            loginLoading ? (
                                                <>
                                                    <div className="loader"></div>
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    Login Now
                                                    <ArrowRight size={20} />
                                                </>
                                            )
                                        }
                                    </button>
                                ) : (
                                    <button
                                        onClick={createAccount}
                                        disabled={createLoading}
                                        className="w-full h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 text-white text-lg font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-70"
                                    >
                                        {
                                            createLoading ? (
                                                <>
                                                    <div className="loader"></div>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <ArrowRight size={20} />
                                                </>
                                            )
                                        }
                                    </button>
                                )
                            }

                        </div>
                        {/* Divider */}
                        <div className="relative flex items-center justify-center mt-6">
                            <div className="absolute w-full border-t border-white/10"></div>
                            <span className="relative px-4 bg-[#0B122B] text-gray-500 text-sm">
                                OR
                            </span>
                        </div>
                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={googleLoading}
                            className="w-full mt-6 h-16 rounded-2xl bg-[#101a38] border border-white/10 text-white text-lg font-semibold flex items-center justify-center gap-4"
                        >
                            {
                                googleLoading ? (
                                    <>
                                        <div className="loader"></div>
                                        Redirecting...
                                    </>
                                ) : (
                                    <>
                                        <FcGoogle size={24} />
                                        Continue with Google
                                    </>
                                )
                            }
                        </button>

                        {/* Bottom */}
                        <div className="text-center mt-10">
                            <p className="text-gray-400">
                                {isLogin
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-cyan-400 hover:text-cyan-300 font-semibold transition"
                                >
                                    {isLogin ? "Create Account" : "Login"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage
