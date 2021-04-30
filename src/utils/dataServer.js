import fetchTool from "./fetchData";

export default (url) => ({
  getAll: () => fetchTool(url),
  get: (id) => fetchTool(`${url}/${id}`),
  create: (data) => fetchTool(url, "post", data),
  update: (data) => {
    const { id, ...payload } = data;
    return fetchTool(`${url}/${id}`, "put", payload);
  },
  delete: (id) => fetchTool(`${url}/${id}`, "delete"),
});
