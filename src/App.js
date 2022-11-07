import './App.css';
import Menu from "./components/menu/Menu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from './pages/Home';
import {About} from './pages/About';
import {UserPage} from './pages/Userpage';

function App() {
    const routes = [
        {path: "/", element: <Home/>},
        {path: "/about", element: <About/>},
        {path: "/user", element: <UserPage/>},
    ];
  return (
      <BrowserRouter>
          <div className="App">
              <header>
                  <Menu></Menu>
              </header>
              <Routes>
                  {routes.map((item,index) =>
                      <Route key={index} path={item.path} element={item.element}/>)}
              </Routes>

              <footer>footer</footer>
          </div>
      </BrowserRouter>
  );
}

export default App;
