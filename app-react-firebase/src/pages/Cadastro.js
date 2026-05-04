import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [data, setData] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();

  const cadastrar = async () => {
    setErro("");
    setSucesso("");

    // VALIDAÇÕES
    if (!email || !senha || !nome || !sobrenome || !data) {
      setErro("Preencha todos os campos!");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    try {
      // cria usuário no Auth
      const user = await createUserWithEmailAndPassword(auth, email, senha);

      // salva no Firestore
      await setDoc(doc(db, "usuarios", user.user.uid), {
        uid: user.user.uid,
        email,
        nome,
        sobrenome,
        dataNascimento: data
      });

      // mensagem de sucesso
      setSucesso("Cadastro realizado com sucesso!");

      // redireciona após 1.5s
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      // limpar campos
      setEmail("");
      setSenha("");
      setNome("");
      setSobrenome("");
      setData("");

    } catch (error) {
      console.log(error);

      // tratamento de erros do Firebase
      if (error.code === "auth/email-already-in-use") {
        setErro("Esse e-mail já está cadastrado!");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres!");
      } else if (error.code === "auth/invalid-email") {
        setErro("E-mail inválido!");
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <button onClick={cadastrar}>Cadastrar</button>

      {/* mensagens */}
      {sucesso && <p className="sucesso">{sucesso}</p>}
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default Cadastro;
