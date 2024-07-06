import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import SignIn from './src/screens/SignIn';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

import { StatusBar } from 'react-native';
import { AppProvider, UserProvider } from '@realm/react';
import { REALM_APP_ID } from '@env';
import Home from './src/screens/Home';
import Loading from './src/components/Button/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  
  if(!fontsLoaded) {
    return ( 
      <Loading />
    )
  }

  return (
    <AppProvider id={REALM_APP_ID} >
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent/>
      <UserProvider >
        <Home/>
      </UserProvider>
      <SignIn/>
    </ThemeProvider>
    </AppProvider>

  );
}

