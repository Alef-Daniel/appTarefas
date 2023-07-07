import React, { useState } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList } from 'react-native';

import Login from './src/components/Login/Index';
import TaskList from './src/components/TaskList/Index';

let tasks=[
  {key:'1', nome:'Comprar cooca cola'}, 
  {key:'2', nome:'Comprar cooca cola'}

]
export default function App() {

  const [user, setUser] = useState(null);
  const[newTask, setNewTask] = useState('');


function handleDelete(key){
  console.log(key);
}
function handleEdit(data){
  console.log(data);
}




  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>

      <TextInput
      style={styles.input}
      placeholder='Qual sera sua proxima tarefa?'
      value={newTask}
      onChange={(text)=>setNewTask(text)}
      />
      <TouchableOpacity style={styles.buttonAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      
      </View>

      <FlatList
      data={tasks}
      keyExtractor={(item)=>item.key}
      renderItem={({item})=>(
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}></TaskList>
      )}
      
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',

  },
  containerTask:{
    flexDirection: 'row'
  },
  input:{
    flex:1,
    marginBottom: 10,
    padding:10,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height:45
  },
  buttonAdd:{
    backgroundColor:'#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4
  },
  buttonText:{
    color: 'white',
    fontSize: 22
  }
})