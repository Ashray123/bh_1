import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatInput from '../components/ChatInput';
import ResponseCarousel, { ModelResponse } from '../components/ResponseCarousel';

const MODELS = ['GPT-3.5', 'LLaMA-3', 'Claude'];

type QASet = {
	id: string;
	question: string;
	responses: ModelResponse[];
};

function simulateModelAnswer(model: string, question: string): Promise<string> {
	const mock = {
		'GPT-3.5': `GPT-3.5 answer to: "${question}"\n\nHere is a concise explanation and key points...`,
		'LLaMA-3': `LLaMA-3 perspective: "${question}"\n\nHighlights, nuances, and alternative views...`,
		'Claude': `Claude's take on: "${question}"\n\nReasoned, structured response with practical tips...`,
	} as const;
	const min = 400;
	const jitter = Math.floor(Math.random() * 800);
	return new Promise((resolve) => setTimeout(() => resolve(mock[model as keyof typeof mock]), min + jitter));
}

export const ChatScreen: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [history, setHistory] = useState<QASet[]>([]);

	const onSend = useCallback(async (question: string) => {
		setIsLoading(true);
		const id = `${Date.now()}`;
		const loadingResponses: ModelResponse[] = MODELS.map((m, idx) => ({
			id: `${id}-${idx}`,
			model: m,
			answer: '',
			isLoading: true,
		}));

		setHistory((prev) => [{ id, question, responses: loadingResponses }, ...prev]);

		const filled: ModelResponse[] = await Promise.all(
			MODELS.map(async (model, idx) => {
				const answer = await simulateModelAnswer(model, question);
				return { id: `${id}-${idx}`, model, answer, isLoading: false };
			})
		);

		setHistory((prev) => prev.map((q) => (q.id === id ? { ...q, responses: filled } : q)));
		setIsLoading(false);
	}, []);

	const latest = useMemo(() => history[0], [history]);

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ flex: 1, paddingTop: 12 }}>
				{latest ? (
					<View>
						<ResponseCarousel responses={latest.responses} />
						<View style={{ paddingHorizontal: 16, marginTop: 12 }}>
							<Text style={{ color: '#6b7280', fontSize: 12 }}>Swipe to compare model answers</Text>
						</View>
					</View>
				) : (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ color: '#6b7280' }}>Ask a question to see responses</Text>
					</View>
				)}
			</View>
			<View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
				<ChatInput onSend={onSend} isLoading={isLoading} />
			</View>
		</View>
	);
};

export default ChatScreen;

