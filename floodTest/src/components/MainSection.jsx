import Heroimage from '../assets/pngwing.com.png'
import { Navigate, useNavigate } from "react-router-dom";
function Mainsection() {
  
const navigate = useNavigate()
    return(
        <div>
           <section className='pt-10'>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl  text-gray-900 sm:text-4xl font-bold">
          Predict, Prepare, and Protect with <br />
          <span className='text-gray-600 text-3xl '>Real-Time Flood Forecasting</span>
          
          </h2>
    
          <p className="mt-4 text-gray-700">
          "Stay Ahead of Floods with Early Warnings!" <br />
          Get real-time flood forecasts and early alerts to protect your community and minimize disaster risks. Our system analyzes critical data to provide accurate predictions, helping you stay prepared and safe.
          </p>
          <div className='flex ml-'>
         

<button  onClick={()=>{ navigate("/register") }} class="  border border-amber-100  mt-5 ml-5  relative w-36 h-12 bg-gradient-to-t from-[#00154c] via-[#12376e] to-[#23487f] text-white rounded-full border-none outline-none cursor-pointer shadow-lg overflow-hidden group">
    <span class="absolute w-full top-1/2 left-0 transform -translate-y-1/2 text-xs uppercase tracking-wider transition-all duration-500 group-hover:top-[-100%]">
       Register
    </span>
    <span class="font-bold     absolute w-full top-[150%] left-0 transform -translate-y-1/2 text-xs uppercase tracking-wider transition-all duration-500 group-hover:top-1/2">
        Now!
    </span>
</button>
<button className='boder border-red-600  bg-red-700 '>
  Delete
</button>
          </div>
         



        </div>
      </div>

      <div>
        <img
          src={Heroimage}
          className="rounded"
          alt=""
        />
      </div>
    </div>
  </div>
</section>

        </div>
    )
}

export default Mainsection;