import type { CustomFlowbiteTheme, ThemeProps } from "flowbite-react";

const flowbiteTheme: CustomFlowbiteTheme = {
  dropdown: {
    floating: {
      base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow",
      content: "rounded-xl text-sm text-gray-700 dark:text-gray-200",
      target: "w-fit dark:text-white",
    }
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    },
  },
  sidebar: {
    root: {
      base: "flex fixed top-0 z-20 flex-col flex-shrink-0 pt-14 h-full border-r border-gray-200 lg:flex dark:border-gray-700 transition-all duration-300 h-screen"
    },
    collapse:{
      button:"flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
    item:{
      collapsed:{
        insideCollapse:"w-full pl-8 transition duration-75"
      },
    }
  },
  table: {
    root: {
      base: "min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",
    },
  }
};

const customTheme: ThemeProps = {
  theme: flowbiteTheme,
};
export default customTheme;
