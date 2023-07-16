import { useGetQuestionnairePublic, useGetQuestionnairePublicQuestion } from "@/services/QuestionnaireServices/QuestionnaireQueries";
import QuestionnaireServices from "@/services/QuestionnaireServices/QuestionnaireServices";
import { ActionIcon, Button, Card, Container, Group, ScrollArea, Stepper, Transition } from "@mantine/core";
import { useDebouncedState, useLocalStorage } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-location";
import { useCallback, useRef, useState } from "react";
import { Check, X } from "react-feather";
import { Form } from "react-final-form";
import X0 from "@/components/elements/FragmentStepper/X0";
import X1 from "@/components/elements/FragmentStepper/X1";
import X2 from "@/components/elements/FragmentStepper/X2";
import X3 from "@/components/elements/FragmentStepper/X3";
import X4 from "@/components/elements/FragmentStepper/X4";
import X5 from "@/components/elements/FragmentStepper/X5";
import Y1 from "@/components/elements/FragmentStepper/Y1";
import Y2 from "@/components/elements/FragmentStepper/Y2";
import { ArrowUp } from "phosphor-react";

const QuestionnaireAdd = () => {
  const viewport = useRef<HTMLDivElement>(null);
  const [{ y }, onScrollPositionChange] = useDebouncedState({ x: 0, y: 0 }, 200);
  const scrollToTop = useCallback(() => {
    viewport?.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewport]);

  const [{ villageId, phone }] = useLocalStorage({
    key: 'questionnaire', defaultValue: {
      villageId: '',
      phone: ''
    }
  });

  const { data: answer = {} } = useGetQuestionnairePublic({ villageId, phone });

  const sessionToken = answer?.sessionToken ?? '';
  const initialValues = answer?.data?.content ?? {};
  const id = answer?.data?.id ?? '';

  const navigate = useNavigate();
  const { data } = useGetQuestionnairePublicQuestion();

  const [active, setActive] = useState(0);
  const nextStep = useCallback(() => {
    setActive((current) => (current + 1));
    scrollToTop()
  },[]);

  const prevStep = useCallback(() => setActive((current) => (current > 0 ? current - 1 : current)),[]);

  const onSubmit = useCallback(async (e: any) => {
      try {
        if (sessionToken && id) {
          await QuestionnaireServices.putQuestionnairePublic({ answers: e, sessionToken, id });
        } else {
          await QuestionnaireServices.postQuestionnairePublic({ ...e });
        }
        showNotification({
          title: 'Berhasil',
          message: 'Data Berhasil Tersimpan',
          color: 'green',
          icon: <Check />,
        });
        navigate({ to: '/' });
      } catch (error) {
        showNotification({
          title: 'Gagal',
          message: 'Data Gagal Tersimpan',
          color: 'red',
          icon: <X />,
        });
      }
  }, [id, sessionToken]);

  return (
    <ScrollArea style={{ backgroundColor: '#F1F3F5', }} onScrollPositionChange={onScrollPositionChange} viewportRef={viewport}>
    <Container fluid p="xl" style={{ height: '100vh' }}>
      <Form
        initialValues={initialValues ?? {}}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, submitting, form, valid }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                styles={{
                  content: {
                    marginTop: 24
                  }
                }}
              >
                <Stepper.Step label="Biodata">
                  <X0 data={data?.x0 ?? []} />
                </Stepper.Step>
                <Stepper.Step label="Karakter Warga">
                  <X1 data={data?.x1 ?? []} />
                </Stepper.Step>
                <Stepper.Step label="Lingkungan">
                  <X2 />
                </Stepper.Step>
                <Stepper.Step label="Dukungan Komunitas">
                  <X3 />
                </Stepper.Step>
                <Stepper.Step label="Keberdayaan">
                  <Y1 />
                </Stepper.Step>
                <Stepper.Step label="Kewirausahaan">
                  <X4 />
                </Stepper.Step>
                <Stepper.Step label="Inovasi">
                  <X5 />
                </Stepper.Step>
                <Stepper.Step label="Smart Economy (Sebelum, Sesudah)">
                  <Y2 />
                </Stepper.Step>
              </Stepper>
              <Container size="sm" pb="lg">
                <Card pos="relative">
                  <Group grow pos="sticky" mt="xs">
                    <Button variant="outline" onClick={() => active === 0 ? navigate({ to: '/' }) : prevStep()}>{active === 0 ? 'Kembali' : 'Sebelum'}</Button>
                    <Button onClick={() => {
                      if (active === 0) {
                        form.blur('x0_nama')
                        form.blur('x0_jenis_kelamin')
                        form.blur('x0_no_hp')
                        form.blur('x0_status_di_kelompok')
                        form.blur('x0_kelas_bangunan_usaha')
                      }
                      if (valid && active !== 7) {
                        nextStep()
                      }
                      if (active === 7) {
                        form.submit()
                      }
                    }} loading={submitting}>Selanjutnya</Button>
                  </Group>
                </Card>
              </Container>
            </form>
          )
        }}
      </Form>
        <Transition transition="slide-up" mounted={y > 100}>
          {(transitionStyles) => (
            <ActionIcon
              style={{ ...transitionStyles, right: 24, bottom: 24, position: 'absolute' }}
              onClick={scrollToTop}
              color="green"
              variant="filled"
              radius="xl"
              size={48}
            >
              <ArrowUp weight="bold" size={24} />
            </ActionIcon>
          )}
        </Transition>
    </Container>
    </ScrollArea>
  );
}

export default QuestionnaireAdd