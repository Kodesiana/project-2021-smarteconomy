
import { FeatureCard } from "@/components/elements/feature-card/FeatureCard";
import { Container, SimpleGrid, useMantineTheme } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { Navigate, useNavigate } from "@tanstack/react-location";
import styles from "./Landing.module.scss";


const LandingModule = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    return (
        <div className={styles.root} style={{ backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0] }}>
            <Container mt={130} mb={30} size="xl">
                <SimpleGrid className={styles.grid} cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]} spacing={50}>
                    <FeatureCard image={"./citizen.webp"}
                        title={"Citizen Science"} category={""}
                        content={"Isi dan ubah Kuesioner masyarakat untuk kepentingan penelitian."}
                    />
                    <FeatureCard image={"./expert.webp"}
                        title={"Kerja Sama"} category={""}
                        content={"Manajemen variabel dan parameter yang dibutuhkan untuk kepentingan penelitian."}
                    // actionText={"Input Bobot Faktor"} actionHandler={() => showNotification(
                    //     {
                    //         title: 'Jawaban Tersimpan!',
                    //         message: 'Jawaban Anda telah disimpan pada sistem. Terima kasih!',
                    //         icon: <Check size={20} />
                    //     }
                    // )}
                    />
                    <FeatureCard image={"./infra.webp"} title={"Infrastuktur"} category={""}
                        content={"Manajemen variabel dan parameter yang dibutuhkan untuk Infrastruktur."}
                    // actionText={"Comming Soon"} actionDisabled
                    />
                </SimpleGrid>
            </Container>
        </div>
    );
};

export default LandingModule;