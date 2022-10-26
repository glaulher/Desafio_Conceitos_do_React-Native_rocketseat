import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskState = tasks.map(task => ({ ...task }));

    const findTask = (taskState.find(task=>task.title === newTaskTitle))


    if(findTask){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return
    }
    

    const addTask ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldTasks =>[...oldTasks,addTask])

  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => ({ ...task }))
    
    const findTask = (updatedTasks.find(task=>task.id === id))

    if(!findTask) {
      return
    }

    findTask.done = !findTask.done    
    setTasks(updatedTasks)

    
  }

  function handleEditTask(taskId: number,taskNewTitle: string){
    const updatedTasks = tasks.map(task => ({ ...task }))
    
    const findTask = updatedTasks.find(task=>task.id === taskId)

    if(!findTask) {
      return
    }
    findTask.title = taskNewTitle    
    setTasks(updatedTasks)   
    
  }

  function handleRemoveTask(id: number) {
    
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(task => task.id !== id));
            return;
          },
        },
      ]
    );

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})