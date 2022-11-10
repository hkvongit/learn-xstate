import { useState } from "react";
import { useMachine } from "@xstate/react";
import { myMachine } from "./state-machine/myFirstMachine";
import "./App.css";

const initialTodos = new Set<string>(["Clean trash can", "Go for walking"]);

function App() {
  const [amIinGoodMood, setMyMood] = useState(true);
  const [state, send] = useMachine(myMachine, {
    services: {
      loadTodos: async () => {
        if (amIinGoodMood) {
          return Array.from(initialTodos);
        }
        throw new Error("Some error");
      },
      saveTodo: async () => {},
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
              type: "clickGetTodosButton",
            });
          }}
        >
          Call todo items
        </button>
        <button
          onClick={() => {
            send({
              type: "clickFailureButton",
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
                type: "createNewTodo",
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
                type: "submit",
              });
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                send({
                  type: "formInputChanged",
                  value: e.target.value,
                });
              }}
            />
            <button>Submit</button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default App;
