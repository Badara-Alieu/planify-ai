// api/generate.js — Vercel Serverless Function
// Cette fonction tourne côté serveur, ta clé API est sécurisée.

export default async function handler(req, res) {
  // Autoriser uniquement les requêtes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { name, sector, market, budget, idea } = req.body;

  if (!name || !idea) {
    return res.status(400).json({ error: "Le nom et l'idée sont requis." });
  }

  const prompt = `Tu es un expert en création d'entreprise et en stratégie d'affaires. Génère un business plan complet et professionnel pour le projet suivant.

**Informations du projet:**
- Nom: ${name}
- Secteur: ${sector || "Non spécifié"}
- Marché cible: ${market || "Non spécifié"}
- Budget de démarrage: ${budget}
- Description: ${idea}

Génère un business plan structuré avec les sections suivantes (utilise des titres clairs avec ##):

## 1. Résumé Exécutif
## 2. Description de l'Entreprise
## 3. Analyse du Marché
## 4. Produits & Services
## 5. Stratégie Marketing & Commerciale
## 6. Plan Opérationnel
## 7. Projections Financières
## 8. Analyse des Risques
## 9. Plan d'Action — 3 premiers mois

Sois précis, concret et adapté au contexte du marché indiqué. Inclus des chiffres et estimations réalistes.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // Clé sécurisée côté serveur
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Anthropic API error:", err);
      return res.status(500).json({ error: "Erreur API Anthropic", detail: err });
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("") || "Erreur génération";
    return res.status(200).json({ result: text }); 
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Erreur serveur interne." });
  }
}
