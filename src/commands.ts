import { posix } from "path";
import * as fs from "fs";
import * as vscode from "vscode";

const defaultFile = "package.json";
const copyFile = "package_copy.json";

export function testVsCodeOpenCommand(): void {
  const folder = getWorkspaceFolder();
  const fileUri = vscode.Uri.parse(posix.join(folder.uri.path, defaultFile));

  const startPosition = new vscode.Position(4, 2);
  const endPosition = new vscode.Position(7, 4);
  const range = new vscode.Range(startPosition, endPosition);
  const options: vscode.TextDocumentShowOptions = { selection: range };

  vscode.commands.executeCommand("vscode.open", fileUri, options);
}

export async function createCopyFile() {
  const folder = getWorkspaceFolder();

  // existed file
  const existedFileUri = vscode.Uri.parse(
    posix.join(folder.uri.path, defaultFile)
  );

  // create a new file
  const newFileUri = vscode.Uri.parse(posix.join(folder.uri.path, copyFile));
  const createFileCopyedit = new vscode.WorkspaceEdit();
  createFileCopyedit.createFile(newFileUri, { overwrite: true });
  await vscode.workspace.applyEdit(createFileCopyedit);

  // copy content from existed file to the new file
  const copyFileContentEdit = new vscode.WorkspaceEdit();
  const existedFileDocument = await vscode.workspace.openTextDocument(
    existedFileUri
  );
  const existedFileContent = existedFileDocument.getText();

  // some range for content replacing if a file already exists (the command was run second or third or ... time)
  const replaceStartPosition = new vscode.Position(2, 0);
  const replaceEndPosition = new vscode.Position(1000, 0);
  const replaceRange = new vscode.Range(
    replaceStartPosition,
    replaceEndPosition
  );

  // replace content
  copyFileContentEdit.replace(newFileUri, replaceRange, existedFileContent);
  await vscode.workspace.applyEdit(copyFileContentEdit);

  // now the content of the new file should be the same as for the existed file
  // but we need to have some change to compare two contents within diff editors
  const provideChangesEdit = new vscode.WorkspaceEdit();
  provideChangesEdit.replace(
    newFileUri,
    new vscode.Range(new vscode.Position(6, 4), new vscode.Position(6, 28)),
    '"node": ">=10 <12"'
  );
  await vscode.workspace.applyEdit(provideChangesEdit);

  // open copy-file
  vscode.commands.executeCommand("vscode.open", newFileUri);
}

export async function testVsCodeDiffCommand() {
  const folder = getWorkspaceFolder();

  // existed file
  const leftFileUri = vscode.Uri.parse(
    posix.join(folder.uri.path, defaultFile)
  );

  // copy file
  const copyFilePath = posix.join(folder.uri.path, copyFile);
  const copyFileUri = vscode.Uri.parse(copyFilePath);
  if (!fs.existsSync(copyFilePath)) {
    vscode.window.showWarningMessage(
      "Please create copy file first using 'Create copy file' command!"
    );
    return;
  }

  // provide some selection for testing
  const selectionStartPosition = new vscode.Position(4, 2);
  const selectionEndPosition = new vscode.Position(7, 4);
  const selectionRange = new vscode.Range(
    selectionStartPosition,
    selectionEndPosition
  );
  const opts: vscode.TextDocumentShowOptions = { selection: selectionRange };

  vscode.commands.executeCommand(
    "vscode.diff",
    leftFileUri,
    copyFileUri,
    `${defaultFile}` + " - diff",
    opts
  );
}

export function testUriJoinPath() {
  const folder = getWorkspaceFolder();
  const fileUri = vscode.Uri.joinPath(folder.uri, defaultFile);
  vscode.window.showInformationMessage("The path is: " + fileUri.toString());
}

export function testWorkspaceFileAPI() {
  const workspaceFile = vscode.workspace.workspaceFile;

  console.dir(workspaceFile);

  const workspaceFilePath = workspaceFile ? workspaceFile.path : undefined;
  vscode.window.showInformationMessage(`The path is: ${workspaceFilePath}`);
}

function getWorkspaceFolder(): vscode.WorkspaceFolder {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length < 1) {
    vscode.window.showWarningMessage(
      "Please open Theia project as workspace folder for testing!"
    );
    throw new Error("A workspace folder is not open");
  }
  return workspaceFolders[0];
}
