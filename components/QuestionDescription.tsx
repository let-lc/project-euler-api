import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import ReactTooltip from 'react-tooltip';

type QuestionProps = {
  question: Question;
  hasAnswer: boolean;
};

const QuestionDescription = ({ question: { id, published, title, content }, hasAnswer }: QuestionProps) => {
  const publishDate = new Date(published * 1000);

  return (
    <>
      {/* Title */}
      <h1 className="mb-4 border-b pb-4 text-xl font-semibold">
        <div data-tip data-for="has-answer" className="mr-1 -mb-0.5 inline-block">
          {hasAnswer ? (
            <ShieldCheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ShieldExclamationIcon className="h-5 w-5 text-yellow-400" />
          )}
        </div>
        <ReactTooltip
          id="has-answer"
          effect="solid"
          place="right"
          type={hasAnswer ? 'success' : 'error'}
          className={clsx(
            '!py-0.5 !px-2 !opacity-100 drop-shadow-md',
            hasAnswer
              ? '!bg-green-500 after:!border-r-green-500'
              : '!bg-yellow-400 !text-black after:!border-r-yellow-400'
          )}
        >
          <span>{`This question ${hasAnswer ? 'supports' : "doesn't support"} checking answers.`}</span>
        </ReactTooltip>
        <span>
          {id}. <span dangerouslySetInnerHTML={{ __html: title }}></span>
        </span>
      </h1>
      {/* Publish datetime */}
      <p className="text-sm">
        <span className="font-semibold">Publish Date: </span>
        <time className="italic" dateTime={publishDate.toISOString()}>
          {publishDate.toLocaleString()}
        </time>
      </p>
      {/* Problem content */}
      <div className="[&>p]:my-4" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};
export default QuestionDescription;
