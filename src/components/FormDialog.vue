<template>
    <el-dialog
        :title="title"
        :model-value="modelValue"
        :before-close="handleClose"
        width="250px"
        @update:modelValue="handleUpdate"
        @open="handleOpen"
    >
        <el-form
            :model="form"
            ref="form"
            label-width="4rem"
            class="demo-dynamic"
            :inline="true"
        >
            <el-form-item
                v-for="(item, index) in form.items.filter((item) => item.type)"
                :label="item.label"
                :key="item.key"
                :prop="'items.' + index + '.value'"
                :rules="item.rule"
            >
                <el-input v-if="item.type === 'input'" v-model="item.value" />
                <el-date-picker
                    v-if="item.type === 'time'"
                    v-model="item.value"
                    format="YYYY/MM/DD HH:mm"
                    type="datetime"
                    placeholder="选择日期时间"
                ></el-date-picker>
                <el-select
                    v-if="item.type === 'select'"
                    v-model="item.value"
                    placeholder="请选择"
                    value-key="value"
                >
                    <el-option
                        v-for="option in item.options"
                        :key="option.value"
                        :label="option.label"
                        :value="option"
                    ></el-option>
                </el-select>
            </el-form-item>
            <div>
                <el-button type="primary" @click="submitForm('form')"
                    >提交</el-button
                >
                <el-button @click="handleUpdate">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        row: {
            type: Object,
            default() {
                return {};
            },
        },
        dataServer: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            dialogVisible: false,
            form: {
                items: [],
            },
            id: null,
        };
    },
    computed: {
        title() {
            if (this.row) {
                return '编辑';
            } else {
                return '新增';
            }
        },
    },
    methods: {
        handleOpen() {
            if (this.row) {
                this.id = this.row.id;
                this.form.items = this.columns.map((item) => ({
                    value: this.row[item.prop],
                    ...item,
                }));
            } else {
                this.id = null;
                this.form.items = this.columns.map((item) => ({
                    value: '',
                    ...item,
                }));
            }
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            console.log(this.form.items);
        },
        handleUpdate() {
            this.$emit('update:modelValue', false);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then((_) => {
                    this.handleUpdate();
                })
                .catch((_) => {});
        },
        submitForm(formRef) {
            this.$refs[formRef].validate(async (valid) => {
                if (valid) {
                    const payload = {};
                    this.form.items.forEach((item) => {
                        payload[item.prop] = item.value;
                    });
                    if (this.id) {
                        // update
                        payload.id = this.id;
                        const res = await this.dataServer.update(payload);
                    } else {
                        // create
                        const res = await this.dataServer.create(payload);
                    }
                    this.handleUpdate();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>