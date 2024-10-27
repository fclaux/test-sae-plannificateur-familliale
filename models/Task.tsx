class Task {
    id: number;
    description: string;
    dueDate: Date | null;
    validationDate: Date | null;
    isDone: boolean;
  
    constructor(id: number, description: string, dueDate: Date) {
      this.id = id;
      this.description = description;
      this.dueDate = dueDate;
      this.validationDate = null;
      this.isDone = false;
    }
  
    markAsDone(): void {
      this.isDone = true;
      this.validationDate = new Date();
    }
  
    markAsNotDone(): void {
      this.isDone = false;
      this.validationDate = null;
    }
  }
  
  export default Task;
  