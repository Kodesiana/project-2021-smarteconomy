import { useLocalStorage } from "@mantine/hooks";
import { Navigate } from "@tanstack/react-location";
import { ReactElement, ReactNode, useMemo } from "react";

export type AclProps = {
  children: ReactNode;
  roles: string[];
  redirect?: boolean;
  defaultRedirect?: string;
};

export const Acl = ({
  roles,
  children,
  redirect = true,
  defaultRedirect = "/app/",
}: AclProps): ReactElement | null => {

  const [{ role: userRole = [] }] = useLocalStorage({ 
    key: 'profile', 
    defaultValue: {
      role: []
    },
    getInitialValueInEffect: false
  });

  const auth = useMemo(
    () => roles.some((e) => userRole.includes(e)),
    [roles, userRole]
  );

  if (!auth) {
    if (redirect) {
      return <Navigate to={defaultRedirect} replace />;
    }
    return null;
  }
  return <>{children}</>;
};
