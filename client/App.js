import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#000",
						shadowColor: "#dbdbdb",
					},
					title: 'PRECISION WEATHER',
					headerTitleStyle: {
						fontSize: 25,
						fontFamily: "Helvetica",
						color: "#ffb000"
					},
					headerBackTitleStyle: {
						color: "#ffb000",
					},
					headerTintColor: "#ffb000"
				}}
			>
				<Stack.Screen name="home" component={HomeScreen} />
				<Stack.Screen name="formulaPage" component={formulaPage} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

function formulaPage() {
	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", marginTop: 10, fontSize: 20, color: "#fff" }}>To calculate the accuracy of a weather provider, I use the Root-mean-square deviation (RMSD for short) formula.</Text>
		</View>
	)
}

function HomeScreen({ navigation }) {
	const [response, setResponse] = useState({});
	const fetchAddress = 'http://fcb3b86bb319.ngrok.io/weatherapi' //this is a random example, generate your own with ngrok.
	useEffect(() => {
		fetch(fetchAddress)
			.then((response) => response.json())
			.then((res) => {
				setResponse(res);
			})
			.catch((error) => {
				console.log(error.message);
				throw error;
			});
	}, []);

	let DATA = [
		{
			response: response.wa_ans,
			key: `${new Date().getDate()}-${response.wa_name}`,
			name: response.wa_name,
		},
		{
			response: response.wb_ans,
			key: `${new Date().getDate()}-${response.wb_name}`,
			name: response.wb_name,
		},
	];

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", marginTop: 10, color: "#fff" }}>(Smaller is better)</Text>
			{Object.keys(response).length === 0 ? (
				null
			) : (
					<>
						<FlatList
							data={DATA}
							renderItem={({ item }) => (
								<View style={styles.item}>
									<Text style={{
										fontSize: 25, fontFamily: "Helvetica", color: "#fff"
									}}>
										Accuracy of {item.name}: ±{item.response}°C
								</Text>
								</View>
							)}
						></FlatList>
					</>



				)}

			<TouchableOpacity
				style={styles.formulalink}
				onPress={() => navigation.navigate('formulaPage')}
			>
				<Text style={styles.formulatext}>How is the accuracy calculated?</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		flexDirection: "column",
	},
	item: {
		height: 100,
		alignItems: "flex-start",
		paddingLeft: 10,
		justifyContent: "center",
		borderBottomWidth: 0.3,
		borderColor: "#dbdbdb",
	},
	formulalink: {
		marginBottom: 150,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 30,
		marginRight: 30,
		padding: 10
	},
	formulatext: {
		fontSize: 20,
		fontFamily: "Helvetica",
		color: "#fff",
		textDecorationLine: "underline",
	}
});
