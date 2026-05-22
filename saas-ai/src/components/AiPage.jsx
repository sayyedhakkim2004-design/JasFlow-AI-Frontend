import React, { useState, useEffect } from "react";
import {
  Clock3,
  Wand2,
  LoaderCircle,
  Menu,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "./sidebar";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIEditorPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (generateLoading) return;
    setGenerateLoading(true);
    const userPrompt = {
      type: "user",
      content: prompt,
    };
    setMessages((prev) => [...prev, userPrompt]);
    const currentPrompt = prompt;
    setPrompt("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/generate/article",
        { prompt: currentPrompt },
        {
          withCredentials: true,
        }
      );

      const aiResponse = {
        type: "ai",
        content: res.data,
      };
      setMessages((prev) => [...prev, aiResponse]);
      await getPlan();
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to Generate"
      );
    } finally {
      setGenerateLoading(false);
    }
  };
  const getPlan = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/view/logged",
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
      <div className="lg:ml-[250px] flex-1 h-screen overflow-hidden flex flex-col w-full">
        {/* ================= TOP NAVBAR ================= */}
        <div className="h-[80px] sticky top-0 z-40 bg-[#020b24]/90 backdrop-blur-md flex items-center justify-between px-6 lg:px-10 border-b border-[#101d3d]">
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400 ml-auto">
            <a href="/" className="hover:text-white transition">
              Editor
            </a>
            <a href="/" className="hover:text-white transition">
              Templates
            </a>
            <a href="/" className="hover:text-white transition">
              Analytics
            </a>
            {/* Profile */}
            <h2 className="text-white font-semibold text-lg flex items-center gap-1">
              Hello{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {data?.userName || "Customer"}
              </span>
            </h2>
          </div>
          {/* Mobile Profile Display */}
          <div className="lg:hidden ml-auto">
            <h2 className="text-white font-semibold text-base">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {data?.userName || "Me"}
              </span>
            </h2>
          </div>
        </div>
        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 lg:px-10 pt-8 pb-[240px]">
            {/* Heading */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  The Future of AI Architecture
                </h1>
                <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                  <Clock3 size={14} />
                  <span>Last edited 2 mins ago</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-3">
              </div>
            </div>
            {/* ================= CHAT AREA ================= */}
            <div className="mt-8 space-y-8">
              {messages.map((msg, index) => (
                <div key={index}>
                  {/* USER PROMPT */}
                  {msg.type === "user" && (
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-3xl max-w-[800px] shadow-xl">
                        <p className="text-[16px] leading-8 whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* AI RESPONSE */}
                  {msg.type === "ai" && (
                    <div className="bg-[#101a38] rounded-3xl p-10 border border-[#1d2a4f] text-white">
                      <div
                        className="
                          prose
                          prose-invert
                          max-w-none
                          prose-p:text-[18px]
                          prose-p:leading-[2]
                          prose-p:text-gray-200
                          prose-p:mb-7
                          prose-headings:text-white
                          prose-headings:font-bold
                          prose-headings:mt-10
                          prose-headings:mb-6
                          prose-h1:text-5xl
                          prose-h2:text-4xl
                          prose-h3:text-3xl
                          prose-strong:text-white
                          prose-strong:font-semibold
                          prose-li:text-[18px]
                          prose-li:leading-[2]
                          prose-li:mb-3
                          prose-li:text-gray-200
                          prose-ul:space-y-3
                          prose-ol:space-y-3
                          prose-code:text-cyan-300
                          prose-code:bg-[#0b1120]
                          prose-code:px-1
                          prose-code:py-1
                          prose-code:rounded-md
                          prose-pre:bg-[#0b1120]
                          prose-pre:border
                          prose-pre:border-[#1d2a4f]
                          prose-pre:rounded-2xl
                          prose-blockquote:text-gray-300
                        "
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="mb-6 leading-9 tracking-[0.01em] text-gray-200">
                                {children}
                              </p>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-5xl font-black mb-8 mt-10 text-white">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-4xl font-bold mb-7 mt-10 text-white">
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-3xl font-semibold mb-6 mt-8 text-white">
                                {children}
                              </h3>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc ml-8 space-y-4 text-gray-200">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-8 space-y-4 text-gray-200">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="leading-9">
                                {children}
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="text-white font-bold">
                                {children}
                              </strong>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-4 border-cyan-500 pl-6 italic text-gray-300 my-6">
                                {children}
                              </blockquote>
                            ),
                            code({ inline, children }) {
                              if (inline) {
                                return (
                                  <code className="bg-[#08152f] px-2 py-1 rounded text-cyan-300">
                                    {children}
                                  </code>
                                );
                              }
                              return (
                                <pre className="overflow-x-auto rounded-2xl bg-[#08152f] p-6 border border-[#1d2a4f] my-6">
                                  <code className="text-gray-200 whitespace-pre">
                                    {children}
                                  </code>
                                </pre>
                              );
                            },
                            table: ({ children }) => (
                              <div className="overflow-x-auto my-8">
                                <table className="w-full border border-[#1d2a4f]">
                                  {children}
                                </table>
                              </div>
                            ),
                            th: ({ children }) => (
                              <th className="border border-[#1d2a4f] p-4 text-left bg-[#08152f]">
                                {children}
                              </th>
                            ),
                            td: ({ children }) => (
                              <td className="border border-[#1d2a4f] p-4">
                                {children}
                              </td>
                            ),
                          }}
                        >
                          {String(msg.content || "")}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* ================= LOADING MESSAGE ================= */}
              {generateLoading && (
                <div className="bg-[#101a38] rounded-3xl p-8 border border-[#1d2a4f] text-white flex items-center gap-4 animate-pulse">
                  <LoaderCircle className="animate-spin text-cyan-400" size={28} />
                  <div>
                    <p className="text-lg font-semibold">
                      AI is generating response...
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Please wait a moment
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ================= FIXED PROMPT AREA ================= */}
        <div className="fixed bottom-0 left-0 lg:left-[250px] right-0 bg-[#08152f]/95 backdrop-blur-xl border-t border-[#1d2a4f] px-4 lg:px-8 py-5 z-40">
          <div className="max-w-[1400px] mx-auto">
            {/* Prompt Box */}
            <div className="bg-[#0b1734] rounded-2xl border border-[#1d2a4f] p-3 lg:p-5 flex flex-col lg:flex-row items-stretch lg:items-end gap-4 shadow-2xl">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !generateLoading
                  ) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder="Tell the AI what to write next... (eg. Add a section about the ethics of AI)"
                disabled={generateLoading}
                className="flex-1 bg-transparent outline-none resize-none text-white placeholder:text-gray-500 text-base lg:text-lg min-h-[60px] lg:min-h-[70px] max-h-[140px] disabled:opacity-50"
              />
              {/* Generate Button */}
              <button
                disabled={generateLoading}
                className="h-[50px] lg:h-[54px] px-7 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.03] transition whitespace-nowrap disabled:opacity-60 disabled:hover:scale-100"
                onClick={handleGenerate}
              >
                {generateLoading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Wand2 size={18} />
                )}
                {generateLoading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}