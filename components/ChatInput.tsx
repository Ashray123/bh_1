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
				<View style={{ flexDirection: 'row', padding: 12, gap: 8, alignItems: 'center', backgroundColor: '#000' }}>
					<TextInput
						value={text}
						onChangeText={setText}
						placeholder="Bhai, kuch pooch na..."
						placeholderTextColor="#6b7280"
						editable={!isLoading}
						returnKeyType="send"
						onSubmitEditing={submit}
						style={{ flex: 1, borderWidth: 1, borderColor: '#312e81', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, color: '#E5E7EB', backgroundColor: '#0b0b0f', shadowColor: '#22D3EE', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } }}
					/>
					<Pressable onPress={submit} disabled={isLoading} style={{ backgroundColor: isLoading ? '#1f2937' : '#0ea5e9', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 14, shadowColor: '#38bdf8', shadowOpacity: 0.9, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } }}>
						<Text style={{ color: 'white', fontWeight: '800', letterSpacing: 0.3 }}>{isLoading ? '...' : 'Send'}</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default ChatInput;

