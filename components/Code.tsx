import { PropsWithChildren } from "react";

const Code = ({ children }: PropsWithChildren<{}>) => (
  <span className="px-1 text-white bg-gray-700 rounded font-mono">
    {children}
  </span>
);

export default Code;
