import { ScrollArea } from "@mantine/core";
import InProgressNotification from "../../../elements/in-progress-card/InProgress";


const InfraModule = () => {
    return (
        <ScrollArea style={{ height: "calc(100vh - var(--mantine-header-height))" }} scrollbarSize={16}>
            <iframe src="https://ppit.big.go.id/smartcommunity/" seamless width="100%" style={{ border: "none", clear: "both", height: 1080, display: "flex", paddingRight: 16 }} />
        </ScrollArea>
    );
};

export default InfraModule;