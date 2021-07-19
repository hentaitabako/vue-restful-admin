<template>
  <el-admin
    :columns="columns"
    :dataServer="server"
    :itemId="'staff_id'"
    :canEdit="false"
  ></el-admin>
</template>

<script>
import ElAdmin from "@/components/ElAdmin.vue";
import dataServer from "@/utils/dataServer.js";
export default {
  components: {
    ElAdmin,
  },
  data() {
    return {
      columns: [
        // { prop: "organization", label: "组织", type: "input" },
        { prop: "tel", label: "手机号", type: "input" },
        // { prop: "appid", label: "appid" },
        // { prop: "openid", label: "openid" },
      ],
      server: null,
    };
  },
  created() {
    this.server = dataServer("/api/v1/staff");
  },
};

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
