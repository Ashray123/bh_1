import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

const NeonTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: '#000000',
		card: '#0b0b0f',
		text: '#e5e7eb',
		primary: '#6EE7F9'
	}
};

export default function App() {
	return (
		<NavigationContainer theme={NeonTheme as any}>
			<StatusBar style="light" />
			<Drawer.Navigator
				drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
				screenOptions={{
					drawerStyle: { backgroundColor: '#0b0b0f', width: 260 },
					drawerActiveTintColor: '#9B8CFF',
					drawerInactiveTintColor: '#9CA3AF',
					headerStyle: { backgroundColor: '#000' },
					headerTintColor: '#fff',
					headerTitle: () => (
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{
								fontSize: 20,
								fontWeight: '800',
								letterSpacing: 1,
								color: '#fff',
								textShadowColor: '#6EE7F9',
								textShadowOffset: { width: 0, height: 0 },
								textShadowRadius: 10
							}}>BhaiGPT</Text>
						</View>
					),
				}}
			>
				<Drawer.Screen name="Chat" component={ChatScreen} options={{ title: 'BhaiGPT' }} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
