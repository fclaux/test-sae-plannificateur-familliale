import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native"; // Importer View et useColorScheme de React Native
import { Colors } from '@/constants/Colors';
import Task from "@/models/Task"; // Chemin vers ta classe Task
import TaskBar from "@/components/TaskBar"; // Assure-toi que le chemin vers TaskBar est correct
import { ThemedText } from "@/components/ThemedText"; // Importer le composant ThemedText

// Création d'instances de Task pour chaque tâche
const tasksData = [
  new Task(1, "Buy groceries", new Date("2024-10-28")),
  new Task(2, "Complete React project", new Date("2024-11-01")),
  new Task(3, "Pay bills", new Date("2024-10-25")),
];

// Composant TaskList qui affiche une liste de tâches
const TaskList: React.FC = () => {

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header} type="title">To-Do List</ThemedText>
      {tasksData.map((task) => (
        <TaskBar
          key={task.id}
          title={task.description}       // Utilise `description` pour le titre
          description={task.description} // Ajoute `description` pour les props
          isCompleted={task.isDone}      // Utilise `isDone` pour le statut
          dueDate={task.dueDate}         // Passe `dueDate`
        />
      ))}
    </View>
  );
};

const colorScheme = useColorScheme(); // Définir colorScheme

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[colorScheme ?? 'light'].background, // Utilise une couleur transparente, peut être changé selon le besoin
  },
  header: {
    marginBottom: 10,
  },
});

export default TaskList;
