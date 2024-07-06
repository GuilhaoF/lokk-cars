import { Container, Slogan, Title } from "./styles";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import Backgrund from "../../assets/background.png";
import { Button } from "../../components/Button";
import { ANDROID_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import { Realm, useApp } from "@realm/react";
import { Alert} from "react-native";


WebBrowser.maybeCompleteAuthSession(); // serve para limpar a sessão de autenticação


export default function SignIn() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();
 

  const [request , response, googleSignIng] = Google.useAuthRequest({
    androidClientId: '99178311838-pjhah5ka0q9lu7pkps3svndni9t2av8j.apps.googleusercontent.com',
    scopes: ["profile", "email"],
  });

  function handleSignIn() {
    setIsAuthenticating(true);

    googleSignIng().then((response) => {
      if (response?.type !== 'success') {
        console.log(response);
        setIsAuthenticating(false);
      }
    });
  }
  useEffect(() => {
    if (response?.type === 'success') {
     if(response.authentication?.idToken){
      const credentials = Realm.Credentials.jwt(response.authentication.idToken);
      app.logIn(credentials).catch((error) => {
        console.log(error);
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
        setIsAuthenticating(false);
      });
     }else{
      Alert.alert(
        "Entrar",
        "Não foi possível conectar-se a sua conta Google."
      );
      setIsAuthenticating(false);
     }
    }
  }, [response]);


    

  return (
    <Container source={Backgrund}>
      <Title>Lokk Cars</Title>
      <Slogan>Seu veículo está aqui</Slogan>
      <Button
        onPress={handleSignIn}
        title="Entrar com Google"
      />
     
    </Container>
  )
}
