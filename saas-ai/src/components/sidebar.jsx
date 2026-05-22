import {
    Menu,
    LayoutDashboard,
    Sparkles,
    PenSquare,
    Settings,
    Shield,
    X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ data, isOpen, onToggle }) {
    const navigate = useNavigate();

    /* Sidebar Item */
    function SidebarItem({
        icon,
        title,
        path,
    }) {
        return (
            <button
                onClick={() => {
                    navigate(path);
                    if (onToggle) onToggle(false); // Close on mobile navigation
                }}
                className="w-full flex items-center gap-3 text-gray-300 hover:text-white hover:bg-[#101d3d] transition px-4 py-3 rounded-xl text-sm font-medium"
            >
                {icon}

                {title}
            </button>
        );
    }



    return (
        <>
            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
                    onClick={() => onToggle(false)}
                />
            )}

            <div className={`
                w-[250px] bg-[#08152f] flex flex-col fixed left-0 top-0 h-screen z-[60]
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>

                {/* Logo */}
                <div>
                    <div className="h-[80px] px-6 flex items-center gap-3">
                        <button
                            className="lg:hidden text-white"
                            onClick={() => onToggle(false)}
                        >
                            <X size={20} />
                        </button>
                        <Menu className="text-white w-5 h-5 hidden lg:block" />

                        <h1 className="text-3xl font-bold text-white">
                            Jas<span className="text-cyan-400">Flow AI</span>
                        </h1>
                    </div>

                    {/* Menu */}
                    <div className="px-4 mt-6 space-y-3">

                        <SidebarItem
                            icon={<LayoutDashboard size={18} />}
                            title="Dashboard"
                            path="/dashboard"
                        />

                        <SidebarItem
                            icon={<PenSquare size={18} />}
                            title="Editor"
                            path="/generate"
                        />

                        <SidebarItem
                            icon={<Sparkles size={18} />}
                            title="Pricing"
                            path="/pricing"
                        />


                    </div>
                </div>

                {/* Premium Card */}
                <div className="mt-auto p-4">
                    <div className="bg-[#101d3d] rounded-2xl p-4 flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Shield className="text-white w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-white text-sm font-semibold">
                                {data.plan}
                            </p>

                            {data.plan == "premium" ? (<p className="text-gray-400 text-xs">
                                Unlimited
                            </p>) : (<p className="text-gray-400 text-xs">
                                {data.planCount} out of 20 Tokens
                            </p>)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;