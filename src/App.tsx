import { useState } from "react";
import { useMachine } from "@xstate/react";
import { myMachine } from "./state-machine/myFirstMachine";
import "./App.css";

function App() {
  const [amIinGoodMood, setMyMood] = useState(true);
  const [state, send] = useMachine(myMachine, {
    services: {
      loadTodos: async () => {
        if (amIinGoodMood) {
          return ["Clean trash can", "Go for walking"];
        }
        throw new Error("Some error");
      },
    },
  });
  // console.log("🚀 ~ file: App.tsx ~ line 8 ~ App ~ state", state);

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
      <button
        onClick={() => {
          setMyMood((currentMood) => !currentMood);
        }}
      >
        Change my mood to {!amIinGoodMood ? "Pleasant" : "angry"}
      </button>
    </div>
  );
}

export default App;
