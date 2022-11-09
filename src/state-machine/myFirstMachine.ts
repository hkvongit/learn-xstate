import { createMachine } from "xstate";

export const myMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBcB7CCgOQrIBkL0JIBiTAG10wGsBxMGQAqVCrABCAVzKV8AbQAMAXUSgADuNxlcFfGpAAPRACYAnABYSARgCstgMwA2AOwvFLhxZO2ANCABPRGsHRRIXWzMPW0UADljrOwtYgF8U-zQsPEJSSmo6RmZWCA5uPgAxdFxOKQAnMGlZPSVVJBBNWG1dfTbjBABaa1iwl1inV1iYiycvExd-IIREsMUnC2snE0VrRWm3WzT0kHwqOANMnAJicjECphZIAw6uvQM+mJJvM3Mpiwd4syxBbBOwkEzWFxORQmEx-Fzrb5pDIYS45EgwERiWAAZSkmEwcHgbWeOlevVMsQcJDMrlsmwcDPhthMTmBCC8ZhsCVsyVhlg8SJAF2y1wxomosEq1TqYCeWlJPVAfUGDhMn1hTiG1hMznidLZHK5dnGDm11gsZhcguFVyIcs6CreiH6MNi4TGEymM2880CpmsJFW63+zkta1WTkOKSAA */
  createMachine(
    {
      id: "(machine)",
      initial: "todoNotLoaded",
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
