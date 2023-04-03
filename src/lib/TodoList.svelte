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

<h1>Todos</h1>

<form on:submit|preventDefault={addTodo} class="add-todo-form">
  <fieldset>
    <legend>Add todos</legend>
    <div>
      <label>
        <input bind:value={newTodoTitle} type="text" placeholder="New todo…" />
      </label>
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
        <button on:click={() => deleteTodo(todo.id)} class="outline"
          >Delete</button
        >
      </li>
    {/each}
  </ul>
{/if}
