/**
 * Get the snippet that contains a check function that checks the answer.
 *
 * @param language Programming languange
 * @returns snippet
 */
const getCodeSnippet = (language: CodeLang) => {
  switch (language) {
    case 'python':
      return 'import pyodide\nfrom urllib.parse import quote_plus\n\n\ndef check(question, answer):\n    """Check your answer to a question\n\n    Args:\n        question (int or str): question number\n        answer (int or float or str): answer\n    """\n    response = pyodide.http.open_url(\n        "/api?q={}&a={}".format(question, quote_plus(str(answer)))\n    ).read()\n    match response:\n      case "1":\n        print("Correct")\n      case "0":\n        print("Incorrect")\n      case "-1":\n        print("Answer not found")\n      case _:\n        print(response)\n\n\n# Start coding here\n';
    case 'javascript':
      return "/**\n * Check your answer to a question.\n *\n * @param {string | number} q Question number\n * @param {string | number} a Answer\n */\nconst check = (q, a) => {\n  fetch('/api?' + new URLSearchParams({ q, a }))\n    .then((response) => response.text())\n    .then((data) => {\n      if (data === '1') console.log('Correct');\n      else if (data === '0') console.log('Incorrect');\n      else if (data === '-1') console.log('Answer not found');\n      else console.log(data);\n    });\n};\n\n// Start coding here\n";
    default:
      throw new Error(
        `Code Runner: Unsupported programming language: ${language}`
      );
  }
};

export default getCodeSnippet;
