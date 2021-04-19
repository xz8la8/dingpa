/**
 * @author Hydrogen
 * @since 2020-3-8
 */
import type { Sandbox } from "../interfaces";
import { SandboxType } from "../interfaces";

function iter(obj: WindowProxy, callbackFn: (prop: any) => void) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop);
    }
  }
}

/**
 * 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */
export default class SnapshotSandbox implements Sandbox {
  proxy: WindowProxy;

  name: string;

  type: SandboxType;

  sandboxRunning = true;

  private windowSnapshot: Window;

  private modifyPropsMap: Record<any, any> = {};

  constructor(name: string) {
    this.name = name;
    this.proxy = window;
    this.type = SandboxType.Snapshot;
  }

  active() {
    // 记录当前快照
    this.windowSnapshot = {} as Window;
    iter(this.proxy, (prop) => {
      this.windowSnapshot[prop] = this.proxy[prop];
    });

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p: any) => {
      this.proxy[p] = this.modifyPropsMap[p];
    });

    this.sandboxRunning = true;
  }

  inactive() {
    this.modifyPropsMap = {};

    iter(this.proxy, (prop) => {
      if (this.proxy[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = this.proxy[prop];
        this.proxy[prop] = this.windowSnapshot[prop];
      }
    });

    if (process.env.NODE_ENV === "development") {
      console.info(
        `${this.name} origin window restore...`,
        Object.keys(this.modifyPropsMap)
      );
    }

    this.sandboxRunning = false;
  }
}
