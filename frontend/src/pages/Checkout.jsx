// import { saveShippingInfo } from '@/redux/cartSlice';
// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router';

// const Checkout = () => {


//      const {shippingInfo}=useSelector(state=>state.cart)
//     console.log("shipping--",shippingInfo);

//     const [address,setAddress]=useState(shippingInfo.address || "");
//     const [pinCode,setPincode]=useState(shippingInfo.pinCode || "");
//     const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo || "");
//     const [country,setCountry]=useState(shippingInfo.country || "");
//     const [state,setState]=useState(shippingInfo.state || "");
//     const [city,setCity]=useState(shippingInfo.city || "");
//       const dispatch = useDispatch();
//     const navigate=useNavigate()
//     const shippingInfoSubmit=async(e)=>{
//         e.preventDefault();
//         if(phoneNo.length!==10){
//             toast.error("invalid phone number" , { position: 'top-center', autoClose: 3000 })
//         }
//         dispatch(saveShippingInfo({address,pinCode, phoneNo,country,state,city}))
//         alert("done")
//         navigate("/confirm-order")
//     }
//   return (
//     <div class="bg-white sm:px-8 px-4 py-6 mt-24">
//           <div class="max-w-screen-lg max-md:max-w-xl mx-auto">
//               <div class="flex items-start mb-16">
//                   <div class="w-full">
//                       <div class="flex items-center w-full">
//                           <div class="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
//                               <span class="text-sm text-white font-semibold">1</span>
//                           </div>
//                           <div class="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
//                       </div>
//                       <div class="mt-2 mr-4">
//                           <h6 class="text-sm font-semibold text-slate-900">Cart</h6>
//                       </div>
//                   </div>
//                   <div class="w-full">
//                       <div class="flex items-center w-full">
//                           <div class="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
//                               <span class="text-sm text-white font-semibold">2</span>
//                           </div>
//                           <div class="w-full h-[3px] mx-4 rounded-lg bg-slate-300"></div>
//                       </div>
//                       <div class="mt-2 mr-4">
//                           <h6 class="text-sm font-semibold text-slate-900">Checkout</h6>
//                       </div>
//                   </div>
//                   <div>
//                       <div class="flex items-center">
//                           <div class="w-8 h-8 shrink-0 mx-[-1px] bg-slate-300 p-1.5 flex items-center justify-center rounded-full">
//                               <span class="text-sm text-white font-semibold">3</span>
//                           </div>
//                       </div>
//                       <div class="mt-2">
//                           <h6 class="text-sm font-semibold text-slate-400">Order</h6>
//                       </div>
//                   </div>
//               </div>

//               <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
//                   <div class="lg:col-span-2">
//                       <form onSubmit={shippingInfoSubmit}>
//                           <div>
//                               <h2 class="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
//                               <div class="grid lg:grid-cols-2 gap-y-6 gap-x-4">
//                                   {/* <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">First Name</label>
//                                       <input type="text" placeholder="Enter First Name"
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
                                 
//                                   <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">Email</label>
//                                       <input type="email" placeholder="Enter Email"
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div> */}
                               
//                                   <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
//                                       <input type="text" placeholder="Enter Address Line" value={address} onChange={(e)=>setAddress(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
                                   
//                                  <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">Country</label>
//                                       <input type="text" placeholder="country" value={country} onChange={(e)=>setCountry(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
//                                   <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">City</label>
//                                       <input type="text" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
//                                   <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">State</label>
//                                       <input type="text" placeholder="Enter State" value={state} onChange={(e)=>setState(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
//                                   <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
//                                       <input type="text" placeholder="Enter Zip Code" value={pinCode} onChange={(e)=>setPincode(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
//                                     <div>
//                                       <label class="text-sm text-slate-900 font-medium block mb-2" >Phone No.</label>
//                                       <input type="number" placeholder="Enter Phone No." value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}
//                                           class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   </div>
//                               </div>
//                           </div>

