declare global {
  interface Window {
    __POWERED_BY_DINGPA__?: boolean;
  }
}

// ====== Host App Micro App Entry Register ========
export type MicroAppEnty = {
  /** 应用名称 */
  name: string;
  activePath: string;
  scripts?: string[];
  styles?: string[];
};


// ======== Sandbox ========
export enum SandboxType {
  Snapshot = "Snapshot",
}

export interface Sandbox {
  /** 沙箱名字 */
  name: string;
  /** 沙箱类型 */
  type: SandboxType;
  /** 沙箱导出的代理实体 */
  proxy: WindowProxy;
  /** 沙箱是否在运行中 */
  sandboxRunning: boolean;
  /** 启动沙箱 */
  active: () => void;
  /** 关闭沙箱 */
  inactive: () => void;
}
