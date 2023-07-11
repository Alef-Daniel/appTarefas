import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import firebase from '../services/firebaseConnection';

export default function Login({changeStatus}) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('login');


   
    function handleLogin(){
        if(type=== 'login'){
            //aqui fazemos login do usuário   
            const user= firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{
                changeStatus(user.user.uid);
            })
            .catch((err)=>{
                console.log(err)
                    alert('Algo deu errado!')
                    return;
               })  
        }else{
            //aqui cadastramos o usuário
               const user= firebase.auth().createUserWithEmailAndPassword(email, password)
               .then((user)=>{
                changeStatus(user.user.uid);
               })
               .catch((err)=>{
                console.log(err)
                    alert('Algo deu errado!')
                    return;
               })
        }
    }
    return (

        <SafeAreaView style={styles.container}>
        <View >
          
          <TextInput placeholder='Seu e-mail' style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
          <TextInput placeholder='*********' style={styles.input} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
            <TouchableOpacity style={[styles.handleLogin, { backgroundColor: type === 'login'?'#3ea6f2': '#141414' } ]} onPress={handleLogin}>
                <Text style={styles.loginText}>{type=== 'login'? 'Acessar': 'Cadastrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> setType(type=> type==='login' ? 'cadastrar': 'login')}>
                <Text style={{textAlign: 'center', color: 'black'}}>{type === 'login' ? 'Criar uma conta': 'Já possuo uma conta'}</Text>
            </TouchableOpacity>
        
        </View>
      </SafeAreaView>
  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#f2f6fc',
        paddingHorizontal: 10
    },

    input:{
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius:4,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414'
    },

    handleLogin:{
        alignItems: 'center',
        justifyContent: 'center',
       
        height: 45,
        marginBottom: 10
    },
    loginText:{
        color: 'white',
        fontSize: 17
    }
})