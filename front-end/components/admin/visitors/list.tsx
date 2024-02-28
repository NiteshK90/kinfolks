import { useGetVisitors } from "../../../hooks/visitors.hooks";

export const List = () => {
  const { data, isLoading, isError } = useGetVisitors();
  if (isLoading) {
    return <div>Data is loading</div>;
  }
  if (isError) {
    return <div>Error occurred</div>;
  }
  return (
    <div>
      <div className="grid grid-cols-6">
        <div>Sr.</div>
        <div>Name</div>
        <div>Mobile</div>
        <div>Email</div>
        <div></div>
        <div>When to visit</div>
      </div>
      {data.map((item, index) => (
        <div key={`visitor-row-${index}`} className="grid grid-cols-6">
          <div>{index + 1}</div>
          <div>{item.name}</div>
          <div>{item.mobile}</div>
          <div>{item.email}</div>
          <div></div>
          <div>{item.whenToVisit}</div>
        </div>
      ))}
    </div>
  );
};
