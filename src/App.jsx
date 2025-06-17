import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserDetailApi } from './Apis/authApis';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setLoading } from './Redux/userSlice';
import { isTokenExpired } from './utility/isTokenExpired';
import LoadingScreen from './utils/LoadingScreen/LoadingScreen';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      const authHeader = localStorage.getItem('Authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        dispatch(clearUser());
        return;
      }

      const token = authHeader.split(' ')[1];
      if (isTokenExpired(token)) {
        dispatch(clearUser());
        localStorage.removeItem("Authorization");
        return;
      }

      try {
        const res = await getUserDetailApi();
        dispatch(setUser(res?.data));
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return <LoadingScreen />; 

  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
