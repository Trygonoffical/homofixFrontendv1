'use client'
import { Dialog } from '@headlessui/react';
// import crypto from 'crypto';
import { useState, useEffect, useCallback } from 'react';
import CongBooking from './CongBooking';
// import Razorpay  from 'react-razorpay';
// import Razorpay from 'react-razorpay';
import dayjs from 'dayjs';
import crypto from "crypto"
import { XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

// import Easebuzz from "./Easebuzz";

const Booking = ({ cnames, title , cartItems , customer , couponID , PaymentAmount , subcategoryID}) => {
  const [minDateTime, setMinDateTime] = useState('');
  const [bookingShow, setBookingShow] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [name , setName] = useState('')
  const [add , setAdd] = useState('')
  const [area , setArea] = useState('')
  const [city , setCity] = useState('')
  const [state , setState] = useState('')
  const [zip , setZip] = useState('')
  const [gstNo, setGstNo] = useState('')
  const [gstError, setGstError] = useState('')
  const [slotBookingShow, setSlotBookingShow] = useState(false);
  const [slotBookingData, setSlotBookingData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [paymentMethodShow, setPaymentMethodShow] = useState(false);
  const [slotLoading, setSlotLoading] = useState(false);
  const [bookingProcessing, setBookingProcessing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // Initialize with current month/year to prevent past month selection
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [isManualDateClick, setIsManualDateClick] = useState(false);
  const [paymentMethod , setPaymentMethod] = useState('Online')
  const [userProfileInfo , setUserProfileInfo] = useState({})
  const [bookingID , setBookingID] = useState(null)
  const [isBookingCompleted, setBookingCompleted] = useState(false);
  const [congBookingShow, setCongBookingShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [easebuzzkey , easebuzzsalt] = ['WJE5UAJ51D', 'Y3LVJ15S3M'];
  const [errormsg, setErrorMsg] = useState('');
  const [errormsgadd, setErrorMsgAdd] = useState('');
  const [errormsgadrea, setErrorMsgArea] = useState('');
  const [errormsgName, setErrorMsgName] = useState('');
  const [originalCity, setOriginalCity] = useState('');
  const [dfVal, setDfval] = useState('');
  const nineAM = dayjs().set('hour', 9).startOf('hour');
  const eightPM = dayjs().set('hour', 20).startOf('hour');
  const shouldDisableTime= ()=>{(value, view) =>
    view === 'hours' && value.hour() > 9 && value.hour() < 20
  }
  const currentworkingcities = ['Central Delhi', 'Delhi', 'New Delhi', 'North West Delhi', 'North Delhi', 'North East Delhi', 'East Delhi', 'West Delhi', 'South West Delhi', 'South Delhi', 'Old Delhi', 'Mehrauli', 'Faridabad', 'Ghaziabad', 'Shahdara', 'Gurgaon', 'Gurugram', 'Noida', 'Noida Extension', 'Greater Noida', 'Kanpur', 'Kanpur Nagar', 'Hyderabad'];
  const validcity = ['Delhi', 'New Delhi', 'Faridabad', 'Ghaziabad',  'Gurugram', 'Noida', 'Noida Extension', 'Greater Noida', 'Kanpur', 'Hyderabad'];
  const statesWithCities = {
    "Delhi": ["New Delhi", "Delhi"],
    "Uttar Pradesh": ["Noida", "Kanpur", "Ghaziabad"],
    "Haryana": ["Gurugram" , "Faridabad"],
    "Telangana"  : ["Hyderabad"]
};

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const handleStatenewChange = (e) => {
        setSelectedState(e.target.value);
        setState(e.target.value);
        setSelectedCity(''); // Reset city when state changes
        setCity('');
        setOriginalCity('');
        setGstNo('');
        setGstError('');
    };

    const handleCitynewChange = (e) => {
        setSelectedCity(e.target.value);
        setCity(e.target.value);
        setOriginalCity(e.target.value);
    };
  const [cityerrormsg , setCityErrorMsg] = useState('')
  let defaultValue = '';
  const router = useRouter();
  // const [easebuzzkey , easebuzzsalt] = ['WJE5UAJ51D', 'Y3LVJ15S3M'];
//   const [paymentID , setPaymentID] = useState(null)
  // Rest of the code...

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentHour = currentDate.getHours();

  //   let nextBookingDate = new Date();
  //   let nextBookingTime = '';

  //   if (currentHour >= 20) { // If current time is 8 PM or later
  //     nextBookingDate.setDate(currentDate.getDate() + 1); // Move to the next day
  //     nextBookingTime = '09:00'; // Set the default time to 9 AM
  //     defaultValue =  dayjs().set('hour', 9).set('minute', 50).startOf('minute');
  //     // console.log('inside condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   } else {
  //     nextBookingTime = `${currentHour + 1}:00`; // Set the default time to the next hour
  //     defaultValue = dayjs().set('hour', `${currentHour+1}`).set('minute', 50).startOf('minute');
  //     // console.log('else condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   }
  //   // const defaultValue = dayjs().set('hour', `${currentHour+1}`).set('minute', 50).startOf('minute');
  //   // console.log('currentHour',currentHour);
  //   // const defaultValue = nextBookingTime ;
  //   // dayjs().set('hour', currentHour).set('minute', 50).startOf('minute');
  //   const year = nextBookingDate.getFullYear();
  //   const month = String(nextBookingDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(nextBookingDate.getDate()).padStart(2, '0');
  //   const newdateupdate = `${year}-${month}-${day}`;
  //   setBookingDate(`${year}-${month}-${day}`);    
  //   setBookingTime(nextBookingTime);
  //   // console.log(nextBookingTime)
  //   const bookingDateTimeString = `${newdateupdate}T${nextBookingTime}:00+05:30`; 
  //   setBookingDateTime(bookingDateTimeString);
    
  // }, []);
  // useEffect(()=>{
  //   const currentDate = new Date();

  //   let year = currentDate.getFullYear();
  //   let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  //   let day = ('0' + currentDate.getDate()).slice(-2);

  //   let formattedDate = `${year}-${month}-${day}`;
  //   console.log('currentdata = ', currentDate)
  //   console.log('bookingdata = ', bookingDate)
  //   if(formattedDate != bookingDate){
  //     defaultValue =  dayjs().set('hour', 9).set('minute', 50).startOf('minute');
  //     // console.log('inside condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   }
  // }, [bookingDate]);
  // useEffect(() => {
  //   if(originalCity != ''){
  //     const foundCity = currentworkingcities.find(
  //       (workingCity) => workingCity.toLowerCase() === originalCity.toLowerCase()
  //     );
  //       // console.log('foundCity', foundCity);
  //     if (!foundCity) {
  //       setCityErrorMsg(
  //         'Sorry, currently our services are not available in your city. We appreciate your interest, and we will be expanding to your city soon! Please check back later.'
  //       );
  //     } else {
  //       setCityErrorMsg('');
  //       setOriginalCity(foundCity);
  //       setCity(foundCity);
  //     }
  //   }
  // }, [city, currentworkingcities]);

  useEffect(() => {

    const currentDateTime = new Date();
    currentDateTime.setUTCHours(currentDateTime.getUTCHours() + 1); // Add 1 hour in UTC

    // Format the date in the "yyyy-MM-ddThh:mm" format in UTC
    const formattedMinDateTime = currentDateTime.toISOString().slice(0, 16);
    
    // Set the minimum date and time for the input
    setMinDateTime(formattedMinDateTime);
  }, []);

  // No auto-loading of slots - user must select a date manually
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBookingDate(selectedDate);
    CheckSlotAvailability(selectedDate);
    // setBookingTime
    // if(bookingTime != ''){
    //   const bookingDateTimeString = `${selectedDate}T${bookingTime}:00+05:30`; 
    //   setBookingDateTime(bookingDateTimeString);
    // }
  };
  const handleTimeChange = (e) => {
    const timeset = e.target.value ;
    setBookingTime(e.target.value);
    if(bookingDate != ''){
      const bookingDateTimeString = `${bookingDate}T${timeset}:00+05:30`; 
      setBookingDateTime(bookingDateTimeString);
    }
    
  };

  // const handleDateTimeChange = (e) => {
  //   console.log('datetime value = ',e.target.value);
  //   setBookingDateTime(e.target.value);
  // };

//   const [bookingDate, setBookingDate] = useState('');
//   const [bookingTime, setBookingTime] = useState('');

//   // Rest of the code...
const handlePaymentChange = (val) => {
    setPaymentMethod(val);
    const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
    setBookingDateTime(bookingDateTimeString);
    console.log('Payment Method - ', paymentMethod)
    console.log('Booking Time - ', bookingDateTimeString)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    // ////console.log('name - ', name)
  };
  const handleAddChange = (event) => {
   
    // ////console.log('add - ', add)
    if( event.target.value.length < 1000){
      setErrorMsgAdd('')
      setAdd(event.target.value);
    }else{
      setErrorMsgAdd('Please Enter Details within 100 characters')
      console.log('area - ', event.target.value.length)
    }
  };
  const handleAreaChange = (event) => {
    
    // console.log('area - ', area)
    
    if( event.target.value.length < 1000){
      setErrorMsgArea('')
      setArea(event.target.value);
    }else{
      setErrorMsgArea('Please Enter Details within 50 characters')
      console.log('area - ', event.target.value.length)
    }
  };
  const handleCityChange = (event) => {
    // const trimmedCity = event.target.value.trim();
    const inputValue = event.target.value;
    
    const trimmedCity = inputValue.trim();
    setCity(inputValue);
    setOriginalCity(trimmedCity);
    
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
    // //console.log('state - ', state) 
  };
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
  const handleZipChange = (event) => {
    setZip(event.target.value);
    // //console.log('zip - ', zip) 
  };
useEffect(() => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const fetchUserProfile = async () => {
        // const URL = 'https://support.homofixcompany.com/api/Customer/'
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/Customer/`
      try {
        // Make the API call to fetch the user profile data
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
         //console.log('userData', userData[0])
        //  //console.log('cartItems', cartItems[0].productName)
        //console.log('amount', PaymentAmount)
          setUserProfileInfo(userData[0]);
        } else {
          // Handle error case when the response is not ok
          //console.log('token val in error', token)

          console.error('Error fetching user profile data');
        //   router.push('/'); // Redirect to homepage if there is an error
        }
      } catch (error) {
        // Handle error case when an exception occurs during the API call
        console.error('Error fetching user profile data:', error);
        // router.push('/'); // Redirect to homepage if there is an error
      }
    } 
    if (!token) {
        // Redirect to the homepage if there is no token
        // fetchUserProfile();
        router.push('/');
      }
       else {
        fetchUserProfile();
      }
}, [URL]);



const handleProfileDataUpdate = () =>{
    const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; // Replace with your actual authentication token
    // const Burl = `https://support.homofixcompany.com/api/customer/profile/update/`;
    const Burl = `${process.env.NEXT_PUBLIC_API_URL}/customer/profile/update/`;

    let profiledata = {
        'address': add,
        'area' : area, 
        'city' : originalCity,
        'first_name' : name,
        'state': state,
        'zipcode': zip,
        'gst_no': gstNo,
    }
    // console.log('profiledata', profiledata)
    const postProfile = async () =>{
        try {
            const response = await fetch(Burl, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify(profiledata),
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            } else {
              console.error("Request failed with status:", response.status);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
    }
    postProfile()
}
const handleOnlinePayment = async() => {
    const apiKey = 'rzp_test_C8XkYZBi6Tpn1G';
    const apiSecret = 'izRT1cAew7L1lfmQfbelyJZs';
    let localbookindID = '';
    const authToken = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const valord = {
    amount: PaymentAmount * 100,
    currency: 'INR',
    receipt: 'rep_001',
    };

    const data = await fetch("/api/v1/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${authToken}`,
    },
    body: JSON.stringify(valord),
    }).then((t) => t.json());
          // //console.log('data', data);
        const razorpayOptions = {
            key: apiKey, // Replace with your Razorpay key ID
            amount: PaymentAmount * 100, // Replace with the actual amount to be charged
            currency: 'INR', // Replace with the appropriate currency code
            name: 'Homofix Company', // Replace with your company name
            description: 'Home Service', // Replace with the payment description
            order_id: data.id, // Replace with your unique order ID
            handler: (response) => {
              // Payment successful, perform necessary actions
              // //console.log('Payment successful:', response)
              handleBookingDetailsinner({ COS: 'False', OL: 'True' , PaymentID: response.razorpay_payment_id})
              handleProfileDataUpdate()
              // setBookingCompleted(true);
              // Congratsmesg();
              // setCongBookingShow(true)
            },
            prefill: {
              name: name, // Replace with the customer's name
              contact: userProfileInfo.mobile, // Replace with the customer's phone number
            },
            theme: {
              color: '#F37254', // Replace with your desired color theme
            },
          };

        if (typeof window !== 'undefined' && window.Razorpay) {
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            razorpayInstance.open();
            } else {
            console.error('Razorpay script is not loaded.');
            }
        // handlePaymentRep()
    }
const handleBookingDetailsinner = ({COS='False' , OL='True' , PaymentID}) =>{
  const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; 
  // //console.log('cartItems' , cartItems)
  // console.log('cbookingDateTimeos ' , bookingDateTime)
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  let payload = {
      "booking_date": bookingDate,
      "slot":selectedSlot.slot,
      "customer": customer,
      "coupon": couponID,
      "cash_on_service": COS,
      "online": OL,
      "booking_product": cartItems,
      "booking_address": add,
      "area": area,
      "city": originalCity,
      "state": state,
      "booking_customer": name,
      "mobile":  userProfileInfo.mobile,
      "zipcode": zip,
      "gst_no": gstNo,
  }
  console.log('payload', payload)
  // const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  // const url = "https://support.homofixcompany.com/api/create_booking/";
  const url =`${process.env.NEXT_PUBLIC_API_URL}/create_booking/`;
  // const url =`http://3.110.153.69/api/create_booking/`;

  const postData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
     
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        let localbookindID = data.data.id ;
        handlePaymentRep(PaymentID, localbookindID)
        //console.log('loc in booking', localbookindID)
        
      //   //console.log( 'bookingID-handleBookingDetailsinner', data.data.id);
      //   setBookingID(data.data.id)
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  postData();
}
const handlePaymentRep = (paymentID ,localbookindID )=>{
  const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;  
  // url = 'https://support.homofixcompany.com/api/customer/payments/'
  // //console.log('PayID' , paymentID)
  // //console.log('bookingID' , localbookindID)
  // //console.log('PaymentAmount' , PaymentAmount)
  let rept = {
      "payment_id": paymentID,
      "payment_mode": 'Online',
      "amount": PaymentAmount,
      "booking_id": localbookindID,
  }
  const postResp = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer/payments/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(rept),
        });
    
        if (response.ok) {
          const data = await response.json();
          // //console.log(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    postResp()
}
const Congratsmesg = () => {
    // console.log('incongfun')
    // congratstextmsg();
    // //console.log(isBookingCompleted)
    if (isBookingCompleted) {
        // //console.log(isBookingCompleted)
        // congratstextmsg();
        return <CongBooking />;
      }
      return null;
}
const handleOfflinePayment = () => {
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  if (cityerrormsg) {
    // Display an alert or handle the error in your UI
    alert(cityerrormsg);
    return;
  }
  if(selectedSlot == null) {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Slot');
    return;
  }
  if(bookingDate == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date');
    return;
  }
  // if(bookingTime == '') {
  //   // Display an alert or handle the error in your UI
  //   setErrorMsg('Please Select Time');
  //   return;
  // }
  if(state == ''){
    setErrorMsg('Please Select State');
  }
  if(originalCity == ''){
    setErrorMsg('Please Select City');
  }
  
  if(add == '' || area == '' || originalCity == '' ||  state =='' || zip==''){
    setErrorMsgAdd('Please Enter Full Address!!');
    return;
  } 
  if(name == ''){
    setErrorMsgName('Please Enter Name');
    return;
  }
  
  console.log('state - ', state)
  console.log('city - ', originalCity)
  if(selectedSlot != null && add != '' && area != '' || originalCity != '' ||  state !='' || zip!='' && name != ''){
    setErrorMsg('');
    setErrorMsgName('');
    setErrorMsgAdd('');
    handleBookingDetails({ COS: 'True', OL: 'False' });
    handleProfileDataUpdate();
    // setBookingCompleted(true);
    // Congratsmesg();
    // setCongBookingShow(true);
    router.push('/order/thankyou');
  }
  

  }
  const handleBookingDetails = ({COS , OL}) =>{
    const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; 
    //console.log('inbooknow fun' , cartItems)
    //console.log('cos ' , COS)
    // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
    // setBookingDateTime(bookingDateTimeString);
    let payload = {
        "booking_date": bookingDate,
        "slot":selectedSlot.slot,
        "customer": customer,
        "coupon": couponID,
        "cash_on_service": COS,
        "online": OL,
        "booking_product": cartItems,
        "booking_address": add,
        "area": area,
        "city": originalCity,
        "state": state,
        "booking_customer": name,
        "mobile":  userProfileInfo.mobile,
        "zipcode": zip,
        "gst_no": gstNo,
    }
    console.log('payload', payload)
    // const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    // const url = "https://support.homofixcompany.com/api/create_booking/";
    const url =`${process.env.NEXT_PUBLIC_API_URL}/create_booking/`;
    // const url =`http://3.110.153.69/api/create_booking/`;

    const postData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    postData();
  }
  const getLocation = async (latitude, longitude) => {
    // Using Google Geocoding API for more accurate results
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // You'll need to add this to your .env.local
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=en`;
    
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('Google Geocoding response:', data);
        
        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          const addressComponents = result.address_components;
          
          // Extract address components
          const address = {
            street_number: '',
            route: '',
            sublocality: '',
            locality: '',
            administrative_area_level_1: '',
            postal_code: '',
            formatted_address: result.formatted_address
          };
          
          // Parse address components
          addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes('street_number')) {
              address.street_number = component.long_name;
            } else if (types.includes('route')) {
              address.route = component.long_name;
            } else if (types.includes('sublocality_level_1') || types.includes('sublocality')) {
              address.sublocality = component.long_name;
            } else if (types.includes('locality')) {
              address.locality = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
              address.administrative_area_level_1 = component.long_name;
            } else if (types.includes('postal_code')) {
              address.postal_code = component.long_name;
            }
          });
          
          setAddress(address);
          
          // Set form fields with extracted data
          if (address) {
            // Combine street number and route for full address
            const fullAddress = [address.street_number, address.route].filter(Boolean).join(' ');
            setAdd(fullAddress || address.formatted_address);
            setName(name || '');
            setArea(address.sublocality || '');
            setCity(address.locality || '');
            setState(address.administrative_area_level_1 || '');
            setZip(address.postal_code || '');
          }
          
        } else {
          console.error('Google Geocoding API returned no results');
          // Fallback to OpenStreetMap if Google fails
          await getLocationFallback(latitude, longitude);
        }
        
      } else {
        console.error('Failed to retrieve address from Google API');
        // Fallback to OpenStreetMap if Google fails
        await getLocationFallback(latitude, longitude);
      }
    } catch (error) {
      console.error('Error occurred while retrieving address from Google API:', error);
      // Fallback to OpenStreetMap if Google fails
      await getLocationFallback(latitude, longitude);
    }
    setLoading(false);
  }

  // Fallback function using OpenStreetMap
  const getLocationFallback = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('OpenStreetMap fallback response:', data);
        
        const address = {
          road: data.address.state_district,
          city: data.address.city,
          state: data.address.state,
          residential: data.address.residential,
          postcode: data.address.postcode,
          state_district: data.address.state_district,
        };
        
        setAddress(address);
        if (address) {
          setAdd(data.display_name || '');
          setName(name || '');
          setArea(address.road || '');
          setCity(address.city || '');
          setState(address.state || '');
          setZip(address.postcode || '');
        }
      } else {
        console.error('Failed to retrieve address from fallback API');
      }
    } catch (error) {
      console.error('Error occurred while retrieving address from fallback API:', error);
    }
  }

  const handleLocation = () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          getLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error occurred while retrieving geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
    setLoading(false);
    // console.log('location position', position)
  };
// Update input fields when the address state changes
  useEffect(() => {
    // //console.log('in')
    // //console.log('userProfileInfo', userProfileInfo)
    if (userProfileInfo) {
        setAdd(userProfileInfo.address || '');
        setArea(userProfileInfo.area || '');
        setCity(userProfileInfo.city || '');
        setOriginalCity(userProfileInfo.city || '');
        setState(userProfileInfo.state || '');
        setZip(userProfileInfo.zipcode || '');
        setName(userProfileInfo.first_name || '');  
        setGstNo(userProfileInfo.gst_no || ''); 
    } else {
      setAdd(address.residential || '');
      setName(name || '');
      setArea(address.road || '');
      setCity(address.city || '');
      setOriginalCity(address.city || '');
      setState(address.state || '');
      setZip(address.postcode || '');
      setGstNo('');
    }
  }, [userProfileInfo]);

  const handleDatetimeval = (bookinttime) =>{
    const originalTime = bookinttime; // Your original time string
    const date = new Date(originalTime);
    const formatted = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formatted ;
  }
  const HashDatafind = ()=>{
    const uniqueID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const concatenatedString = `${easebuzzkey}|bookingID_${uniqueID}|${PaymentAmount}|Homofixcompany|${name}|info@homofixcompnay.com|||||||||||${easebuzzsalt}`;
    // Generate the hash using SHA-256
    const hash = crypto.createHash('sha512').update(concatenatedString).digest('hex');
    console.log('Generated Hash:', hash);

    const pData = {
        'key': easebuzzkey,
        'txnid' : `bookingID_${uniqueID}`,
        'amount': PaymentAmount,
        'productinfo': 'Homofixcompany',
        'firstname': name,
        'phone': '6202223861',
        'email': 'info@homofixcompnay.com',
        'hash': hash,
        'surl': 'https://homofixcompany.com/account',
        'furl': 'https://homofixcompany.com/account',
    };
    console.log('pdata', pData)
    return pData;
}
const handleOnlinePayment2 = async () => {
  
  if(bookingDateTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date and Time');
    return;
  }
  if(bookingDate == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date');
    return;
  }
  if(bookingTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Time');
    return;
  }
  if (cityerrormsg) {
    // Display an alert or handle the error in your UI
    alert(cityerrormsg);
    return;
  }
  if(add == '' || area == '' || originalCity == '' ||  state =='' || zip==''){
    setErrorMsgAdd('Please Enter Full Address!!');
    return;
  } 
  if(name == ''){
    setErrorMsgName('Please Enter Name');
    return;
  }
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  if(bookingDateTime != '' && add != '' && area != '' || originalCity != '' ||  state !='' || zip!='' && name != ''){
    setErrorMsg('');
    setErrorMsgName('');
    setErrorMsgAdd('');
    const SendData = HashDatafind();
    const URL = '/api/test';
    
    let access_key = '';
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(SendData),
          });
        const data = await response.json();
        // console.log(data);
        // setAccess_key(data.data);
        access_key = data.data;
        // //console.log(access_key);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    // //console.log('testing here');
    // console.log(SendData);
  
    const easebuzzCheckout = new EasebuzzCheckout(easebuzzkey, 'prod');
    const options = {
      access_key: access_key, // access key received via Initiate Payment
      onResponse: (response) => {
          ////console.log(response);
          if(response.status == 'success'){
            ////console.log('pay has been successfully done yo yo ');
            handleBookingDetailsinner({ COS: 'False', OL: 'True' , PaymentID: response.easepayid})
            handleProfileDataUpdate()
            // setBookingCompleted(true);
            // Congratsmesg();
            // setCongBookingShow(true);
            router.push('/order/thankyou');
          }
      },
      theme: "#123456" // color hex
    }
  easebuzzCheckout.initiatePayment(options);
  }
  
}
  
// const handleInputClick = () => {
//   const inputField = document.getElementById('bookingDateTime');
//   inputField.click();
// };
const filterSlotsForToday = (slots, selectedDate) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
  // If selected date is not today, return all slots
  if (selectedDate !== today) {
    return slots;
  }
  
  // If selected date is today, filter out past time slots
  const currentTime = new Date();
  
  return slots.filter(slot => {
    // Extract start time from slot time (e.g., "09:00 AM - 10:00 AM" -> "09:00 AM")
    const startTime = slot.time.split(' - ')[0];
    const slotDateTime = parseTimeToDate(startTime);
    
    // Compare with current time
    return slotDateTime > currentTime;
  });
}

const parseTimeToDate = (timeString) => {
  // Parse time string like "09:00 AM" to a Date object for today
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');
  
  let hour24 = parseInt(hours);
  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  }
  
  const today = new Date();
  today.setHours(hour24, parseInt(minutes), 0, 0);
  return today;
}

const CheckSlotAvailability = async (selectedDate) => {
  const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; 
  setSlotLoading(true);
  setSlotBookingData([]);
  setSelectedSlot(null);

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/SlotCheck/`;
  // const baseUrl = `http://3.110.153.69/api/SlotCheck/`;
 
  const payload = {
    "date": selectedDate,
    "zipcode": zip,
    "subcategory_ids": [subcategoryID.id]
  }
  console.log('Slotpayload:', payload);
  try {
    
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Slot availability data:', data);
      
      // Filter slots based on current time if selected date is today
      const filteredSlots = filterSlotsForToday(data.slots || [], selectedDate);
      setSlotBookingData(filteredSlots);
    } else {
      console.error('Failed to check slot availability:', response.status);
      setSlotBookingData([]);
    }
  } catch (error) {
    console.error('Error checking slot availability:', error);
    setSlotBookingData([]);
  } finally {
    setSlotLoading(false);
  }
}

const handleSlotSelection = (slot) => {
  if (slot.status === 'available' && slot.remaining_slots > 0) {
    setSelectedSlot(slot);
    // Store the selected slot time as is
    setBookingTime(slot.time);
    
    if (bookingDate) {
      const bookingDateTimeString = `${bookingDate}T${slot.time}:00+05:30`; 
      setBookingDateTime(bookingDateTimeString);
    }
  }
};

const handleOnlinePaymentWithProcessing = () => {
  if (!selectedSlot) {
    setErrorMsg('Please select a time slot');
    return;
  }
  
  setBookingProcessing(true);
  handleOnlinePayment2().finally(() => {
    setBookingProcessing(false);
  });
};

const handleOfflinePaymentWithProcessing = () => {
  if (!selectedSlot) {
    setErrorMsg('Please select a time slot');
    return;
  }
  
  setBookingProcessing(true);
  Promise.resolve(handleOfflinePayment()).finally(() => {
    setBookingProcessing(false);
  });
};

// Mouse drag scrolling event handlers
const handleMouseDown = (e) => {
  setIsDragging(true);
  setStartX(e.pageX - e.currentTarget.offsetLeft);
  setScrollLeft(e.currentTarget.scrollLeft);
  e.currentTarget.style.cursor = 'grabbing';
};

const handleMouseLeave = (e) => {
  setIsDragging(false);
  e.currentTarget.style.cursor = 'grab';
};

const handleMouseUp = (e) => {
  setIsDragging(false);
  e.currentTarget.style.cursor = 'grab';
};

const handleMouseMove = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - e.currentTarget.offsetLeft;
  const walk = (x - startX) * 2; // Adjust scroll speed by changing multiplier
  e.currentTarget.scrollLeft = scrollLeft - walk;
};
  return (
    <>
      <button className={cnames} onClick={() => {
        // Reset selections when opening booking dialog
        setSelectedSlot(null);
        setSlotBookingData([]);
        setBookingProcessing(false);
        setErrorMsg('');
        
        // Reset date selection - no default date
        setBookingDate('');
        // Always start with current month/year to prevent past month selection
        const now = new Date();
        setSelectedMonth(new Date(now.getFullYear(), now.getMonth(), 1));
        
        setBookingShow(true);
      }}>
        {title}
        
      </button>

      <Dialog as="div" open={bookingShow} onClose={() => setBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1300]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1300] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-md sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between border-b-2 pb-3">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Homofix Company</span>
              <h2 className="text-xl font-semibold">Booking</h2>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setBookingShow(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="my-6 flow-root">
            <div className="my-6  divide-gray-500/10">
              {/* <h2>Name</h2> */}
              <label htmlFor="State">Name</label>

              <input type="text" value={name }  className="w-full py-2 my-2 border-indigo-800" onChange={handleNameChange} required />
              <p className='text-[red] text-sm'>{errormsgName}</p> 
               <button className='my-2 text-basecolor' onClick={handleLocation}>Get Location</button> <br /> <br />
              {loading ? <Loading /> :   <>
               <label htmlFor="Address">Full Address</label>
                <input type="text" value={add} onChange={handleAddChange} className="w-full py-2 my-2 border-indigo-800"  />
                <p className='text-[red] text-sm'>{errormsgadd}</p> 
                {/* <label htmlFor="Area">Near By</label>
                <input type="text" value={area} onChange={handleAreaChange}  className="w-full py-2 my-2 border-indigo-800"  /> */}
                {/* <label htmlFor="city">City</label>
                <input type="text" value={city} onChange={handleCityChange} className="w-full py-2 my-2 border-indigo-800"  /> */}
                <p className='text-[red] text-sm' >{errormsgadrea}</p>
                <label htmlFor="state">State</label>
                <select id="state" value={selectedState} onChange={handleStatenewChange} className="w-full py-2 my-2 border-indigo-800">
                    {/* <option value="">Select a state</option> */}
                    {/* {state === '' ?  <option value="" >Select a state</option> :  <option value={state} >{state}</option>} */}
                    <option value="" >Select a state</option>
                    {Object.keys(statesWithCities).map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <label htmlFor="city">City</label>
                <select id="city" value={selectedCity} onChange={handleCitynewChange} className="w-full py-2 my-2 border-indigo-800">
                <option value="">Select a city</option>
                    {selectedState && statesWithCities[selectedState] && statesWithCities[selectedState].map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {/* <p className='text-[red] text-sm'>{cityerrormsg}</p> */}
                {/* <label htmlFor="State">State</label>
                <input type="text" value={state} onChange={handleStateChange} className="w-full py-2 my-2 border-indigo-800"  /> */}
                <label htmlFor="Pincode">Pincode </label>
                <input type="text" value={zip} onChange={handleZipChange} className="w-full py-2 my-2 border-indigo-800"  />
              
                <div className=" pb-5 ">
                    <div className="lable">
                        <h4>GST Number (Optional)</h4>
                        <p className='text-sm text-gray-400'>Your business GST number for invoicing</p>
                    </div>
                    <div className="lable py-3">
                        <input 
                            type="text" 
                            className='w-screen-full border-gray-600 text-gray-800 w-full' 
                            value={gstNo} 
                            onChange={handleGstChange}
                            placeholder="Enter 15-digit GST number"
                            maxLength={15}
                        />
                        {gstError && <p className='text-[red] text-sm'>{gstError}</p>}
                    </div>
                </div>
               </>
            }
            <div className="mt-2">
                                <button className='w-full py-3 px-6 rounded-lg font-medium transition-all bg-basecolor text-white hover:bg-blue-700'
                      onClick={() => {
                        setBookingShow(false)
                        setSlotBookingShow(true)
                        
                        // Reset slot selections when entering slot booking
                        setSelectedSlot(null);
                        setSlotBookingData([]);
                        setBookingProcessing(false);
                        setErrorMsg('');
                        setPaymentMethodShow(false);
                      }}
                      >
                      Book Slot
                    </button>
            </div>
             {/* <div className="mt-2">
                
               <label htmlFor="bookingDateTime" className="block font-medium text-gray-700 text-sm mb-2">
                  Select Date & Time 
                </label>
                

                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={bookingDate}
                  onChange={handleDateChange}
                  className="w-full py-2 my-2 border-indigo-800"
                  min={new Date().toISOString().split('T')[0]}
                /> 
                  <input
                  type="time"
                  id="bookingTime"
                  name="bookingTime"
                  value={bookingTime}
                  onChange={handleTimeChange}
                  className="w-full py-2 my-2 border-indigo-800"
                  
                /> 
                
                
              </div> */}
             {/* <p className='text-[red] text-sm'>{errormsg}</p> 
              <div className='py-3'>
                <h3 >Payment Method</h3>
                <div className='mt-2'>
                {paymentMethod=='Online' ? (
                  <input type="radio" name="PAYMENT" id="payment-method" 
                  value='Online' 
                  onChange={()=>{handlePaymentChange('Online')}}
                  checked
                   />
                ):(
                  <input type="radio" name="PAYMENT" id="payment-method" 
                value='Online' 
                onChange={()=>{handlePaymentChange('Online')}}
                 />
                )}
                

                <label htmlFor="PAYMENT"> Make Payment</label><br />
                </div>
                <div className='mt-2'>
                <input type="radio" name="PAYMENT" id="payment-method"
                 value='Cash'
                 onChange={()=>{handlePaymentChange('Cash')}}   />
                <label htmlFor="PAYMENT"> Cash on Service</label><br />
                </div>
                
                {paymentMethod=='Online' ? (
                    <>
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto '
                      onClick={() => {
                        handleOnlinePayment2()
                      }}
                      >
                      Pay Now
                    </button>
                  </>

                ):(
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto ' onClick={handleOfflinePayment} >Book Now</button>

                )} */}
                {/* <div className='flex justify-between'>
                <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto '
                      onClick={() => {
                        handleOnlinePayment2()
                      }}
                      >
                      Pay Now
                    </button>
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto ' onClick={handleOfflinePayment} >Cash on Service</button>
                </div> */}
                
              {/* </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* SlotBooking Dialog */}
      <Dialog as="div" open={slotBookingShow} onClose={() => setSlotBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1300]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1300] w-full bg-white sm:max-w-md sm:ring-1 sm:ring-gray-900/10 flex flex-col">
          {/* Header - Fixed */}
          <div className="flex items-center justify-start border-b-2 pb-3 px-6 py-6 flex-shrink-0">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 flex justify-start"
              onClick={() => {
                console.log('Back button clicked');
                setBookingShow(true)
                setSlotBookingShow(false)
              }}
            >
              <span className="sr-only">Back menu</span>
              <ArrowLeftIcon className="h-6 w-6" aria-hidden="true"  />
            
            <div  className="ml-2">
              <span className="sr-only">Homofix Company</span>
              <h2 className="text-xl font-semibold">Slot Booking </h2>
            </div>
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="my-6 flow-root">
            <div className=" divide-gray-500/10">
              
              {/* Month/Year Header */}
              <div className="mt-2 mb-4">
                <div className="flex items-center justify-between">
                  <button 
                    className="text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600 flex items-center"
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                  >
                    {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} ▼
                  </button>
                </div>
                
                {/* Month/Year Picker Dropdown */}
                {showMonthPicker && (
                  <div className="mt-2 bg-white border rounded-lg shadow-lg p-4 z-10 absolute">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = new Date(selectedMonth.getFullYear(), i, 1);
                        const isCurrentMonth = month.getMonth() === selectedMonth.getMonth();
                        const currentDate = new Date();
                        const isPastMonth = selectedMonth.getFullYear() === currentDate.getFullYear() && i < currentDate.getMonth();
                        const isPastYear = selectedMonth.getFullYear() < currentDate.getFullYear();
                        const isDisabled = isPastMonth || isPastYear;
                        
                        return (
                          <button
                            key={i}
                            disabled={isDisabled}
                            className={`p-2 text-sm rounded ${
                              isCurrentMonth 
                                ? 'bg-basecolor text-white' 
                                : isDisabled
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => {
                              if (!isDisabled) {
                                const newMonth = new Date(selectedMonth.getFullYear(), i, 1);
                                setSelectedMonth(newMonth);
                                setShowMonthPicker(false);
                                
                                // Clear previous date selection when changing months
                                const currentBookingDate = new Date(bookingDate);
                                if (currentBookingDate.getMonth() !== i || currentBookingDate.getFullYear() !== selectedMonth.getFullYear()) {
                                  setBookingDate('');
                                  setSelectedSlot(null);
                                  setSlotBookingData([]);
                                }
                              }
                            }}
                          >
                            {month.toLocaleDateString('en-US', { month: 'short' })}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-2">
                      {(() => {
                        const currentYear = new Date().getFullYear();
                        const previousYear = selectedMonth.getFullYear() - 1;
                        const isPreviousYearDisabled = previousYear < currentYear;
                        
                        return (
                          <button
                            disabled={isPreviousYearDisabled}
                            className={`px-3 py-1 text-sm rounded ${
                              isPreviousYearDisabled 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => {
                              if (!isPreviousYearDisabled) {
                                setSelectedMonth(new Date(selectedMonth.getFullYear() - 1, selectedMonth.getMonth(), 1));
                                // Clear date selection when changing year
                                setBookingDate('');
                                setSelectedSlot(null);
                                setSlotBookingData([]);
                              }
                            }}
                          >
                            {previousYear}
                          </button>
                        );
                      })()}
                      <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                      >
                        {selectedMonth.getFullYear()}
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => {
                          setSelectedMonth(new Date(selectedMonth.getFullYear() + 1, selectedMonth.getMonth(), 1));
                          // Clear date selection when changing year
                          setBookingDate('');
                          setSelectedSlot(null);
                          setSlotBookingData([]);
                        }}
                      >
                        {selectedMonth.getFullYear() + 1}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Slideable Calendar-style Date Selection */}
              <div className="mb-6">
                <div 
                  className="flex gap-3 overflow-x-scroll overflow-y-hidden pb-2 scroll-smooth w-full select-none"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: isDragging ? 'auto' : 'smooth',
                    cursor: 'grab'
                  }}
                  onTouchStart={(e) => e.currentTarget.style.scrollBehavior = 'auto'}
                  onTouchEnd={(e) => e.currentTarget.style.scrollBehavior = 'smooth'}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  <style jsx>{`
                    .flex::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {(() => {
                    const year = selectedMonth.getFullYear();
                    const month = selectedMonth.getMonth();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset time to start of day
                    
                    return Array.from({ length: daysInMonth }, (_, i) => {
                      const date = new Date(year, month, i + 1);
                      // Format date properly without timezone conversion
                      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                      const isSelected = bookingDate === dateString;
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNumber = date.getDate();
                      const isPastDate = date < today;
                      
                      // Don't render past dates at all
                      if (isPastDate) {
                        return null;
                      }
                      
                      return (
                        <button
                          key={`${year}-${month}-${i}`}
                          className={`min-w-[70px] p-3 rounded-lg text-center transition-all flex-shrink-0 ${
                            isSelected
                              ? 'bg-basecolor text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => {
                            // Ensure we're using the correct date from the selected month
                            const clickedDate = new Date(year, month, i + 1);
                            
                            // Format date properly without timezone conversion
                            const clickedDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                            
                            console.log(`${dayName} ${dayNumber} clicked:`, clickedDateString);
                            console.log('Full date object:', clickedDate);
                            console.log('Previous bookingDate state:', bookingDate);
                            
                            // Set flag to prevent useEffect interference
                            setIsManualDateClick(true);
                            
                            // Clear previous slot data immediately
                            setSelectedSlot(null);
                            setSlotBookingData([]);
                            
                            // Update state and call API with the same date value
                            setBookingDate(clickedDateString);
                            
                            // Call API immediately with the correct date
                            if (zip) {
                              console.log('Calling CheckSlotAvailability with:', clickedDateString);
                              CheckSlotAvailability(clickedDateString);
                            }
                            
                            // Reset flag after a short delay
                            setTimeout(() => setIsManualDateClick(false), 100);
                          }}
                        >
                          <div className="text-xs font-medium">{dayName}</div>
                          <div className="text-lg font-bold">{dayNumber}</div>
                        </button>
                      );
                    }).filter(Boolean); // Remove null values
                  })()}
                </div>
              </div>
             <p className='text-[red] text-sm'>{errormsg}</p> 

              {/* No Date Selected Message */}
              {!bookingDate && !slotLoading && (
                <div className="py-8 text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Date</h3>
                  <p className="text-gray-500">Please choose a date above to see available time slots</p>
                </div>
              )}

              {/* Slot Loading State */}
              {slotLoading && (
                <div className="py-3 text-center">
                  <Loading />
                  <p className="text-gray-500 mt-2">Loading available slots...</p>
                </div>
              )}

              {/* Available Slots Display */}
              {!slotLoading && slotBookingData.length > 0 && (
                <div className='py-3'>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Time Slots</h3>
                  <div className='grid grid-cols-2 gap-3'>
                    {slotBookingData.map((slot) => (
                      <button
                        key={slot.slot}
                        className={`p-1 rounded-lg text-center transition-all border ${
                          slot.status === 'available' && slot.remaining_slots > 0
                            ? selectedSlot?.slot === slot.slot
                              ? 'bg-basecolor text-white border-basecolor shadow-lg'
                              : 'bg-white text-gray-700 border-gray-300  '
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (slot.status === 'available' && slot.remaining_slots > 0) {
                            handleSlotSelection(slot);
                          }
                        }}
                        disabled={slot.status !== 'available' || slot.remaining_slots === 0}
                      >
                        <div className="flex items-center justify-center">
                          <span className="mr-1">🕐</span>
                          <span className="font-medium text-sm" style={{fontSize: '12px'}}>{slot.time}</span>
                        </div>
                        {/* <div className="text-xs text-gray-500 mt-1">
                          {slot.remaining_slots} slots left
                        </div> */}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No Slots Available Message */}
              {!slotLoading && slotBookingData.length === 0 && bookingDate && (
                <div className="py-6">
                  <h3 className="font-semibold text-gray-700 text-lg mb-4">Select Start Time</h3>
                  <div className="border-2 border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Fully booked for the day due to high demand. Please choose another date.
                    </p>
                    <p className="text-gray-500 mt-2">Thank you!</p>
                  </div>
                </div>
              )}

            </div>
            </div>
          </div>
          
          {/* Fixed Payment Method Button at Bottom */}
          {!slotLoading && slotBookingData.length > 0 && selectedSlot && (
            <div className='border-t bg-white p-6 flex-shrink-0 shadow-lg' data-payment-section>
              <button 
                className="w-full py-3 px-6 rounded-lg font-medium transition-all bg-basecolor text-white hover:bg-blue-700"
                onClick={() => setPaymentMethodShow(true)}
              >
                Choose Payment Method
              </button>
            </div>
          )}
        </Dialog.Panel>
      </Dialog>

      {/* Payment Method Dialog */}
      <Dialog as="div" open={paymentMethodShow} onClose={() => setPaymentMethodShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1300]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1300] w-full bg-white sm:max-w-md sm:ring-1 sm:ring-gray-900/10 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-start border-b-2 pb-3 px-6 py-6 flex-shrink-0">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 flex justify-start"
              onClick={() => setPaymentMethodShow(false)}
            >
              <span className="sr-only">Back menu</span>
              <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="ml-2">
              <span className="sr-only">Homofix Company</span>
              <h2 className="text-xl font-semibold">Payment Methods</h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="my-6 flow-root">
              <div className="divide-gray-500/10">
                
                {/* UPI/Credit/Debit Card Option */}
                <div className="mb-4">
                  <button
                    onClick={() => handlePaymentChange('Online')}
                    className={`w-full text-left bg-white border-2 rounded-lg p-4 transition-all duration-200 hover:border-blue-300 ${
                      paymentMethod === 'Online' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">UPI/Credit/Debit Card</h3>
                        <p className="text-sm text-gray-500">Secure online payment</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Cash on Service Option */}
                <div className="mb-4">
                  <button
                    onClick={() => handlePaymentChange('Cash')}
                    className={`w-full text-left bg-white border-2 rounded-lg p-4 transition-all duration-200 hover:border-green-300 ${
                      paymentMethod === 'Cash' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662c.721-.481 1.324-1.32 1.324-2.246 0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31A4.46 4.46 0 0011 7.092V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Cash on Service</h3>
                        <p className="text-sm text-gray-500">Pay after service completion</p>
                      </div>
                    </div>
                  </button>
                </div>

              </div>
            </div>
          </div>
          
          {/* Fixed Action Button at Bottom */}
          <div className='border-t bg-white p-6 flex-shrink-0 shadow-lg'>
            <button 
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all text-white ${
                paymentMethod === 'Online' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={() => {
                if (paymentMethod === 'Online') {
                 // setPaymentMethodShow(false);
                  //setSlotBookingShow(false); // Close slot booking dialog too
                  handleOnlinePaymentWithProcessing();
                } else {
                 // setPaymentMethodShow(false);
                 // setSlotBookingShow(false); // Close slot booking dialog too
                  handleOfflinePaymentWithProcessing();
                }
              }}
              disabled={bookingProcessing}
            >
              {bookingProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : paymentMethod === 'Online' ? (
                'Pay Now'
              ) : (
                'Book Now'
              )}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Congratulation Dialog */}

      <Dialog as="div" open={congBookingShow} onClose={() => setCongBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1500]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1500] w-full overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10 ">
          <div className="flex items-center justify-center border-b-2 py-10 bg-basecolor rounded-t-none rounded-3xl "> 
          </div>
          <div className="mb-6 flow-root items-center justify-center text-center px-2">
          <img src="/cracker.png" alt="congrats" width={120} className='mx-auto -mt-16' />
            <h2 className='text-3xl text-basecolor font-bold py-3'>Thank You!!</h2>
                <p className='text-sm text-gray-800'>You have successfully booked our services </p>
                <ul className='list-none'>
                    <li className='py-3 font-semibold text-lg'>Booking Date:Time - {handleDatetimeval(bookingDateTime) }</li>
                </ul>
                <Link href='/account' className='px-4 py-2 bg-basecolor text-white'> Go to Account</Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export { Booking };
