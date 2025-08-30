import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosConfig from '../Utill/AxiosConfig';

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) return; // already have user

    let isMounted = true;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          clearUser();
          if (location.pathname !== '/login') {
            navigate('/login');
          }
          return;
        }

        const response = await axiosConfig.get('/profile');

        if (response.status === 200 && response.data) {
          if (isMounted) {
            setUser(response.data);
          }
        } else {
          clearUser();
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        clearUser();
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [user, setUser, clearUser, navigate, location.pathname]);
};
