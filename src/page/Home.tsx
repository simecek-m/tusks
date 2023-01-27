import Button from "component/Button";

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="inline-block bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text text-5xl font-black text-transparent">
        Tusks
      </h1>
      <p>not everyone has the memory of an elephant</p>
      <Button text="login" className="mt-5" />
    </div>
  );
};

export default Home;
