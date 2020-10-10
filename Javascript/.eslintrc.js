module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "ignorePatterns": ["*.json"],
    "plugins": ["prettier"],
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};
