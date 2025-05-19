export class DeviceDetector {
  private static instance: DeviceDetector;
  private _isMobile: boolean;

  private constructor() {
    this._isMobile = this.checkIsMobile();
  }

  public static getInstance(): DeviceDetector {
    if (!DeviceDetector.instance) {
      DeviceDetector.instance = new DeviceDetector();
    }
    return DeviceDetector.instance;
  }

  private checkIsMobile(): boolean {
    // 检查是否是移动设备
    const userAgent = navigator.userAgent || navigator.vendor;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    // 检查触摸支持
    const hasTouchSupport =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      (window.DocumentTouch && document instanceof DocumentTouch);

    return mobileRegex.test(userAgent) && hasTouchSupport;
  }

  public get isMobile(): boolean {
    return this._isMobile;
  }
}
