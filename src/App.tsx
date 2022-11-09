import { useState } from "react";
import { useMachine } from "@xstate/react";
import { myMachine } from "./state-machine/myFirstMachine";
import "./App.css";

function App() {
  const [state, send] = useMachine(myMachine);
  console.log("🚀 ~ file: App.tsx ~ line 8 ~ App ~ state", state);

  return (
    <div className="App">
      <h1>XState learning app</h1>

      <div>
        <h3>Current state = {JSON.stringify(state.value)}</h3>
        <button
          onClick={() => {
            send({
              type: "clickGetTodosButton",
              todos: ["Clean bathroom", "Tide up shelf"],
            });
          }}
        >
          Call todo items
        </button>
        <button
          onClick={() => {
            send({
              type: "clickFailureButton",
              errorMessage: "Something failed",
            });
          }}
        >
          Make a failure
        </button>
      </div>
    </div>
  );
}

export default App;
