import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Shield,
  Headphones,
  Menu,
} from "lucide-react";
import Navbar from "./sidebar.jsx"
import axios from "axios";
import toast from "react-hot-toast";

export default function PricingDashboard() {
  const [billingType, setBillingType] = useState("monthly");
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pricing = {
    monthly: {
      starter: "$15",
      pro: "$35",
    },
    annual: {
      starter: "$12",
      pro: "$30",
    },
  };

  const plan = async () => {
    const payload = {
      plan: "premium"
    }
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/upgrade`,
        payload,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to update Plan"
      );
    }
  }

  /* Toggle Animation */
  const handleToggle = (type) => {
    if (type === billingType) return;

    setAnimate(true);

    setTimeout(() => {
      setBillingType(type);
    }, 180);

    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  const getPlan = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/view/logged`,
        {
          withCredentials: true
        }
      );
      const resData = res.data;
      setData(resData);
    }
    catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className="h-screen w-full bg-[#020b24] flex overflow-hidden relative">

      {/* ================= SIDEBAR ================= */}
      <Navbar data={data} isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />

      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:ml-[250px] flex-1 h-screen overflow-y-auto">

        {/* Navbar */}
        <div className="h-[80px] top-0 z-50 bg-[#020b24]/90 backdrop-blur-md flex items-center justify-center relative px-10">

          <button
            className="lg:hidden text-white p-2 absolute left-6"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Profile */}
          <h2 className="text-white font-semibold text-lg flex items-center gap-1">
            Hello{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              {data?.userName || "Customer"}
            </span>
          </h2>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="px-6 lg:px-16 pt-10 pb-20">

          {/* Hero */}
          <div className="text-center">

            <h1 className="text-4xl lg:text-7xl font-extrabold text-white leading-tight">
              Scale your{" "}
              <span className="text-cyan-400">
                narrative.
              </span>
            </h1>

            <p className="text-gray-400 mt-5 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
              Choose the perfect plan for your creative workflow.
              From solo writers to global agencies, JasFlow AI
              adapts to your precision needs.
            </p>

            {/* ================= TOGGLE ================= */}
            <div className="flex items-center justify-center gap-5 mt-10">

              {/* Monthly */}
              <button
                onClick={() => handleToggle("monthly")}
                className={`text-sm font-medium transition ${billingType === "monthly"
                    ? "text-white"
                    : "text-gray-500"
                  }`}
              >
                Monthly
              </button>

              {/* Toggle */}
              <button
                onClick={() =>
                  handleToggle(
                    billingType === "monthly"
                      ? "annual"
                      : "monthly"
                  )
                }
                className={`w-16 h-8 rounded-full p-1 flex items-center transition-all duration-300 ${billingType === "monthly"
                    ? "bg-[#1d2a4f]"
                    : "bg-gradient-to-r from-purple-500 to-blue-500"
                  }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${billingType === "annual"
                      ? "translate-x-8"
                      : ""
                    }`}
                />
              </button>

              {/* Annual */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle("annual")}
                  className={`text-sm font-medium transition ${billingType === "annual"
                      ? "text-white"
                      : "text-gray-500"
                    }`}
                >
                  Annual
                </button>

                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-1 rounded-full">
                  SAVE 20%
                </span>
              </div>
            </div>
          </div>

          {/* ================= PRICING CARDS ================= */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 transition-all duration-500 ${animate
                ? "opacity-0 translate-y-12 scale-95"
                : "opacity-100 translate-y-0 scale-100"
              }`}
          >

            {/* Starter */}
            <PricingCard
              title="Starter"
              subtitle="Best for enthusiasts."
              price={pricing[billingType].starter}
              features={[
                "10k words/month",
                "Basic templates",
                "AI Writer",
                "Community support",
              ]}
              button="Get Started"
            />

            {/* Pro */}
            <div className="relative">

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-lg">
                MOST POPULAR
              </div>

              <PricingCard
                title="Pro"
                subtitle="The professional choice for creators."
                price={pricing[billingType].pro}
                active
                onClick={() => {

                  plan()
                  getPlan();
                }}
                features={[
                  "Unlimited words",
                  "Custom templates",
                  "Advanced AI Studio",
                  "Priority support",
                ]}
                button="Go Premium"
              />
            </div>

            {/* Enterprise */}
            <PricingCard
              title="Enterprise"
              subtitle="Collaborative power for large teams."
              price="Custom"
              features={[
                "Multi-user workspace",
                "API Access",
                "Dedicated account mgr",
                "SLA Guarantee",
              ]}
              button="Contact Sales"
            />
          </div>

          {/* ================= FEATURES ================= */}
          <div className="mt-24">

            <h2 className="text-3xl lg:text-5xl font-bold text-white text-center">
              Feature Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

              <FeatureCard
                title="Smart AI Generation"
                text="High-quality narrative creation optimized for consistency and faster content delivery."
              />

              <FeatureCard
                icon={
                  <Shield className="w-6 h-6 text-cyan-400" />
                }
                title="Bank-Grade Security"
                text="AES-256 encryption for all data storage and enterprise-grade protection."
              />

              <FeatureCard
                icon={
                  <Headphones className="w-6 h-6 text-cyan-400" />
                }
                title="24/7 Priority Support"
                text="Average response time under 15 minutes with dedicated assistance."
              />
            </div>

            {/* API */}
            <div className="mt-10 bg-[#101d3d] rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-4">

              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                  Integrated API Access
                </h3>

                <p className="text-gray-400 mt-3 max-w-3xl text-sm lg:text-base">
                  Connect JasFlow directly to your CMS or
                  internal tools. Custom endpoints available
                  for enterprise users.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= PRICING CARD ================= */
function PricingCard({
  title,
  subtitle,
  price,
  features,
  button,
  active,
  onClick,
}) {
  return (
    <div
      className={`rounded-3xl p-8 text-left transition-all duration-500 ${active
          ? "bg-[#121f45] shadow-[0_0_40px_rgba(168,85,247,0.25)] scale-[1.03]"
          : "bg-[#101a38]"
        }`}
    >
      <h3 className="text-3xl font-bold text-white">
        {title}
      </h3>

      <p className="text-gray-400 mt-2">
        {subtitle}
      </p>

      {/* Price */}
      <div className="mt-8 flex items-end gap-2">
        <span className="text-6xl font-bold text-white transition-all duration-500">
          {price}
        </span>

        {price !== "Custom" && (
          <span className="text-gray-400 mb-2">
            / month
          </span>
        )}
      </div>

      {/* Features */}
      <div className="mt-8 space-y-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-gray-300"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />

            {item}
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className={`mt-10 w-full py-4 rounded-xl font-semibold transition-all duration-300 ${active
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-[1.02]"
            : "bg-[#16254a] text-gray-300 hover:bg-[#1a2d5a]"
          }`}
      >
        {button}
      </button>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, text, icon }) {
  return (
    <div className="bg-[#101a38] rounded-3xl p-7">

      <div className="mb-4">
        {icon || (
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Sparkles className="text-cyan-400 w-5 h-5" />
          </div>
        )}
      </div>

      <h3 className="text-white text-xl font-semibold">
        {title}
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
