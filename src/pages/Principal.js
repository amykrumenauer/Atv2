import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Principal() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      const user = auth.currentUser;

      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setDados(snap.data());
        }
      }
    };

    carregar();
  }, []);

  return (
    <div>
      <h2>Principal</h2>

      {dados && (
        <>
          <p>Nome: {dados.nome}</p>
          <p>Sobrenome: {dados.sobrenome}</p>
          <p>Data: {dados.dataNascimento}</p>
        </>
      )}
    </div>
  );
}

export default Principal;