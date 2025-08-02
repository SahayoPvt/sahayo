import React from 'react'
import { Link } from 'react-router'
const GenderCollection = () => {
  return (
<section className='py-16'>
    <div className='container mx-auto flex flex-col md:flex-row gap-4 md:gap-0'>
        {/* women-collection */}
        <div className="relative flex-1">
            <img src="product-04.jpg" alt="Women's Collection" className='w-full'/>
            <div className='absolute bottom-8 left-8 bg-gray-300 bg-opacity-50 px-4 py-2 rounded-lg'>
                <h2 className='text-2xl font-semibold text-gray-900'>Women's Collection</h2>
                <Link to='/womens' className='text-gray underline'>Shop Now</Link>
            </div>
        </div>
        {/* men-collection */}
        <div className="relative flex-1 md:px-4 ">
            <img src="product-03.jpg" alt="Men's Collection" className='w-full  rounded-lg'/>
            <div className='absolute bottom-8 left-8 bg-gray-300 bg-opacity-50 px-4 py-2 rounded-lg'>
            <h2 className='text-2xl font-semibold text-gray-900'>Men's Collection</h2>
            <Link to='/mens' className='text-gray underline'>Shop Now</Link>
            </div>

        </div>
    </div>
</section>  
)
}

export default GenderCollection