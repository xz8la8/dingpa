import { Sandbox } from '../interfaces';
import SnapshotSandbox from './snapshotSandbox';

export function createSandbox(appName: string): Sandbox {
  /** 当前只支持`快照沙箱` */
  const sandbox: Sandbox = new SnapshotSandbox(appName);

  return sandbox;
}
