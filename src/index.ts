import "./style.css";

interface CompletionProvider {
  getCompletion(text: string, cursorPosition: number): Promise<string>;
}

class DefaultCompletionProvider implements CompletionProvider {
  private apiUrl: string;

  constructor(apiUrl: string = "http://localhost:3000/api/complete") {
    this.apiUrl = apiUrl;
  }

  async getCompletion(text: string, cursorPosition: number): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, cursorPosition }),
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
  private textarea: HTMLTextAreaElement;
  private completionProvider: CompletionProvider;
  private suggestionSpan: HTMLSpanElement | null = null;
  private isProcessingCompletion = false;

  // 定义需要观察的属性
  static get observedAttributes() {
    return [
      "value",
      "placeholder",
      "rows",
      "cols",
      "maxlength",
      "minlength",
      "disabled",
      "readonly",
      "required",
      "autofocus",
      "name",
    ];
  }

  constructor() {
    super();
    this.textarea = document.createElement("textarea");
    this.textarea.className = "ai-textarea";
    this.appendChild(this.textarea);

    // 初始化补全提供者
    this.completionProvider = new DefaultCompletionProvider();

    // 绑定事件处理器
    this.textarea.addEventListener("input", this.handleInput.bind(this));
    this.textarea.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.textarea.addEventListener("click", this.clearSuggestion.bind(this));
  }

  // 属性变化时的回调
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.textarea.setAttribute(name, newValue);
    }
  }

  // 代理原生 textarea 的属性
  get value() {
    return this.textarea.value;
  }
  set value(val: string) {
    this.textarea.value = val;
  }

  get placeholder() {
    return this.textarea.placeholder;
  }
  set placeholder(val: string) {
    this.textarea.placeholder = val;
  }

  get rows() {
    return this.textarea.rows;
  }
  set rows(val: number) {
    this.textarea.rows = val;
  }

  get cols() {
    return this.textarea.cols;
  }
  set cols(val: number) {
    this.textarea.cols = val;
  }

  get maxLength() {
    return this.textarea.maxLength;
  }
  set maxLength(val: number) {
    this.textarea.maxLength = val;
  }

  get minLength() {
    return this.textarea.minLength;
  }
  set minLength(val: number) {
    this.textarea.minLength = val;
  }

  get disabled() {
    return this.textarea.disabled;
  }
  set disabled(val: boolean) {
    this.textarea.disabled = val;
  }

  get readOnly() {
    return this.textarea.readOnly;
  }
  set readOnly(val: boolean) {
    this.textarea.readOnly = val;
  }

  get required() {
    return this.textarea.required;
  }
  set required(val: boolean) {
    this.textarea.required = val;
  }

  get name() {
    return this.textarea.name;
  }
  set name(val: string) {
    this.textarea.name = val;
  }

  // 代理原生 textarea 的方法
  focus() {
    this.textarea.focus();
  }
  blur() {
    this.textarea.blur();
  }
  select() {
    this.textarea.select();
  }

  setSelectionRange(
    start: number,
    end: number,
    direction?: "forward" | "backward" | "none"
  ) {
    this.textarea.setSelectionRange(start, end, direction);
  }

  // 设置自定义补全提供者
  setCompletionProvider(provider: CompletionProvider) {
    this.completionProvider = provider;
  }

  private async handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    const cursorPosition = target.selectionStart;

    // 触发自定义事件
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value, cursorPosition },
        bubbles: true,
        composed: true,
      })
    );

    // 清除现有建议
    this.clearSuggestion();

    // 如果正在处理补全，则不再触发新的补全请求
    if (this.isProcessingCompletion) return;

    try {
      this.isProcessingCompletion = true;
      const suggestion = await this.completionProvider.getCompletion(
        value,
        cursorPosition
      );
      if (suggestion && !this.suggestionSpan) {
        this.showSuggestion(suggestion, cursorPosition);
      }
    } catch (error) {
      console.error("Failed to get completion:", error);
    } finally {
      this.isProcessingCompletion = false;
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    // 如果有建议显示，并且按下了Tab键
    if (this.suggestionSpan && event.key === "Tab") {
      event.preventDefault();
      this.acceptSuggestion();
    } else if (event.key === "Escape") {
      this.clearSuggestion();
    }
  }

  private showSuggestion(suggestion: string, cursorPosition: number) {
    // 创建建议元素
    this.suggestionSpan = document.createElement("span");
    this.suggestionSpan.className = "ai-textarea-suggestion";
    this.suggestionSpan.textContent = suggestion;
    this.suggestionSpan.style.position = "absolute";
    this.suggestionSpan.style.color = "#999";
    this.suggestionSpan.style.pointerEvents = "none";

    // 计算建议的位置
    const textBeforeCursor = this.textarea.value.substring(0, cursorPosition);
    const dummySpan = document.createElement("span");
    dummySpan.textContent = textBeforeCursor;
    dummySpan.style.visibility = "hidden";
    dummySpan.style.whiteSpace = "pre-wrap";
    dummySpan.style.font = window.getComputedStyle(this.textarea).font;
    document.body.appendChild(dummySpan);

    const { offsetWidth, offsetHeight } = dummySpan;
    document.body.removeChild(dummySpan);

    const textareaRect = this.textarea.getBoundingClientRect();
    const lineHeight = parseInt(
      window.getComputedStyle(this.textarea).lineHeight
    );
    const lines = textBeforeCursor.split("\n").length - 1;

    this.suggestionSpan.style.left = `${textareaRect.left + (offsetWidth % textareaRect.width)}px`;
    this.suggestionSpan.style.top = `${textareaRect.top + lines * lineHeight}px`;

    document.body.appendChild(this.suggestionSpan);
  }

  private acceptSuggestion() {
    if (this.suggestionSpan) {
      const suggestion = this.suggestionSpan.textContent || "";
      const cursorPosition = this.textarea.selectionStart;
      const newValue =
        this.textarea.value.slice(0, cursorPosition) +
        suggestion +
        this.textarea.value.slice(cursorPosition);
      this.textarea.value = newValue;
      this.textarea.selectionStart = this.textarea.selectionEnd =
        cursorPosition + suggestion.length;
      this.clearSuggestion();

      // 触发input事件
      this.textarea.dispatchEvent(new Event("input"));
    }
  }

  private clearSuggestion() {
    if (this.suggestionSpan) {
      document.body.removeChild(this.suggestionSpan);
      this.suggestionSpan = null;
    }
  }
}

// 注册自定义元素
customElements.define("ai-textarea", AITextArea);
