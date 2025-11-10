import React, { useState } from 'react';
import { Bell, LogOut, Moon, Sun, Settings, Menu, X } from 'lucide-react';
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-gray-600"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SınırSaaS
              </h1>
            </div>

            {/* Right Side Icons */}
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
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
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

              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition hidden sm:block">
                <Settings size={20} />
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{userProfile.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                  title="Çıkış Yap"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                  <Settings size={18} />
                  Ayarlar
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Dashboard userProfile={userProfile} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            © 2025 SınırSaaS. Tüm hakları saklıdır. |{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Gizlilik Politikası
            </a>{' '}
            |{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Kullanım Şartları
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
