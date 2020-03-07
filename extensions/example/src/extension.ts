import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(vscode.commands.registerCommand('iceworks.start', function() {
    vscode.window.showInformationMessage('start iceworks!');
  }));

  context.subscriptions.push(vscode.commands.registerCommand('iceworks.build', function() {
    vscode.window.showInformationMessage('build iceworks!');
  }));
}
