import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';

import Login from './src/components/Login/Index';
import TaskList from './src/components/TaskList/Index';
import firebase from './src/components/services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

export default function App() {
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [task, setTask] = useState([]);
  const [key, setKey] = useState('');



  useEffect(() => {

    function getUser() {
      if (!user) {
        return;
      }




      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTask([]);
        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTask(oldTasks => [...oldTasks, data]);
        })

      })

    }

    getUser();


  }, [user])






  function handleAdd() {
    if (newTask === '') {
      return;
    }

    //usuario quer editar uma tarefa?
    if (key !== '') {
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
        .then(() => {
          const taskIndex = task.findIndex(item => item.key === key);
          let taskClone = task;
          taskClone[taskIndex].nome = newTask;
          setTask([...taskClone]);

        })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }


    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;
    tarefas.child(chave).set({
      nome: newTask
    })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask
        };

        setTask(oldTasks => [...oldTasks, data]);
      })
    setNewTask('');
    Keyboard.dismiss();
  }
  function handleDelete(key) {
    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(() => {
        //fazendo um filter para passar para variavel todos os itens que não são igual a key
        const findTask = task.filter(item => item.key !== key);
        setTask(findTask);
      })
  }
  function handleEdit(data) {
    setNewTask(data.nome)
    inputRef.current.focus();
    setKey(data.key);
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }




  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }
  return (

    <SafeAreaView style={styles.container}>


      {key.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name='x-circle' color='#ff0000' size={20}></Feather>
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: '#ff0000' }}>Você esta editando uma tarefa!</Text>
        </View>
      )}



      <View style={styles.containerTask}>

        <TextInput
          style={styles.input}
          placeholder='Qual será sua próxima tarefa?'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={task}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
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
  containerTask: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 22
  }
})