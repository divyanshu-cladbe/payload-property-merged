"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceDot,
} from "recharts";

interface PriceTrendsProps {
  city?: string;
  currentPrice:number;
  area:string;
}

// Custom Tooltip component to match the white bubble design
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="relative mb-6">
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-4 flex flex-col gap-1 min-w-[180px]">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            @ 5 k per Sq.ft.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-gray-900 text-xl font-bold">
              {data.price.toLocaleString("en-IN")}
            </p>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-lg border border-green-100">
              +3.4%
            </span>
          </div>
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45 shadow-sm"></div>
      </div>
    );
  }
  return null;
};

export const PriceTrends: React.FC<PriceTrendsProps> = ({
  city = "Bareilly",
  currentPrice,
  area,
}) => {
  const priceTrendData = [
    { month: "Jan", price: 80000 },
    { month: "Feb", price: 150000 },
    { month: "Mar", price: 110000 },
    { month: "Apr", price: 220342.76, isHot: true },
    { month: "May", price: 210000 },
    { month: "Jun", price: 280000 },
  ];

  const supplyTrendData = [
    { month: "Jan", supply: 400, total: 1000 },
    { month: "Feb", supply: 200, total: 1000 },
    { month: "Mar", supply: 500, total: 1000 },
    { month: "Apr", supply: 300, total: 1000 },
    { month: "May", supply: 300, total: 1000 },
    { month: "Jun", supply: 900, total: 1000 },
    { month: "Jul", supply: 600, total: 1000 },
  ];

  return (
    <section className="grid md:grid-cols-2 gap-8">
      {/* 1. PRICE TRENDS CARD */}
      <Card className="border border-gray-200 rounded-[30px] px-6 pb-6 bg-white overflow-hidden">
        <CardHeader className="pt-8 px-8">
          <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">Price Trends</CardTitle>
          <CardDescription className="text-gray-400 font-medium">Shows prices of the recent trends.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full p-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceTrendData} margin={{ top: 60, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BB2727" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#BB2727" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                tickFormatter={(val) => `$${val / 1000}00`}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#BB2727', strokeWidth: 1, strokeDasharray: '4 4' }}
                position={{ y: -20 }} // Locks tooltip to the top
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#BB2727"
                strokeWidth={4}
                fill="url(#colorPrice)"
                animationDuration={2000}
              />
              {/* Highlight Dot for Apr */}
              <ReferenceDot 
                x="Apr" 
                y={220342.76} 
                r={6} 
                fill="#BB2727" 
                stroke="#fff" 
                strokeWidth={3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 2. SUPPLY TRENDS CARD */}
      <Card className="border border-gray-200 rounded-[30px] px-6 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden">
        <CardHeader className="pt-8 px-8">
          <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">Supply Trends</CardTitle>
          <CardDescription className="text-gray-400 font-medium">Shows prices of the recent trends.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplyTrendData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              
              {/* Background Bar (Light Shade) */}
              <Bar dataKey="total" fill="#F3F1FF" radius={[10, 10, 10, 10]} barSize={24} />
              
              {/* Main Data Bar */}
              <Bar dataKey="supply" radius={[10, 10, 10, 10]} barSize={24}>
                {supplyTrendData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 5 ? "#BB2727" : "#D46B6B"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* <div className="flex justify-between items-center px-4 mt-2">
             <p className="text-xs text-gray-400 font-medium">Current margin: April Spendings</p>
             <p className="text-xs font-bold text-red-800">$350.00 / $640.00</p>
          </div> */}
        </CardContent>
      </Card>
    </section>
  );
};