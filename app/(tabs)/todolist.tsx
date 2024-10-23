import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';

export default function TabTwoScreen() {
  const [taskId, setTaskId] = useState(0);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ key: string, value: string }[]>([]);
  const [completedTasks, setCompletedTasks] = useState<{ key: string, value: string }[]>([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: taskId.toString(), value: task }]);
      setTask(''); // Réinitialise le champ d'entrée
      setTaskId(taskId+1)
    }
  };

  const handleDeleteTask = (taskKey: string) => {
    setTasks(tasks.filter((t) => t.key !== taskKey));
  };

  const handleDeleteCompletedTask = (taskKey: string) => {
    setCompletedTasks(completedTasks.filter((t) => t.key !== taskKey));
  };

  const handleAddCompletedTask = (taskKey: string) => {
    const taskToComplete = tasks.find(t => t.key === taskKey);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, { key: taskToComplete.key, value: taskToComplete.value }]);
    }
  }

  const handleUncompletedTask = (taskKey: string) => {
    const taskToUncomplete = completedTasks.find(t => t.key === taskKey);
    if (taskToUncomplete) {
      setTasks([...tasks, { key: taskToUncomplete.key, value: taskToUncomplete.value }]);
      handleDeleteCompletedTask(taskToUncomplete.key);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Ajouter" onPress={handleAddTask} color="#00796b" />
      <Text style={styles.sectionTitle}>Tâches en cours</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            handleAddCompletedTask(item.key);
            handleDeleteTask(item.key);
          }}>
            <View style={styles.taskItem}>
              <Text>{item.value}</Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.key)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.sectionTitle}>Tâches terminées</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUncompletedTask(item.key)}>
            <View style={styles.completedTaskItem}>
              <Text style={styles.completedTaskText}>{item.value}</Text>
              <TouchableOpacity  onPress={() => handleDeleteCompletedTask(item.key)}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
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
