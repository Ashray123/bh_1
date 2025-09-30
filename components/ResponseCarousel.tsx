import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, View } from 'react-native';
import ResponseCard from './ResponseCard';

export type ModelResponse = {
	model: string;
	answer: string;
	isLoading?: boolean;
	id: string;
};

export type ResponseCarouselProps = {
	responses: ModelResponse[];
};

const { width } = Dimensions.get('window');

export const ResponseCarousel: React.FC<ResponseCarouselProps> = ({ responses }) => {
	return (
		<View style={{ height: 460 }}>
			<Carousel
				width={width}
				height={460}
				data={responses}
				renderItem={({ item }) => (
					<View style={{ paddingHorizontal: 16 }}>
						<ResponseCard model={item.model} answer={item.answer} isLoading={item.isLoading} />
					</View>
				)}
				scrollAnimationDuration={400}
				loop={false}
			/>
		</View>
	);
};

export default ResponseCarousel;

