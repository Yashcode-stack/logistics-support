"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_VARIABLE = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const getVariable = (variableName) => {
    const variable = process.env[variableName];
    if (!variable)
        throw new Error(`Environment Variable ${variableName} Not Found`);
    return variable;
};
exports.CONFIG_VARIABLE = {
    environment: {
        currEnv: getVariable('SERVER_ENVIRONMENT'),
    },
    db: {
        mongodburl: getVariable('MONGODB_URL'),
    },
};
//# sourceMappingURL=config.js.map