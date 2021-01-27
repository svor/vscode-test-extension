import * as vscode from "vscode";
import { updateWorkspaceLaunchConfigs } from "./workspace-api";

const UPDATE_LAUNCH_CONFIGS = "test-update-workspace-launch-configs";

export function registerUpdateLaunchConfigsCommand(
  context: vscode.ExtensionContext
) {
  const disposable = vscode.commands.registerCommand(
    UPDATE_LAUNCH_CONFIGS,
    updateWorkspaceLaunchConfigs
  );
  context.subscriptions.push(disposable);
}
