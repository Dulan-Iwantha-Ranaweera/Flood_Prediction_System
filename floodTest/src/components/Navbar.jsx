import Logo from '../assets/Brown and Green Flood Presentation (1200 x 1200 px).png'
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  

    return (
        <div>
            <header className="bg-white dark:bg-gray-900">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-4">
        <img src={Logo} alt="" className='w-18 h-18 rounded-b-full bg-amber-50'/>
       
          <h1 class="text-xl text-white font-bold">Flood Sense</h1>
     
        
      </div>



      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
       

          <div  className="hidden sm:flex">
            <a  
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
              href="/admin"
            >
              Admin
            </a>
          </div>
           
        </div>

      

        

        <div className="block md:hidden">
           <button
                  onClick={() => navigate("/admin-login")}
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                >
                  Admin
                </button>
               
        </div>
      </div>
    </div>
  </div>
</header>

        </div>
    )
}

export default Navbar;

