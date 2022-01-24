import React from 'react';
import { StyleSheet, StatusBar, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";

import store from "./src/store";
import * as Colors from "./src/styles/Colors";
import DraftScreen from "./src/views/Draft";
import CameraScreen from "./src/views/Camera";
import DraftGalleryScreen from './src/views/DraftGallery';
import SaveButton from "./src/common/SaveButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider >
        <View style={styles.statusBarContainer}>
          <StatusBar barStyle="dark-content" />
        </View>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="DraftGallery">
            <Stack.Screen 
              name="Draft" 
              component={DraftScreen} 
              options={{
                headerTitle: "",
                headerRight: () => (
                  <SaveButton />
                )
              }}
            />
            <Stack.Screen name="DraftGallery" component={DraftGalleryScreen} options={{headerTitle: ""}}/>
            <Stack.Screen name="Camera" component={CameraScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    width: "100%",
    height: 20,
  },
});
