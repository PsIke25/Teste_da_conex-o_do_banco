import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Favorite from "../../components/user/favorite/Favorite";
import Loved from "../../components/user/loved/Loved";
import News from "../../components/user/news/News";
import { useAuth } from "../../context/AuthContext";
import styles from "./User.module.css";

function User() {

  const formatarNome = (nome) => {
    return nome.replace
      (
        /\s+/g, ''
      ).replace
        (
          /^[A-Z]/, c => c.toLowerCase()
        ).replace
          (
            /\s+([a-zA-Z])/g, (_, c) => c.toUpperCase()
          )
}
  const [noticias, setNoticias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [amados, setAmados] = useState([]);
  const { usuario, setUsuario } = useAuth();
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const imagens = [
    "public/perfis/1.png",
    "public/perfis/2.png",
    "public/perfis/3.png",
    "public/perfis/4.png",
  ];

  useEffect(() => {
    // Carrega a imagem de perfil salva no localStorage
    const imagemSalva = localStorage.getItem("imagemPerfil");
    if (imagemSalva) {
      setFotoSelecionada(imagemSalva);
    }
  }, []);
  
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("http://localhost:2024/noticias/divUser");
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    };
    fetchNoticias();
  }, []);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await fetch("http://localhost:2024/instituicao/favoritos");
        const data = await response.json();
        setFavoritos(data);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };
    fetchFavoritos();
  }, []);

  useEffect(() => {
    const fetchAmados = async () => {
      try {
        const response = await fetch("http://localhost:2024/instituicao/amados");
        const data = await response.json();
        setAmados(data);
      } catch (error) {
        console.error("Erro ao buscar amados:", error);
      }
    };
    fetchAmados();
  }, []);

  const handleSelecionarImagem = (img) => {
    setFotoSelecionada(img);
    localStorage.setItem("imagemPerfil", img);
    setMostrarOpcoes(false);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.userAndFavorite}>
          <div className={styles.user}>
            <div className={styles.photo} onClick={() => setMostrarOpcoes(true)}>
              {fotoSelecionada ? (
                <img
                  src={fotoSelecionada}
                  alt="Foto de perfil"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                />
              ) : (
                <div className={styles.placeholderText}>Foto de perfil</div>
              )}
            </div>
            <p key={usuario?.id}>{usuario?.nome}</p>
          </div>

          {mostrarOpcoes && (
            <div className={styles.opcoes}>
              {imagens.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Opção ${index + 1}`}
                  onClick={() => handleSelecionarImagem(img)}
                  className={styles.opcaoImagem}
                />
              ))}
            </div>
          )}
          <br></br>
          <div className={styles.userFavorites}>
            <p>Os vestibulares de seu interesse:</p>
            <div className={styles.favorites}>
              <div className={styles.vestibulares}>
                <div>
                  {favoritos.length > 0 ? (
                    favoritos.map((favorito) => (
                      <Favorite
                        key={favorito.id_favorito}
                        title={favorito.nome}
                        link={`/${formatarNome(favorito.nome)}`}
                      />
                    ))
                  ) : (
                    <p>Não há nada para mostrar...</p>
                  )}
                </div>
                <div>
                  {amados.length > 0 ? (
                    amados.map((amado) => (
                      <Loved
                        key={amado.id_amado}
                        title={amado.nome}
                      />
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.news}>
          <p>Últimas notícias dos seus favoritos:</p>
          {noticias.length > 0 ? (
            noticias.map((noticia) => (
              <News
                key={noticia.id_data}
                title={noticia.nome}
                content={
                  noticia.fdata +
                  " - " +
                  noticia.tipo_evento +
                  " - " +
                  noticia.descricao
                }
              />
            ))
          ) : (
            <p>Carregando notícias...</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default User;
