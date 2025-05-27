import styles from "./Mackenzie.module.css";
import Header from "../../../components/header/Header";
import Banner from "../../../components/vestibular/banner/Banner";
import MackenzieLogo from "../../../../public/images/mackenzie.png";
import About from "../../../components/vestibular/about/About";
import ImportantLinks from "../../../components/vestibular/importantLinks/ImportantLinks";
import Calendar from "../../../components/vestibular/calendar/Calendar";
import Footer from "../../../components/footer/Footer";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";



function Mackenzie() {
    const [noticias, setNoticias] = useState([]);
    
    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch("http://localhost:2024/noticias/divMackenzie");
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
            const response = await fetch('http://localhost:2024/usuario/mackenzie/favoritar', {
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
            const response = await fetch('http://localhost:2024/usuario/mackenzie/amar', {
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
                src={MackenzieLogo}
                text="Universidade Presbiteriana Mackenzie" />

                <div>
                    <ImportantLinks 
                    link01="https://www.mackenzie.br/"

                    text01="Central de informações"
                    link02="https://www.mackenzie.br/atendimento/central-de-informacoes"

                    text02="Unidades e cursos"
                    link03="https://www.mackenzie.br/processos-seletivos/vestibular-graduacao"

                    text03="Contatos"
                    link04="https://www.mackenzie.br/colegios/alphaville-tambore/contatos"
                        
                    text04="Os principais links para você não ficar muito perdido em busca de uma informação! 😉" />

                    <About 
                    content="O Vestibular Mackenzie é um processo seletivo que oferece vagas para estudantes que desejam ingressar em cursos de graduação na Universidade Presbiteriana Mackenzie, uma instituição de ensino superior privada e tradicional no Brasil. Oferece formação de qualidade em diversas áreas, como Engenharias, Direito, Administração, Arquitetura, entre outras."
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

export default Mackenzie;