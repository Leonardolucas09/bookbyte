import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

export default [
    { ignores: ["dist/**"] },
    js.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    stylistic.configs.customize({
        indent: 4,
        quotes: "double",
        semi: true,
    }),
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            "vue/html-indent": ["warn", 4],
        },
    },
    {
        files: ["src/Pages/**/*.vue"],
        rules: {
            "vue/multi-word-component-names": "off",
        },
    },
];
