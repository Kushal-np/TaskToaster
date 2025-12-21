import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

// The following imports assume a Redux store and RTK Query setup.
// They are commented out for now but show how to integrate state management.
// import { useGetMeQuery } from '../../store/api/authApi';
// import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
// import { logout, setUser } from '../../store/slices/authSlice';
// import Loader from '../ui/Loader';

const AppLayout = () => {
  // This logic will be enabled once the Redux store is configured.
  // const token = useAppSelector((state) => state.auth.token);
  // const { data, isLoading, isError } = useGetMeQuery(undefined, { skip: !token });
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (data) dispatch(setUser(data.user));
  //   if (isError) dispatch(logout());
  // }, [data, isError, dispatch]);

  // if (isLoading) {
  //   return <div className="flex h-screen items-center justify-center"><Loader /></div>;
  // }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;