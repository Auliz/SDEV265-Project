<template>
	<div class="p-5 text-center">
		<div class="h3">Sale:</div>
		<div class="pt-5">
			<h2>{{ 'Sale Date: ' + viewedSale.saleDate }}</h2>
			<h2>{{ 'Sale Location: ' + viewedSale.storeLocation }}</h2>
			<h2>{{ 'Purchase Method: ' + viewedSale.purchaseMethod }}</h2>
			<h2>{{ 'Coupon Used: ' + viewedSale.couponUsed }}</h2>
			<h2>{{ 'Total Spent: ' + saleTotal }}</h2>
			<h2>{{ 'Items: '}}</h2>
			<ul class="no-bullets">
				<li v-for="(item, index) in viewedSale.saleItems" :key="index">
					{{ item.itemName }} - {{ item.quantity }} -
					{{ '$' + item.price }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			sales: [],
			viewedSale: {},
      viewedSaleTotal: 0
		};
	},
  computed: {
    saleTotal() {
      let total = 0;
      for (const item of this.viewedSale.saleItems) {
        total += parseFloat(item.price.$numberDecimal);
      }
      return `$${total.toFixed(2)}`;
    },
  },
	async created() {
		await axios
			.get('http://localhost:3000/api/sales')
			.then((resp) => {
				this.sales = resp.data;
			})
			.finally(() => {
				this.sales.some((sale) => {
					if (this.$route.params.saleID.toString() == sale._id.toString()) {
						return (this.viewedSale = {
							saleDate: sale.saleDate,
							storeLocation: sale.storeLocation,
							purchaseMethod: sale.purchaseMethod,
							couponUsed: sale.couponUsed,
							saleItems: sale.items,
						});
					} else {
						this.viewedSale = 'Sale not Found';
					}
				});
			});
	},
};
</script>

<style scoped>
ul.no-bullets {
  list-style-type: none;
}
</style>