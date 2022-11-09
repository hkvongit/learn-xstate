import { createMachine, assign } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLIEMDGAFgJYB2YAdGhgHKrIAyqOEpUAxHgDZF4DWA4mGQAVdJgBCAV2RoSAbQAMAXUSgADpiLIiqEqpAAPRAFoAbAA5yCgOwBWawE5zAFmdOHd2wBoQAT0QAjAHO5Ka2tgBMtgEWEU6O1gC+iT5UmLiEpBRptAxMLCTseABOYDjIYNRgAO6iGIoqSCAasFo6ek1GCAHW1uQODm4WNgERAQDM5uM+-gjjAQrk5g6mHhER4yvO4+PJqWLY+MRk5CVl2oVVtWLksASo1awAYqjFALYAkiRq0mwAZq9Pt9pABhAg4QqQBr6FptXT6LrrCJWBTmDYeZymBQOcZ2GaIWzOWz9CLWXEOMbzCIKXYpEBpQ6ZE6cfKsOqoNgYE6kABuqF42QOGWOFBZzDZYgQvNQeHK7Qa0KasO08M6gXC5HGNNsplckWsbmc+IQDgC5Biq1sCgi21smxxe3pQqOWXIYoKUHZbDAxWKr3Iak45QB70ozqZotZhXZUpIfNlKvkykV6k0iYRiGc1vI1gUzgC5gUNgiplJDmNpvNpkt1tt9tpdJI6Dg+gZwtdOTojHFhRhafaGe61jNBdNO3MdopWIixrGyPiudGqNMjlp+wwjJFp1KcsuNXZt3uj0KL3eXx+yD7rXTaoQCmNhOJFLJjkpS7XTo37ZOZ13UCu7JXnCHSgF0xjOOYxpEqYJJkiu1obNsDiOm2LrMlGnpiEBN6gYEKw5gaYQGq4qzODaxrGOMIS9HaqzDripJxCh4YithA63sYQQwTY9hOK47ieBRozjARdrmAEDh5la4wrskyRAA */
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
          | { type: "clickFailureButton" },
        services: {} as {
          loadTodos: {
            data: string[];
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
                formInputChanged: {
                  actions: "assignFormInputToContext",
                },
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
                actions: "assignTodosToContex",
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
        assignTodosToContex: assign((context, event) => {
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
      },
    }
  );
