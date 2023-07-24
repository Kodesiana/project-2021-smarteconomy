import { ScrollArea } from "@mantine/core";
import InProgressNotification from "../../../elements/in-progress-card/InProgress";
import { Acl } from "@/components/layout/acl/Acl";
import { ROLE } from "@/utils/constants";


const InfraModule = () => {
    return (
            <ScrollArea style={{ height: "calc(100vh - var(--mantine-header-height))" }} scrollbarSize={16}>
                <Acl roles={[ROLE.ADMIN, ROLE.APARAT, ROLE.PAKAR]}>
                        <iframe src="https://ppit.big.go.id/smartcommunity/" seamless width="100%" style={{ border: "none", clear: "both", height: 1080, display: "flex", paddingRight: 16 }} />
                </Acl>
            </ScrollArea>
    );
};

export default InfraModule;