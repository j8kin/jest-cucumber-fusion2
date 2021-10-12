import { After, Before, Given, When, Then, Fusion } from '../../../index';
import { Priority, TodoList } from '../../src/todo-list';
import { stepArgType } from '../step-definitions/step-helpers';

let todoList: TodoList;

Before(() => {
  todoList = new TodoList();
});

Given('my todo list currently looks as follows:', (table: stepArgType) => {
  if (typeof table === 'string') throw new Error('Invalid step parametertype');
  table.forEach((row) => {
    todoList.add({
      name: row.TaskName,
      priority: row.Priority as Priority
    });
  });
});

When('I add the following task:', (table: stepArgType) => {
  if (typeof table === 'string') throw new Error('Invalid step parametertype');
  todoList.add({
    name: table[0].TaskName,
    priority: table[0].Priority as Priority
  });
});

Then(
  /^I should see the following (\d) todos in my list:$/,
  (nbre: stepArgType, table: stepArgType) => {
    if (typeof nbre !== 'string') throw new Error('Invalid step parametertype');
    if (typeof table === 'string')
      throw new Error('Invalid step parametertype');
    expect(todoList.items.length).toBe(parseInt(nbre));
    expect(todoList.items.length).toBe(table.length);

    table.forEach((row, index) => {
      expect(todoList.items[index].name).toBe(table[index].TaskName);
      expect(todoList.items[index].priority).toBe(table[index].Priority);
    });
  }
);

After(() => {
  const emptyTodo = new TodoList();
  emptyTodo.add({ name: 'Empty on purpose', priority: 'low' });
});

Fusion('../using-gherkin-tables.feature');
