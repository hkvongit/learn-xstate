import { createMachine, assign } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwLIEMDGAFgJYB2YAdGhgHKrIAyqOEpUAxHgDZF4DWA4mGQAVdJgBCAV2RoSAbQAMAXUSgADpiLIiqEqpAAPRAFoATABYF5AMwBWBbYCcADgXPbANgCMChQHYAGhAAT0RrU2dyfy9nc2c-UwVTaw9TAF80oKpMXEJSCk4mFhIoUQw2DDJyUgA3VF4KbOx8YirC5lYy1ARa1DwcbV1FJWH9DVgtHT0kQxMvD3JHPy9k2xjTRw9rLy9rINCEawVzcltnO3ME1z9nZy9zDKyxZry2os6xNjAAJ2-Ub-Iak4AwAZv8ALaUZ65VoFd4lLo9Eh1fqDeTKUYzcaTXT6IwIZJWcwbayucwpRxeWzhfZhY6nc62S4Rfy3e4ZTIgEjoOD6Jow-JQmh0RgdEpjTRovFzKLuDweWw3Lw3Dxxdy0hDEhaWYkuCxOUx+WyPED8lqC9rFUpiCUTKUzfEWcjmRwuRWuZwuZXzDXKyKqlaG8J2RKOdKcs2vMC2nHTUD4sy3Gz2Jwezw+Bwaz3kAOmCJ+BSbcKqjlpIA */
  createMachine(
    {
      tsTypes: {} as import("./myFirstMachine.typegen").Typegen0,
      schema: {
        // events: {} as
        //   | { type: "clickGetTodosButton"; todos: string[] }
        //   | { type: "clickFailureButton"; errorMessage: string },
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      context: {
        todos: [] as string[],
        errorMessage: null as string | null,
      },
      id: "todosMachine",
      initial: "todoNotLoading",
      states: {
        todoNotLoading: {
          on: {
            clickGetTodosButton: {
              target: "loadingTodo",
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
      },
    }
  );
