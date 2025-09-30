import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatInput from '../components/ChatInput';
import MessageCard from '../components/MessageCard';

type ChatMessage = {
	id: string;
	from: 'You' | 'BhaiGPT';
	text: string;
};

const OPENING_LINE = 'Bol bhai, kaisa hai?';

const HINGLISH_RESPONSES: string[] = [
	'Arre mast hu, tu bata? 😊',
	'Chal badiya! Kya madad chahiye bhai?',
	'Theek hoon yaar, seedha bol kya scene hai?',
	'Ho jayega bhai, tension na le. Bata details.',
];

export const ChatScreen: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ id: 'open', from: 'BhaiGPT', text: OPENING_LINE },
	]);
	const listRef = useRef<FlatList<ChatMessage>>(null);

	const onSend = useCallback(async (text: string) => {
		const id = `${Date.now()}`;
		setMessages((prev) => [...prev, { id: `${id}-you`, from: 'You', text }]);
		setIsLoading(true);
		// Simulate async BhaiGPT response in Hinglish
		const delay = 400 + Math.floor(Math.random() * 800);
		const reply = HINGLISH_RESPONSES[Math.floor(Math.random() * HINGLISH_RESPONSES.length)];
		setTimeout(() => {
			setMessages((prev) => [...prev, { id: `${id}-bhai`, from: 'BhaiGPT', text: reply }]);
			setIsLoading(false);
			requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
		}, delay);
		requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
	}, []);

	const renderItem = useCallback(({ item }: { item: ChatMessage }) => (
		<MessageCard from={item.from} text={item.text} />
	), []);

	const keyExtractor = useCallback((m: ChatMessage) => m.id, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#000' }}>
			<View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 12 }}>
				<FlatList
					ref={listRef}
					data={messages}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					contentContainerStyle={{ paddingBottom: 12 }}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			<View style={{ borderTopWidth: 1, borderTopColor: '#111827' }}>
				<ChatInput onSend={onSend} isLoading={isLoading} />
			</View>
		</View>
	);
};

export default ChatScreen;

