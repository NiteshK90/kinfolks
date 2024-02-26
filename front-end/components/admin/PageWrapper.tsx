import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="text-center">Admin</header>
      <div>
        <div></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
