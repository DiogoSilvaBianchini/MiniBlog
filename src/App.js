import './App.css';
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {AuthProvider} from './context/AuthContext'
import { useAuthentication } from './hooks/useAuthentication';
//Componente
import NavBar from './components/NavBar/navBar';

// Pages
import Home from './pages/Home/Home';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
import About from './pages/About/About';
import Dashbord from './pages/Dashbord/Dashbord'
import CreateNewPost from './pages/CreateNewPost/CreateNewPost'
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import Edit from './pages/Edit/Edit';
import EditPost from './pages/EditPost/EditPost';

function App() {
  //Função de carregamento da authenticação, há aplicação só inicia quando recebe o onAuthStateChanged
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  
  const loddingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loddingUser){
    return <p>Carregando dados...</p>
  }

  //Roteamento da aplicação
  return (
    <div className="App">
        <AuthProvider value={{user}}>
          <BrowserRouter>
            <NavBar/>
            <div className="container">
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={!user ?<LoginScreen/>:<Navigate to={"/"}/>}/>
                <Route path='/register' element={!user ?<RegisterScreen/>:<Navigate to={"/"}/>}/>
                <Route path='/post/create' element={user ? <CreateNewPost /> : <Navigate to={"/login"}/>}/>
                <Route path='/dashbord' element={user ? <Dashbord/> : <Navigate to={"/login"}/>}/>
                <Route path="/post/:id" element={user ? <Post/> : <Navigate to={"/login"}/>} />
                <Route path="/edit/:id" element={user ? <Edit/> : <Navigate to={"/login"}/>} />
                <Route path='/post/edit/:id' element={user ? <EditPost/> : <Navigate to={"/login"}/>}/>
                <Route path='/search' element={user ? <Search/> : <Navigate to={"/login"}/>}/>
                <Route path='/about' element={<About/>}/>
              </Routes>
            </div>
          </BrowserRouter>       
        </AuthProvider>
    </div>
  );
}

export default App;
