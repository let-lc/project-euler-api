import { NextPage } from "next";
import Head from "next/head";

import Code from "../components/Code";

const Home: NextPage<{ host: string }> = ({ host }) => {
  return (
    <div className="flex flex-col min-w-full min-h-screen bg-black">
      <Head>
        <title>Euler Project API</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-9xl text-[#FF9933] font-dance select-none">e</h1>
        <div className="text-gray-400">
          <h1 className="font-bold text-white">How to use?</h1>
          <hr className="pb-2 text-gray-700" />
          <div className="text-sm">
            <p>
              Send a <Code>GET</Code> request to <Code>https://{host}/api</Code>
            </p>
            <p>
              with query parameters <Code>q</Code> and <Code>a</Code>.
            </p>
            <p>
              <Code>q</Code> is the question number, and <Code>a</Code> is the
              answer.
            </p>
          </div>
          <div className="px-1 font-mono text-sm text-left bg-gray-700 rounded-sm mt-2">
            <p className="text-[#FF9933]">Example:</p>
            <p className="text-white">https://{host}/api?q=1&a=123456</p>
          </div>
          <hr className="pb-2 mt-2 text-gray-700" />
          <div className="text-sm text-center">
            <p className="text-white font-medium underline pb-1">RESPONSE</p>
            <p>
              <span className="text-[#FF9933] font-mono bg-gray-800 px-0.5 rounded-sm">1</span>
              <span> - </span>
              <span>Correct</span>
            </p>
            <p>
              <span className="text-[#FF9933] font-mono bg-gray-800 px-0.5 rounded-sm">0</span>
              <span> - </span>
              <span>Incorrect</span>
            </p>
            <p>
              <span className="text-[#FF9933] font-mono bg-gray-800 px-0.5 rounded-sm">?</span>
              <span> - </span>
              <span>Answer Not Found</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => ({
  host: req.headers.host || "<url>",
});

export default Home;
