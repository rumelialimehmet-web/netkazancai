import React, { useState } from 'react';
import {
  Home,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import Dashboard from './Dashboard';

interface DashboardPageProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userProfile, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Ana Sayfa' },
    { id: 'istisna', icon: TrendingUp, label: 'İstisna Takibi' },
    { id: 'dilekce', icon: FileText, label: 'Dilekçeler' },
    { id: 'global', icon: Globe, label: 'Global Kurulum', badge: 'YAKINDA' },
    { id: 'yardim', icon: HelpCircle, label: 'Yardım' },
    { id: 'ayarlar', icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SınırSaaS
            </h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          {!sidebarCollapsed ? (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userProfile.firstName} {userProfile.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{userProfile.email}</p>
            </div>
          ) : (
            <div className="mb-3 flex justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile.firstName[0]}
              </div>
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
            title={sidebarCollapsed ? 'Çıkış Yap' : ''}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {menuItems.find(m => m.id === activeTab)?.label || 'Ana Sayfa'}
            </h2>
            <p className="text-sm text-gray-500">Hoş geldiniz, {userProfile.firstName}!</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              title={theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Bildirimler</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Tümünü Temizle
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell size={48} className="mx-auto mb-2 opacity-20" />
                      <p>Bildirim yok</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            !notif.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-2 h-2 mt-2 rounded-full ${
                                notif.type === 'success'
                                  ? 'bg-green-500'
                                  : notif.type === 'warning'
                                  ? 'bg-yellow-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(notif.timestamp).toLocaleString('tr-TR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <Dashboard userProfile={userProfile} />}
          {activeTab === 'global' && (
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 border-2 border-dashed border-blue-300">
                <Globe size={64} className="mx-auto mb-4 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Yurt Dışı Şirket Kurulumu
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Yakında: UK, Estonya (e-Residency) ve US (Delaware) için adım adım kurulum rehberi,
                  belge oluşturma ve süreç takibi AI Ajanınızda olacak.
                </p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Beni Listeye Ekle
                </button>
              </div>
            </div>
          )}
          {['istisna', 'dilekce', 'yardim', 'ayarlar'].includes(activeTab) && (
            <div className="max-w-2xl mx-auto mt-12 text-center">
              <div className="bg-white rounded-xl p-12 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {menuItems.find(m => m.id === activeTab)?.label}
                </h2>
                <p className="text-gray-600">Bu sayfa yakında eklenecek...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
