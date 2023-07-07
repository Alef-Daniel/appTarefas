import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import Login from './src/components/Login/Index';
export default function App() {

  const[user, setUser] = useState(null);


if(!user){
  return <Login changeStatus={(user) => setUser(user) }/>
}
  return (

    <SafeAreaView style={styles.container}>
      <View >
        
        <Text>Dentro da tela tarefas</Text>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',

  },
})