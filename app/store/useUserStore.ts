import axios from 'axios';
import { create } from 'zustand';
import Profile from '../Types/profileType';

interface PropertyStore {
    userData: Profile;
    error: string;
    fetchUserData: () => Promise<void>;
}

const initialUserState = {
    id: '',
    name: '',
    email: '',
    bookings: []
}

export const useUserStore = create<PropertyStore>((set) => ({
    userData: initialUserState,
    error: '',
    fetchUserData: async () => {
        try {
            const response = await axios.get('http://localhost:3000/profile');
            set({ userData: response.data });
        } catch (error) {
            console.log('err', error);
            set({ error: 'Failed to fetch properties' });

        }
    }
}));