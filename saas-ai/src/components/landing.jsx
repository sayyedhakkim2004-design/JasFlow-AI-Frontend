import React from "react";
import {
  Sparkles,
  FileText,
  PenSquare,
  Globe,
  Cloud,
  Star,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";


function WriteFlowLandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#050B1F] text-white min-h-screen font-sans overflow-hidden">
      {/* ================= NAVBAR ================= */}
      <header className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl bg-[#050B1F]/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>

            <h1 className="text-3xl font-bold">
              Jas<span className="text-cyan-400">Flow AI</span>
            </h1>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-12 text-base text-gray-300 font-medium">
            <a href="#" className="hover:text-white transition">
              Dashboard
            </a>

            <a href="#" className="hover:text-white transition">
              Templates
            </a>

            <a href="#" className="hover:text-white transition">
              Pricing
            </a>

            <a href="#" className="hover:text-white transition">
              Features
            </a>
          </nav>

          {/* Button */}
          <button className="bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3 rounded-2xl text-base font-semibold hover:scale-[1.03] transition" onClick={() => navigate('/user/login')}>
            Get Started
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-8 pt-6 pb-24 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div className="-mt-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 mt-5 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-3">
            <Sparkles size={16} />
            NEXT-GEN AI WRITING PLATFORM
          </div>

          {/* Heading */}
          <h1 className="text-2xl lg:text-7xl font-black leading-tight">
            Write at the
            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Speed of Thought
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 mt-5 text-xl leading-relaxed max-w-2xl">
            Harness the power of AI to generate SEO blogs,
            articles, marketing copy, and professional content
            in seconds with precision and creativity.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-12">

            <button className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 hover:scale-[1.03] transition" onClick={() => navigate('/user/login')}>
              Start Writing

              <ArrowRight size={20} />
            </button>

            <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition">
              Explore Templates
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 flex-wrap">

            <div>
              <h3 className="text-4xl font-bold text-cyan-400">
                50K+
              </h3>

              <p className="text-gray-500 mt-2">
                Writers Using JasFlow
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-violet-400">
                10M+
              </h3>

              <p className="text-gray-500 mt-2">
                AI Generated Articles
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-400">
                99%
              </h3>

              <p className="text-gray-500 mt-2">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center -mt-20">

          {/* Glow */}
          <div className="absolute w-[500px] h-[500px] bg-violet-500/20 blur-[140px] rounded-full"></div>

          {/* Main Card */}
          <div className="relative border border-white/10 bg-[#0B122B] rounded-[32px] p-6 shadow-[0_0_80px_rgba(0,0,0,0.5)]">

            <img
              src={hero}
              alt="AI"
              className="rounded-3xl object-cover w-full max-w-[580px] h-[430px]"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-[#101a38] border border-white/10 rounded-3xl p-6 w-[280px] backdrop-blur-xl">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <Zap className="text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    AI Generation
                  </h3>

                  <p className="text-gray-400 text-sm">
                    4x Faster Workflow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Engineered for Creative Flow
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Powerful AI tools designed to supercharge your workflow.
          </p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-7">

          {/* Big Card */}
          <div className="bg-[#0C1633] border border-white/10 rounded-[30px] p-10 lg:col-span-2 relative overflow-hidden min-h-[320px]">

            <div className="absolute inset-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-8">
                <FileText className="text-cyan-400" size={28} />
              </div>

              <h3 className="text-4xl font-bold mb-5">
                AI Article Generator
              </h3>

              <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
                Generate structured long-form articles with SEO-ready formatting,
                intelligent outlines, and natural language fluency.
              </p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-[#0C1633] border border-white/10 rounded-[30px] p-10">

            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-8">
              <Globe className="text-violet-400" size={28} />
            </div>

            <h3 className="text-3xl font-bold mb-5">
              SEO Optimizer
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Improve readability and Google ranking with built-in SEO analysis.
            </p>

            <div className="bg-white/5 rounded-full h-4 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-full w-[85%] rounded-full"></div>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mt-3">
              <span>SEO Score</span>
              <span>85/100</span>
            </div>
          </div>

          {/* Blog Writer */}
          <div className="bg-[#0C1633] border border-white/10 rounded-[30px] p-10">

            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8">
              <PenSquare className="text-blue-400" size={28} />
            </div>

            <h3 className="text-3xl font-bold mb-5">
              Smart Blog Writer
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed">
              Maintain your brand voice while scaling content production.
            </p>
          </div>

          {/* Integrations */}
          <div className="bg-[#0C1633] border border-white/10 rounded-[30px] p-10 lg:col-span-2">

            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-8">
              <Cloud className="text-violet-400" size={28} />
            </div>

            <h3 className="text-4xl font-bold mb-5">
              Seamless Integrations
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed">
              Export directly to WordPress, Webflow, Notion, or Ghost with one click.
            </p>

            <div className="flex gap-5 mt-10">

              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Globe size={24} />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Cloud size={24} />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <Shield size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Loved by Creators
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Thousands of teams and writers trust JasFlow AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {[
            {
              text: "JasFlow reduced our content production time massively.",
              name: "Sarah Jenkins",
            },
            {
              text: "The best AI writer I’ve used so far. Very natural output.",
              name: "Marcus Reed",
            },
            {
              text: "Templates and integrations save our team hours daily.",
              name: "Anna Lopez",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#0C1633] border border-white/10 rounded-[30px] p-8"
            >

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-cyan-400 text-cyan-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "{item.text}"
              </p>

              <h4 className="font-semibold text-lg">
                {item.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="max-w-6xl mx-auto px-8 py-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Starter */}
          <div className="bg-[#0C1633] border border-white/10 rounded-[32px] p-10">

            <h3 className="text-4xl font-bold mb-3">
              Starter
            </h3>

            <p className="text-gray-400 text-lg mb-8">
              Perfect for beginners.
            </p>

            <div className="mb-10">
              <span className="text-6xl font-bold">$0</span>

              <span className="text-gray-400 text-lg">
                {" "} /mo
              </span>
            </div>

            <ul className="space-y-5 text-lg text-gray-300">
              <li>• 2,000 Words / mo</li>
              <li>• 5 Templates</li>
              <li>• SEO Optimization</li>
            </ul>

            <button className="mt-22 w-full mt-10 border border-white/10 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition" onClick={() => navigate('/user/login')}>
              Get Started
            </button>
          </div>

          {/* Pro */}
          <div className="bg-[#0C1633] border border-violet-500/40 rounded-[32px] p-10 relative overflow-hidden">

            <div className="absolute top-6 right-[-40px] rotate-45 bg-violet-500 px-12 py-1 text-sm font-semibold">
              Popular
            </div>

            <h3 className="text-4xl font-bold mb-3">
              JasFlow Pro
            </h3>

            <p className="text-gray-400 text-lg mb-8">
              For creators and teams.
            </p>

            <div className="mb-10">
              <span className="text-6xl font-bold">$29</span>

              <span className="text-gray-400 text-lg">
                {" "} /mo
              </span>
            </div>

            <ul className="space-y-5 text-lg text-gray-300">
              <li>• Unlimited Words</li>
              <li>• Pro Templates</li>
              <li>• SEO Analytics</li>
              <li>• API Access</li>
            </ul>

            <button
              onClick={() => navigate('/user/login')}
              className="w-full mt-10 bg-gradient-to-r from-violet-500 to-blue-500 py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition"
            >
              Go Pro Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 mt-16">

        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h2 className="font-bold text-2xl">
              JasFlow AI
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              © 2026 JasFlow AI
            </p>
          </div>

          <div className="flex items-center gap-8 text-base text-gray-400">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">API</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WriteFlowLandingPage;