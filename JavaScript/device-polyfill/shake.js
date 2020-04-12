
/**
 * `devicemotion` 事件目前在某些机型上呗默认禁止了，需要用户的授权同意后，JS才能监听这些事件，因此做了如下封装处理
 */
class ShakeManager {
  constructor() {
    this.init();
  }
  init() {
    if (this.isNeedShakePermission()) {
      this.requestShakePermission()
        .then(() => {
          this.bindShakeEvent();
        })
        .catch(console.error);
    } else {
      this.bindShakeEvent();
    }
  }
  /**
   * 请求授权
   */
  requestShakePermission() {
    return new Promise((resolve, reject) => {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            resolve();
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }
  /**
   * 绑定 shake 事件
   */
  bindShakeEvent() {
    // 需要先引入 shake.js 文件
    const shakeEvent = new shakeEvent({
      threshold: 10
    });

    shakeEvent.start();

    window.addEventListener("shake", () => {
      console.log("shaked");
    });
  }
  /**
   * 检查是否需要授权
   */
  isNeedShakePermission() {
    // 特性检测
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      return true;
    }
    return false;
  }
}
