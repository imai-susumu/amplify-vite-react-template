import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

/* ima - login/out */
import { Authenticator } from '@aws-amplify/ui-react';  // 認証用のAmplify UI Component
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  /* ima - delete functions */
  function deleteTodo(id:string) {
    client.models.Todo.delete({ id });
  }

  return (
    /* ima - login/out */
    <Authenticator>
      { /* ima - login/out */}
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li
                onClick={() => deleteTodo(todo.id) } /* ima - delete function */
                key={todo.id}>{todo.content}
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          { /* ima - login/out */ } 
          <button onClick={signOut}>Sign out</button>
        </main>
      /* ima - login/out*/
      )}
    { /* ima - login/out */ }
    </Authenticator>
  );
}

export default App;
