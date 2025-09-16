'use client'

import { useState } from 'react'
import { Save, User, Bell, Shield, Globe, Database } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'Golden Dragon',
    email: 'info@goldendragon.com',
    phone: '+1234567890',
    address: '123 Oriental Street, Downtown District',
    description: 'Experience the finest Oriental cuisine in an elegant atmosphere.'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newContactAlerts: true,
    newApplicationAlerts: true,
    bookingAlerts: true,
    weeklyReports: false
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90'
  })

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System', icon: Database }
  ]

  const handleSave = async (settingsType: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${settingsType} settings saved successfully`)
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, settingsType: string) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    switch (settingsType) {
      case 'general':
        setGeneralSettings(prev => ({ ...prev, [name]: value }))
        break
      case 'notifications':
        setNotificationSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        break
      case 'security':
        setSecuritySettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        break
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Restaurant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={generalSettings.restaurantName}
              onChange={(e) => handleInputChange(e, 'general')}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={generalSettings.email}
              onChange={(e) => handleInputChange(e, 'general')}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={generalSettings.phone}
              onChange={(e) => handleInputChange(e, 'general')}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={generalSettings.address}
              onChange={(e) => handleInputChange(e, 'general')}
              className="input-field"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={generalSettings.description}
            onChange={(e) => handleInputChange(e, 'general')}
            rows={3}
            className="input-field"
          />
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Enable Email Notifications</label>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={(e) => handleInputChange(e, 'notifications')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">New Contact Alerts</label>
              <p className="text-sm text-gray-500">Get notified when new contact messages arrive</p>
            </div>
            <input
              type="checkbox"
              name="newContactAlerts"
              checked={notificationSettings.newContactAlerts}
              onChange={(e) => handleInputChange(e, 'notifications')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">New Application Alerts</label>
              <p className="text-sm text-gray-500">Get notified when new job applications are submitted</p>
            </div>
            <input
              type="checkbox"
              name="newApplicationAlerts"
              checked={notificationSettings.newApplicationAlerts}
              onChange={(e) => handleInputChange(e, 'notifications')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Booking Alerts</label>
              <p className="text-sm text-gray-500">Get notified when new reservations are made</p>
            </div>
            <input
              type="checkbox"
              name="bookingAlerts"
              checked={notificationSettings.bookingAlerts}
              onChange={(e) => handleInputChange(e, 'notifications')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Weekly Reports</label>
              <p className="text-sm text-gray-500">Receive weekly summary reports</p>
            </div>
            <input
              type="checkbox"
              name="weeklyReports"
              checked={notificationSettings.weeklyReports}
              onChange={(e) => handleInputChange(e, 'notifications')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Two-Factor Authentication</label>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) => handleInputChange(e, 'security')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              name="sessionTimeout"
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleInputChange(e, 'security')}
              className="input-field"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Expiry (days)
            </label>
            <select
              name="passwordExpiry"
              value={securitySettings.passwordExpiry}
              onChange={(e) => handleInputChange(e, 'security')}
              className="input-field"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Database Status</span>
            <span className="text-sm text-green-600">Connected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Last Backup</span>
            <span className="text-sm text-gray-600">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Storage Used</span>
            <span className="text-sm text-gray-600">2.3 GB / 10 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">System Version</span>
            <span className="text-sm text-gray-600">v1.0.0</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
        <div className="space-y-3">
          <button className="btn-secondary w-full">
            Clear Cache
          </button>
          <button className="btn-secondary w-full">
            Backup Database
          </button>
          <button className="btn-danger w-full">
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      case 'system':
        return renderSystemSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your restaurant settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="card">
            {renderActiveTab()}
            
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={() => handleSave(activeTab)}
                disabled={isLoading}
                className="btn-primary disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

