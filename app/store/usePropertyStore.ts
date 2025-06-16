import axios from 'axios';
import { create } from 'zustand';
import Property from '../Types/propertyType';

interface PropertyStore {
  properties: Property[];
  propertyDetail: Property;
  filteredProperties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  updatePropertyList: (list: Property[]) => void;
  fetchPropertyDetails: (id: string) => Promise<void>;
}

const initialLocationState = {
  address: '',
  city: '',
  state: '',
  coordinates: {
    latitude: 37.78825,
    longitude: -122.4324
  }
};

const initialPropertyDeatilsState = {
  id: '',
  title: '',
  price: '',
  location: initialLocationState,
  features: [],
  images: [],
};

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  propertyDetail: initialPropertyDeatilsState,
  loading: false,
  error: null,
  filteredProperties: [],
  fetchProperties: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('http://localhost:3000/properties');
      set({ properties: response.data, loading: false });
    } catch (error) {
      console.log('err', error);
      set({ error: 'Failed to fetch properties', loading: false });
    }
  },
  fetchPropertyDetails: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(`http://localhost:3000/properties/${id}`);
      set({ propertyDetail: response.data, loading: false });
    } catch (error) {
      console.log('err', error);
      set({ error: 'Failed to fetch property details', loading: false });
    }
  },
  updatePropertyList: (list: Property[]) => set({ filteredProperties: list })
}));