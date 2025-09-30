import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export type ResponseCardProps = {
	model: string;
	answer: string;
	isLoading?: boolean;
};

export const ResponseCard: React.FC<ResponseCardProps> = ({ model, answer, isLoading }) => {
	return (
		<View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2, height: '85%' }}>
			<Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>{model}</Text>
			<View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 8, flex: 1 }}>
				{isLoading ? (
					<Text style={{ color: '#6b7280' }}>Loading...</Text>
				) : (
					<ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
						<Text style={{ fontSize: 15, lineHeight: 22, color: '#111827' }}>{answer}</Text>
					</ScrollView>
				)}
			</View>
		</View>
	);
};

export default ResponseCard;

