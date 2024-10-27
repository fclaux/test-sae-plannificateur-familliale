import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import Task from '@/models/Task';

export default function TabTwoScreen() {
  const [taskId, setTaskId] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      const newTask = new Task(taskId, taskTitle, new Date());
      setTasks([...tasks, newTask]);
      setTaskTitle(''); // Réinitialise le champ d'entrée pour le titre
      setTaskDescription(''); // Réinitialise le champ d'entrée pour la description
      setTaskId(taskId + 1);
    }
  };

  const handleDeleteTask = (taskKey: number) => {
    setTasks(tasks.filter((t) => t.id !== taskKey));
  };

  const handleDeleteCompletedTask = (taskKey: number) => {
    setCompletedTasks(completedTasks.filter((t) => t.id !== taskKey));
  };

  const handleAddCompletedTask = (taskKey: number) => {
    const taskToComplete = tasks.find((t) => t.id === taskKey);
    if (taskToComplete) {
      taskToComplete.markAsDone();
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter((t) => t.id !== taskKey));
    }
  };

  const handleUncompletedTask = (taskKey: number) => {
    const taskToUncomplete = completedTasks.find((t) => t.id === taskKey);
    if (taskToUncomplete) {
      taskToUncomplete.markAsNotDone();
      setTasks([...tasks, taskToUncomplete]);
      handleDeleteCompletedTask(taskToUncomplete.id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche..."
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ajouter une description..."
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <Button title="Ajouter" onPress={handleAddTask} color="#00796b" />
      <Text style={styles.sectionTitle}>Tâches en cours</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleAddCompletedTask(item.id);
            }}
          >
            <View style={styles.taskItem}>
              <Text>{item.description}</Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.sectionTitle}>Tâches terminées</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUncompletedTask(item.id)}>
            <View style={styles.completedTaskItem}>
              <Text style={styles.completedTaskText}>{item.description}</Text>
              <TouchableOpacity onPress={() => handleDeleteCompletedTask(item.id)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
    textAlign: 'center',
  },
  input: {
    borderColor: '#00796b',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  completedTaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  completedTaskText: {
    color: '#8a8a8a',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    color: '#d32f2f',
    width: 50,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
});
