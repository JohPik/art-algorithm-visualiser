import Header from "./components/Header";
import Wall from "./components/Wall";
import Form from "./components/Form";
import Resize from "./components/Resize";

export default function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Wall />
        <Form />
        <Resize />
      </div>
    </>
  );
}
