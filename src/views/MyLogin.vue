<template >
  <div class="login-container">
    <div class="card">
      <!-- 登陆提示 -->
      <p>Hi, 请先登录</p>
      <!-- 登陆表单区域 -->
       <el-form :model="form" class="form-container" :rules="rules"  :hide-required-asterisk="true" ref="loginFromRef">
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-button type="primary" @click="onSubmit" :plain="true">登陆</el-button>
        <!-- 重置按钮 -->
        <el-button type="info" @click="onReset">重置</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from 'vue'
import type { FormRules } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import type { UserLoginData } from '@/interface/interface'
import { loginAPI } from '@/service/loginAPI'
import router from '@/router/index'

// 表单数据
const form:UserLoginData = reactive({
  username: '',
  password: ''
})

// 获取表单元素
const loginFromRef: Ref<any> = ref(null)

// 提交函数
const onSubmit = () => {
  // 表单验证通过之后再发起axios请求
  loginFromRef.value.validate(async (valid: any) => {
    if (!valid) return
    const { data: res } = await loginAPI(form)
    if (res.meta.status !== 200) {
      ElMessage.error(res.meta.msg)
    } else {
      ElMessage.success(res.meta.msg)
      // 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中
      // 项目中除了登录之外的API接口,必须在登录之后才能访问
      // token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
      window.sessionStorage.setItem('token', res.data.token)
      router.push('/home')
    }
  })
}

// 重置函数
const onReset = () => {
  loginFromRef.value.resetFields()
}

// 表单验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在3-15位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

</script>

<style lang="less" scoped>
.login-container {
  background-color: seagreen;
  height: 100%;
}
.card {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  p {
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: xx-large;
  }
  .form-container {
    width: 70%;
    position: absolute;
    top: 115px;
    left: 40px;
  }
}
</style>
