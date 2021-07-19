<template>
  <div class="top-btn">
    <el-button type="primary" plain size="medium" @click="createItem"
      >新增</el-button
    >
  </div>
  <el-table :data="tableData" style="width: 100%" height="700">
    <template v-for="item in columns" :key="item.prop">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template #default="scope">{{ filterItem(scope.row, item) }}</template>
      </el-table-column>
    </template>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          size="mini"
          @click="editItem(scope)"
          v-if="canEdit"
          >编辑</el-button
        >
        <el-button type="primary" size="mini" @click="deleteItem(scope)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="page">
    <el-pagination
      layout="prev, pager, next"
      :page-count="pageTotal"
      :page-size="pageSize"
      v-model:currentPage="pageNo"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
  <form-dialog
    v-model="show"
    :columns="columns"
    :row="curRow"
    :dataServer="dataServer"
  />
</template>

<script>
import FormDialog from "@/components/FormDialog.vue";
export default {
  name: "el-admin",
  components: {
    FormDialog,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    dataServer: {
      type: Object,
      default() {
        return {};
      },
    },
    itemId: {
      type: String,
      default: "id",
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.getTableData();
  },
  watch: {
    show(newValue, oldValue) {
      console.log("show change");
      if (!newValue) {
        this.getTableData();
      }
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      page: {},
      server: null,
      tableData: [],
      show: false,
      curRow: null,
      pageSize: 10,
      pageNo: 1,
      pageTotal: 1,
    };
  },
  methods: {
    handlePageChange(e) {
      this.getTableData();
    },
    filterItem(row, item) {
      const value = row[item.prop];
      switch (item.type) {
        case "select":
          return value.label;
        case "time":
          return this.$dayjs(value).format(item.format ?? "YYYY-MM-DD HH:mm");
        default:
          return value;
      }
    },
    async getTableData() {
      let res = await this.dataServer.getAll({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      });
      this.tableData = res.data;
      this.pageTotal = res.page_total ?? 0;
      console.log(this.pageTotal, "res");
    },
    createItem() {
      this.curRow = null;
      this.show = true;
    },
    editItem(item) {
      const { row } = item;
      this.curRow = row;
      this.show = true;
    },
    deleteItem({ row }) {
      this.$confirm("确定要删除吗")
        .then(async () => {
          await this.dataServer.delete(row[this.itemId]);
          this.getTableData();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped lang="scss">
.top-btn {
  padding: 0 12px;
  text-align: right;
}
.page {
  text-align: right;
}
</style>