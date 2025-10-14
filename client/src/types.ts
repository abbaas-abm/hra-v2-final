export type ServiceHero = {
    id: number,
    title: string,
    subtitle: string,
    url: string,
    urlText: string,
    img: string
}

export type Item = {
  id: number;
  name: string;
  quantity: number;
  weight: number;
}

export type Cost = {
    addressDetails: {
        pickup: string,
        dropoff:string
    },
    deliveryDetails: {
        pickupDate: string,
        pickupTime: string,
        stairs: number,
        items: Item[]
    },
    personalDetails: {
        firstname: string,
        lastname: string,
        email: string,
        mobile: string,
        message: string 
    }
}

interface AddressDetails {
  pickup: string;
  dropoff: string;
}

interface DeliveryDetails {
  pickupDate: string;
  pickupTime: string;
  stairs: string; // Consider using 'number' if 'stairs' will always be a numeric string that can be parsed.
  items: Item[];
}

interface PersonalDetails {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  message: string;
}

interface Costs {
  callOutFee: number;
  timeFee: number;
  fuelFee: number;
  massFee: number;
  itemFee: number;
  stairFee: number;
  total: number;
  timeNum: number;
}

interface TripDetails {
  distance: number;
  duration: string;
}

export interface DeliveryRequest {
  addressDetails: AddressDetails;
  deliveryDetails: DeliveryDetails;
  personalDetails: PersonalDetails;
  costs: Costs;
  tripDetails: TripDetails;
}

export interface OrderResponse {
  addressDetails: AddressDetails;
  deliveryDetails: DeliveryDetails;
  personalDetails: PersonalDetails;
  costs: Costs;
  tripDetails: TripDetails;
  paymentMethod: string;
 userId: string;
 status: string;
 driver: string;
  driverId: string;
}


export interface OrderRequest {
  addressDetails: AddressDetails;
  deliveryDetails: DeliveryDetails;
  personalDetails: PersonalDetails;
  costs: Costs;
  tripDetails: TripDetails;
  paymentMethod: string;
 userId: string;
}

export type Order = {
  _id: string ;
    status: string;
    paymentMethod: string;
    addressDetails: {
      pickup: string;
      dropoff: string;
    };
    deliveryDetails: {
      pickupDate: string;
      pickupTime: string;
      stairs: number;
      items: Item[];
    };
    personalDetails: {
      firstname: string;
      lastname: string;
      email: string;
      mobile: string;
      message: string;
    };
    costs: {
      callOutFee: number;
      timeFee: number;
      fuelFee: number;
      massFee: number;
      itemFee: number;
      stairFee: number;
      total: number;
      timeNum: number;
    };
    tripDetails: {
      distance: string;
      duration: string;
    };
    driver: boolean;
    driverId: string;
    userId: string;
    userPaid: boolean;
    driverPaid: boolean;
    createdAt: string;
};