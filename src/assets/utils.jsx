// debounce generico
export const debounce = (fn, time) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(value);
    }, time);
  };
};

// funzione di supporto per comporre la chiamata api
function endpointCheck(search, category) {
  let urlString = "http://localhost:3001/services";
  if (search !== "" && category !== "") {
    return (urlString += `?search=${encodeURIComponent(search)}&category=${category}`);
  }

  if (search !== "") urlString += `?search=${encodeURIComponent(search)}`;
  if (category !== "") urlString += `?category=${category}`;

  return urlString;
}

// fetch per ricerca e/o categoria
export const fetchServiceApi = async (search = "", category = "") => {
  const endpoint = endpointCheck(search, category);
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
