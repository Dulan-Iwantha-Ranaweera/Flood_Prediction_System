import Card2 from "./Card2";
function About() {

return(

    <div className="  p-10 bg-gradient-to-b from-gray-900 to-black ">
<div>
    <h1 className=" text-gray-100 text-2xl font-bold">
    About Our Flood Prediction System
    </h1>
    <p className="text-gray-100 p-4 ">
    Our Flood Prediction System uses advanced technology to provide real-time flood forecasts and early warning alerts. By analyzing meteorological data, satellite imagery, and historical records, we help communities stay safe and prepare for potential flooding events.
    </p>
</div>
<div className="flex ">
<div>
    <Card2 title={" Who We Are" } description={ "Welcome to Flood Sense, a cutting-edge flood prediction system designed to provide real-time, data-driven insights to safeguard lives and property. Our mission is to harness advanced machine learning models, meteorological data, and geographical analysis to predict potential floods and minimize their devastating impact, especially in flood-prone areas of Matara."}/>
</div>

<div>
    <Card2 title={" Our Mission" } description={ "Floods remain one of the most destructive natural disasters, affecting thousands of lives and causing extensive economic damage. At Flood Sense, we strive to provide accurate flood predictions by analyzing rainfall, river levels, and climate patterns while delivering early warnings and alerts to help authorities and communities take timely action. Our goal is to enhance disaster preparedness through real-time monitoring and data-driven insights, ensuring that vulnerable areas receive the necessary information to mitigate risks and minimize losses."}/>
</div>

<div>
    <Card2 title={" About Us" } description={ "Floods are among the most devastating natural disasters, impacting lives and economies worldwide. As part of my undergraduate research at Plymouth University,UK. I am  Dulan Iwantha Ranaweera, developed Flood Sense under the guidance of Mrs.Hirushi Dilpriya to provide accurate flood predictions using real-time data, machine learning, and environmental factors like rainfall and river levels. This system delivers early warnings to help authorities and communities take proactive measures, reducing risks and improving disaster preparedness. With expertise in full-stack development and AI, I aim to create technology-driven solutions that enhance resilience against natural disasters in Sri Lanka."}/>
</div>
</div>


    </div>


)

}
export default About;