export default {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "semi": "always",
        // "trailing-commas": "Not Allowed",
        // "template Strings": "",
        // "space-before-function-paren": "",
        // "import/extensions": "",
        // "object-curly-spacing": "",
        // "no-console": "",
        // "no-return-assign": "",
        // "react/sort-prop-types": "",
        // "react/sort-types": "",
        // "object-shorthand": "",
        // "prefer-destructuring": "",
    }
}
