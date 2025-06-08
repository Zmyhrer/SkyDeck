"use client";

// app/dashboard/page.tsx (or wherever you want to display the dashboard)
import React, { useState, useEffect } from "react";
import Card from "@/app/components/dashboard_card";

const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const weatherReport = {
    forecast: [
      { time: "now", weather: "Rain", percentage: "20%" },
      { time: "2pm", weather: "Sunny", percentage: null },
      { time: "3pm", weather: "Raining", percentage: "50%" },
      { time: "4pm", weather: "Cloudy", percentage: "10%" },
      { time: "5pm", weather: "Clear", percentage: null },
      { time: "6pm", weather: "Partly Cloudy", percentage: "30%" },
      { time: "7pm", weather: "Raining", percentage: "60%" },
    ],
    details: {
      low: "40",
      high: "70",
      sunUp: "7:00",
      sunDown: "21:00",
    },
  };

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch("/api/getUserRole");
        const data = await res.json();

        if (data.role) {
          setUserRole(data.role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Failed to fetch role", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole) {
    return <div className="text-center text-red-500">User role not found</div>;
  }

  return (
    <div className="bg-gray-100 h-[100vh] relative p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard - {userRole}</h1>

      <Card
        key={1}
        title={"Today's Overview"}
        size={"w-[500px]"}
        top={"200px"}
        left={"0px"}
      >
        <div className="flex">
          <div className="flex basis-1/2 border-r text-center p-2 space-x-2 border-gray-200">
            <div className="flex justify-center items-center text-7xl">↓</div>
            <div className="flex flex-col text-left">
              {weatherReport.forecast.map((weather, index) => (
                <div key={index}>
                  {weather.time} - {weather.percentage} {weather.weather}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center basis-1/2 text-center p-6 space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold flex space-x-12">
                <span>{weatherReport.details.low}°F</span>
                <span>{weatherReport.details.high}°F</span>
              </div>
              <div className="flex justify-between w-full text-gray-500 text-sm uppercase tracking-wide">
                <span className="text-blue-600">Low</span>
                <span className="text-red-600">High</span>
              </div>
            </div>

            <div className="w-2/3 border-t border-gray-300"></div>

            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-semibold flex space-x-12">
                <span className="">{weatherReport.details.sunUp}</span>
                <span className="">{weatherReport.details.sunDown}</span>
              </div>
              <div className="flex justify-between w-full text-gray-500 text-sm uppercase tracking-wide">
                <span className="text-yellow-500">Sunrise</span>
                <span className="text-orange-500">Sunset</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
