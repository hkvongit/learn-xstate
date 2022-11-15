import { useState } from "react";
import { useMachine } from "@xstate/react";
import { myMachine } from "./state-machine/myFirstMachine";
import "./App.css";
import { Checkbox } from "@chakra-ui/react";

const initialTodosSet = new Set<string>(["Clean trash can", "Go for walking"]);
const initialTodos: string[] = Array.from(initialTodosSet);

function App() {
  const [amIinGoodMood, setMyMood] = useState(true);
  const [state, send] = useMachine(myMachine, {
    services: {
      loadTodos: async () => {
        if (amIinGoodMood) {
          return initialTodos;
        }
        throw new Error("Some error");
      },
      saveTodo: async (context, event) => {
        initialTodos.push(context.newTodoInput);
        return;
      },
      deleteTodo: async (context, event) => {
        let currentTodos = initialTodos;
        const indexOfTodoToDelete = context.indexOfTodoToDelete;

        console.log("index of todo to delete = ", indexOfTodoToDelete);

        const isValid =
          typeof indexOfTodoToDelete === "number" &&
          indexOfTodoToDelete > 0 &&
          indexOfTodoToDelete < currentTodos.length + 1;
        console.log(
          "isValid, currentTodos, typeof indexOfTodoToDelete",
          isValid,
          currentTodos,
          indexOfTodoToDelete
        );
        if (isValid && typeof indexOfTodoToDelete === "number") {
          currentTodos.splice(indexOfTodoToDelete - 1, 1);
          return;
        }
        throw new Error("Delete todo failed");
      },
    },
  });
  // console.log("🚀 ~ file: App.tsx ~ line 8 ~ App ~ state", state);

  return (
    <div className="App">
      <h1>XState learning app</h1>

      <div>
        <h3>Current state = {JSON.stringify(state.value)}</h3>
        <pre>Current context = {JSON.stringify(state.context)}</pre>
        <button
          onClick={() => {
            send({
              type: "CLICKED_GET_TODOS_BUTTON",
            });
          }}
        >
          Call todo items
        </button>
        <button
          onClick={() => {
            send({
              type: "CLICKED_FAILURE_BUTTON",
            });
          }}
        >
          Make a failure
        </button>
      </div>
      <button
        onClick={() => {
          setMyMood((currentMood) => !currentMood);
        }}
      >
        Change my mood to {!amIinGoodMood ? "Pleasant" : "angry"}
      </button>

      <div>
        {state.matches("todoNotLoading") ? (
          <button
            onClick={() =>
              send({
                type: "CREATE_NEW_TODO",
              })
            }
          >
            add new todo
          </button>
        ) : null}

        {state.matches("creatingNewTodo.showingFormInput") ? (
          <form
            onSubmit={() => {
              send({
                type: "SUBMITING_NEW_TODO",
              });
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                send({
                  type: "FORM_INPUT_CHANGED",
                  value: e.target.value,
                });
              }}
            />
            <button>Submit</button>
          </form>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send({
            type: "CONFIRMING_DELETE",
          });
        }}
      >
        <input
          type={"number"}
          onChange={(e) => {
            send({
              type: "ENTERING_TODO_INDEX_TO_DELETE",
              value: Number(e.target.value),
            });
          }}
          value={state.context.indexOfTodoToDelete || 0}
        />
        <button type="submit">Delete todo</button>
      </form>
    </div>
  );
}

export default App;
