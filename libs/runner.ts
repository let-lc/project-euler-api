const runPython = async (code: string) => {
  if (typeof globalThis?.pyodide === 'undefined') {
    console.log('Initializing Python WASM module (Pyodide)');
    globalThis.pyodide = await globalThis.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/',
    });
  }
  await globalThis?.pyodide?.runPythonAsync(code);
};

const runJavaScript = (code: string) => {
  const fn = new Function(code);
  fn();
};

/**
 * Execute the code.
 *
 * @param languange Programming languange
 * @param code code
 */
const runner = async (languange: CodeLang, code: string) => {
  switch (languange) {
    case 'python':
      await runPython(code);
      break;
    case 'javascript':
      runJavaScript(code);
      break;
    default:
      throw new Error(
        `Code Runner: Unsupported programming language: ${languange}`
      );
  }
};

export default runner;
