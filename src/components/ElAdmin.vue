<template>
    <div class="top-btn">
        <el-button type="primary" plain size="medium" @click="createItem">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
        <template v-for="item in columns" :key="item.prop">
            <el-table-column :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        </template>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" size="mini" @click="editItem(scope)">编辑</el-button>
                <el-button type="primary" size="mini" @click="deleteItem(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <form-dialog v-model="show" :columns="columns" :row="curRow" :dataServer="dataServer" />
</template>

<script>
import FormDialog from '@/components/FormDialog.vue';
export default {
    name: 'el-admin',
    components: {
        FormDialog,
    },
    props: {
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        dataServer: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created() {
        this.getTableData()
    },
    watch: {
        show(newValue, oldValue) {
            console.log('show change');
            if (!newValue) {
                this.getTableData()
            }

        }
    },
    setup() {
        return {}
    },
    data() {
        return {
            page: {},
            server: null,
            tableData: [],
            show: false,
            curRow: null
        }
    },
    methods: {
        async getTableData() {
            this.tableData = await this.dataServer.getAll()
        },
        createItem() {
            this.curRow = null;
            this.show = true;
        },
        editItem({ row }) {
            this.curRow = row
            this.show = true;
            console.log(row);
        },
        deleteItem({ row }) {
            this.$confirm('确定要删除吗').then(async () => {
                await this.dataServer.delete(row.id)
                this.getTableData()
            }).catch((_) => {
            });
        }
    },
}
</script>

<style scoped lang="scss">
.top-btn {
    padding: 0 12px;
    text-align: right;
}
</style>