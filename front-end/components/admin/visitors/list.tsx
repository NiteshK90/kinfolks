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
      <div className="p-4">
        <h3>Below is list of visitors</h3>
      </div>
      <div className="m-4 border border-b-0">
        <div className="grid grid-cols-6 border-b font-semibold">
          <div className="p-2">Sr.</div>
          <div className="p-2">Name</div>
          <div className="p-2">Mobile</div>
          <div className="p-2">Email</div>
          <div className="p-2">When to visit</div>
          <div className="p-2">Action</div>
        </div>
        <div className="overflow-auto">
          {data.map((item, index) => (
            <div
              key={`visitor-row-${index}`}
              className="grid grid-cols-6 border-b"
            >
              <div className="p-2">{index + 1}</div>
              <div className="p-2">{item.name}</div>
              <div className="p-2">{item.mobile}</div>
              <div className="p-2">{item.email}</div>
              <div className="p-2">{item.whenToVisit}</div>
              <div className="p-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
