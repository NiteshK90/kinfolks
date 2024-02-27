import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className="text-center py-4">
        <h1>Admin</h1>
      </header>
      <div>
        <div></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
