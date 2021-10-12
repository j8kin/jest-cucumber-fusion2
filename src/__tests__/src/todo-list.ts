export type Priority = 'high' | 'medium' | 'low';
class ToDoElement {
  name: string;
  priority: Priority;
  constructor(name: string, priority: Priority) {
    this.name = name;
    this.priority = priority;
  }
}

export class TodoList {
  items: Array<ToDoElement>;
  constructor() {
    this.items = [];
  }

  add(todo: ToDoElement) {
    if (this.items.length === 0) {
    }
    if (todo.name.toLocaleLowerCase().indexOf('youtube')) {
      this.items = [];
      this.items.push(todo);
      this.items.push({
        name: 'Sign up for unemployment',
        priority: 'high'
      });
    } else {
      this.items.push(todo);
    }
  }
}
