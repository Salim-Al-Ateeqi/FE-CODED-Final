import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { SSRProvider } from "@react-aria/ssr";

// components
import RootNavigator from "./Components/Navigation/index";

export default function App() {
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
