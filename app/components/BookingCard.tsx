import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { Text, View } from "react-native";
import tw from 'twrnc';
import Booking from '../Types/bookingType';

const BookingCard = ({ bookingDetails }: { bookingDetails: Booking }) => {
    const { id, checkIn, checkOut, status, userId, propertyId } = bookingDetails;

    return (
        <View key={id}
            style={tw`bg-white border-gray border-width-1 mt-4 ml-4 mr-4 p-4 rounded-lg `}
        >
            <View style={tw`flex-row items-center`}>
                <Text style={tw`text-black ml-1 mb-3`}>{`Booking ${id} - `}<Text style={tw`font-bold text-green-600`}>{status}</Text> </Text>
            </View>
            <View style={tw`flex-row items-center`}>
                <Ionicons name="information-circle-outline" size={16} color="green" />
                <Text style={tw`text-black ml-1`}>{`User Id - `}<Text style={tw`font-bold`}>{userId}</Text> </Text>
            </View>
            <View style={tw`flex-row items-center mt-2`}>
                <Ionicons name="information-circle-outline" size={16} color="green" />
                <Text style={tw`text-black ml-1`}>{`Property Id - `}<Text style={tw`font-bold`}>{propertyId}</Text> </Text>
            </View>

            <View style={tw`flex-row items-center mt-2`}>
                <Ionicons name="checkmark-done-outline" size={16} color="green" />
                <Text style={tw`text-black ml-1`}>{`Check In - `}<Text style={tw`font-bold`}>{checkIn}</Text> </Text>
            </View>
            <View style={tw`flex-row items-center mt-2`}>
                <Ionicons name="checkmark-circle" size={16} color="green" />
                <Text style={tw`text-black ml-1`}>{`Check Out - `}<Text style={tw`font-bold`}>{checkOut}</Text> </Text>
            </View>
        </View>
    );
}

export default memo(BookingCard);
