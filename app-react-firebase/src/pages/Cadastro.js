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

    // ✅ CAMPOS OBRIGATÓRIOS
    if (!email || !senha || !nome || !sobrenome || !data) {
      setErro("Preencha todos os campos!");
      return;
    }

    // SENHA
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    // NOME E SOBRENOME (sem números)
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regex.test(nome.trim())) {
      setErro("Nome não pode conter números!");
      return;
    }

    if (!regex.test(sobrenome.trim())) {
      setErro("Sobrenome não pode conter números!");
      return;
    }

    // DATA (não pode ser futura)
    const hoje = new Date().toISOString().split("T")[0];

    if (data > hoje) {
      setErro("A data não pode ser futura!");
      return;
    }

    try {
      // Firebase Auth
      const user = await createUserWithEmailAndPassword(auth, email, senha);

      // Firestore
      await setDoc(doc(db, "usuarios", user.user.uid), {
        uid: user.user.uid,
        email,
        nome,
        sobrenome,
        dataNascimento: data
      });

      // ✅ SUCESSO
      setSucesso("Cadastro realizado com sucesso!");

      // redireciona
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
      console.log("ERRO:", error);

      if (error.code === "auth/email-already-in-use") {
        setErro("Esse e-mail já está cadastrado!");
      } else if (error.code === "auth/invalid-email") {
        setErro("E-mail inválido!");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres!");
      } else {
        setErro("Erro ao cadastrar usuário!");
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

      {/* mensagens */}
      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">{sucesso}</p>}

      <button onClick={cadastrar}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;