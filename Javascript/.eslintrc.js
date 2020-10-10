module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "ignorePatterns": [ "*.json" ],
    "plugins": [ "prettier" ],
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "array-bracket-spacing": [ "error", "always" ],
        "arrow-spacing": [ "error", { "before": true, "after": true } ],
        "object-curly-spacing": [ "error", "always" ],
        "space-in-parens": [ "error", "always" ],
        "semi": [ "error", "always" ],
        "quotes": [ "error", "double" ]
    }
};
