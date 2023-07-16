import { useGetQuestionnairePublicQuestion } from "@/services/QuestionnaireServices/QuestionnaireQueries";
import QuestionnaireServices from "@/services/QuestionnaireServices/QuestionnaireServices";
import { Button, Card, Container, Group, Stepper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMatch, useNavigate } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
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

const QuestionnaireAdd = () => {
  const { params: { id= '' }, data: { answer = {} } } = useMatch();

  const [initialValues] = useState(answer??{});

  const query = useQueryClient();
  const navigate = useNavigate();
  const { data } = useGetQuestionnairePublicQuestion();

  const [active, setActive] = useState(0);
  const nextStep = useCallback(() => {
    setActive((current) => (current + 1))
  },[]);

  const prevStep = useCallback(() => setActive((current) => (current > 0 ? current - 1 : current)),[]);

  const onSubmit = useCallback(async (e: any) => {
      try {
        if (id) {
          await QuestionnaireServices.putQuestionnaire(id, e);
        }else {
          await QuestionnaireServices.postQuestionnaire(e);
        }
        showNotification({
          title: 'Berhasil',
          message: 'Data Berhasil Tersimpan',
          color: 'green',
          icon: <Check />,
        });
        query.invalidateQueries(['questionaire']);
        navigate({ to: '/app/data/kuesioner' });
      } catch (error) {
        showNotification({
          title: 'Gagal',
          message: 'Data Gagal Tersimpan',
          color: 'red',
          icon: <X />,
        });
      }
  },[id])

  return (
    <Container fluid p="xl">
      <Form
        initialValues={initialValues}
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
                    marginTop: 32,
                  },
                  stepIcon: {
                    backgroundColor: '#DEE2E6'
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
              <Container size="sm">
                <Card pos="relative">
                  <Group grow pos="sticky" bottom={0}>
                    <Button variant="outline" onClick={() => active === 0 ? navigate({ to: '/app/data/kuesioner' }) : prevStep()}>{active === 0 ? 'Kembali' : 'Sebelum'}</Button>
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
    </Container>
  );
}

export default QuestionnaireAdd