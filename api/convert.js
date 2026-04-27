export default async function handler(req, res) {
  try {
    const { currency } = req.query;

    const API_KEY = process.env.API_KEY;

    const url = `https://api.exchangerate.host/live?access_key=${API_KEY}&source=USD`;

    const response = await fetch(url);
    const data = await response.json();

    let rate;

    if (currency === "USD") {
      rate = data.quotes.USDBRL;
    }

    if (currency === "EUR") {
      rate = data.quotes.USDEUR * data.quotes.USDBRL;
    }

    if (currency === "GBP") {
      rate = data.quotes.USDGBP * data.quotes.USDBRL;
    }

    res.status(200).json({ rate });

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
}