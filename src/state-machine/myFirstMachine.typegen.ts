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
    "done.invoke.todosMachine.submitingDelete:invocation[0]": {
      type: "done.invoke.todosMachine.submitingDelete:invocation[0]";
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
    deleteTodo: "done.invoke.todosMachine.submitingDelete:invocation[0]";
    loadTodos: "done.invoke.todosMachine.loadingTodo:invocation[0]";
    saveTodo: "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "saveTodo" | "deleteTodo" | "loadTodos";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignDeleteInputToContext: "ENTERING_TODO_INDEX_TO_DELETE";
    assignErrorToContext: "error.platform.todosMachine.loadingTodo:invocation[0]";
    assignFormInputToContext: "FORM_INPUT_CHANGED";
    assignTodosToContext: "done.invoke.todosMachine.loadingTodo:invocation[0]";
    clearDeleteInputForm: "done.invoke.todosMachine.submitingDelete:invocation[0]";
    clearFormInputToContext: "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
    handleErrorInInputSubmit: "error.platform.todosMachine.creatingNewTodo.savingTodo:invocation[0]";
  };
  eventsCausingServices: {
    deleteTodo: "CONFIRMING_DELETE";
    loadTodos:
      | "CLICKED_GET_TODOS_BUTTON"
      | "done.invoke.todosMachine.creatingNewTodo.savingTodo:invocation[0]"
      | "done.invoke.todosMachine.submitingDelete:invocation[0]";
    saveTodo: "SUBMITING_NEW_TODO";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "creatingNewTodo"
    | "creatingNewTodo.savingTodo"
    | "creatingNewTodo.showingFormInput"
    | "loadingTodo"
    | "submitingDelete"
    | "todoNotLoading"
    | { creatingNewTodo?: "savingTodo" | "showingFormInput" };
  tags: never;
}
