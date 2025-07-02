import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="px-5">
      <div className="lg:w-4/5 lg:mx-auto">
        <Navbar />
        <div className="my-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
