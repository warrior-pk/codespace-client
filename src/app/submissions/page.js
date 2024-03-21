import Table from "./Table";
const Submissions = async () => {
  const data = await fetch(`${process.env.SERVER}/recipes`).then((res) =>
    res.json()
  );
  console.log(data);
  return (
    <main className="container relative mx-auto flex min-h-screen flex-col items-center justify-between py-6">
      <div className="table-wrapper overflow-auto w-full">
        <h1 className="font-bold text-3xl my-10">All Submissions</h1>
        <Table data={data.recipes} />
      </div>
    </main>
  );
};

export default Submissions;
