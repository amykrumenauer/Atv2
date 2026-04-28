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

  const navigate = useNavigate();

  const cadastrar = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, senha);

      await setDoc(doc(db, "usuarios", user.user.uid), {
        uid: user.user.uid,
        email,
        nome,
        sobrenome,
        dataNascimento: data
      });

      alert("Cadastro realizado!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
      <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Sobrenome" onChange={(e) => setSobrenome(e.target.value)} />
      <input type="date" onChange={(e) => setData(e.target.value)} />

      <button onClick={cadastrar}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;