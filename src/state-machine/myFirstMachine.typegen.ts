// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]": {
      type: "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todosMachine.loadingTodo:invocation[0]": {
      type: "done.invoke.todosMachine.loadingTodo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todosMachine.creatingNewTodo.savingTodo:invocation[0]": {
      type: "error.platform.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
      data: unknown;
    };
    "error.platform.todosMachine.loadingTodo:invocation[0]": {
      type: "error.platform.todosMachine.loadingTodo:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todosMachine.loadingTodo:invocation[0]";
    saveTodo: "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "saveTodo" | "loadTodos";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignErrorToContext: "error.platform.todosMachine.loadingTodo:invocation[0]";
    assignFormInputToContext: "formInputChanged";
    assignTodosToContext: "done.invoke.todosMachine.loadingTodo:invocation[0]";
    clearFormInputToContext: "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
    handleErrorInInputSubmit: "error.platform.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
  };
  eventsCausingServices: {
    loadTodos:
      | "clickGetTodosButton"
      | "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
    saveTodo: "submit";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "creatingNewTodo"
    | "creatingNewTodo.savingTodo"
    | "creatingNewTodo.showingFormInput"
    | "loadingTodo"
    | "todoNotLoading"
    | { creatingNewTodo?: "savingTodo" | "showingFormInput" };
  tags: never;
}
