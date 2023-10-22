import { Outlet } from "react-router-dom";

import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="App">
      <Topbar />
      <Outlet />
    </div>
  );
}

export default App;
