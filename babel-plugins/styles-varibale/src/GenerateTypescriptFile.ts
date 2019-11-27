import * as fs from "fs";

export const generateTypescriptFile = (variables: Record<string, any>, filepath: string) => {

    const code = `export default ${JSON.stringify(variables)}`;

    fs.writeFileSync(filepath, code, "UTF-8");

};
