import React, { useState, useEffect } from "react";

// Définition des propriétés du composant Task
interface TaskProps {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date | null;
}

// Composant Task
const Task: React.FC<TaskProps> = ({ title, description, isCompleted, dueDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mettre à jour la date actuelle chaque fois que le composant est rendu
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000); // Mise à jour chaque minute
    return () => clearInterval(interval);
  }, []);

  // Vérifier si la tâche est en retard
  const isOverdue = !isCompleted && dueDate !== null && currentDate > dueDate;

  // Styles conditionnels
  const taskStyle = {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: isCompleted ? "#d4edda" : isOverdue ? "#f8d7da" : "#fff3cd",
    color: isCompleted ? "#155724" : isOverdue ? "#721c24" : "#856404",
    border: `1px solid ${isCompleted ? "#c3e6cb" : isOverdue ? "#f5c6cb" : "#ffeeba"}`
  };

  return (
    <div style={taskStyle}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {isCompleted ? "Completed" : isOverdue ? "Overdue" : "In Progress"}</p>
      <p>Due Date: {dueDate ? dueDate.toLocaleDateString() : "No due date"}</p>
    </div>
  );
};

export default Task;
