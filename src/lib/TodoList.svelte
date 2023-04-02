<script lang="ts">
  import { onMount } from 'svelte'
  import {
    getFirestore,
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
  } from 'firebase/firestore'

  interface Todo {
    id: string
    title: string
    completed: boolean
  }

  const db = getFirestore()
  const colRef = collection(db, 'todos')

  let todos = []
  let newTodoTitle = ''

  // onSnapshot(colRef, (querySnapshot) => {
  //   querySnapshot.forEach((doc) =>
  //     console.log({
  //       id: doc.id,
  //       ...doc.data(),
  //     })
  //   )
  // })

  const getTodos = async () => {
    const querySnapshot = await getDocs(colRef)
    querySnapshot.forEach((doc) => {
      todos = [
        {
          id: doc.id,
          ...doc.data(),
        },
        ...todos,
      ]
    })
  }

  const addTodo = async () => {
    if (!newTodoTitle) return

    const newTodo = {
      title: newTodoTitle,
      completed: false,
    }

    const newDoc = await addDoc(colRef, newTodo)
    console.log(newDoc.id)
    todos = [
      ...todos,
      {
        id: newDoc.id,
        ...newTodo,
      },
    ]

    newTodoTitle = ''
  }

  const toggleCompleted = (todo: Todo) => {
    updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    })
  }

  const deleteTodo = (todoId: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id == todoId)

    todos = [...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)]

    deleteDoc(doc(db, 'todos', todoId))
  }

  onMount(async () => {
    await getTodos()
  })
</script>

<form on:submit|preventDefault={addTodo} class="add-todo-form">
  <fieldset>
    <legend>Add todos</legend>
    <div>
      <input bind:value={newTodoTitle} type="text" placeholder="New todo" />
      <button>Add</button>
    </div>
  </fieldset>
</form>

{#if todos.length}
  <ul class="todo-list">
    {#each todos as todo (todo.id)}
      <li class="todo-list-item">
        <label>
          <input
            type="checkbox"
            on:change={() => toggleCompleted(todo)}
            bind:checked={todo.completed}
          />
          {todo.title}
        </label>
        <button on:click={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .add-todo-form {
    margin: 0 0 1em;
  }

  .add-todo-form div {
    display: flex;
  }

  .add-todo-form input[type='text'] {
    flex: 3;
    font-size: 100%;
    margin: 0 8px 0 0;
    padding: 8px;
  }

  .add-todo-form button {
    flex: 1;
  }

  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .todo-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.25em 0;
  }
</style>
