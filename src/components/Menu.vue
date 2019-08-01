<template>
	<div class="row">
		<!-- 菜单 -->
		<div class="col-sm-12 col-md-8">
			<table class="table">
				<thead class="thead-default">
					<tr>
						<th>尺寸</th>
						<th>加个</th>
						<th>加入</th>
					</tr>
				</thead>
				<tbody v-for="item in getMenuItem" :key="item.name">
					<tr>
						<td>
							<strong>{{item.name}}</strong>
						</td>
					</tr>
					<tr v-for="option in item.options" :key="option.size">
						<td>{{option.size}}</td>
						<td>{{option.price}}</td>
						<td>
							<button @click="addToBasket(item,option)" class="btn tbn-sm btn-outline-success">+</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- 购物车 -->
		<div class="col-md-4 col-sm-12">
			<div v-if="baskets.length>0">
				<table class="table">
					<thead class="thead-default">
						<tr>
							<th>数量</th>
							<th>品种</th>
							<th>价格</th>
						</tr>
					</thead>
					<tbody v-for="item in baskets" :key="item.name">
						<tr>
							<td>
								<button @click="decreaseQuantity(item)" class="btn btn-sm btn-light">-</button>
								<span>{{item.quantity}}</span>
								<button @click="increaseQuantity(item)" class="btn btn-sm btn-light">+</button>
							</td>
							<td>{{item.name + ' '}} {{item.size + '寸'}}</td>
							<td>{{item.price *item.quantity}}</td>
						</tr>
					</tbody>
				</table>
				<p>总价：{{total + ' 元'}}</p>
				<button class="btn btn-success btn-block">提交</button>
			</div>
			<div v-else>{{basketText}}</div>
			{{baskets}}
		</div>
	</div>
</template>
<script>

export default {
	data() {
		return {
			baskets: [],
			basketText: "购物车没有任何商品",
			//getMenuItem: {}
		};
	},
	computed: {
		getMenuItem(){
			// return this.$store.state.menuItems
			return this.$store.getters.getMenuItems
		},
		total() {
			let totalCost = 0;
			for (let index in this.baskets) {
				let individualItem = this.baskets[index];
				totalCost += individualItem.quantity * individualItem.price;
			}
			return totalCost;
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			// fetch("https://vue-pizza-shop.firebaseio.com/menu.json")
			// .then(res => {
			// 	return res.json();
			// })
			// .then(data=>{
			// 	this.getMenuItem = data
			// })
			// axios.get('menu.json')
			// .then(res=> this.getMenuItem = res.data)
			// this.axios.get('menu.json')
			// .then(res=> this.getMenuItem = res.data)

			//将请求下来得数据存储到vuex中
			this.axios.get('menu.json')
			 .then(res=> this.$store.commit('setMenuItems',res.data))

		},
		addToBasket(item, option) {
			let basket = {
				name: item.name,
				size: option.size,
				price: option.price,
				quantity: 1
			};
			if (this.baskets.length > 0) {
				let result = this.baskets.filter(basket => {
					return basket.name === item.name && basket.price === option.price;
				});
				if (result != null && result.length > 0) {
					result[0].quantity++;
				} else {
					this.baskets.push(basket);
				}
			} else {
				this.baskets.push(basket);
			}
		},
		decreaseQuantity(item) {
			item.quantity--;
			if (item.quantity <= 0) {
				this.remeveFromBasket(item);
			}
		},
		increaseQuantity(item) {
			item.quantity++;
		},
		remeveFromBasket(item) {
			this.baskets.splice(this.baskets.indexOf(item), 1);
		}
	}
};
</script>
