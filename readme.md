# Vue restful admin

根据 restful 接口快速创建 CRUD 界面

restful 接口根据不同的请求方式可以快速完成资源的增删查改,而对于前端来说意味着只需要为组件
提供一个 url 属性便可以完成所有的操作.

在此项目中，参考了[react-admin](https://github.com/marmelab/react-admin)的中的 data-provider
的设计思路，将 restful 请求接口写成单独的函数，这样便可以定义自己的请求接口

1.  定义 dataServer

        dataServer 中定义了五种基本操作

    ```js
    const dataServer = (url) => ({
        getAll: ({ pageSize, pageNo }) => {
            return [];
        },
        get: (id) => {},
        create: (data) => {},
        update: (data) => {},
        delete: (id) => {}
    });
    ```

2.  通过编写类似 schema 的方式来定义表格和编辑表单

    ```js
    columns: [
        { prop: 'author', label: '姓名', type: 'input' },
        { prop: 'title', label: '标题', type: 'input' },
        {
            prop: 'create_at',
            label: '创建时间',
            type: 'time',
            format: 'YYYY-MM-DD HH:mm'
        },
        {
            prop: 'gender',
            label: '性别',
            type: 'select',
            options: [
                { label: '男', value: 1 },
                { label: '女', value: 2 }
            ]
        }
    ];
    ```

3.  效果图

    ![表格](./img/table.PNG '根据columns渲染的表格')
    ![编辑于新增](./img/edit.PNG '根据columns渲染的表格')

## TODO

-   [x] 添加翻页功能
-   [ ] 完善表格显示
-   [ ] npm 包
