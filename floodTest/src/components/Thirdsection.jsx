import Mainmap from '../components/Map'

function Thirdsection(){
    return(
        
        <div className='bg-gradient-to-t from-gray-900 p-16 '>
            
            <div >
            <h2 className="m-10 text-2xl text-gray-900 sm:text-4xl font-bold ">Interactive Flood Risk Map <br />
            <span className="text-gray-600 text-3xl">Visualize & Track Flood Threats in Real-Time</span> </h2>
            </div>
            <div className='m-20 flex justify-center'>
                <Mainmap/>
            </div>
        </div>
        
    )
}
export default Thirdsection;