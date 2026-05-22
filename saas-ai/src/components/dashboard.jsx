import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles,
  Menu,
} from "lucide-react";
import Navbar from "./sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

export default function DashboardHistory() {
  const [history, setHistory] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/view/logged`,
        {
          withCredentials: true,
        }
      );
      setHistory(
        Array.isArray(res.data?.aiHistory)
          ? res.data.aiHistory
          : []
      );
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to Load Data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
    getPlan();
  }, []);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };
  const getPlan = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/view/logged`,
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


  return (
    <div className="h-screen w-full bg-[#020b24] flex overflow-hidden relative">
      {/* ================= SIDEBAR ================= */}
      <Navbar data={data} isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:ml-[250px] flex-1 h-screen overflow-y-auto">
        <div className="px-5 lg:px-10 py-10">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <button
                className="lg:hidden text-white p-2 bg-[#08152f] rounded-xl border border-white/10"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
              <h1 className="text-3xl lg:text-5xl font-black text-white">
                Prompt
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {" "}History
                </span>
              </h1>
            </div>
            <p className="text-gray-400 mt-3">
              Click a prompt to view generated response
            </p>
          </div>
          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {/* Empty */}
          {!loading && history.length === 0 && (
            <div className="bg-[#101a38] rounded-3xl p-10 lg:p-16 text-center">
              <Sparkles
                className="mx-auto text-cyan-400"
                size={50}
              />
              <h2 className="text-white text-xl lg:text-2xl mt-5">
                No prompts yet
              </h2>
              <p className="text-gray-400 mt-2">
                Your generated prompts will appear here
              </p>
            </div>
          )}
          {/* List */}
          <div className="space-y-5">
            {history.map((item, index) => {
              const opened = openId === item._id;
              return (
                <div
                  key={item._id || index}
                  className="rounded-3xl overflow-hidden bg-[#101a38] border border-white/10"
                >
                  {/* Prompt */}
                  <button
                    onClick={() => toggle(item._id)}
                    className="w-full px-5 lg:px-8 py-5 lg:py-7 flex items-center justify-between hover:bg-[#13214a] transition"
                  >
                    <div className="flex items-start gap-5 text-left">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                        <MessageSquare
                          size={18}
                          className="text-white"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Prompt #{index + 1}
                        </h3>
                        <p className="text-gray-400 mt-2 line-clamp-2">
                          {item.prompt}
                        </p>
                      </div>
                    </div>
                    {opened ? (
                      <ChevronUp className="text-white" />
                    ) : (
                      <ChevronDown className="text-white" />
                    )}
                  </button>
                  {/* Response */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${opened
                        ? "max-h-[700px]"
                        : "max-h-0"
                      }`}
                  >
                    <div className="border-t border-white/10 p-5 lg:p-8">
                      <h4 className="text-cyan-400 font-semibold mb-5">
                        AI Response
                      </h4>
                      <div
                        className="
        rounded-2xl
        bg-[#08152f]
        p-5 lg:p-8
        max-h-[400px] lg:max-h-[520px]
        overflow-y-auto
      "
                      >
                        <div className="text-gray-300">
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
                                    <code className="bg-[#0b1734] px-2 py-1 rounded text-cyan-300">
                                      {children}
                                    </code>
                                  );
                                }
                                return (
                                  <pre className="overflow-x-auto rounded-2xl bg-[#0b1734] p-6 border border-[#1d2a4f] my-6">
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
                                <th className="border border-[#1d2a4f] p-4 text-left bg-[#0b1734]">
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
                            {String(item.response || "")}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