//                           <div class="mt-12">
//                               <h2 class="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
//                               <div class="grid gap-4 lg:grid-cols-2">
//                                   <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
//                                       <div>
//                                           <div class="flex items-center">
//                                               <input type="radio" name="method" class="w-5 h-5 cursor-pointer" id="card" checked />
//                                               <label for="card" class="ml-4 flex gap-2 cursor-pointer">
//                                                   <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
//                                                   <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
//                                                   <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
//                                               </label>
//                                           </div>
//                                       </div>
//                                       <p class="mt-4 text-sm text-slate-500 font-medium">Pay with your debit or credit card</p>
//                                   </div>
//                                   <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
//                                       <div>
//                                           <div class="flex items-center">
//                                               <input type="radio" name="method" class="w-5 h-5 cursor-pointer" id="paypal" />
//                                               <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
//                                                   <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
//                                               </label>
//                                           </div>
//                                       </div>
//                                       <p class="mt-4 text-sm text-slate-500 font-medium">Pay with your paypal account</p>
//                                   </div>
//                               </div>
//                           </div>

//                           {/* <div class="mt-12 max-w-md">
//                               <p class="text-slate-900 text-sm font-medium mb-2">Do you have a promo code?</p>
//                               <div class="flex gap-4">
//                                   <input type="email" placeholder="Promo code"
//                                       class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
//                                   <button type='submit' class="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer">
//                                       Apply
//                                   </button>
//                               </div>
//                           </div> */}

//                            <div class="space-y-4 mt-8">
//                           <button type="submit" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Complete Purchase</button>
//                       </div>
//                       </form>
//                   </div>

//                   <div class="relative">
//                       <h2 class="text-xl text-slate-900 font-semibold mb-6">Order Summary</h2>
//                       <ul class="text-slate-500 font-medium space-y-4">
//                           <li class="flex flex-wrap gap-4 text-sm">Subtotal <span class="ml-auto font-semibold text-slate-900">$72.00</span></li>
//                           <li class="flex flex-wrap gap-4 text-sm">Discount <span class="ml-auto font-semibold text-slate-900">$0.00</span></li>
//                           <li class="flex flex-wrap gap-4 text-sm">Shipping <span class="ml-auto font-semibold text-slate-900">$6.00</span></li>
//                           <li class="flex flex-wrap gap-4 text-sm">Tax <span class="ml-auto font-semibold text-slate-900">$5.00</span></li>
//                           <hr class="border-slate-300" />
//                           <li class="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span class="ml-auto">$83.00</span></li>
//                       </ul>
//                       <div class="space-y-4 mt-8">
//                           <button type="button" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Complete Purchase</button>
//                           <button type="button" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-100 hover:bg-gray-200 border border-gray-300 text-slate-900 cursor-pointer">Continue Shopping</button>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//   )
// }

// export default Checkout



import { saveShippingInfo } from '../redux/cartSlice';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

