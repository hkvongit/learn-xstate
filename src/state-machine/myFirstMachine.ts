import { createMachine } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBcB7CCgOQrIBkL0JIBiTAG10wGsBxMGQAqVCrABCAVzKV8AbQAMAXUSgADuNxlcFfGpAAPRAGYALAHYSJgJwBGABwBWAGxPFbxZYA0IAJ6ILlYWLmZmHg52JooWkRYAvvG+aFh4hKSU1HSMzKwQHNx8AGLouJxSAE5g0rJ6SqpIIJqw2rr6jcYIALQATFaKPSZOdmEOFjbmNmYuvgEIPTYkik4mDqErDtE2LtuJSSD4VHAGKTgExORi2UwskAbNrXoGnT1eJHY2PWZONh52ig5NrNTGYSK8LNFLBY7E5NmszIlkhgzul7lodE8OoguhYnEtBsNRuNJk5gd0fiQpi4ouFVj8Bi49vEgA */
  createMachine(
    {
      id: "(machine)",
      initial: "todoNotLoaded",
      schema: {
        events: {} as
          | { type: "clickGetTodosButton"; todos: string[] }
          | { type: "clickFailureButton"; errorMessage: string },
      },
      tsTypes: {} as import("./myFirstMachine.typegen").Typegen0,
      states: {
        todoNotLoaded: {
          on: {
            clickGetTodosButton: {
              actions: "consoleLogFailure",
            },
            clickFailureButton: {
              actions: "consoleLogTodos",
            },
          },
        },
      },
    },
    {
      actions: {
        consoleLogFailure: (context, event) => {
          console.log("Failure of getting checked items = ", event);
        },
        consoleLogTodos: (context, event) => {
          console.log("Success = ", event);
        },
      },
    }
  );
