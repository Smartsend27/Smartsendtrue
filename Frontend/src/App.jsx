import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [context, setContext] = useState("");
const [tone, setTone] = useState("neutre");
const [message, setMessage] = useState("");
const [status, setStatus] = useState("");

const handleGenerate = async () => {
try {
const res = await axios.post("https://ac9bc8d1-18d6-4fe8-97fa-11ed5620cafd-00-3utg87f0b05id.riker.replit.dev/generate", {
name,
email,
context,
tone
});
setMessage(res.data.message);
} catch (err) {
  setMessage(`Erreur : ${err.response ? err.response.data.error : err.message}`);
}
};

const handleSend = async () => {
try {
const res = await axios.post("https://ac9bc8d1-18d6-4fe8-97fa-11ed5620cafd-00-3utg87f0b05id.riker.replit.dev/send_email", {
name,
email,
context,
tone
});
setStatus("Email envoyé !");
} catch (err) {
    console.error(err); // <- Ajoute ceci
    setMessage(`Erreur : ${err.response ? err.response.data.error : err.message}`);
  }
};

return (
<div className="App">
<h1>Smartsend</h1>

<input
type="text"
placeholder="Nom"
value={name}
onChange={(e) => setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<input
type="text"
placeholder="détails à mentionner"
value={context}
onChange={(e) => setContext(e.target.value)}
/>

<select value={tone} onChange={(e) => setTone(e.target.value)}>
<option value="neutre">Neutre</option>
<option value="amical">Amical</option>
<option value="direct">Direct</option>
<option value="positif">Positif</option>
<option value="convaincant">Convaincaint</option>
<option value="négatif">Négatif</option>
<option value="professionnel">Professionnel</option>
</select>

<button onClick={handleGenerate}>Générer le message</button>

{message && (
<textarea
rows="10"
cols="50"
value={message}
onChange={(e) => setMessage(e.target.value)}
style={{ marginTop: "1rem" }}
/>
)}

<button onClick={handleSend}>Envoyer le message</button>

{status && <p>{status}</p>}
</div>
);
}

export default App;
