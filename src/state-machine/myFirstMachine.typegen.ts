// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.todosMachine.loadingTodo:invocation[0]": {
      type: "done.invoke.todosMachine.loadingTodo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todosMachine.loadingTodo:invocation[0]": {
      type: "error.platform.todosMachine.loadingTodo:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todosMachine.loadingTodo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    consoleLogFailure: "error.platform.todosMachine.loadingTodo:invocation[0]";
    consoleLogTodos: "done.invoke.todosMachine.loadingTodo:invocation[0]";
  };
  eventsCausingServices: {
    loadTodos: "clickGetTodosButton";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "loadingTodo" | "todoNotLoading";
  tags: never;
}
