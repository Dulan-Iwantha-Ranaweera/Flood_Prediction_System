import { useState, useEffect } from "react";
import AdminImage from "../../assets/dataentry.jpg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import axios from "axios";
import Footer from "../Footer";

function Admin() {
  const [formData, setFormData] = useState({
    rainfall: "",
    riverLevel: "",
    upperCatchmentLevel: "",
    soilSaturationPercent: "",
    location: "",
  });
  const [predictionData, setPredictionData] = useState([]);

  const [Location, setLocation] = useState("");
  const [Rainfall, setRainfall] = useState("");
  const [UpperCatchmentLevel, setUpperCatchmentLevel] = useState("");
  const [RiverLevel, setRiverLevel] = useState("");
  const [SoilSaturationPercent, setSoilSaturationPercent] = useState("");
  const [errors, setErrors] = useState({});

  // user data array useState
  const [userData, setUserData] = useState([]);
  const locationHeadcounts = userData.reduce((acc, user) => {
    const loc = user.location;
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    const FloodAlertSender = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/send-alerts");

        if (response) console.log("Messsage Send Successfully!");
      } catch (error) {
        console.log("Not send");
      }
    };

    FloodAlertSender();
  }, []);
  const [allPredictiondata, setAllPredictionData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entry = {
      timestamp: new Date().toLocaleString(),
      location: formData.location,
      rainfall: parseFloat(formData.rainfall),
      riverLevel: parseFloat(formData.riverLevel),
      upperCatchmentLevel: parseFloat(formData.upperCatchmentLevel),
      soilSaturationPercent: parseFloat(formData.soilSaturationPercent),
    };

    let formErrors = {};

    if (!Location) formErrors.Location = "Please select the location";
    if (!Rainfall) formErrors.Rainfall = "Please insert rainfall data";
    if (!UpperCatchmentLevel)
      formErrors.UpperCatchmentLevel =
        "please insert the upper catchment level";
    if (!RiverLevel) formErrors.RiverLevel = "Please insert river level data";
    if (!SoilSaturationPercent)
      formErrors.SoilSaturationPercent = "Please insert SoilSaturationPercent";

    setErrors(formErrors);

    // save the data and get predictions using enterd data

    if (Object.keys(formErrors).length <= 0) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/predict", {
          Rainfall_mm: Rainfall,
          UpperCatchmentLevel_m: UpperCatchmentLevel,
          RiverLevel_m: RiverLevel,
          SoilSaturationPercent: SoilSaturationPercent,
          location_area: Location,
          timestamp: new Date().toISOString(),
        });

        if (response) {
          console.log("Data Save Successfully");
          console.log(response.data.prediction);
          console.log(response.data.predictionProba);

          window.location.reload();
        }
      } catch (error) {
        console.log("Somthing went wrong", error);
      }
    }

    setFormData({
      rainfall: "",
      riverLevel: "",
      upperCatchmentLevel: "",
      soilSaturationPercent: "",
      location: "",
    });
  };

  const [showAll, setShowAll] = useState(false);
  const visibleEntries = showAll
    ? predictionData.slice(0, 30)
    : predictionData.slice(0, 10);
  const handleDelete = (index) => {
    const updated = [...predictionData];
    updated.splice(index, 1);
    setPredictionData(updated);
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get-user");

      if (response) {
        const newdata = response.data.data;

        console.log("New user data:", newdata);
        setUserData(newdata);
      }
    } catch (e) {
      console.log("Get User Loaded Unsucessfully", e);
    }
  };

  const getPredictionsAllData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get-all-data");

      if (response) {
        console.log("Hello Data: ", response.data);

        // need to set prediction data array this data
        setAllPredictionData(response.data);
      }
    } catch (e) {
      console.log("Somthing went wrong", e);
    }
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registeredClients")) || [];
    setClients(stored);
    getAllUsers();
    getPredictionsAllData();
  }, []);

  const [floodData, setFloodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClients = await axios.get(
          "http://localhost:5000/api/register"
        );
        setClients(resClients.data);

        const resFlood = await axios.get("http://localhost:5000/api/flood");
        setFloodData(resFlood.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const entry = { ...formData, timestamp: new Date().toLocaleString() };

  const formattedGraphData = allPredictiondata.map((item) => ({
    location: item.location_area,
    rainfall: item.Rainfall_mm,
    date: new Date(item.timestamp).toLocaleDateString("en-GB"), // DD/MM/YYYY
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Admin Navbar */}
      <nav className="bg-[#00154c] py-4 px-8 shadow-md flex justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Admin Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            window.location.href = "/";
          }}
          className="bg-blue-400 text-blue-950  px-4 py-2 rounded-md hover:bg-red-500"
        >
          Logout
        </button>
      </nav>

      {/* Form & Image Section */}
      <div className="flex flex-col md:flex-row p-6 gap-10 justify-between items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black rounded-xl shadow-xl p-6 w-full md:w-1/2"
        >
          <h2 className="text-xl font-semibold mb-4">
            Flood Prediction Data Entry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                name="location"
                onChange={(e) => {
                  setLocation(e.target.value);
                  console.log(Location);
                }}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="SelectLocation">Select Location</option>
                <option value="Akuressa">Akuressa</option>
                <option value="Matara">Matara</option>
                <option value="Thihagoda">Thihagoda</option>
                <option value="Pasgoda">Pasgoda</option>
                <option value="Kamburupitiya">Kamburupitiya</option>
                <option value="Kotapola">Kotapola</option>
                <option value="Malimbada">Malimbada</option>
                <option value="Athuraliya">Athuraliya</option>
                <option value="Pitabeddara">Pitabeddara</option>
                <option value="Devinuwara">Devinuwara</option>
              </select>
            </div>

            {/* Rainfall (mm) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rainfall (mm)
              </label>
              <input
                type="number"
                name="rainfall"
                step="any"
                onChange={(e) => {
                  setRainfall(e.target.value);
                  console.log(Rainfall);
                }}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Upper Catchment Level (m) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upper Catchment Level (m)
              </label>
              <input
                type="number"
                step="any"
                name="upperCatchmentLevel"
                onChange={(e) => {
                  setUpperCatchmentLevel(e.target.value);
                  console.log(UpperCatchmentLevel);
                }}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* River Level (m) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                River Level (m)
              </label>
              <input
                type="number"
                step="any"
                name="riverLevel"
                onChange={(e) => {
                  setRiverLevel(e.target.value);
                  console.log(RiverLevel);
                }}
                v
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Soil Saturation Percent (%) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Soil Saturation Percent (%)
              </label>
              <input
                type="number"
                step="any"
                name="soilSaturationPercent"
                onChange={(e) => {
                  setSoilSaturationPercent(e.target.value);
                  console.log(SoilSaturationPercent);
                }}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800"
          >
            Submit
          </button>
        </form>
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={AdminImage}
            alt="Admin Visual"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* ML Flood Area Prediction Table */}
      <div className="mt-14 px-6 pb-10">
        <h3 className="text-xl font-bold text-white mb-4">
          Predicted Flood Areas & Periods (Coming from ML)
        </h3>

        <div className="overflow-x-auto rounded-xl bg-white text-black shadow-lg max-h-130">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-bold">Area</th>
                <th className="px-4 py-2 text-left">Rainfall (mm)</th>
                <th className="px-4 py-2 text-left">
                  Upper Catchment Level (m)
                </th>
                <th className="px-4 py-2 text-left">River Level (m)</th>
                <th className="px-4 py-2 text-left">Soil Saturation Percent</th>
                <th className="px-4 py-2 text-left">Prediction Data</th>
                <th className="px-4 py-2 text-left">No Risk</th>
                <th className="px-4 py-2 text-left">Risk</th>
                <th className="px-4 py-2 text-left">Date Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allPredictiondata.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{row.location_area}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">
                    {row.Rainfall_mm}
                  </td>
                  <td className="px-4 py-2">{row.UpperCatchmentLevel_m}</td>
                  <td className="px-4 py-2">{row.RiverLevel_m}</td>
                  <td className="px-4 py-2">{row.SoilSaturationPercent}%</td>
                  <td
                    className={`px-4 py-2 font-semibold text-white ${
                      row.prediction_data ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {row.prediction_data ? "Risk Area" : "None-Risk Area"}
                  </td>
                  <td className="px-4 py-2">{row.false_proba * 100}%</td>
                  <td className="px-4 py-2">{row.true_proba * 100}%</td>
                  <td className="px-4 py-2">
                    {new Date(row.timestamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rainfalls graph */}

      <div className="m-8">
        <h3 className="text-lg font-bold text-white mb-4">
          Rainfall Levels by Location Over Time
        </h3>
        <div className="bg-white rounded-xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis
                label={{
                  value: "Rainfall (mm)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              {Array.from(
                new Set(formattedGraphData.map((d) => d.location))
              ).map((location, i) => {
                const colors = [
                  "#FF0000",
                  "#00BFFF",
                  "#228B22",
                  "#8A2BE2",
                  "#FF8C00",
                  "#FF1493",
                  "#2F4F4F",
                  "#800000",
                  "#1E90FF",
                  "#DAA520",
                ];
                return (
                  <Line
                    key={location}
                    type="monotone"
                    dataKey="rainfall"
                    data={formattedGraphData.filter(
                      (d) => d.location === location
                    )}
                    name={location}
                    stroke={colors[i % colors.length]}
                    dot={false}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Head Count */}

      <div className="flex items-center justify-center">
            <div className="mt-14 px-6 pb-10 w-100">
              <h3 className="text-xl font-bold text-white mb-4 ">
                Registered Locational Headcount
              </h3>

              <div className="overflow-x-auto rounded-xl bg-white text-black shadow-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold">Location</th>
                      <th className="px-4 py-2 text-left font-bold">Headcount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(locationHeadcounts).length > 0 ? (
                      Object.entries(locationHeadcounts).map(
                        ([location, count], index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{location}</td>
                            <td className="px-4 py-2 font-semibold">{count}</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center py-4 text-gray-500">
                          No user data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
