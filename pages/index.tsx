import { NextPage } from 'next';
import Head from 'next/head';

import Code from '../components/Code';

const Home: NextPage<{ host: string }> = ({ host }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-black">
      <Head>
        <title>Euler Project API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <img className="h-24 w-24" src="/logo.png" alt="Logo" />
        <div className="text-gray-400">
          <h1 className="font-bold text-white">How to use?</h1>
          <hr className="pb-2 text-gray-700" />
          <div className="text-sm">
            <p>
              Send any type of <Code>HTTP</Code> requests to <Code>https://{host}/api</Code> with query parameters{' '}
              <Code>q</Code> and <Code>a</Code>.
            </p>
            <p>
              <Code>q</Code> is the question number, and <Code>a</Code> is the answer.
            </p>
          </div>
          <div className="mt-2 rounded-sm bg-gray-700 px-1 text-left font-mono text-sm">
            <p className="text-[#FF9933]">Example:</p>
            <p className="text-white">https://{host}/api?q=1&a=123456</p>
          </div>
          <p className="relative py-1 after:absolute after:inset-x-0 after:top-1/2 after:z-0 after:h-px after:bg-gray-700">
            <span className="relative z-20 bg-black px-12 font-bold text-white">OR</span>
          </p>
          <div className="text-sm">
            <p>
              Send any type of <Code>HTTP</Code> requests to{' '}
              <Code>
                https://{host}/api/{'<question_number>'}/{'<answer>'}
              </Code>
              .
            </p>
            <p>
              <Code>answer</Code> should be URL-encoded if needed. E.g., <Code>/</Code> in the answer.
            </p>
          </div>
          <div className="mt-2 rounded-sm bg-gray-700 px-1 text-left font-mono text-sm">
            <p className="text-[#FF9933]">Example:</p>
            <p>question_number: 123; answer: 456/789</p>
            <p className="text-white">https://{host}/api/123/456%2F789</p>
          </div>
          <hr className="mt-2 pb-2 text-gray-700" />
          <div className="text-center text-sm">
            <p className="pb-1 font-medium text-white underline">SUCCESS RESPONSE</p>
            <p>
              <span className="rounded-sm bg-gray-800 px-0.5 font-mono text-[#FF9933]">1</span>
              <span> - </span>
              <span>Correct</span>
            </p>
            <p>
              <span className="rounded-sm bg-gray-800 px-0.5 font-mono text-[#FF9933]">0</span>
              <span> - </span>
              <span>Incorrect</span>
            </p>
            <p>
              <span className="rounded-sm bg-gray-800 px-0.5 font-mono text-[#FF9933]">-1</span>
              <span> - </span>
              <span>Answer Not Found</span>
            </p>
            <hr className="mt-2 pb-2 text-gray-700" />
            <a href="/playground" className="hover:text-white">
              <u>Playground</u> <span title="Light Mode">(Flash bomb incoming!)</span>
            </a>
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
