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

  const navigate = useNavigate();

  const cadastrar = async () => {
    setErro("");

    try {
      const user = await createUserWithEmailAndPassword(auth, email, senha);

      // 🗄️ salva no Firestore
      await setDoc(doc(db, "usuarios", user.user.uid), {
        uid: user.user.uid,
        email,
        nome,
        sobrenome,
        dataNascimento: data
      });

      navigate("/login");

    } catch (error) {
      console.log("Erro:", error);

      if (error.code === "auth/email-already-in-use") {
        setErro("Esse e-mail já está cadastrado!");
      } else {
        setErro("Erro ao cadastrar usuário!");
      }
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>

      <input
        placeholder="Email"
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

      <button onClick={cadastrar}>
        Cadastrar
      </button>

      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default Cadastro;
