import "./App.css";
import Card from "./components/Card";
function App() {
  return (
    <>
      <div className="flex w-screen bg-[url('/meow.png')] bg-cover bg-center h-screen justify-center items-center flex-col">
        <Card />
      </div>
    </>
  );
}

export default App;
