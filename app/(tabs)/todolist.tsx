import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';

export default function TabTwoScreen() {
  const [taskId, setTaskId] = useState(0);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ key: string, value: string }[]>([]);

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
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.taskItem} onPress={() => handleDeleteTask(item.key)}>
              <Text>{item.key} : {item.value}</Text>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
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
  deleteButton: {
    color: '#d32f2f',
    width: 300,
    textAlign: 'right',
  },
});
