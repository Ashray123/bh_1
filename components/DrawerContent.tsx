import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, Pressable } from 'react-native';

const Item: React.FC<{ label: string; onPress: () => void; icon?: string }>
= ({ label, onPress }) => (
	<Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 10 }}>
		<Text style={{ color: '#E5E7EB', fontSize: 16, textShadowColor: '#7C3AED', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}>{label}</Text>
	</Pressable>
);

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
	return (
		<View style={{ flex: 1, backgroundColor: '#0b0b0f', paddingTop: 48 }}>
			<View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
				<Text style={{ color: '#A78BFA', fontWeight: '800', fontSize: 22, textShadowColor: '#22D3EE', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 12 }}>BhaiGPT</Text>
			</View>
			<View style={{ gap: 6 }}>
				<Item label="🔮  New Chat" onPress={() => navigation.navigate('Chat' as never)} />
				<Item label="📜  Chat History" onPress={() => {}} />
				<Item label="⚙️  Settings" onPress={() => {}} />
				<Item label="ℹ️  About" onPress={() => {}} />
			</View>
		</View>
	);
};

export default DrawerContent;
