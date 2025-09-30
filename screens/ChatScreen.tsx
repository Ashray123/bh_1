import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatInput from '../components/ChatInput';
import MessageCard from '../components/MessageCard';
import ResponseCarousel, { ModelResponse } from '../components/ResponseCarousel';

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
    const [carousel, setCarousel] = useState<ModelResponse[] | null>(null);

    const onSend = useCallback(async (text: string) => {
		const id = `${Date.now()}`;
		setMessages((prev) => [...prev, { id: `${id}-you`, from: 'You', text }]);
		setIsLoading(true);
        // Simulate async BhaiGPT response in Hinglish and parallel mock model comparisons
		const delay = 400 + Math.floor(Math.random() * 800);
		const reply = HINGLISH_RESPONSES[Math.floor(Math.random() * HINGLISH_RESPONSES.length)];
        const models = ['GPT-3.5', 'LLaMA-3', 'Claude'];
        setCarousel(models.map((m, idx) => ({ id: `${id}-${idx}`, model: m, answer: '', isLoading: true })));
		setTimeout(() => {
			setMessages((prev) => [...prev, { id: `${id}-bhai`, from: 'BhaiGPT', text: reply }]);
            // Fill carousel answers after a short delay to mimic async
            setTimeout(() => {
                const filled = models.map((m, idx) => ({ id: `${id}-${idx}`, model: m, answer: `${m} bolta: "${text}" ka jawaab yeh hai...`, isLoading: false }));
                setCarousel(filled);
                setIsLoading(false);
            }, 300);
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
            <View style={{ flex: 1, paddingTop: 12 }}>
                {carousel ? (
                    <View style={{ paddingTop: 0 }}>
                        <ResponseCarousel responses={carousel} />
                    </View>
                ) : (
                    <View style={{ flex: 1, paddingHorizontal: 12 }}>
                        <FlatList
                            ref={listRef}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            contentContainerStyle={{ paddingBottom: 12 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#111827' }}>
                <ChatInput onSend={onSend} isLoading={isLoading} />
            </View>
        </View>
    );
};

export default ChatScreen;

