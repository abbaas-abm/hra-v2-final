import CheckoutForm from '@/components/Checkout';
import ItemSelectForm from '@/components/ItemSelection';
import PersonalDetailsForm from '@/components/PersonalDetails';
import PickUpAndDropOffForm from '@/components/PickUpAndDropOffForm';
import RoutePlot from '@/components/RoutePlot';
import type { Item } from '@/types';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {  useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import { getCost } from '@/api/cost';
import { createOrder } from '@/api/orders';
import  Spinner from '@/components/Spinner';
import { useUser } from '@clerk/clerk-react';
import { createSinglePayment } from '@/utils/payfast';

export const Route = createFileRoute('/(home)/services/delivery/order/')({
    head: () => ({
        meta: [
            {title: "Schedule Delivery | Schedule a delivery from HRA Transportation!"}
        ]
    }),
  component: OrderDeliveryPage,
})

function OrderDeliveryPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    let stepContent;
    const {user} = useUser()

    useEffect(()=> {
      if (!user) {
        navigate({to: '/sign-in'})
      }
    }, [])

    // -- ORDER INFO --
    // Pick up and Drop off locations
    const [pickup, setPickup] = useState<any>();
    const [dropoff, setDropoff] = useState<any>();

    // Pick-up date, Pickup and Dropoff times and stairs
    const [pickupTime, setPickupTime] = useState<string | undefined>();
    const [stairs, setStairs] = useState<number | undefined>();
    const [deliveryDate, setDeliveryDate] = useState<string | undefined>();

    // User Items
    const [items, setItems] = useState<Item[]>();

    // Personal Details
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const [paymentMethod, _] = useState('Cash On Delivery')
    const [cost, setCost] = useState<any>();


    const {mutateAsync} = useMutation({
      mutationFn: getCost,
      mutationKey: ['cost'],
    })
    const {mutateAsync:sendOrder, isPending:orderCreationPending} = useMutation({
      mutationFn: createOrder,
      mutationKey: ['order'],
      onSuccess: (data) => {
        createSinglePayment({
          firstname: firstName,
          lastname: lastName,
          email: email,
          mobile: phone,
          cost: +data.costs.total,
          userId: data.userId
        })
      },
    })

    if (step === 1) {
    stepContent = <RoutePlot 
    setPickup={(pu) => setPickup(pu)} 
    setDropoff={(dropoff) => setDropoff(dropoff)}
    />
    } 
    else if(step === 2){
      stepContent = <PickUpAndDropOffForm
      setPickupT = {(pickupTime) => setPickupTime(pickupTime)}
      // setDropoffT = {(dropoffTime) => setDropoffTime(dropoffTime)}
      setStairs = {(stairs) => setStairs(stairs)}
      setDeliveryD={(deliveryDate) => setDeliveryDate(deliveryDate)}
      />

    
    }
    else if(step === 3){
      stepContent = <ItemSelectForm
      setUserItems = {(items) => setItems(items)}
      />
    }
    else if(step === 4){
      stepContent = <PersonalDetailsForm
      pushFirstName = {(firstName) => setFirstName(firstName)}
      pushLastName = {(lastName) => setLastName(lastName)}
      pushEmail = {(email) => setEmail(email)}
      pushPhone = {(phone) => setPhone(phone)}
      pushMessage = {(message) => setMessage(message)}
      />
    }
    else if(step === 5) {
      !cost || orderCreationPending
      ? stepContent = <Spinner/>
      : stepContent = <CheckoutForm responseCost={cost}/>
    }
    

    const placeOrder = async () => {

    const data:any =  {
    addressDetails: cost.addressDetails,
    deliveryDetails: cost.deliveryDetails,
    personalDetails: cost.personalDetails,
    costs: cost.costs,
    tripDetails: cost.tripDetails,
    paymentMethod: paymentMethod,
    userId: user?.id
  }


  try {
        let response = await sendOrder(data);
        setCost(response)
      } catch (error) {
        console.log(error);
      }
  }

const handleCalculation = async () => {
      const data:any =  {
        addressDetails: {
            pickup: pickup?.formatted_address,
            dropoff: dropoff?.formatted_address
        },
        deliveryDetails: {
            pickupDate: deliveryDate,
            pickupTime: pickupTime,
            stairs: stairs,
            items: [...(items ?? [])]
        },
        personalDetails: {
            firstname: firstName,
            lastname: lastName,
            email: email,
            mobile: phone,
            message: message || 'none'
        }
    }

    try {
      let response = await mutateAsync(data);
      setCost(response)
    } catch (error) {
      console.log(error);
    }
}
 

  return (
  <div className='flex flex-col items-center w-full min-h-screen'>
    {stepContent}

   <div className={` ${step === 5 ? `hidden`: `w-full max-w-md grid grid-cols-2 gap-2 my-3`}`}> {/* Use grid here */}
     <button
            type="submit"
            className={`${step <= 1 ? `bg-gray-400 cursor-not-allowed`: `bg-red-500 cursor-pointer  hover:bg-red-600 hover:scale-105`} text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition duration-300  outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
            disabled={step <= 1}
            onClick={(_) => setStep(prev => prev -1)}>
            Previous Step
    </button>
     <button
            type="submit"
            className={`${step <= 4 ?`bg-green-500 cursor-pointer  hover:bg-green-600 hover:scale-105`: `bg-gray-400 cursor-not-allowed` }  text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition duration-300 outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
            onClick={(_) => {
          setStep(prev => prev + 1)
          if (step === 4) {
            handleCalculation()
          }
      }}
          >
            Next Step
    </button>
   </div>

<div className="flex items-center justify-center w-full flex-col">
       <button
            type="submit"
            className={`${step !== 5 ? `hidden` : ` w-[250px] md:w-[600px] my-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl text-lg sm:text-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-lg`}`}
            onClick={placeOrder}
          >
            Continue With Payfast
    </button>
</div>
  </div>)
}
