<template>
	<div class="row mt-3">
		<div class="col-md-12 col-lg-12">
			<div class="card">
				<div class="card-body">
					<img class="mx-auto d-block" src="../../src/assets/logo.png" alt />
					<form @submit.prevent="onSubmit">
						<div class="from-group">
							<label for="email">邮箱</label>
							<input type="email" class="form-control" v-model="email" />
						</div>
						<div class="from-group">
							<label for="password">密码</label>
							<input type="password" class="form-control" v-model="password" />
						</div>
						<div class="from-group">
							<label for="confirm-password">确认密码</label>
							<input type="password" class="form-control" v-model="confirmPassword" />
						</div>
						<button class="btn btn-block btn-success">注册</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			email: "",
			password: "",
			confirmPassword: ""
		};
	},
	methods: {
		onSubmit() {
			if (this.password === this.confirmPassword) {
				const formData = {
					email: this.email,
					password: this.password,
					confirmPassword: this.confirmPassword
				};
				//注册验证用户名，拉取
				axios.get("/users.json").then(resg => {
          const registerData = resg.data;
          const users = [];
					for (let key in registerData) {
						const user = registerData[key];
						users.push(user);
          }
          //过滤器识别
				  let	result = users.filter(user => {
						return user.email === this.email && user.password === this.password;
					});
          //如果过滤器为空，则没有重名，不为空则重名弹窗
					if (result[0] == null) {
						axios.post("/users.json", formData).then(res =>
							this.$router.push({ name: "loginLink" })
						);
					} else {
						alert("账号已经被占用");
					}
				});
			} else {
				alert("两次密码不一致");
			}
		}
	}
};
</script>
