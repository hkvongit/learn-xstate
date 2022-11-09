import { useState } from "react";
import { useMachine } from "@xstate/react";
import { myMachine } from "./state-machine/myFirstMachine";
import "./App.css";

function App() {
  const [state, send] = useMachine(myMachine);

  return (
    <div className="App">
      <h1>XState learning app</h1>

      <div>
        <h3>Current state = {JSON.stringify(state.value)}</h3>
        <button
          onClick={() => {
            send("CHECK_BUTTON_CLICK");
          }}
        >
          Check button
        </button>
        <button
          onClick={() => {
            send("UN_CHECK_BUTTON_CLICK");
          }}
        >
          UnCheck button
        </button>
      </div>
    </div>
  );
}

export default App;
