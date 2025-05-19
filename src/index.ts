import "./style.css";
import { debounce } from "./utils/debounce";
import { DeviceDetector } from "./utils/deviceDetector";
import { CompletionProvider, StyleConfig } from "./types";
import { DefaultCompletionProvider } from "./providers/DefaultCompletionProvider";

// 防抖函数
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: number | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

interface CompletionProvider {
  getCompletion(
    preContent: string,
    subContent: string,
    prompt?: string
  ): Promise<string>;
}

class DefaultCompletionProvider implements CompletionProvider {
  private apiUrl: string;

  constructor(apiUrl: string = "http://localhost:3000/api/complete") {
    this.apiUrl = apiUrl;
  }

  async getCompletion(
    preContent: string,
    subContent: string,
    prompt?: string
  ): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preContent, subContent, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.suggestion;
    } catch (error) {
      console.error("Error getting completion:", error);
      throw error;
    }
  }
}

class AITextArea extends HTMLElement {
  private editableDiv: HTMLDivElement;
  private completionProvider: CompletionProvider;
  private suggestionSpan: HTMLSpanElement | null = null;
  private isProcessingCompletion = false;
  private lastCursorPosition: number = 0;
  private placeholderSpan: HTMLSpanElement | null = null;
  private deviceDetector: DeviceDetector;

