export interface CompletionProvider {
  getCompletion(
    preContent: string,
    subContent: string,
    prompt?: string
  ): Promise<string>;
}

export interface StyleConfig {
  [key: string]: string;
}
