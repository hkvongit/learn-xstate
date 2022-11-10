import { createMachine, assign } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLIEMDGAFgJYB2YAdGhgHKrIAyqOEpUAxHgDZF4DWA4mGQAVdJgBCAV2RoSAbQAMAXUSgADpiLIiqEqpAAPRAFoAbAA5yCgOwBWawE5zAFmdOHd2wBoQAT0QAjAHO5Ka2tgBMtgEWEU6O1gC+iT5UmLiEpBRptAxMLCTseABOYDjIYNRgAO6iGIoqSCAasFo6ek1GCAHW1uQODm4WNgERAQDM5uM+-gjjAQrk5g6mHhER4yvO4+PJqWLY+MRk5CVl2oVVtWLksASo1awAYqjFALYAkiRq0mywkgAjN5aBr6FptXT6LrjdbkTbWcwBKbmdYKCLOGaIbYOciRewKZbjBS2BSmCKmPYgNKHTInM7lVhXOqoW73R6FF7vL4-ZBsABmr0+32kAGECDhCpBQU1wdpIZ1EOsIlYCRsPM5TAoHOM7JiELZnLZ+hFrDqHGN5hEFLsUlSDhljhR6RcoEybrAcAA3VjMtgYE6kT2oXjZe1HLKnUoMy41Zm3L0+sQIQOoPAM3QNaXqTRyjqgLoGgJw0bjZwLWxE8xTPXGMbkOLBVxKnaOG37DA0x2R86M2PuhOFX1gYrFV7kNSccoC96UMO0p1Rl1ujDx72DpMptO5zPKME59pQxCWRzmBQEgZ2a3OU166zW+tuHq2UyeGwU23Uh0Rzj5RMYP26BQKYhrOHZficP7MH+qDJiQQZbu0O6NNmrS5oe3ThHC1rPq4kTWG4GJ+IgDhFjEqwkui4wVgMbZ2mB4YQb+67-sOo7FOOk7INObygekDEUJBBRQMysHwem8jKFmzT7vK+ZYmi5B3mWp42OSJoOHqJHkGRDgUds1HasktokOgcD6J+-G8bkjBQYUe6oQeCrdNYpHLBMkzUeSaJ6mMyrxHeowEi+hkfnOXbOr21wrncDzPIK3LSPZEJ5oYiCLBeVobKWEyks4KJ6oaRbWkEdjjGEL5RJSFnzt20aun20UDsJYhJWhTl5UW5jPk4pYGtEtgrAVgy4rpHimGSBpElRVVhRGEUxlFqCtY5ckIMY14qup1jjbY5irFRepUYseJ3lWZJauSzgzfRNWCdBy2yal3QrIp+FhPhrirM46I1qWr0VqsLk6iacTXXx84PSlXTGEEphWHYJ6uO4ng1iW-2TLp4Sli5ERGYkQA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: null as string | null,
        newTodoInput: "",
      },
      tsTypes: {} as import("./myFirstMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | { type: "createNewTodo" }
          | { type: "formInputChanged"; value: string }
          | { type: "clickGetTodosButton" }
          | { type: "clickFailureButton" }
          | { type: "submit" },
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
        },
      },
      id: "todosMachine",
      initial: "todoNotLoading",
      states: {
        todoNotLoading: {
          on: {
            clickGetTodosButton: {
              target: "loadingTodo",
            },
            createNewTodo: {
              target: "creatingNewTodo",
            },
          },
        },
        creatingNewTodo: {
          initial: "showingFormInput",
          states: {
            showingFormInput: {
              on: {
                submit: {
                  target: "savingTodo",
                },
                formInputChanged: {
                  actions: "assignFormInputToContext",
                },
              },
            },
            savingTodo: {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#todosMachine.loadingTodo",
                    actions: "clearFormInputToContext",
                  },
                ],
                onError: [
                  {
                    target: "showingFormInput",
                    actions: "handleErrorInInputSubmit",
                  },
                ],
              },
            },
          },
        },
        loadingTodo: {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "todoNotLoading",
                actions: "assignTodosToContext",
              },
            ],
            onError: [
              {
                target: "todoNotLoading",
                actions: "assignErrorToContext",
              },
            ],
          },
        },
      },
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return { errorMessage: (event.data as Error).message };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            newTodoInput: event.value,
          };
        }),
        clearFormInputToContext: assign((context, event) => {
          return {
            newTodoInput: "",
          };
        }),
        handleErrorInInputSubmit: assign((context, event) => {
          console.error("Error occured in saving new todo", event);
          return { errorMessage: (event.data as Error).message };
        }),
      },
    }
  );
