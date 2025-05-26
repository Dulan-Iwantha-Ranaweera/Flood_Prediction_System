import Warning from '../assets/warninglogo.png'
function Card ({title, description,image}){
    return (
        <>
        
        <article className="rounded-xl border-2 border-gray-100 bg-white shadow-xl ml-20 mb-24  w-1/3">
  <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
    <a href="#" className="block shrink-0">
      <img
        alt=""
        src={image}
        className="size-14 rounded-lg object-cover"
      />
    </a>

    <div>
      <h3 className="font-medium sm:text-lg">
       {title}
      </h3>

      <p className="line-clamp-2 text-sm text-gray-700">
        {description}
      </p>

      <div className="mt-2 sm:flex sm:items-center sm:gap-2">
       

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

      
      </div>
    </div>
  </div>

  <div className="flex justify-end">
    
  </div>
</article>
        
        </>
    )
}


export default Card;