
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import uvicorn

app = FastAPI()

# Autoriser les requêtes depuis ton frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clé API OpenRouter


class MessageRequest(BaseModel):
    name: str
    context: str
    tone: str
    email: str
@app.post("/generate")
def generate_message(data:MessageRequest):
    url = "https://openrouter.ai/api/v1/chat/completions"
    OPENROUTER_API_KEY = "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"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"Génère un email de relance en français pour {data.name}. Contexte : {data.context}.Le ton du message doit être {data.tone} Sois poli, efficace, et professionnel, ne détaille pas les messages et formule un message simple et conçis avec seulement ce qui est demandé.Utilise que le vouvoiement et le nous en pronom personnel."

    payload = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [{"role": "user", "content": prompt}]
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        message = response.json()['choices'][0]['message']['content']
        return {"message": message}
    else:
        print(response.status_code, response.text)
        return {"error": f"Erreur lors de la génération : {response.text}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
