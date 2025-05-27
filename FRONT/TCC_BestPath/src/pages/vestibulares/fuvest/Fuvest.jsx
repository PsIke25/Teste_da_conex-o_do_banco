import styles from "./Fuvest.module.css";
import Header from "../../../components/header/Header";
import Banner from "../../../components/vestibular/banner/Banner";
import FuvestLogo from "../../../../public/images/fuvest.png";
import ImportantLinks from "../../../components/vestibular/importantLinks/ImportantLinks";
import About from "../../../components/vestibular/about/About";
import Calendar from "../../../components/vestibular/calendar/Calendar";
import Footer from "../../../components/footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";



function Fuvest() {
    const [noticias, setNoticias] = useState([]);
    
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch("http://localhost:2024/noticias/divFuvest");
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
            const response = await fetch('http://localhost:2024/usuario/fuvest/favoritar', {
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
            const response = await fetch('http://localhost:2024/usuario/fuvest/amar', {
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
                src={FuvestLogo}
                text="Fundação Universitária para o Vestibular" />

                <div>
                    <ImportantLinks
                    link01="https://www.fuvest.br/"

                    text01="Área do candidato"
                    link02="https://app.fuvest.br/login"

                    text02="Dúvidas frequentes"
                    link03="https://app.fuvest.br/faleconosco_faq"

                    text03="Acervo"
                    link04="https://www.fuvest.br/acervo/"
                            
                    text04="Os principais links para você não ficar muito perdido em busca de uma informação! 😉"  />

                    <About content="A Fuvest, ou Fundação Universitária para o Vestibular, é uma organização sem fins lucrativos criada pela Universidade de São Paulo (USP) responsável por todo o processo seletivo, desde a inscrição até a correção das provas e ingresso a USP em diversas áreas do conhecimento, como Humanas, Exatas e Biológicas."
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

export default Fuvest;