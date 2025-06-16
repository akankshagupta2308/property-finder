import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { Text, View } from "react-native";
import tw from 'twrnc';
import { useUserStore } from '../store/useUserStore';


const ProfileScreen = () => {
    const { userData } = useUserStore();
    const { id, name, email } = userData ?? {};

    return (
        <View style={tw`items-center pt-20 bg-white border-gray border-width-1 mt-4 ml-4 mr-4 p-4 rounded-lg`}>
            <Ionicons name="person" size={100} color="gray" />
            <Text style={tw`items-center mt-1 text-black text-sm font-500`} >{`userId: ${id}`}</Text>
            <Text style={tw`items-center mt-6 text-black text-4xl font-600`} >{name}</Text>
            <Text style={tw`items-center mb-2 mt-1 text-black text-2xl font-500`}>{email}</Text>
        </View>
    );
}

export default memo(ProfileScreen);
