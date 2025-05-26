import Card from '../components/Card';
import { useState, useEffect } from "react";
import Warning from '../assets/warninglogo.png';
import Timecard from './Timecard';
import axios from 'axios';






function Secondsection() {
  const [highRiskAreas, setHighRiskAreas] = useState([]);

  const getPredictionsAllData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-all-data');
      if (response) {
        const data = response.data;
        

        // Filter areas where true_proba > 0.5 and keep both area and prob
        const highRisk = data
          .filter((item) => item.true_proba > 0.5)
          .map((item) => ({
            area: item.location_area,
            prob: (item.true_proba * 100).toFixed(1) // convert to %
          }));

        // Remove duplicates by area (keep the highest prob)
        const uniqueRiskMap = new Map();
        highRisk.forEach(({ area, prob }) => {
          if (!uniqueRiskMap.has(area) || prob > uniqueRiskMap.get(area)) {
            uniqueRiskMap.set(area, prob);
          }
        });

        // Convert back to array
        const uniqueHighRisk = Array.from(uniqueRiskMap.entries()).map(
          ([area, prob]) => ({ area, prob })
        );

        setHighRiskAreas(uniqueHighRisk);
      }
    } catch (e) {
      console.log('Something went wrong', e);
    }
  };

  useEffect(() => {
    getPredictionsAllData();
  }, []);

  const cardData = [
    {
      title: 'High Risk Areas',
      description: (
        <div className="flex flex-col gap-2 ">
          {highRiskAreas.length > 0 ? (
            highRiskAreas.map((item, index) => (
              <div
                key={index}
                className="bg-red-400 text-white px-3 py-1 rounded-md text-sm font-medium w-fit"
              >
                {item.area} – {item.prob}%
              </div>
            ))
          ) : (
            <div className="text-gray-600">No high-risk areas detected.</div>
          )}
        </div>
      ),
      image: Warning,
    },
  
  ];

  return (
    <div>
      <div className="flex gap-4 p-2 justify-between mt-20 flex-wrap">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}

        <div>
          <Timecard />
        </div>

       



        </div>
      </div>
    
  );
}

export default Secondsection;
