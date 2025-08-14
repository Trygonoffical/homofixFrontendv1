"use client"
import { Tab, Dialog, Transition } from '@headlessui/react'
import Payment from '@/components/Payment';
import { useEffect, useState, Fragment, useCallback  } from 'react';
import Loading from "./Loading";
import Feedback from './Feedback';

const BookingTab = ({bookings , userProfileInfo}) => {
    const [isClient, setIsClient] = useState(false)
    const [name , setName] = useState('')
    const [add , setAdd] = useState('')
    const [area , setArea] = useState('')
    const [errormsg, setErrorMsg] = useState('');
    const [errormsgadd, setErrorMsgAdd] = useState('');
    const [errormsgadrea, setErrorMsgArea] = useState('');
    const [city , setCity] = useState('')
    const [state , setState] = useState('')
    const [originalCity, setOriginalCity] = useState('');
    const [zip , setZip] = useState('')
    const [mno , setMno] = useState(userProfileInfo.mobile)
    const [gstNo, setGstNo] = useState(userProfileInfo.gst_no || '')
    const [gstError, setGstError] = useState('')
    let [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [fetchedBookings, setFetchedBookings] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);
    
    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);
    
    const handleNameChange = useCallback((event) => {
        setName(event.target.value);
    }, []);
    
    const handleAddChange = useCallback((event) => {
        if( event.target.value.length < 1000){
            setErrorMsgAdd('')
            setAdd(event.target.value);
        }else{
            setErrorMsgAdd('Please Enter Details within 100 characters')
            console.log('area - ', event.target.value.length)
        }
    }, []);
    
    const handleAreaChange = useCallback((event) => {
        if( event.target.value.length < 1000){
            setErrorMsgArea('')
            setArea(event.target.value);
        }else{
            setErrorMsgArea('Please Enter Details within 50 characters')
            console.log('area - ', event.target.value.length)
        }
    }, []);
    
    const handleCityChange = useCallback((event) => {
        setCity(event.target.value);
    }, []);
    
    const handleStateChange = useCallback((event) => {
        setState(event.target.value);
    }, []);
    
    const handleZipChange = useCallback((event) => {
        setZip(event.target.value);
    }, []);
    
    const handleMnoChange = useCallback(() => {
        // //console.log('zip - ', zip) 
    }, []);
    
    const handleGstChange = useCallback((event) => {
        const gstValue = event.target.value.toUpperCase();
        if (gstValue === '' || /^[0-9A-Z]{15}$/.test(gstValue)) {
            setGstError('');
            setGstNo(gstValue);
        } else {
            setGstError('Please enter a valid 15-digit GST number');
            setGstNo(gstValue);
        }
    }, []);
    
    const statesWithCities = {
        "Delhi": ["New Delhi", "Delhi"],
        "Uttar Pradesh": ["Noida", "Kanpur", "Ghaziabad"],
        "Haryana": ["Gurugram"],
        "Telangana": ["Hyderabad"]
    };

    const handleCitynewChange = (e) => {
        setSelectedCity(e.target.value);
        setCity(e.target.value);
        setOriginalCity(e.target.value);
    };

    const handleStatenewChange = (e) => {
        setSelectedState(e.target.value);
        setState(e.target.value);
        setSelectedCity(''); // Reset city when state changes
        setCity('');
        setOriginalCity('');
    };

    const handleUpdateProfile = () =>{
        let pData = {
            'first_name': name,
            'address': add,
            'area': area,
            'city': city,
            'state': state,
            'zipcode': zip,
            'gst_no': gstNo
        }
        
        const URL = 'https://support.homofixcompany.com/api/customer/profile/update/'
        const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;  
        const postProfile = async () => {
            try {
                const response = await fetch(URL, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(pData),
                });
            
                if (response.ok) {
                    const Profiledata = await response.json();
                    if(Profiledata.status == "success"){
                        openModal()
                    }else {
                        setErrorMsg("Something is Wrong. Please contact support")
                    }
                    
                } else {
                    console.error("Request failed with status:", response.status);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        postProfile()
    }

    useEffect(() => {
        setLoading(true);
        setIsClient(true);
        if (userProfileInfo) {
            setAdd(userProfileInfo.address || '');
            setArea(userProfileInfo.area || '');
            setCity(userProfileInfo.city || '');
            setState(userProfileInfo.state || '');
            setZip(userProfileInfo.zipcode || '');
            setName(userProfileInfo.first_name || '');
            setMno(userProfileInfo.mobile || '');
            setGstNo(userProfileInfo.gst_no || '');
        } 
        
        const fetchBookings = async () => {
            try {
                setTimeout(() => {
                    setFetchedBookings(bookings);
                    setLoading(false);
                }, 3000);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userProfileInfo]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    if (!isClient) {
        return null;
    }

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
    
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    }

    const getSlotTime = (slotNumber) => {
        const slotTimes = {
            1: '08:00 AM - 09:00 AM',
            2: '09:00 AM - 10:00 AM',
            3: '10:00 AM - 11:00 AM',
            4: '11:00 AM - 12:00 PM',
            5: '12:00 PM - 01:00 PM',
            6: '01:00 PM - 02:00 PM',
            7: '02:00 PM - 03:00 PM',
            8: '03:00 PM - 04:00 PM',
            9: '04:00 PM - 05:00 PM',
            10: '05:00 PM - 06:00 PM',
            11: '06:00 PM - 07:00 PM',
            12: '07:00 PM - 08:00 PM'
        };
        
        return slotTimes[slotNumber] || `Slot ${slotNumber}`;
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            "Completed": { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", label: "Completed" },
            "Cancelled": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", label: "Cancelled" },
            "cancelled": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", label: "Cancelled" },
            "New": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", label: "Booked" },
            "Assign": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", label: "Assigned" },
            "Proceed": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", label: "Assigned" }
        };
        
        const config = statusConfig[status] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", label: status };
        
        return (
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
                {config.label}
            </span>
        );
    }

    const cancelbooking = (bkID)=>{
        let pData = {
            "booking_id": bkID,
        }
        const URL = 'https://support.homofixcompany.com/api/Booking/Status/Update/';
        const postaction = async () => {
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(pData),
                });
            
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error("Request failed with status:", response.status);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        postaction();
    }

    const mergedBookings = [...bookings, ...fetchedBookings];
    
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Tab.Group>
                    <Tab.List className="flex space-x-1 w-fit mx-auto rounded-2xl bg-gray-100 p-1.5 shadow-sm">
                        <Tab 
                            className={({ selected }) =>
                                classNames(
                                    'rounded-xl py-3 px-8 text-sm font-semibold leading-5 transition-all duration-200',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'text-white shadow-md bg-basecolor'
                                        : 'text-gray-600 hover:bg-white/[0.8] hover:text-gray-900'
                                )
                            }
                        >
                            Bookings
                        </Tab>
                        <Tab 
                            className={({ selected }) =>
                                classNames(
                                    'rounded-xl py-3 px-8 text-sm font-semibold leading-5 transition-all duration-200',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'text-white shadow-md bg-basecolor'
                                        : 'text-gray-600 hover:bg-white/[0.8] hover:text-gray-900'
                                )
                            }
                        >
                            Profile
                        </Tab>
                    </Tab.List>
                
                    <Tab.Panels className='mt-8'>
                        {/* Bookings Panel */}
                        <Tab.Panel>
                            {loading ? (
                                <Loading />
                            ) : mergedBookings && mergedBookings.length > 0 ? (
                                <div className="space-y-6">
                                    {mergedBookings.map((booking, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                                            {/* Header with Status */}
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                        <h3 className="text-lg font-semibold text-gray-900">Booking ID #{booking.order_id}</h3>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        {getStatusBadge(booking.status)}
                                                        {booking.cash_on_service == false && booking.pay_amt > 0 && (
                                                            <Payment 
                                                                amount={booking.pay_amt} 
                                                                name={userProfileInfo.first_name} 
                                                                mobile={userProfileInfo.mobile} 
                                                                bookingID={booking.id} 
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking Details */}
                                            <div className="p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Left Column */}
                                                    <div className="space-y-4">
                                                        <div className="bg-blue-50 rounded-xl p-4">
                                                            <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                </svg>
                                                                Schedule Details
                                                            </h4>
                                                            <div className="space-y-2 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Date:</span>
                                                                    <span className="font-medium text-gray-900">{formatDateTime(booking.booking_date)}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Time:</span>
                                                                    <span className="font-medium text-gray-900">{getSlotTime(booking.slot)}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Payment Method:</span>
                                                                    <span className={`font-medium ${booking.online ? 'text-amber-600' : 'text-emerald-600'}`}>
                                                                        {booking.online ? (booking.pay_amt > 0 ? 'Unpaid' : 'Online Paid') : 'Cash On Service'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Address */}
                                                        <div className="bg-gray-50 rounded-xl p-4">
                                                            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                </svg>
                                                                Service Address
                                                            </h4>
                                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                                {booking.booking_customer}<br />
                                                                {booking.booking_address} {booking.area}<br />
                                                                {booking.city}, {booking.state} - {booking.zipcode}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Right Column */}
                                                    <div className="space-y-4">
                                                        {/* Order Details */}
                                                        <div className="bg-emerald-50 rounded-xl p-4">
                                                            <h4 className="text-sm font-semibold text-emerald-900 mb-3 flex items-center">
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                                </svg>
                                                                Order Summary
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {booking.booking_product.map((pros, idx) => (
                                                                    <div key={idx} className="border-l-4 border-emerald-200 pl-3">
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className="font-medium text-gray-900">{pros.product.name}</span>
                                                                            <span className="text-sm font-semibold text-emerald-600">₹{pros.selling_price}</span>
                                                                        </div>
                                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                                            Qty: {pros.quantity}
                                                                        </span>
                                                                        
                                                                        {pros.addon_set.map((addons, addonIdx) => (
                                                                            <div key={addonIdx} className="mt-2 ml-4 border-l-2 border-gray-200 pl-3">
                                                                                <div className="flex justify-between items-start">
                                                                                    <span className="text-sm text-gray-700">{addons.spare_part_name}</span>
                                                                                    <span className="text-sm font-medium text-gray-600">₹{addons.spare_part_price}</span>
                                                                                </div>
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                                    Qty: {addons.quantity}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Pricing */}
                                                        <div className="bg-purple-50 rounded-xl p-4">
                                                            <h4 className="text-sm font-semibold text-purple-900 mb-3 flex items-center">
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                                                </svg>
                                                                Pricing Details
                                                            </h4>
                                                            <div className="space-y-2 text-sm">
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Subtotal:</span>
                                                                    <span className="font-medium text-gray-900">₹{booking.total_amount}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Tax:</span>
                                                                    <span className="font-medium text-gray-900">₹{booking.tax_amount}</span>
                                                                </div>
                                                                <hr className="border-gray-200" />
                                                                <div className="flex justify-between">
                                                                    <span className="font-semibold text-purple-900">Total:</span>
                                                                    <span className="font-bold text-lg text-purple-900">₹{booking.final_amount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Support Information */}
                                                <div className="mt-6 pt-6 border-t border-gray-200">
                                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                                        <div className="flex items-center justify-center text-center">
                                                            <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                            </svg>
                                                            <span className="text-sm text-amber-800">
                                                                <span className="font-medium">For Support Call (between 8am - 8pm):</span>
                                                                <br />
                                                                <a href="tel:+918800855760" className="text-amber-900 font-semibold hover:text-amber-700 transition-colors duration-200">
                                                                    +91-88-00-855-760
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 flex flex-wrap gap-3">
                                                    {booking.status == "Completed" && (
                                                        <div className="flex items-center space-x-3">
                                                            <Feedback bookingID={booking.id} />
                                                            <a 
                                                                href={`https://support.homofixcompany.com/api/invoice/download/${booking.id}/`} 
                                                                target='_blank' 
                                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                            >
                                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                                Download Invoice
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new booking.</p>
                                </div>
                            )}
                        </Tab.Panel>

                        {/* Profile Panel */}
                        <Tab.Panel>
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                                                <p className="text-gray-600">View and update your personal information</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form */}
                                    <div className="p-6">
                                        <form className="space-y-6">
                                            {/* Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                    <p className="text-sm text-gray-500">Appears on receipts, invoices, and more</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                                                        value={name} 
                                                        onChange={handleNameChange}
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>

                                            {/* Mobile Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                                    <p className="text-sm text-gray-500">Your registered mobile number</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <input 
                                                        type="tel" 
                                                        disabled 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed" 
                                                        value={mno}
                                                    />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                                    <p className="text-sm text-gray-500">Your complete address</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <textarea 
                                                        rows={3}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none" 
                                                        value={add} 
                                                        onChange={handleAddChange}
                                                        placeholder="Enter your complete address"
                                                    />
                                                    {errormsgadd && <p className="mt-2 text-sm text-red-600">{errormsgadd}</p>}
                                                </div>
                                            </div>

                                            {/* Area */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                                                    <p className="text-sm text-gray-500">Your locality or area</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                                                        value={area} 
                                                        onChange={handleAreaChange}
                                                        placeholder="Enter your area"
                                                    />
                                                    {errormsgadrea && <p className="mt-2 text-sm text-red-600">{errormsgadrea}</p>}
                                                </div>
                                            </div>

                                            {/* State */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                                    <p className="text-sm text-gray-500">Select your state</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <select 
                                                        value={selectedState} 
                                                        onChange={handleStatenewChange} 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                                    >
                                                        {state ? <option value={state}>{state}</option> : <option value="">Select a state</option>}
                                                        {Object.keys(statesWithCities).map((state) => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* City */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                                    <p className="text-sm text-gray-500">Select your city</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <select 
                                                        value={selectedCity} 
                                                        onChange={handleCitynewChange} 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                                    >
                                                        {city ? <option value={city}>{city}</option> : <option value="">Select a city</option>}
                                                        {selectedState && statesWithCities[selectedState] && statesWithCities[selectedState].map((city, index) => (
                                                            <option key={index} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* GST Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (Optional)</label>
                                                    <p className="text-sm text-gray-500">Your business GST number for invoicing</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                                                        value={gstNo} 
                                                        onChange={handleGstChange}
                                                        placeholder="Enter 15-digit GST number"
                                                        maxLength={15}
                                                    />
                                                    {gstError && <p className="mt-2 text-sm text-red-600">{gstError}</p>}
                                                </div>
                                            </div>

                                            {/* Zipcode */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                                <div className="md:col-span-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Zipcode</label>
                                                    <p className="text-sm text-gray-500">Your postal code</p>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <input 
                                                        type="text" 
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                                                        value={zip} 
                                                        onChange={handleZipChange}
                                                        placeholder="Enter your zipcode"
                                                    />
                                                </div>
                                            </div>

                                            {/* Save Button */}
                                            <div className="pt-6 border-t border-gray-200">
                                                <button 
                                                    onClick={handleUpdateProfile} 
                                                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Success Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-2">
                                        Profile Updated Successfully
                                    </Dialog.Title>
                                    <p className="text-gray-600 mb-6">
                                        Your profile information has been saved successfully.
                                    </p>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default BookingTab