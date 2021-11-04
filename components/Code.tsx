import { PropsWithChildren } from "react";

const Code = ({ children }: PropsWithChildren<{}>) => (
  <code className="px-1 text-white bg-gray-700 rounded font-mono">
    {children}
  </code>
);

export default Code;
