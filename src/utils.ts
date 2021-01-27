import * as jsoncparser from "jsonc-parser";
import { ParseError } from "jsonc-parser";

export function parse(content: string): any {
  const strippedContent = jsoncparser.stripComments(content);
  const errors: ParseError[] = [];
  const configurations = jsoncparser.parse(strippedContent, errors);

  if (errors.length) {
    for (const e of errors) {
      const errorMessage = `Error parsing configurations: error: ${e.error}, length:  ${e.length}, offset:  ${e.offset}`;
      console.error(errorMessage);
    }
    return "";
  } else {
    return configurations;
  }
}
