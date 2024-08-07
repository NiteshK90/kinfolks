import { NextPage } from "next";
import { PageWrapper } from "@common-components-admin/PageWrapper";
import { List } from "@components-admin/visitors/list";

const Visitors: NextPage = () => {
  return (
    <PageWrapper title="Visitors">
      <List />
    </PageWrapper>
  );
};

export default Visitors;
