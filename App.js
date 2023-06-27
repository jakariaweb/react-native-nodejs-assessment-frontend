import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Books from './src/components/Books/Books';
import BookDetails from './src/components/Books/BookDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  const [bookTitle, setBookTitle] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Books}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="BookDetails" component={BookDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
