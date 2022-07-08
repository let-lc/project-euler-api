import { Fragment, useState } from 'react';

import { useRouter } from 'next/router';

import { Transition } from '@headlessui/react';
import { CollectionIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

import titles from '@/data/titles.json';

const QuestionDropdown = () => {
  const { query } = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const scrollToQuestion = () => {
    if (query?.qid) document.getElementById(`q-link-${query?.qid}`).scrollIntoView({ block: 'center' });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-10 flex items-center rounded-3xl border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <CollectionIcon className="h-5 w-5" />
      </button>
      <Transition.Root show={open} unmount={false}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 z-10 overflow-hidden" onClick={() => setOpen(false)} />
        </Transition.Child>
        <Transition.Child
          as="div"
          unmount={false}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="fixed inset-y-0 z-40 max-w-sm overflow-auto border-r bg-white"
          afterEnter={scrollToQuestion}
        >
          <nav className="grid grid-cols-1 divide-y py-2">
            {titles.map(({ id, title }) => (
              <a
                key={`q-link-${id}`}
                id={`q-link-${id}`}
                href={`/playground/${id}`}
                className={clsx(
                  'relative bg-gray-50 px-4 py-1 text-sm hover:bg-gray-100',
                  (query?.qid as string) === id.toString() &&
                    'before:absolute before:inset-y-0 before:left-0 before:w-2 before:bg-blue-500'
                )}
              >
                <p>
                  {id}. <span dangerouslySetInnerHTML={{ __html: title }}></span>
                </p>
              </a>
            ))}
          </nav>
        </Transition.Child>
      </Transition.Root>
    </>
  );
};
export default QuestionDropdown;
