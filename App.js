import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { SSRProvider } from "@react-aria/ssr";

// components
import RootNavigator from "./Components/Navigation/index";
import { LogBox } from "react-native";

export default function App() {
	// To Remove all Yellow Warnings for the Demo Day
	LogBox.ignoreAllLogs();

	return (
		<SSRProvider>
			<NavigationContainer>
				<NativeBaseProvider>
					<RootNavigator />
				</NativeBaseProvider>
			</NavigationContainer>
		</SSRProvider>
	);
}
