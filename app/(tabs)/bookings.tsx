import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { memo } from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import tw from 'twrnc';
import BookingCard from '../components/BookingCard';

const BookingsScreen = () => {
    const isFocused = useIsFocused();
    const { data, isLoading, error } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/bookings');
            return response.data;
        },
        subscribed: isFocused
    });

    if (isLoading) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error || !data.length) {
        return (
            <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-black font-500 text-xl`}>No Bookings Found!</Text>
            </View>);
    }

    return (
        <View style={tw`flex-1`}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <BookingCard bookingDetails={item} key={index} />}
            />
        </View>
    );
}

export default memo(BookingsScreen);
