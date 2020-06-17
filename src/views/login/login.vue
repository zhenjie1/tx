<template>
    <div class="login">
    <el-form :model="formData" :rules="rules" label-position="left" label-width="70px" class="form" ref="form" @submit.native.prevent="handlerSubmitEv">
      <el-form-item label="账号" prop='userName'><el-input placeholder="请输入用户名或手机号" v-model="formData.userName"></el-input></el-form-item>
      <el-form-item label="密码" prop='password'><el-input placeholder="请输入密码" v-model="formData.password" show-password></el-input></el-form-item>
      <el-form-item label="图形码" class="qrcodeContent" prop='graphCode'>
        <el-input placeholder="请输入图形二维码" v-model="formData.graphCode"></el-input>
        <img :src="imgUrl" alt="点击获取图形码" title="点击获取图形码" class="imgCode" @click="refreshCode">
      </el-form-item>
      <el-form-item>
        <div class="opertingBtn">
            <el-checkbox v-model="rememberPass" class="rememberPass">记住密码</el-checkbox>
            <router-link to="/login/forgetPass" class="forgetPass">忘记密码？</router-link>
        </div>
      </el-form-item>
      <el-button type="primary" native-type='submit' class="submitBtn">登 录</el-button>
    </el-form>
      <router-view></router-view>
    </div>
</template>

<script>
import { fetchGetLoginQrCode, fetchLogin } from '../../api/login'
export default {
  data () {
    return {
      imgUrl: '',
      rememberPass: false,
      formData: {
        codeKey: '', // 图形码的 key
        graphCode: '', // 用户输入的图形码
        userName: 'test123', // 用户名
        password: 'asd123' // 密码
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名或手机号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        graphCode: [
          { required: true, message: '请输入图形码', trigger: 'blur' },
          { min: 4, max: 4, message: '图形码为4个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 用户点击登录按钮执行
     *
     * @returns {void}
     */
    handlerSubmitEv () {
      this.$refs.form.validate(valid => {
        if (valid) {
          fetchLogin(this.formData).then(loginInfo => {
            this.$store.commit('user/updateUserInfo', loginInfo.data)
            this.$router.push('/')
          }).catch(result => {
            if (result.code === 100055) this.refreshCode()
            else if (result.code === 900102) {
              this.$confirm(result.msg, '提示').then(async () => {
                this.formData.isForced = 1
                const loginInfo = await fetchLogin(this.formData)
                this.$store.commit('user/updateUserInfo', loginInfo.data)
                this.$router.push('/')
              })
            }
          })
        } else {
          return false
        }
      })
    },
    /**
     * 修改图形码
     *
     * @returns {void}
     */
    async refreshCode () {
      const { img: imgUrl, codeKey } = await fetchGetLoginQrCode()
      this.imgUrl = imgUrl
      this.formData.codeKey = codeKey
    }
  },
  created () {
    this.refreshCode()
  }
}
</script>

<style lang="scss">
.login{
  .form{width: 400px;margin: 0 auto;box-shadow: 0 4px 10px rgba(0,0,0,.1);padding: 20px;overflow: hidden;
    .qrcodeContent .el-form-item__content{display: flex;
      .imgCode{margin-left: 10px;}
    }
    .opertingBtn{ overflow: hidden;
      .rememberPass{float: left;}
      .forgetPass{float: right;}
    }
    .submitBtn{width: calc(100% - 70px);float: right;}
  }
}
</style>
