const Submissions = () => {
  fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then(console.log);
  return <main></main>;
};

export default Submissions;
