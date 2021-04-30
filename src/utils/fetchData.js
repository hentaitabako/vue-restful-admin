export default async (url, method = "GET", data = {}, header = {}) => {
  const option = {
    method,
    headers: { "Content-Type": "application/json", ...header },
  };
  if (method !== "GET") {
    option.body = JSON.stringify(data);
  }
  console.log(option);
  const res = await fetch(url, option);
  const json = await res.json();
  return json;
};
