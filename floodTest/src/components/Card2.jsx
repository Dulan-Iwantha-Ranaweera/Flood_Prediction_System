function Card2({title, description}) {

    return(
        <div>
             <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70  mt-10 ml-4 ">
      <div className="p-4 md:p-7">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-neutral-400">
        {description}
        </p>
        
      </div>
    </div>


        </div>
    )
}
    export default Card2;