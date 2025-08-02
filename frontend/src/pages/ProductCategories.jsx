import React from 'react'

const ProductCategories = () => {
  return (
    <div className="py-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">Top Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 gap-4">

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-1.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Up To 40% OFF</h4>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-2.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Fresh Looks</h4>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-7.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Up To 30% OFF</h4>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-4.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Exclusive Fashion</h4>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-5.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Top Picks for Less</h4>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border shadow overflow-hidden cursor-pointer relative">
                    <div className="aspect-square rounded-full overflow-hidden mx-auto">
                        <img src="https://readymadeui.com/images/fashion-img-6.webp" alt="product1"
                            className="h-full w-full object-cover object-top rounded-lg" />
                    </div>
                    <div className="mt-3 text-center">
                        <h4 className="text-slate-900 text-sm font-semibold">Shop & Save 40%</h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCategories