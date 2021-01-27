import * as vscode from "vscode";
import { parse } from "./utils";

const LAUNCH_CONFIGS_CONTENT = `[
    {
        "name": "TEST: Attach to Chrome",
        "port": 9222,
        "request": "attach",
        "type": "pwa-chrome",
        "webRoot": ""
    }
]`;

export async function updateWorkspaceLaunchConfigs(): Promise<void> {
  const config = vscode.workspace.getConfiguration("launch");

  console.dir(config);

  const parsedContent = parse(LAUNCH_CONFIGS_CONTENT);

  config.update(
    "configurations",
    parsedContent,
    vscode.ConfigurationTarget.Workspace
  );
}
