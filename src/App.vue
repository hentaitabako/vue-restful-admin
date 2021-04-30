<template>
  <el-admin :columns="columns" :dataServer="server"></el-admin>
</template>

<script>
import ElAdmin from '@/components/ElAdmin.vue';
import dataServer from '@/utils/dataServer.js';
export default {
  components: {
    ElAdmin,
  },
  data() {
    return {
      columns: [
        { prop: 'author', label: '姓名', type: 'input' },
        { prop: 'title', label: '标题', type: "input" },
        {
          prop: 'create_at',
          label: '创建时间',
          type: "time",
          format: 'YYYY-MM-DD HH:mm'
        },
        {
          prop: 'gender',
          label: '性别',
          type: "select",
          options: [
            { label: '男', value: 1 },
            { label: '女', value: 2 },
          ]
        }
      ],
      server: null
    }
  },
  created() {
    this.server = dataServer('http://localhost:4000/posts');
  },
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
