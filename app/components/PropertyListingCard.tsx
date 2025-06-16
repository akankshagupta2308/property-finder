import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import Property from '../Types/propertyType';

const PropertyListingCard = ({ propertyDetails } : {propertyDetails: Property}) => {

    const { location, title, features, images, id } = propertyDetails;
    const fullAddress = (!!location.address ? `${location.address}, ` : '') + (!!location.city ? `${location.city}, ` : '') + (!!location.state ? `${location.state}` : '');
    const fullFeatures = features.join(', ');

    const navigateToPropertyDetailsScrreen = () => {
        router.navigate({ pathname: '/screens/PropertyDetailsScreen', params: { id } });
    }

    return (
        <TouchableOpacity key={id}
            style={tw`bg-white border-gray border-width-1 mt-4 ml-4 mr-4 p-4 flex-row rounded-lg h-30`}
            onPress={navigateToPropertyDetailsScrreen}
        >
            <Image
                style={tw`w-18 h-full border-2 border-gray-300`}
                source={{ uri: images[0] }}
                contentFit="cover"
                transition={2000}
                autoplay={true}
            />
            <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-black font-600`}>{title}</Text>
                <View style={tw`flex-row items-center mt-2`}>
                    <Ionicons name="location" size={16} color="green" />
                    <Text style={tw`text-black ml-1`}>{fullAddress}</Text>
                </View>

                <Text style={tw`text-black ml-1 mt-1`}>{fullFeatures}</Text>

            </View>
        </TouchableOpacity>
    );
}

export default memo(PropertyListingCard);
