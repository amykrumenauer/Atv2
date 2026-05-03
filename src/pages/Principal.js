import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Principal() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // 🔧 função para formatar data
  function formatarData(data) {
    if (!data) return "";
    return new Date(data).toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          navigate("/login");
          return;
        }

        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        } else {
          setErro("Usuário não encontrado.");
        }
      } catch (e) {
        console.log(e);
        setErro("Erro ao buscar dados.");
      }
    };

    buscarDados();
  }, [navigate]);

  return (
    <div className="container">
      <h2>Página Principal</h2>

      {erro && <p className="erro">{erro}</p>}

      {!usuario ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <p>Nome: {usuario.nome}</p>
          <p>Sobrenome: {usuario.sobrenome}</p>
          <p>Data: {formatarData(usuario.dataNascimento)}</p>
        </div>
      )}

      <button onClick={() => navigate("/login")}>
        Sair
      </button>
    </div>
  );
}

export default Principal;