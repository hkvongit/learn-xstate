import { createMachine } from "xstate";

export const myMachine = createMachine({
  initial: "notChecked",
  states: {
    notChecked: {
      on: {
        CHECK_BUTTON_CLICK: {
          target: "checked",
        },
      },
    },
    checked: {
      on: {
        UN_CHECK_BUTTON_CLICK: {
          target: "notChecked",
        },
      },
    },
  },
});
