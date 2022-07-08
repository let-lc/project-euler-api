import { readFileSync } from 'fs';
import { join } from 'path';

import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';

import { Resizable, Enable } from 're-resizable';
import { ToastContainer } from 'react-toastify';

import { Editor, QuestionDescription, QuestionList } from '@/components';
import answers from '@/data/answers.json';
import titles from '@/data/titles.json';

type PlaygroundPageProps = {
  question: Question;
  hasAnswer: boolean;
};

/** Only enable resize from the right. */
const RESIZE_EABLE: Enable = {
  top: false,
  left: false,
  bottom: false,
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false,
  right: true,
};

const PlaygroundPage: NextPage<PlaygroundPageProps> = ({ question, hasAnswer }) => {
  return (
    <>
      <Head>
        <title>{`#${question.id} ${question.title}`}</title>
      </Head>
      <QuestionList />
      <ToastContainer
        progressClassName="![background:#CBD5E1]"
        className="!top-5 !right-2 mt-px mr-px text-sm"
        toastClassName="!rounded-none border !shadow-none"
      />
      <div className="flex h-screen w-screen items-stretch divide-x overflow-hidden">
        <Resizable
          enable={RESIZE_EABLE}
          className="min-h-screen min-w-[360px] max-w-[calc(100%-360px)]"
          defaultSize={{ width: '33%', height: '100%' }}
        >
          <div className="absolute inset-0 overflow-auto px-6 pt-6 pb-20">
            <QuestionDescription question={question} hasAnswer={hasAnswer} />
          </div>
        </Resizable>
        <div className="relative flex-grow">
          <Editor qid={Number(question.id)} />
        </div>
      </div>
    </>
  );
};
export default PlaygroundPage;

export const getStaticProps: GetStaticProps<PlaygroundPageProps> = async ({ params }) => {
  const { qid } = params;

  return {
    props: {
      question: JSON.parse(readFileSync(join(process.cwd(), 'data', 'questions', `${qid}.json`)).toString('utf-8')),
      hasAnswer: Boolean(answers[qid as string]),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = titles.map((title) => ({ params: { qid: String(title.id) } }));

  return { paths, fallback: false };
};
