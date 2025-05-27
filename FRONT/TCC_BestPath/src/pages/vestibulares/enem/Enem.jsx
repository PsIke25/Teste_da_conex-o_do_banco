import styles from "./Enem.module.css";

import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import Banner from "../../../components/vestibular/banner/Banner";
import EnemLogo from "../../../../public/images/enem_banner.png";
import About from "../../../components/vestibular/about/About";
import Calendar from "../../../components/vestibular/calendar/Calendar";
import ImportantLinks from "../../../components/vestibular/importantLinks/ImportantLinks";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function Enem() {
    const [noticias, setNoticias] = useState([]);
    
        useEffect(() => {
            const fetchNoticias = async () => {
                try {
                    const response = await fetch("http://localhost:2024/noticias/divEnem");
                    const data = await response.json();
                    console.log("Notícias recebidas:", data);
                    setNoticias(data);
                } catch (error) {
                    console.error("Erro ao buscar notícias:", error);
                }
            };
            fetchNoticias();
        }, []);

    const createFavorite = async () => {
        try {
            const response = await fetch('http://localhost:2024/usuario/enem/favoritar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 409) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ops!',
                    text: 'Você já favoritou este vestibular.',
                    customClass: {
                        title: styles.titleAlert,
                        htmlContainer: styles.titleContent,
                        confirmButton: styles.alertConfirmButton,
                        cancelButton: styles.alertCancelButton,
                    }
                });
                return;
            }
            if (response.status === 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ops!',
                    text: 'Você já possui 3 favoritos.',
                    customClass: {
                        title: styles.titleAlert,
                        htmlContainer: styles.titleContent,
                        confirmButton: styles.alertConfirmButton,
                        cancelButton: styles.alertCancelButton,
                    }
                });
                return;
            }
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Favoritado com sucesso 😘", data);
            Swal.fire({
                icon: 'success',
                title: 'Favoritado',
                text: 'Você receberá atualizações em seu feed de notícias!',
                customClass: {
                    title: styles.titleAlert,
                    htmlContainer: styles.titleContent,
                    confirmButton: styles.alertConfirmButton,
                    cancelButton: styles.alertCancelButton,
                }
            });
        } catch (error) {
            console.error("Deu ruim no favoritinho 😤", error);
            Swal.fire({
                icon: 'error',
                title: 'Não foi possível favoritar',
                text: 'Ocorreu um erro ao favoritar este vestibular!',
                customClass: {
                    title: styles.titleAlert,
                    htmlContainer: styles.titleContent,
                    confirmButton: styles.alertConfirmButton,
                    cancelButton: styles.alertCancelButton,
                }
            });
        }
    };



    const createLoved = async () => {
        try {
            const response = await fetch('http://localhost:2024/usuario/enem/amar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 409) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ops!',
                    text: 'Você já amou este vestibular.',
                    customClass: {
                        title: styles.titleAlert,
                        htmlContainer: styles.titleContent,
                        confirmButton: styles.alertConfirmButton,
                        cancelButton: styles.alertCancelButton,
                    }
                });
                return;
            }
            if (response.status === 403) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Ops!',
                    text: 'Você já possui 3 amados.',
                    customClass: {
                        title: styles.titleAlert,
                        htmlContainer: styles.titleContent,
                        confirmButton: styles.alertConfirmButton,
                        cancelButton: styles.alertCancelButton,
                    }
                });
                return;
            }
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Amado com sucesso 😘", data);
            Swal.fire({
                icon: 'success',
                title: 'Amado',
                text: 'Você receberá um link dedicado no seu perfil!',
                customClass: {
                    title: styles.titleAlert,
                    htmlContainer: styles.titleContent,
                    confirmButton: styles.alertConfirmButton,
                    cancelButton: styles.alertCancelButton,
                }
            });
        } catch (error) {
            console.error("Deu ruim no favoritinho 😤", error);
            Swal.fire({
                icon: 'error',
                title: 'Não foi possível amar',
                text: 'Ocorreu um erro ao amar este vestibular!',
                customClass: {
                    title: styles.titleAlert,
                    htmlContainer: styles.titleContent,
                    confirmButton: styles.alertConfirmButton,
                    cancelButton: styles.alertCancelButton,
                }
            });
        }
    };

    return (
        <>
            <Header />

            <div className={styles.container}>
                <Banner
                    src={EnemLogo}
                    text="Exame Nacional do Ensino Médio"
                />

                <div>
                    <ImportantLinks
                        link01="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem"
                        text01="SiSU"
                        link02="https://acessounico.mec.gov.br/sisu"
                        text02="Prouni"
                        link03="https://acessounico.mec.gov.br/prouni"
                        text03="FIES"
                        link04="https://acessounico.mec.gov.br/fies"
                        text04="No Site Oficial é de onde são retiradas as datas, o SISU, PROUNi e FIES são sites onde você pode utilizar a sua nota do ENEM para uma faculdade!"
                    />

                    <About 
                        content="O ENEM (Exame Nacional do Ensino Médio) é uma prova padronizada brasileira para o ingresso no ensino superior. Criado em 1998 pelo Ministério da Educação, o ENEM serve para avaliar o desempenho dos estudantes que concluíram o ensino médio e para selecionar candidatos para programas como o SiSU, ProUni e FIES." 
                        onFavorite={createFavorite}
                        onLoved={createLoved}/>

                    <div className={styles.calendar}>
                        {noticias.length > 0 ? (
                            noticias.map((noticia) => (
                                <Calendar
                                    key={noticia.id_data}
                                    title="Últimas notícias:"
                                    content={`${noticia.fdata} - ${noticia.tipo_evento} - ${noticia.descricao}`}
                                />
                            ))
                        ) : (
                            <Calendar
                            title="Últimas notícias:"
                            content="Nenhuma notícia disponível no momento."
                            />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Enem;