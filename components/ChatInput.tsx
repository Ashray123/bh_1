import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ChatInputProps = {
	onSend: (text: string) => void;
	isLoading?: boolean;
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
	const [text, setText] = useState('');

	const submit = () => {
		const trimmed = text.trim();
		if (!trimmed || isLoading) return;
		onSend(trimmed);
		setText('');
	};

	return (
		<KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<SafeAreaView>
				<View style={{ flexDirection: 'row', padding: 12, gap: 8, alignItems: 'center' }}>
					<TextInput
						value={text}
						onChangeText={setText}
						placeholder="Ask a question"
						editable={!isLoading}
						returnKeyType="send"
						onSubmitEditing={submit}
						style={{ flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 }}
					/>
					<Pressable onPress={submit} disabled={isLoading} style={{ backgroundColor: isLoading ? '#9ca3af' : '#111827', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 }}>
						<Text style={{ color: 'white', fontWeight: '600' }}>{isLoading ? '...' : 'Send'}</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default ChatInput;

