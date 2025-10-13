const BASE_URL = "http://localhost:3001/wines";

export async function fetchWines() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}

export async function fetchWineById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}