  // 定义需要观察的属性
  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "placeholder-style",
      "suggestion-style",
      "disabled",
      "readonly",
      "required",
      "autofocus",
      "name",
      "prompt",
      "disableAI",
      "apiUrl",
    ];
  }

  constructor() {
    super();
    this.editableDiv = document.createElement("div");
    this.editableDiv.className = "ai-textarea";
    this.editableDiv.contentEditable = "true";
    this.appendChild(this.editableDiv);

    // 初始化设备检测器
    this.deviceDetector = DeviceDetector.getInstance();

    // 初始化补全提供者
    const apiUrl = this.getAttribute("apiUrl") || "";
    this.completionProvider = new DefaultCompletionProvider(apiUrl);

    // 绑定事件处理器
    this.editableDiv.addEventListener("input", this.handleInput.bind(this));
    this.editableDiv.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.editableDiv.addEventListener(
      "click",
      this.handleCursorChange.bind(this)
    );
    this.editableDiv.addEventListener(
      "keyup",
      this.handleCursorChange.bind(this)
    );
    this.editableDiv.addEventListener(
      "mouseup",
      this.handleCursorChange.bind(this)
    );

    // 移动端特定事件
    if (this.deviceDetector.isMobile) {
      this.editableDiv.addEventListener(
        "compositionend",
        this.handleCompositionEnd.bind(this)
      );
    }

    this.editableDiv.addEventListener("blur", () => {
      this.clearSuggestion();
      this.showPlaceholderIfEmpty();
    });

    this.editableDiv.addEventListener("focus", () => {
      if (this.placeholderSpan && this.editableDiv.textContent === "") {
        this.placeholderSpan.remove();
        this.placeholderSpan = null;
      }
      this.handleCursorChange();
    });

    // 初始化显示placeholder
    this.showPlaceholderIfEmpty();
  }

  // 处理移动端输入法完成事件
  private handleCompositionEnd(event: CompositionEvent) {
    if (this.suggestionSpan && event.data.endsWith(" ")) {
      this.acceptSuggestion();
      // 移除额外的空格
      const textContent = this.editableDiv.textContent || "";
      if (textContent.endsWith("  ")) {
        this.editableDiv.textContent = textContent.slice(0, -1);
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.suggestionSpan) {
      if (this.deviceDetector.isMobile) {
        // 移动端：空格键确认补全
        if (event.key === " ") {
          event.preventDefault();
          this.acceptSuggestion();
        }
      } else {
        // PC端：Tab键确认补全
        if (event.key === "Tab") {
          event.preventDefault();
          this.acceptSuggestion();
        } else {
          this.clearSuggestion();
        }
      }
    }
  }

  // 属性变化时的回调
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "placeholder":
      case "placeholder-style":
        if (this.editableDiv.textContent === "") {
          // 如果是 placeholder-style 变化，需要先清除现有的 placeholder
          if (name === "placeholder-style" && this.placeholderSpan) {
            this.placeholderSpan.remove();
            this.placeholderSpan = null;
          }
          this.showPlaceholderIfEmpty();
        }
        break;
      case "disabled":
      case "readonly":
        this.editableDiv.contentEditable = (
          !this.disabled && !this.readOnly
        ).toString();
        break;
      case "value":
        this.value = newValue;
        break;
      case "prompt":
        this.prompt = newValue;
        break;
    }
  }

  private showPlaceholderIfEmpty() {
    if (
      this.editableDiv.textContent === "" &&
      this.getAttribute("placeholder")
    ) {
      if (!this.placeholderSpan) {
        this.placeholderSpan = document.createElement("span");
        this.placeholderSpan.className = "ai-textarea-placeholder";

        // 应用自定义占位符样式
        const placeholderStyle = this.getAttribute("placeholder-style");
        if (placeholderStyle) {
          try {
            const styleObj = JSON.parse(placeholderStyle) as StyleConfig;
            Object.assign(this.placeholderSpan.style, styleObj);
          } catch (e) {
            console.error("Error parsing placeholder-style:", e);
            this.placeholderSpan.style.color = "#999";
          }
        } else {
          this.placeholderSpan.style.color = "#999";
        }

        this.placeholderSpan.textContent =
          this.getAttribute("placeholder") || "";
        this.editableDiv.appendChild(this.placeholderSpan);
      }
    }
  }

  // 代理属性
  get value(): string {
    return this.editableDiv.textContent || "";
  }
  set value(val: string) {
    this.editableDiv.textContent = val;
    this.showPlaceholderIfEmpty();
  }

  get placeholder(): string {
    return this.getAttribute("placeholder") || "";
  }
  set placeholder(val: string) {
    this.setAttribute("placeholder", val);
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }
  set disabled(val: boolean) {
    if (val) {
      this.setAttribute("disabled", "");
      this.editableDiv.contentEditable = "false";
    } else {
      this.removeAttribute("disabled");
      this.editableDiv.contentEditable = (!this.readOnly).toString();
    }
  }

  get readOnly(): boolean {
    return this.hasAttribute("readonly");
  }
  set readOnly(val: boolean) {
    if (val) {
      this.setAttribute("readonly", "");
      this.editableDiv.contentEditable = "false";
    } else {
      this.removeAttribute("readonly");
      this.editableDiv.contentEditable = (!this.disabled).toString();
    }
  }

  get required(): boolean {
    return this.hasAttribute("required");
  }
  set required(val: boolean) {
    if (val) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }

  get name(): string {
    return this.getAttribute("name") || "";
  }
  set name(val: string) {
    this.setAttribute("name", val);
  }

  get prompt(): string {
    return this.getAttribute("prompt") || "";
  }

  set prompt(val: string) {
    if (val) {
      this.setAttribute("prompt", val);
    } else {
      this.removeAttribute("prompt");
    }
  }

  get apiUrl(): string {
    return this.getAttribute("apiUrl") || "";
  }

  set apiUrl(val: string) {
    if (val) {
      this.setAttribute("apiUrl", val);
      this.completionProvider = new DefaultCompletionProvider(val);
    } else {
      this.removeAttribute("apiUrl");
    }
  }

  get disableAI(): boolean {
    return this.hasAttribute("disableAI");
  }

  set disableAI(val: boolean) {
    if (val) {
      this.setAttribute("disableAI", "");
      this.clearSuggestion();
    } else {
      this.removeAttribute("disableAI");
    }
  }

  // 代理方法
  focus() {
    this.editableDiv.focus();
  }
  blur() {
    this.editableDiv.blur();
  }
  select() {
    const range = document.createRange();
    range.selectNodeContents(this.editableDiv);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  setSelectionRange(start: number, end: number) {
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;

    // 获取文本节点
    let textNode = this.editableDiv.firstChild;
    if (!textNode) {
      textNode = document.createTextNode("");
      this.editableDiv.appendChild(textNode);
    }

    try {
      range.setStart(textNode, start);
      range.setEnd(textNode, end);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.error("Error setting selection range:", e);
    }
  }

  // 设置自定义补全提供者
  setCompletionProvider(provider: CompletionProvider) {
    this.completionProvider = provider;
  }

  private debouncedComplete = debounce(
    async (preContent: string, subContent: string, _cursorPosition: number) => {
      if (this.isProcessingCompletion || this.disableAI) return;

      try {
        this.isProcessingCompletion = true;
        const suggestion = await this.completionProvider.getCompletion(
          preContent,
          subContent,
          this.prompt
        );
        if (suggestion) {
          const processedSuggestion = this.processSpacesForSuggestion(
            suggestion,
            preContent,
            subContent
          );
          this.showSuggestion(processedSuggestion);
        }
      } catch (error) {
        console.error("Failed to get completion:", error);
      } finally {
        this.isProcessingCompletion = false;
      }
    },
    2000
  );

  // 处理建议文本的空格
  private processSpacesForSuggestion(
    suggestion: string,
    preContent: string,
    subContent: string
  ): string {
    // 如果建议本身为空，直接返回
    if (!suggestion.trim()) return suggestion;

    // 检查是否是以空格分词的语言（这里简单判断是否包含英文字母）
    const hasEnglishLetters = /[a-zA-Z]/.test(preContent + subContent);
    if (!hasEnglishLetters) return suggestion;

    let result = suggestion;
    const lastCharBeforeCursor = preContent.slice(-1);
    const firstCharAfterCursor = subContent.charAt(0);

    // 如果前面的内容不是空白字符且建议的第一个字符不是空白字符
    if (
      lastCharBeforeCursor &&
      !/\s/.test(lastCharBeforeCursor) &&
      !/\s/.test(result.charAt(0)) &&
      !/[.,!?;:]/.test(lastCharBeforeCursor)
    ) {
      result = " " + result;
    }

    // 如果后面的内容不是空白字符且建议的最后一个字符不是空白字符
    if (
      firstCharAfterCursor &&
      !/\s/.test(firstCharAfterCursor) &&
      !/\s/.test(result.slice(-1)) &&
      !/[.,!?;:]/.test(result.slice(-1))
    ) {
      result = result + " ";
    }

    return result;
  }

  private handleCursorChange = debounce((_event?: Event) => {
    const { position } = this.getCursorPosition();
    if (position === this.lastCursorPosition) return;

    this.lastCursorPosition = position;
    this.clearSuggestion();

    const { before: beforeCursor, after: afterCursor } =
      this.getTextBeforeAndAfterCursor();

    // 触发补全请求
    this.debouncedComplete(beforeCursor, afterCursor, position);
  }, 2000);

  private getCursorPosition(): { position: number; node: Node | null } {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return { position: 0, node: null };

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(this.editableDiv);
    preRange.setEnd(range.startContainer, range.startOffset);
    const position = preRange.toString().length;

    return { position, node: range.startContainer };
  }

  private getTextBeforeAndAfterCursor(): { before: string; after: string } {
    const { position } = this.getCursorPosition();
    const fullText = this.editableDiv.textContent || "";

    return {
      before: fullText.substring(0, position),
      after: fullText.substring(position),
    };
  }

  private async handleInput(_event: Event) {
    if (this.placeholderSpan) {
      this.placeholderSpan.remove();
      this.placeholderSpan = null;
    }

    const { before: beforeCursor, after: afterCursor } =
      this.getTextBeforeAndAfterCursor();
    const cursorPosition = beforeCursor.length;

    // 更新最后的光标位置
    this.lastCursorPosition = cursorPosition;

    // 清除现有的补全建议
    this.clearSuggestion();

    // 触发防抖的补全请求
    this.debouncedComplete(beforeCursor, afterCursor, cursorPosition);
  }

  private showSuggestion(suggestion: string) {
    this.clearSuggestion();

    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const { node } = this.getCursorPosition();

    if (!node) return;

    this.suggestionSpan = document.createElement("span");
    this.suggestionSpan.textContent = suggestion;
    this.suggestionSpan.className = "ai-textarea-suggestion";
    this.suggestionSpan.dataset.suggestion = suggestion;

    // 应用自定义建议样式
    const suggestionStyle = this.getAttribute("suggestion-style");
    if (suggestionStyle) {
      try {
        const styleObj = JSON.parse(suggestionStyle) as StyleConfig;
        Object.assign(this.suggestionSpan.style, styleObj);
      } catch (e) {
        console.error("Error parsing suggestion-style:", e);
      }
    }

    // 确保在正确的位置插入建议
    if (node.nodeType === Node.TEXT_NODE) {
      const textNode = node as Text;
      const offset = range.startOffset;

      if (offset < textNode.textContent!.length) {
        const afterNode = textNode.splitText(offset);
        textNode.parentNode!.insertBefore(this.suggestionSpan, afterNode);
      } else {
        textNode.parentNode!.insertBefore(
          this.suggestionSpan,
          textNode.nextSibling
        );
      }
    } else {
      range.insertNode(this.suggestionSpan);
    }

    // 移动光标到建议之前
    range.setStartBefore(this.suggestionSpan);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private acceptSuggestion() {
    if (!this.suggestionSpan) return;

    const suggestion = this.suggestionSpan.dataset.suggestion || "";
    const textNode = document.createTextNode(suggestion);

    const nextSibling = this.suggestionSpan.nextSibling;
    const parentNode = this.suggestionSpan.parentNode;
    // 替换建议span为实际文本
    this.suggestionSpan.parentNode?.insertBefore(textNode, this.suggestionSpan);
    this.suggestionSpan.remove();
    this.suggestionSpan = null;

    if (parentNode) {
      const range = document.createRange();
      range.setStartAfter(textNode);
      range.collapse(true);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  private clearSuggestion() {
    if (this.suggestionSpan) {
      this.suggestionSpan.remove();
      this.suggestionSpan = null;
    }
  }
}

// 注册自定义元素
customElements.define("ai-textarea", AITextArea);
