import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Booking from './pages/Booking';
import { AuthProvider } from './common/context/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "booking/:id",
    element: (
      <Booking/>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
