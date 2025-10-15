import { config } from "dotenv";
config();

const getVariable = (variableName: string) => {
  const variable = process.env[variableName];

  if (!variable)
    throw new Error(`Environment Variable ${variableName} Not Found`);
  return variable;
};

export const CONFIG_VARIABLE = {
  environment: {
    currEnv: getVariable("SERVER_ENVIRONMENT"),
  },
  db: {
    mongodburl: getVariable("MONGODB_URL"),
  },
};
