import { Image } from 'expo-image';
import { memo } from 'react';
import { View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import tw from 'twrnc';

interface CarouselProps {
  images: string[];
}

const PropertyImageCarousel = ({ images }: CarouselProps ) => {
    return (
            <View style={tw`w-full h-full items-center`}>
                <Carousel
                    loop
                    width={360}
                    height={360}
                    autoPlay={true}
                    defaultIndex={0}
                    data={images}
                    renderItem={({ item }) => (
                        <Image
                            style={tw`w-full h-full border-2 border-gray-300`}
                            source={{ uri: item }}
                            contentFit="cover"
                            transition={1000}
                            autoplay={true}
                        />
                    )}
                    scrollAnimationDuration={1000}
                />
        </View>
    );
}

export default memo(PropertyImageCarousel);
