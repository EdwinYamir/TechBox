import React from 'react';
import {
    Search,
    LayoutDashboard,
    Box,
    ShoppingBag,
    Users,
    MessageSquare,
    Mail,
    Workflow,
    PieChart,
    Combine,
    HelpCircle,
    MessageCircle,
    Settings,
    ChevronRight,
    ChevronsLeft
} from 'lucide-react';

export default function SideNav() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col font-sans mb-10 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                        w.
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 leading-tight">Uxerflow Inc.</span>
                        <span className="text-xs text-gray-500 font-medium">Free Plan</span>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronsLeft size={18} />
                </button>
            </div>

            {/* Search */}
            <div className="px-4 mb-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-9 pr-8 py-2.5 bg-gray-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-gray-100 outline-none text-gray-600 placeholder-gray-400 transition-all font-medium"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-[10px] text-gray-400 font-bold shadow-sm">⌘</div>
                        <div className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-[10px] text-gray-400 font-bold shadow-sm">K</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide pb-4">
                {/* Main Menu */}
                <div>
                    <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-2">Main Menu</h3>
                    <nav className="space-y-0.5">
                        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
                        <NavItem icon={<Box size={18} />} label="Product" active />
                        <NavItem icon={<ShoppingBag size={18} />} label="Order" />
                        <NavItem icon={<Users size={18} />} label="Customer" />
                        <NavItem icon={<MessageSquare size={18} />} label="Message" badge="33" />
                    </nav>
                </div>

                {/* Tools */}
                <div>
                    <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-2">Tools</h3>
                    <nav className="space-y-0.5">
                        <NavItem icon={<Mail size={18} />} label="Email" />
                        <NavItem icon={<Workflow size={18} />} label="Automation" />
                        <NavItem icon={<PieChart size={18} />} label="Analytics" />
                        <NavItem icon={<Combine size={18} />} label="Integration" />
                    </nav>
                </div>

                {/* Workspace */}
                <div>
                    <div className="flex items-center gap-2 mb-2 px-2 cursor-pointer group">
                        <span className='text-gray-400 text-[10px]'>▲</span>
                        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 transition-colors">Workspace</h3>
                    </div>

                    <nav className="space-y-0.5">
                        <WorkspaceItem color="bg-indigo-500" label="Campaign" bgCount="5" />
                        <WorkspaceItem color="bg-pink-500" label="Product Plan" bgCount="4" />
                    </nav>
                </div>
            </div>

            {/* Footer Utilities */}
            <div className="px-4 py-2 space-y-0.5">
                <NavItem icon={<HelpCircle size={18} />} label="Help center" />
                <NavItem icon={<MessageCircle size={18} />} label="Feedback" />
                <NavItem icon={<Settings size={18} />} label="Settings" />
            </div>

            {/* Upgrade Card */}
            <div className="p-4 pt-2">
                <div className="border border-gray-100 rounded-2xl p-3.5 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Upgrade & unlock</span>
                            <span className="text-[11px] font-medium text-gray-500">all features</span>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                </div>
            </div>
        </aside>
    );
}

// Helper Components
function NavItem({ icon, label, active = false, badge }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string }) {
    return (
        <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-50'}`}>
            <div className="flex items-center gap-3">
                <span className={`${active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>{icon}</span>
                <span className={`text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-600'}`}>{label}</span>
            </div>
            {badge && (
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center group-hover:bg-gray-200 transition-colors">
                    {badge}
                </span>
            )}
        </div>
    );
}

function WorkspaceItem({ color, label, bgCount }: { color: string, label: string, bgCount?: string }) {
    return (
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group">
            <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-sm ${color} shadow-sm`}></div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
            </div>
            {bgCount && (
                <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md group-hover:bg-gray-100 transition-colors">
                    {bgCount}
                </span>
            )}
        </div>
    )
}
