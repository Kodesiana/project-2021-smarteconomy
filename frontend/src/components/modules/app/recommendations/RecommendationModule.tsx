import { Acl } from "@/components/layout/acl/Acl";
import { ROLE } from "@/utils/constants";
import { Outlet } from "@tanstack/react-location";

const RecommendationModule = () => {
  return (
    <Acl roles={[ROLE.ADMIN, ROLE.WARGA, ROLE.APARAT, ROLE.PAKAR]}>
      <Outlet />
    </Acl>
  );
};

export default RecommendationModule;