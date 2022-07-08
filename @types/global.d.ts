export {};

declare global {
  // Supported programming language.
  type CodeLang = 'python' | 'javascript';

  type Question = {
    id: number;
    published: number;
    title: string;
    content: string;
  };
}
