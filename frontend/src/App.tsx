import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import RequireAuth from "./auth/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Ci from "./pages/Ci";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard"
                              element={
                                  <RequireAuth>
                                      <Dashboard/>
                                  </RequireAuth>
                              }
                    />
                    <Route path="/ci"
                        element={
                            <RequireAuth>
                                <Ci/>
                            </RequireAuth>
                        }
                    />
                 </Route>
            </Routes>
        </BrowserRouter>
    );
}
