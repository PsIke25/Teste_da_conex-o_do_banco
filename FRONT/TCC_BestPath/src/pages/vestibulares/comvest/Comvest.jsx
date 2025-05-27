import styles from "./Comvest.module.css";
import Header from "../../../components/header/Header";
import Banner from "../../../components/vestibular/banner/Banner";
import ComvestLogo from "../../../../public/images/comvest.png"
import ImportantLinks from "../../../components/vestibular/importantLinks/ImportantLinks";
import About from "../../../components/vestibular/about/About";
import Calendar from "../../../components/vestibular/calendar/Calendar";
import Footer from "../../../components/footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

function Comvest() {
    const [noticias, setNoticias] = useState([]);
        
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch("http://localhost:2024/noticias/divComvest");
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
            const response = await fetch('http://localhost:2024/usuario/comvest/favoritar', {
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
            const response = await fetch('http://localhost:2024/usuario/comvest/amar', {
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
    
    return(
        <>
            <Header />

            <div className={styles.container}>
                <Banner 
                src={ComvestLogo}
                text="Comissão Permanente para os Vestibulares da Unicamp" />

                <div>
                    <ImportantLinks 
                    link01="https://www.comvest.unicamp.br/"

                    text01="Dúvidas frequentes"
                    link02="https://www.comvest.unicamp.br/faq-perguntas-frequentes/"

                    text02="Unidades e cursos"
                    link03="https://www.comvest.unicamp.br/cursos/"

                    text03="Contatos"
                    link04="https://www.comvest.unicamp.br/fale-conosco/"
                        
                    text04="Os principais links para você não ficar muito perdido em busca de uma informação! 😉" />

                    <About 
                    content="O vestibular COMVEST é a principal forma de ingresso nos cursos de graduação da Universidade Estadual de Campinas (Unicamp). Ele é organizado pela Comissão Permanente para os Vestibulares da Unicamp (COMVEST) e inclui duas fases de provas."
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
    )
}

export default Comvest;