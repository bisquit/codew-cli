import { homedir } from 'node:os';

const home = homedir();

export const codewHome = `${home}/.codew`;
export const workspaceDir = `${codewHome}/workspaces`;
