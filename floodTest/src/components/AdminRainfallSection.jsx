import React, { useEffect, useState } from "react";

// Utility: Get next 3 dates in YYYY-MM-DD format
function getFutureDates(days) {
  const result = [];
  const today = new Date();
  for (let i = 1; i <= days; i++) {
    const future = new Date(today);
    future.setDate(today.getDate() + i);
    result.push(future.toISOString().split("T")[0]);
  }
  return result;
}

function AdminRainfallSection() {
  const [forecastData, setForecastData] = useState([]);
  const futureDates = getFutureDates(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/rainfall");
        const data = await res.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error fetching rainfall data:", error);
      }
    };

    fetchData(); // Initial load

    const interval = setInterval(fetchData, 15 * 60 * 1000); // Auto-update every 15 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="mt-14 px-6 pb-20">
      <h3 className="text-xl font-bold text-white mb-4">
        Future Rainfall Forecast (Live Satellite Data)
      </h3>

      <div className="overflow-x-auto rounded-xl bg-white text-black shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold">Area</th>
              <th className="px-4 py-2 text-left font-bold">Rainfall – {futureDates[0]}</th>
              <th className="px-4 py-2 text-left font-bold">Rainfall – {futureDates[1]}</th>
              <th className="px-4 py-2 text-left font-bold">Rainfall – {futureDates[2]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {forecastData.length > 0 ? (
              forecastData.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{row.area}</td>
                  <td className="px-4 py-2">{row.day1} mm</td>
                  <td className="px-4 py-2">{row.day2} mm</td>
                  <td className="px-4 py-2">{row.day3} mm</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Loading forecast data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminRainfallSection;