const Checkout = () => {
    const { shippingInfo } = useSelector(state => state.cart)
    console.log("shipping--", shippingInfo);

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [pinCode, setPincode] = useState(shippingInfo.pinCode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
    const [country, setCountry] = useState(shippingInfo.country || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    
    const [errors, setErrors] = useState({
        address: "",
        pinCode: "",
        phoneNo: "",
        country: "",
        state: "",
        city: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            address: "",
            pinCode: "",
            phoneNo: "",
            country: "",
            state: "",
            city: ""
        };

        // Address validation
        if (!address.trim()) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        // Pin Code validation
        if (!pinCode.trim()) {
            newErrors.pinCode = "Zip code is required";
            isValid = false;
        } else if (!/^\d{6}$/.test(pinCode.trim())) {
            newErrors.pinCode = "Invalid zip code (must be 6 digits)";
            isValid = false;
        }

        // Phone Number validation
        if (!phoneNo.trim()) {
            newErrors.phoneNo = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneNo.trim())) {
            newErrors.phoneNo = "Invalid phone number (must be 10 digits)";
            isValid = false;
        }

        // Country validation
        if (!country.trim()) {
            newErrors.country = "Country is required";
            isValid = false;
        }

        // State validation
        if (!state.trim()) {
            newErrors.state = "State is required";
            isValid = false;
        }

        // City validation
        if (!city.trim()) {
            newErrors.city = "City is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const shippingInfoSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        if (phoneNo.length !== 10) {
            toast.error("Invalid phone number", { position: 'top-center', autoClose: 3000 })
            return;
        }

        dispatch(saveShippingInfo({ address, pinCode, phoneNo, country, state, city }))
        navigate("/confirm-order")
    }

    return (
        <div class="bg-white sm:px-8 px-4 py-6 mt-24">
            <div class="max-w-screen-lg max-md:max-w-xl mx-auto">
                <div class="flex items-start mb-16">
                    <div class="w-full">
                        <div class="flex items-center w-full">
                            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                <span class="text-sm text-white font-semibold">1</span>
                            </div>
                            <div class="w-full h-[3px] mx-4 rounded-lg bg-blue-600"></div>
                        </div>
                        <div class="mt-2 mr-4">
                            <h6 class="text-sm font-semibold text-slate-900">Cart</h6>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center w-full">
                            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
                                <span class="text-sm text-white font-semibold">2</span>
                            </div>
                            <div class="w-full h-[3px] mx-4 rounded-lg bg-slate-300"></div>
                        </div>
                        <div class="mt-2 mr-4">
                            <h6 class="text-sm font-semibold text-slate-900">Checkout</h6>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center">
                            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-slate-300 p-1.5 flex items-center justify-center rounded-full">
                                <span class="text-sm text-white font-semibold">3</span>
                            </div>
                        </div>
                        <div class="mt-2">
                            <h6 class="text-sm font-semibold text-slate-400">Order</h6>
                        </div>
                    </div>
                </div>

                <div class="gap-y-12 gap-x-8 lg:gap-x-12 mx-auto">
                    <div class="lg:col-span-2">
                        <form onSubmit={shippingInfoSubmit}>
                            <div>
                                <h2 class="text-xl text-slate-900 font-semibold mb-6 text-center">Delivery Details</h2>
                                <div class="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Address Line" 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.address ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.address && <p class="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">Country</label>
                                        <input 
                                            type="text" 
                                            placeholder="country" 
                                            value={country} 
                                            onChange={(e) => setCountry(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.country ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.country && <p class="text-red-500 text-xs mt-1">{errors.country}</p>}
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">City</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter City" 
                                            value={city} 
                                            onChange={(e) => setCity(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.city ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.city && <p class="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">State</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter State" 
                                            value={state} 
                                            onChange={(e) => setState(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.state ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.state && <p class="text-red-500 text-xs mt-1">{errors.state}</p>}
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter Zip Code" 
                                            value={pinCode} 
                                            onChange={(e) => setPincode(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.pinCode ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.pinCode && <p class="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                                    </div>
                                    
                                    <div>
                                        <label class="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                                        <input 
                                            type="number" 
                                            placeholder="Enter Phone No." 
                                            value={phoneNo} 
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            class={`px-4 py-2.5 bg-white border ${errors.phoneNo ? 'border-red-500' : 'border-gray-400'} text-slate-900 w-full text-sm rounded-md focus:outline-blue-600`} 
                                        />
                                        {errors.phoneNo && <p class="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
                                    </div>
                                </div>
                            </div>

                           

                            <div class="space-y-4 mt-8">
                                <button type="submit" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Continue</button>
                            </div>
                        </form>
                    </div>

                    {/* <div class="relative">
                        <h2 class="text-xl text-slate-900 font-semibold mb-6">Order Summary</h2>
                        <ul class="text-slate-500 font-medium space-y-4">
                            <li class="flex flex-wrap gap-4 text-sm">Subtotal <span class="ml-auto font-semibold text-slate-900">$72.00</span></li>
                            <li class="flex flex-wrap gap-4 text-sm">Discount <span class="ml-auto font-semibold text-slate-900">$0.00</span></li>
                            <li class="flex flex-wrap gap-4 text-sm">Shipping <span class="ml-auto font-semibold text-slate-900">$6.00</span></li>
                            <li class="flex flex-wrap gap-4 text-sm">Tax <span class="ml-auto font-semibold text-slate-900">$5.00</span></li>
                            <hr class="border-slate-300" />
                            <li class="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span class="ml-auto">$83.00</span></li>
                        </ul>
                        <div class="space-y-4 mt-8">
                            <button type="button" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Complete Purchase</button>
                            <button type="button" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-100 hover:bg-gray-200 border border-gray-300 text-slate-900 cursor-pointer">Continue Shopping</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Checkout