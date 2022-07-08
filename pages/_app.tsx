import { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

const ProjectEulerAPI = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default ProjectEulerAPI;
