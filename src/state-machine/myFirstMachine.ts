import { createMachine, assign } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLIEMDGAFgJYB2YAdGhgHKrIAyqOEpUAxHgDZF4DWA4mGQAVdJgBCAV2RoSAbQAMAXUSgADpiLIiqEqpAAPRAFoAbAA5yCgOwBWawE5zAFmdOHd2wBoQAT0QAjAHO5Ka2tgBMtgEWEU6O1gC+iT5UmLiEpBRptAxMLCTseABOYDjIYNRgAO6iGIoqSCAasFo6ek1GCAHW1uQODm4WNgERAQDM5uM+-gjjAQrk5g6mHhER4yvO4+PJqWLY+MRklGK5jMysbLBgnGB4ImKiACK3QmAN+i1tuvpdxhFzIsLNZTAFlkDnOZrApTDMTBE+mNRqY4stbG5bLsUiA0odMicSmVtIUqrUxORYARUNVWAAxVDFAC2AEkSGppNdJAAjJlaT5Nb7aX6dRDjdbkTbWczgybrBQRZzwhDbBzkSL2BTLcYKWywiKmPa4g4ZY4UInlVhkuqoSnU2mFBnMtkc5BsABmjNZ7OkAGECDhCpABepNMKOqAuusIlYtRsPM5TAoHOM7MqMbZ+ojUw4xvMIgpsfsMPizeQLSSoNaKbAcAA3Vg2tgYE6kOuoXjZE1HLLl0qW0k1G2U+uNsQINuoPCW3QNEPNMPtP6IDEBSWjcbOBZYrVTZUAtdxYKuaM7RxF40l029itWoc10eFJtgYrFRnkNSccqe5mnK89wl+0rasMBHBsn3HSdp3DOdlC+RcRUjRBLEcIEtQGOxC2caxpj8RAYXGchFQcHpbFMTwbENHE8WvE4bjuB4xwwF43gqcgIFYpjUGbXQKEnTs-3SACKHo+5KxtFi7jYjipK4icSHbaD2lgxpQ1acNlwQYxIj6aVUS3axiIUZxvDwrSFkIgZIg8GwC3Meykmo7sCQoTh8i4njWwUjsu3-FzyDcy4IIweTFJneRlHnIUl1FboPHIRNDILNx5iCYJlRI8gYlWWxoWcOJTDCC8aOEgL3OC7iXzfYoPy-ZAfyZQTS17QKCigG1QqncKVPg9SYqQlUFXIGEtzQwzUUcDK12yhw9UVcYsQGbEcRIdA4H0Er-JyOgLja3qfgjQxAkRYbbFm0xN0mZxjJI5UNhjKJelSrdCqCRziyE-zb0HclQKpGl6S9F1pH2jTYsWDCCw2TcJlhKEImVEy10LN6sTCcioiNTay2+qt7z+x92rEUH+qOlUZSWMinE3DMAjOuEzLcEIzrO0FUQxHUFqx5ycaAu9ftQEnELJ4xsNjREPEK3LVgW5UFsWDVyKCa6LGKnne1ExiKsk952M4iqhcO-4YasDwYlhHZTETBnZmt9VBmCOIt03JNnG5vyy018SnlQV4pLAQ3NOMSY1WTaxzYu8YrcKuXentrddTpun1nMWx3c+stWq4wPYoCFZhusRN7FcRNBkVfdNwLtGzdTRE4nT5qyBzgbtLsYbzH0nojJM-c85jKy4icDELq1ZJkiAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: null as string | null,
        newTodoInput: "",
        indexOfTodoToDelete: null as null | number,
      },
      tsTypes: {} as import("./myFirstMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | { type: "CREATE_NEW_TODO" }
          | { type: "FORM_INPUT_CHANGED"; value: string }
          | { type: "CLICKED_GET_TODOS_BUTTON" }
          | { type: "CLICKED_FAILURE_BUTTON" }
          | { type: "SUBMITING_NEW_TODO" }
          | { type: "ENTERING_TODO_INDEX_TO_DELETE"; value: number }
          | { type: "CONFIRMING_DELETE" },

        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
      },
      id: "todosMachine",
      initial: "todoNotLoading",
      on: {
        ENTERING_TODO_INDEX_TO_DELETE: {
          actions: "assignDeleteInputToContext",
        },
        CONFIRMING_DELETE: {
          target: "submitingDelete",
        },
      },
      states: {
        todoNotLoading: {
          on: {
            CLICKED_GET_TODOS_BUTTON: {
              target: "loadingTodo",
            },
            CREATE_NEW_TODO: {
              target: "creatingNewTodo",
            },
          },
        },
        creatingNewTodo: {
          initial: "showingFormInput",
          states: {
            showingFormInput: {
              on: {
                SUBMITING_NEW_TODO: {
                  target: "savingTodo",
                },
                FORM_INPUT_CHANGED: {
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
        submitingDelete: {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "#todosMachine.loadingTodo",
                actions: "clearDeleteInputForm",
              },
            ],
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
        assignDeleteInputToContext: assign((context, event) => {
          return { indexOfTodoToDelete: event.value };
        }),
        clearDeleteInputForm: assign((context, event) => {
          return { indexOfTodoToDelete: null };
        }),
      },
    }
  );
