import { ContextModalProps } from "@mantine/modals";
import CooperationEditorModal from "./cooperation-editor/CooperationEditorModal";
import DeleteConfirmationModal from "./delete-confirm/DeleteConfirmationModal";
import EditQuestionnaireModal from "./edit-questionnaire/EditQuestionnaireModal";
import QuestionnaireEditorModal from "./questionnaire-editor/QuestionnaireEditorModal";
import VillageEditor from "./village-editor/VillageEditorModal";
import InvestasiEditorModal from "./investasi-editor/InvestasiEditorModal";

const modals: Record<string, React.FC<ContextModalProps<any>>> = {
    "edit-questionnaire": EditQuestionnaireModal,
    "delete-confirm": DeleteConfirmationModal,
    "village-editor": VillageEditor,
    "questionaire-editor": QuestionnaireEditorModal,
    "cooperation-editor": CooperationEditorModal,
    "investasi-editor": InvestasiEditorModal,
}

export default modals;