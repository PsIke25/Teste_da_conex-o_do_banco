import { useState, useEffect, useRef, input } from "react";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";7
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import styles from "./SignUp.module.css";
import api from '../../../services/api.js'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from "../../../services/firebaseConfig.js";

function SignUp() {
  const inputNome = useRef()
  const inputCPF = useRef()
  const inputEmail = useRef()
  const inputCelular = useRef()
  const inputSenha = useRef()
  const inputCEP = useRef()
  const inputDataNasc = useRef()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  const[ CreateUserWithEmailAndPassword,user, loading, error,] = useCreateUserWithEmailAndPassword(auth);

  function handleSignIn(e){
    e.preventDefault();
    CreateUserWithEmailAndPassword(email,password)
  }

  async function createUsuarios(e) {
  e.preventDefault(); // impede o reload padrão do form

  try {
    await api.post('/usuario', {
      nome: inputNome.current.value,
      cpf: inputCPF.current.value,
      email: inputEmail.current.value,
      senha: inputSenha.current.value,
      celular: inputCelular.current.value,
      cep: inputCEP.current.value,
      data_nasc: inputDataNasc.current.value,
      premium: '',
      delete: ''
    });

    // Cria usuário no Firebase
    handleSignIn(e);

  } catch (error) {
    if (error.response && error.response.status === 400) {
      const tipoErro = error.response.data.erro;

      if (tipoErro === 'EMAIL_DUPLICADO') {
        Swal.fire({
          icon: 'error',
          title: 'E-mail duplicado',
          text: 'Este e-mail já está cadastrado.',
          customClass: {
            title: styles.titleAlert,
            htmlContainer: styles.titleContent,
            confirmButton: styles.alertConfirmButton,
            cancelButton: styles.alertCancelButton,
          }
        });
      } else if (tipoErro === 'CPF_DUPLICADO') {
        Swal.fire({
          icon: 'error',
          title: 'CPF duplicado',
          text: 'Este CPF já está cadastrado.',
          customClass: {
            title: styles.titleAlert,
            htmlContainer: styles.titleContent,
            confirmButton: styles.alertConfirmButton,
            cancelButton: styles.alertCancelButton,
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro no cadastro',
          text: 'Ocorreu um erro ao tentar cadastrar. Tente novamente.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro desconhecido',
        text: 'Não foi possível conectar ao servidor.',
      });
    }
  }
}

  
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  
  const [bydate, setBydate] = useState('');
  const [nome, setNome] = useState('');
  const navigate = useNavigate(); 

  const validarCPF = (cpf) => {
    const cpfNumeros = cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfNumeros)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto > 9 ? 0 : resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto > 9 ? 0 : resto;

    return digito1 === parseInt(cpfNumeros.charAt(9)) && digito2 === parseInt(cpfNumeros.charAt(10));
  };

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validarSenha = (senha) => {
    return senha.length >= 8;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nome || !cpf || !email || !password || !cep || !celular || !bydate) {
    return Swal.fire({ icon: 'error', title: 'Preencha todos os campos', text: 'Todos os campos são obrigatórios!', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
  }

  if (!validarCPF(cpf)) {
    return Swal.fire({ icon: 'error', title: 'CPF inválido', text: 'Por favor, insira um CPF válido.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
  }

  if (!validarEmail(email)) {
    return Swal.fire({ icon: 'error', title: 'E-mail inválido', text: 'Por favor, insira um e-mail válido.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
  }

  if (!validarSenha(password)) {
    return Swal.fire({ icon: 'error', title: 'Senha inválida', text: 'A senha deve ter pelo menos 8 caracteres.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
  }

  try {
    // 1. Cria no banco
    await api.post('/usuario', {
      nome: inputNome.current.value,
      cpf: inputCPF.current.value,
      email: inputEmail.current.value,
      senha: inputSenha.current.value,
      celular: inputCelular.current.value,
      cep: inputCEP.current.value,
      data_nasc: inputDataNasc.current.value,
      premium: '',
      delete: ''
    });

    // 2. Cria no Firebase
    await CreateUserWithEmailAndPassword(email, password);

    // 3. Alerta de sucesso e redireciona
    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado',
      text: 'Seu cadastro foi realizado com sucesso!',
      customClass: {
        title: styles.titleAlert,
        htmlContainer: styles.titleContent,
        confirmButton: styles.alertConfirmButton,
        cancelButton: styles.alertCancelButton,
      }
    }).then(() => {
      navigate("/signIn");
    });

    // 4. Limpa os campos
    setNome('');
    setCpf('');
    setEmail('');
    setCelular('');
    setCep('');
    setPassword('');
    setBydate('');

  } catch (error) {
    if (error.response && error.response.status === 400) {
      const tipoErro = error.response.data.erro;
      if (tipoErro === 'EMAIL_DUPLICADO') {
        return Swal.fire({ icon: 'error', title: 'E-mail duplicado', text: 'Este e-mail já está cadastrado.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
      } else if (tipoErro === 'CPF_DUPLICADO') {
        return Swal.fire({ icon: 'error', title: 'CPF duplicado', text: 'Este CPF já está cadastrado.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
      }
    }

    return Swal.fire({ icon: 'error', title: 'Erro no cadastro', text: 'Não foi possível completar o cadastro.', customClass: { title: styles.titleAlert, htmlContainer: styles.titleContent, confirmButton: styles.alertConfirmButton, cancelButton: styles.alertCancelButton } });
  }
};
  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.box}>
            <div className={styles.information}>
              <div>
                <p>Nome completo</p>
                <input
                  className={styles.inputLeft}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={"Lyvia da Silva"} 
                  ref={inputNome}
                  />
              </div>
              <div>
                <p>CPF</p>
                <InputMask
                  mask="999.999.999-99"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className={styles.inputRight}
                  placeholder="___.___.___-__" 
                  ref={inputCPF}
                  />
              </div>
            </div>
            <div className={styles.information}>
              <div>
                <p>E-mail</p>
                <input
                  className={styles.inputLeft}
                  type={"email"}
                  id={"email"}
                  name={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"lyvia.silva@gmail.com"} 
                  ref={inputEmail}
                  
                  />
              </div>
              <div>
                <p>Celular</p>
                <InputMask
                  mask="(99) 99999-9999"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  className={styles.inputRight}
                  placeholder="(__) _____-____"
                  ref={inputCelular}

                  />
              </div>
            </div>
            <div className={styles.information}>
              <div>
                <p>Senha</p>
                <input
                  className={styles.inputLeft}
                  type={"password"}
                  id={"password"}
                  name={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"**********"} 
                  ref={inputSenha}
                  
                  />
              </div>
              <div>
                <p>CEP</p>
                <InputMask
                  mask="99999-999"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className={styles.inputCep}
                  placeholder="_____-___"
                  ref={inputCEP}
                  
                  />
              </div>
            </div>
            <div className={styles.information}>
              <div>
                <p>Data de nascimento</p>
                <input
                  className={styles.inputLeft}
                  type={"date"}
                  id={"bydate"}
                  name={"bydate"}
                  value={bydate}
                  onChange={(e) => setBydate(e.target.value)} 
                  ref = {inputDataNasc}
                  
                  />
              </div>
            </div>
            <div className={styles.botLine}>
              <Link to="/signin" className={styles.link}>
                <span>Já tenho cadastro!</span>
              </Link>

              <Button
                type="submit"
                className={styles.buttonSignUp}
                text="Cadastrar"
              />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;