import * as vscode from "vscode";
import {
  registerCreateCopyFileCommand,
  registerUpdateLaunchConfigsCommand,
  registerUriJoinPathCommand,
  registerVsCodeDiffCommand,
  registerVsCodeOpenCommand,
  registerWorkspaceFileCommand,
} from "./commands-registry";

export function activate(context: vscode.ExtensionContext) {
  registerVsCodeOpenCommand(context);
  registerCreateCopyFileCommand(context);
  registerVsCodeDiffCommand(context);
  registerUriJoinPathCommand(context);
  registerUpdateLaunchConfigsCommand(context);
  registerWorkspaceFileCommand(context);
}

export function deactivate() {}
