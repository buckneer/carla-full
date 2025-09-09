"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Car, Download, TrendingUp } from "lucide-react"

// Mock data for activity
const mockActivity = [
  {
    id: 1,
    date: "2024-01-21",
    time: "14:30",
    vehicle: "ABC-123",
    location: "Downtown Plaza",
    duration: "2h 15m",
    cost: "$9.75",
    type: "entry",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-01-21",
    time: "12:15",
    vehicle: "XYZ-789",
    location: "Mall Parking",
    duration: "1h 45m",
    cost: "$7.50",
    type: "entry",
    status: "completed",
  },
  {
    id: 3,
    date: "2024-01-20",
    time: "18:45",
    vehicle: "ABC-123",
    location: "Downtown Plaza",
    duration: "4h 30m",
    cost: "$18.00",
    type: "entry",
    status: "completed",
  },
  {
    id: 4,
    date: "2024-01-20",
    time: "09:15",
    vehicle: "ABC-123",
    location: "Airport Parking",
    duration: "8h 20m",
    cost: "$35.00",
    type: "entry",
    status: "completed",
  },
  {
    id: 5,
    date: "2024-01-19",
    time: "16:45",
    vehicle: "XYZ-789",
    location: "Mall Parking",
    duration: "2h 10m",
    cost: "$8.75",
    type: "entry",
    status: "completed",
  },
  {
    id: 6,
    date: "2024-01-19",
    time: "10:15",
    vehicle: "ABC-123",
    location: "Downtown Plaza",
    duration: "3h 45m",
    cost: "$15.25",
    type: "entry",
    status: "completed",
  },
]

const mockStats = {
  totalSessions: 68,
  totalCost: 287.5,
  avgDuration: "2h 45m",
  favoriteLocation: "Downtown Plaza",
  thisMonth: {
    sessions: 12,
    cost: 52.75,
    duration: "28h 15m",
  },
}

export default function ActivityPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("7d")
  const [selectedVehicle, setSelectedVehicle] = useState("all")

  const filteredActivity = mockActivity.filter((activity) => {
    if (selectedVehicle !== "all" && activity.vehicle !== selectedVehicle) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity History</h1>
        <p className="text-gray-600 mt-2">Track your parking sessions and usage patterns</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Sessions</p>
              <p className="text-3xl font-bold mt-1">{mockStats.totalSessions}</p>
              <p className="text-blue-100 text-sm mt-2">All time</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Car className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Spent</p>
              <p className="text-3xl font-bold mt-1">${mockStats.totalCost}</p>
              <p className="text-green-100 text-sm mt-2">All time</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Avg Duration</p>
              <p className="text-3xl font-bold mt-1">{mockStats.avgDuration}</p>
              <p className="text-purple-100 text-sm mt-2">Per session</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Clock className="h-8 w-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold mt-1">{mockStats.thisMonth.sessions}</p>
              <p className="text-orange-100 text-sm mt-2">${mockStats.thisMonth.cost}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg">
              <Calendar className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Vehicles</option>
                  <option value="ABC-123">ABC-123</option>
                  <option value="XYZ-789">XYZ-789</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
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
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </button>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600 mt-1">{filteredActivity.length} parking sessions</p>
        </div>

        {filteredActivity.length === 0 ? (
          <div className="p-12 text-center">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-600">No parking sessions match your current filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{activity.vehicle}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {activity.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 mt-1">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {activity.location}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {activity.date}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{activity.cost}</div>
                    <div className="text-sm text-gray-600">{activity.duration}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Sessions</span>
              <span className="text-sm font-semibold text-gray-900">{mockStats.thisMonth.sessions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Cost</span>
              <span className="text-sm font-semibold text-gray-900">${mockStats.thisMonth.cost}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Duration</span>
              <span className="text-sm font-semibold text-gray-900">{mockStats.thisMonth.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Cost</span>
              <span className="text-sm font-semibold text-gray-900">
                ${(mockStats.thisMonth.cost / mockStats.thisMonth.sessions).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Locations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Downtown Plaza</span>
              <span className="text-sm font-semibold text-gray-900">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mall Parking</span>
              <span className="text-sm font-semibold text-gray-900">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Airport Parking</span>
              <span className="text-sm font-semibold text-gray-900">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Other</span>
              <span className="text-sm font-semibold text-gray-900">10%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Patterns</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Peak Day</span>
              <span className="text-sm font-semibold text-gray-900">Friday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Peak Time</span>
              <span className="text-sm font-semibold text-gray-900">2:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Session</span>
              <span className="text-sm font-semibold text-gray-900">2h 45m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Used Vehicle</span>
              <span className="text-sm font-semibold text-gray-900">ABC-123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
