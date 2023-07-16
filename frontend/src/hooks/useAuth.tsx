import { showNotification } from "@mantine/notifications";
import { useLocation, useNavigate } from "@tanstack/react-location";
import { useCallback, useEffect } from "react";



const AuthMiddleware = ({ children }: { children: React.ReactNode; }) => {

  const { current: { pathname } } = useLocation();

  const navigate = useNavigate();

  const storageEventHandler = useCallback(() => {
    const token = localStorage.getItem('accessToken');

    if (pathname.match("/auth/*") && token) {
      return navigate({ to: '/app/' });
    }
    if (!pathname.match("/auth|edit-kuesioner|tambah-kuesioner/*") && !token) {
      return navigate({ to: '/' });
    } 
  }, [pathname]);

  useEffect(() => {

    storageEventHandler();
    window.addEventListener('storage', storageEventHandler);
    return () => {
      window.removeEventListener('storage', storageEventHandler);
    };
  }, [pathname]);

  return <>{children}</>;
};

export default AuthMiddleware;