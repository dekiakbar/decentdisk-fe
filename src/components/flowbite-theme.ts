import type { CustomFlowbiteTheme, ThemeProps } from "flowbite-react";

const flowbiteTheme: CustomFlowbiteTheme = {
  dropdown: {
    floating: {
      base: "z-10 w-fit rounded-xl divide-y divide-gray-100 shadow",
      content: "rounded-xl text-sm text-gray-700 dark:text-gray-200",
      target:
        "w-fit dark:text-white text-gray-700 focus:ring-0 focus:ring-offset-0",
    },
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",
    },
    link: {
      active: {
        on: "block py-2 pr-4 pl-3 md:p-0 bg-cyan-700 text-black dark:text-white md:bg-transparent md:text-cyan-700",
      },
    },
  },
  sidebar: {
    root: {
      base: "flex fixed top-0 z-20 flex-col flex-shrink-0 pt-14 h-full border-r border-gray-200 lg:flex dark:border-gray-700 transition-all duration-300 h-screen",
      inner:
        "h-full overflow-y-auto overflow-x-hidden bg-gray-50 py-4 px-3 dark:bg-gray-800",
    },
    collapse: {
      button:
        "flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
    item: {
      collapsed: {
        insideCollapse: "w-full pl-8 transition duration-75",
      },
    },
  },
  table: {
    root: {
      // base: "min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",
      wrapper: "relative overflow-x-auto",
    },
  },
  darkThemeToggle: {
    root: {
      base: "rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
    },
  },
  footer: {
    root: {
      base: "bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between w-full p-6",
    },
  },
};

const customTheme: ThemeProps = {
  theme: flowbiteTheme,
};
export default customTheme;
