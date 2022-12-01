import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from './pages/Home';
import {About} from './pages/About';
import {UserPage} from './pages/Userpage';
import {Header} from "./components/Header";
import {Basket} from "./components/basket/Basket";
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import Login from "./pages/Login";
import {useState} from "react";
import {UserContext} from "./context/UserContext";
import {AddProduct} from "./pages/AddProduct";

function App() {

    const [user, setUser] = useState({
        email: "",
        name: "",
        pass: "",
        auth: null,
    });

    const routes = [
        {path: "/", element: <Home/>},
        {path: "/about", element: <About/>},
        {path: "/user", element: <UserPage/>},
        {path: "/basket", element: <Basket/>},
        {path: "/login", element: <Login/>},
        {path: "/addProduct", element: <AddProduct/>},
    ];
  return (
      <ShoppingCartProvider>
          <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
          <div className="App">
              <header>
                  <Header/>
              </header>
              <Routes>
                  {routes.map((item,index) =>
                      <Route key={index} path={item.path} element={item.element}/>)}
              </Routes>
              <footer>footer</footer>
          </div>
      </BrowserRouter>
          </UserContext.Provider>
      </ShoppingCartProvider>
  );
}

export default App;
