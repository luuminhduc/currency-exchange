export async function getAllCurrency(uri) {
    const res = await fetch(uri);
    const data = await res.json();
    return data.rates;
}