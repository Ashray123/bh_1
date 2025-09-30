import React, { useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';

export type MessageCardProps = {
	from: 'You' | 'BhaiGPT';
	text: string;
};

export const MessageCard: React.FC<MessageCardProps> = ({ from, text }) => {
	const [expanded, setExpanded] = useState(false);
	const isLong = text.length > 200;
	const preview = useMemo(() => (isLong ? text.slice(0, 200) + '…' : text), [isLong, text]);
	const display = expanded || !isLong ? text : preview;

	return (
		<View style={{
			backgroundColor: '#111114',
			borderRadius: 14,
			padding: 14,
			borderWidth: 1,
			borderColor: '#312e81',
			shadowColor: '#7c3aed',
			shadowOpacity: 0.6,
			shadowRadius: 12,
			shadowOffset: { width: 0, height: 0 },
			marginVertical: 8
		}}>
			<Text style={{ color: '#93C5FD', fontWeight: '700', marginBottom: 6, textShadowColor: '#06B6D4', textShadowRadius: 8 }}>{from}</Text>
			<Text style={{ color: '#E5E7EB', lineHeight: 22 }}>{display}</Text>
			{isLong && (
				<Pressable onPress={() => setExpanded((v) => !v)} style={{ marginTop: 8 }}>
					<Text style={{ color: '#60A5FA', fontWeight: '600' }}>{expanded ? 'bas ho gaya 👆' : 'aur padh bhai 👇'}</Text>
				</Pressable>
			)}
		</View>
	);
};

export default MessageCard;
