'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Bell, ChevronDown, Search, LayoutDashboard, Beaker, Users, TrendingUp, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const productPerformanceData = [
    { name: 'Jan', Serum: 4000, Moisturizer: 2400, Cleanser: 2400 },
    { name: 'Feb', Serum: 3000, Moisturizer: 1398, Cleanser: 2210 },
    { name: 'Mar', Serum: 2000, Moisturizer: 9800, Cleanser: 2290 },
    { name: 'Apr', Serum: 2780, Moisturizer: 3908, Cleanser: 2000 },
    { name: 'May', Serum: 1890, Moisturizer: 4800, Cleanser: 2181 },
    { name: 'Jun', Serum: 2390, Moisturizer: 3800, Cleanser: 2500 },
]

const consumerSentiment = [
    { product: 'Glow Serum', sentiment: 4.5 },
    { product: 'Hydra Boost Moisturizer', sentiment: 4.2 },
    { product: 'Clear Skin Cleanser', sentiment: 4.7 },
    { product: 'Radiance Face Mask', sentiment: 4.0 },
]

const marketTrends = [
    'Increased demand for natural ingredients',
    'Rising popularity of multi-step skincare routines',
    'Growing interest in anti-aging products',
    'Shift towards sustainable packaging',
]

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-white w-64 min-h-screen flex flex-col ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
                <div className="p-4">
                    <Image src="/placeholder.svg" alt="Glow Logo" width={120} height={40} />
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <Beaker className="mr-2 h-4 w-4" />
                        Products
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Consumers
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Market Trends
                    </Button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <Button variant="ghost" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <LayoutDashboard className="h-6 w-6" />
                        </Button>
                        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-lg w-full lg:max-w-xs">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="search"
                                        name="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <Button variant="ghost" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <span className="sr-only">View notifications</span>
                                <Bell className="h-6 w-6" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-3 flex items-center">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src="/placeholder.svg"
                                            alt="User avatar"
                                            width={32}
                                            height={32}
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Jane Doe</span>
                                        <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Account settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>

                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                    <Beaker className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Consumers</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,234</div>
                                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Avg. Sentiment Score</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">4.6</div>
                                    <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Market Share</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24%</div>
                                    <p className="text-xs text-muted-foreground">+2% from last month</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Product Performance Chart */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Product Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={productPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Serum" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="Moisturizer" stroke="#82ca9d" />
                                        <Line type="monotone" dataKey="Cleanser" stroke="#ffc658" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Consumer Sentiment and Market Trends */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Consumer Sentiment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {consumerSentiment.map((item, index) => (
                                            <li key={index} className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{item.product}</span>
                                                <span className="text-sm font-semibold">{item.sentiment.toFixed(1)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Market Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2">
                                        {marketTrends.map((trend, index) => (
                                            <li key={index} className="text-sm">{trend}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}