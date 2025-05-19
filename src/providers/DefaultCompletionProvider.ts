import { CompletionProvider } from "../types";

export class DefaultCompletionProvider implements CompletionProvider {
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
