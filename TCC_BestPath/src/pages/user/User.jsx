import { useEffect, useState } from "react"; // Importando hooks do React
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Favorite from "../../components/user/favorite/Favorite";
import News from "../../components/user/news/News";

function User() {
  const [noticias, setNoticias] = useState([]); // Para armazenar as notícias
  const { usuario } = useAuth(); // Assumindo que você tem o contexto de usuário

  // Função para buscar as notícias usando fetch
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("http://localhost:2024/noticias"); // Requisição para a rota /noticias
        const data = await response.json(); // Espera o retorno no formato JSON
        setNoticias(data); // Armazena as notícias no estado
      } catch (error) {
        console.error("Erro ao buscar notícias:", error); // Log de erro caso algo dê errado
      }
    };
    fetchNoticias(); // Chama a função para buscar as notícias
  }, []); // O array vazio garante que isso aconteça uma única vez, quando o componente for montado

  return (
    <>
      <Header />

      <p>User</p>

      <div className={styles.container}>

        {/* Foto de perfil e favoritos */}
        <div className={styles.userAndFavorite}>
          <div className={styles.user}>
            <div className={styles.photo}>
              <img />
            </div>
            <p>{usuario?.nome}</p>
          </div>

          <div className={styles.userFavorites}>
            <p>Os vestibulares de seu interesse:</p>
            <div className={styles.favorites}>
              <div className={styles.vestibulares}>
                <div>
                  <Favorite title="Fuvest" />
                  <Favorite />
                  <Favorite />
                </div>
                <div>
                  <Favorite />
                  <Favorite />
                  <Favorite />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exibição das notícias */}
        <div className={styles.news}>
          <p>Últimas notícias dos seus favoritos:</p>
          {noticias.length > 0 ? (
            noticias.map((noticia) => (
              <News 
                key={noticia.id} 
                title={noticia.titulo} 
                content={noticia.conteudo} 
              />
            ))
          ) : (
            <p>Carregando notícias...</p> // Caso ainda não tenha notícias
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default User;
