"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Users, Calendar, Download } from "lucide-react"

// Mock data for charts
const mockDailyEntries = [
  { date: "Jan 15", entries: 45, exits: 42 },
  { date: "Jan 16", entries: 52, exits: 48 },
  { date: "Jan 17", entries: 38, exits: 41 },
  { date: "Jan 18", entries: 61, exits: 58 },
  { date: "Jan 19", entries: 55, exits: 52 },
  { date: "Jan 20", entries: 67, exits: 63 },
  { date: "Jan 21", entries: 72, exits: 69 },
]

const mockHourlyData = [
  { hour: "6 AM", entries: 5 },
  { hour: "7 AM", entries: 12 },
  { hour: "8 AM", entries: 28 },
  { hour: "9 AM", entries: 35 },
  { hour: "10 AM", entries: 22 },
  { hour: "11 AM", entries: 18 },
  { hour: "12 PM", entries: 25 },
  { hour: "1 PM", entries: 30 },
  { hour: "2 PM", entries: 42 },
  { hour: "3 PM", entries: 38 },
  { hour: "4 PM", entries: 33 },
  { hour: "5 PM", entries: 45 },
  { hour: "6 PM", entries: 35 },
  { hour: "7 PM", entries: 20 },
  { hour: "8 PM", entries: 12 },
  { hour: "9 PM", entries: 8 },
]

const mockTopUsers = [
  { name: "John Smith", entries: 68, avatar: "JS" },
  { name: "Sarah Johnson", entries: 45, avatar: "SJ" },
  { name: "Mike Davis", entries: 123, avatar: "MD" },
  { name: "Emily Chen", entries: 89, avatar: "EC" },
  { name: "Alex Wilson", entries: 76, avatar: "AW" },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("entries")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Detailed insights into your parking facility performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Entries</p>
              <p className="text-3xl font-bold mt-1">2,847</p>
              <p className="text-blue-100 text-sm mt-2">+12% vs last period</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <BarChart3 className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Avg. Duration</p>
              <p className="text-3xl font-bold mt-1">2.4h</p>
              <p className="text-green-100 text-sm mt-2">-8% vs last period</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Calendar className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Peak Occupancy</p>
              <p className="text-3xl font-bold mt-1">87%</p>
              <p className="text-purple-100 text-sm mt-2">+5% vs last period</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Revenue</p>
              <p className="text-3xl font-bold mt-1">$12.4K</p>
              <p className="text-orange-100 text-sm mt-2">+18% vs last period</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Entries Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Daily Traffic</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMetric("entries")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedMetric === "entries" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Entries
                  </button>
                  <button
                    onClick={() => setSelectedMetric("exits")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedMetric === "exits" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Exits
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80 flex items-end space-x-2">
                {mockDailyEntries.map((day, index) => {
                  const value = selectedMetric === "entries" ? day.entries : day.exits
                  const maxValue = Math.max(...mockDailyEntries.map((d) => Math.max(d.entries, d.exits)))
                  const height = (value / maxValue) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          selectedMetric === "entries" ? "bg-blue-500" : "bg-green-500"
                        }`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="mt-2 text-xs text-gray-600 text-center">{day.date}</div>
                      <div className="text-xs font-semibold text-gray-900">{value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Top Users */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Top Users</h2>
              <p className="text-sm text-gray-600 mt-1">Most frequent visitors</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockTopUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">{user.avatar}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">{user.entries}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(user.entries / 123) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Peak Hours</h2>
              <p className="text-sm text-gray-600 mt-1">Traffic by hour</p>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {mockHourlyData
                  .sort((a, b) => b.entries - a.entries)
                  .slice(0, 8)
                  .map((hour, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{hour.hour}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-purple-500 rounded-full"
                            style={{ width: `${(hour.entries / 45) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-6">{hour.entries}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">System Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recognition Accuracy</span>
              <span className="text-sm font-semibold text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Response Time</span>
              <span className="text-sm font-semibold text-blue-600">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">System Uptime</span>
              <span className="text-sm font-semibold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Failed Recognitions</span>
              <span className="text-sm font-semibold text-red-600">0.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Users (7d)</span>
              <span className="text-sm font-semibold text-green-600">+23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-sm font-semibold text-blue-600">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Retention Rate</span>
              <span className="text-sm font-semibold text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Vehicles/User</span>
              <span className="text-sm font-semibold text-blue-600">1.7</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Metrics</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Average</span>
              <span className="text-sm font-semibold text-green-600">$412</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Total</span>
              <span className="text-sm font-semibold text-blue-600">$12,400</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-sm font-semibold text-green-600">+18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. per Entry</span>
              <span className="text-sm font-semibold text-blue-600">$4.35</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
