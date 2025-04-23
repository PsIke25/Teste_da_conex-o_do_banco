import styles from "./User.module.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Favorite from "../../components/user/favorite/Favorite";
import News from "../../components/user/news/News";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"; // Adicionando axios para fazer a requisição à API

function User() {
  const { usuario } = useAuth();
  const [vestibulares, setVestibulares] = useState([]); // Estado para armazenar dados dos vestibulares
  const [loading, setLoading] = useState(true); // Estado de loading
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    // Função para buscar os vestibulares
    const fetchVestibulares = async () => {
      try {
        const response = await axios.get("http://localhost:3000/API/vestibular"); // Chamada à API (ajuste a URL conforme necessário)
        setVestibulares(response.data); // Armazena os dados no estado
      } catch (err) {
        setError("Erro ao carregar os dados dos vestibulares");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    fetchVestibulares();
  }, []);

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

        {/* Informações dos vestibulares */}
        <div className={styles.news}>
          <p>Últimas notícias dos seus favoritos:</p>

          {loading && <p>Carregando...</p>}
          {error && <p>{error}</p>}

          {/* Exibindo os vestibulares vindos da API */}
          {!loading && !error && vestibulares.length > 0 && vestibulares.map((vestibular) => (
            <News
              key={vestibular.nome}
              title={vestibular.nome}
              content={`Data de Inscrição: ${vestibular.dataInscricao} | Data da Prova: ${vestibular.dataProva}`}
            />
          ))}

          {/* Exemplo fixo de vestibulares */}
          {!loading && !error && vestibulares.length === 0 && (
            <>
              <News
                title="Fuvest"
                content=""
              />
              <News
                title="Fatec"
                content=""
              />
              <News
                title="Enem"
                content=""
              />
              <News
                title="Etec"
                content=""
              />
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default User;
