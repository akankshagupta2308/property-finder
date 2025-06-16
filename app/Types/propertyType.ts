export interface Location {
  address: string;
  city: string;
  state: string;
  coordinates: {
    latitude: number,
    longitude: number;
  }
}

export default interface Property {
  id: string;
  title: string;
  price: string;
  location: Location;
  features: string[];
  images: string[];
}