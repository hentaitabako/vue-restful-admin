import fetchTool from './fetchData';

export default (url) => ({
    getAll: ({ pageSize: page_size = 10, pageNo: page_no = 1 }) =>
        fetchTool(url, 'GET', { page_size, page_no }),
    get: (id) => fetchTool(`${url}/${id}`),
    create: (data) => fetchTool(url, 'post', data),
    update: (data) => {
        const { id, ...payload } = data;
        return fetchTool(`${url}/${id}`, 'put', payload);
    },
    delete: (id) => fetchTool(`${url}/${id}`, 'delete'),
});
