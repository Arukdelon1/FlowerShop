import './App.css';
import Menu from "./components/menu/Menu";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from './pages/Home';
import {About} from './pages/About';
import {UserPage} from './pages/Userpage';

function App() {
    const router = createBrowserRouter([
        {path: "/", element: <Home/>},
        {path: "/about", element: <About/>},
        {path: "/user", element: <UserPage/>},
    ]);
  return (
    <div className="App">
        <header>
            <Menu></Menu>
        </header>

        <RouterProvider router={router} />

        <footer>footer</footer>
    </div>
  );
}

export default App;
