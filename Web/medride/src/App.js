import "./App.css";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Trips from "./pages/Trips";
import Cars from "./pages/Cars";
import Patients from "./pages/Patients";
import Driver from "./pages/Drivers";
import Maps from "./pages/Maps";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./component/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/Trips" element={<Trips />} />
            <Route path="/Cars" element={<Cars />} />
            <Route path="/Patients" element={<Patients />} />
            <Route path="/Drivers" element={<Driver />} />
            <Route path="/Maps" element={<Maps />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
