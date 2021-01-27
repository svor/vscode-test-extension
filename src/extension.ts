import * as vscode from "vscode";
import {
  registerCreateCopyFileCommand,
  registerUpdateLaunchConfigsCommand,
  registerUriJoinPathCommand,
  registerVsCodeDiffCommand,
  registerVsCodeOpenCommand,
} from "./commands-registry";

export function activate(context: vscode.ExtensionContext) {
  registerVsCodeOpenCommand(context);
  registerCreateCopyFileCommand(context);
  registerVsCodeDiffCommand(context);
  registerUriJoinPathCommand(context);
  registerUpdateLaunchConfigsCommand(context);
}

export function deactivate() {}
