<template>
	<div class="p-5 text-center">
		<div class="h1">All Sales</div>
		<div class="pt-5">
			<table class="table">
				<thead class="table-dark">
					<tr>
						<th>Sale #</th>
						<th>Date</th>
						<th>Items</th>
						<th>Location</th>
						<th>Customer</th>
						<th>Coupon Used</th>
						<th>Purchase Method</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(sale, i) in sales" :key="i">
						<td>{{ i + 1 }}</td>
						<td>
							{{
								new Date(sale.saleDate)
									.toLocaleDateString('en-US')
									.replace(/\//g, '-')
							}}
						</td>
						<td>
							<ul class="no-bullets">
								<li v-for="(item, index) in sale.items" :key="index">
									{{ item.itemName }} - {{ item.quantity }} -
									{{ '$' + item.price }}
								</li>
							</ul>
						</td>
						<td>{{ sale.storeLocation }}</td>
						<!-- <td>{{ sale.customer }}</td> -->
						<td
							v-html="
								Object.entries(sale.customer)
									.map(([key, value]) => `${key}: ${value}<br>`)
									.join('')
							"
						></td>
						<td>{{ sale.couponUsed ? 'Yes' : 'No' }}</td>
						<td>{{ sale.purchaseMethod }}</td>
						<!-- <td>{{ new Date(sale.saleDate).toLocaleDateString('en-US') }}</td>
						<td>{{ sale.storeLocation }}</td>
						<td>{{ sale.purchaseMethod }}</td>
						<td>{{ formatCouponUsed(sale.couponUsed) }}</td> -->
						<td>
							<button class="mx-2 btn btn-primary" @click="viewSale(sale._id)">View</button>
							<button class="mx-2 btn btn-secondary" @click="editSale(sale._id)">Edit</button>
							<button class="mx-2 btn btn-danger" @click="deleteSale(sale._id, i)">Delete</button>
						</td>
					</tr>
					<!-- <tr>
						<td colspan="3"><router-link class="btn btn-primary" to="/courses/add">Add Course</router-link></td>
					</tr> -->
				</tbody>
			</table>

			<div></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			sales: [],
		};
	},

	async created() {
		this.sales = (await axios.get('http://localhost:3000/api/sales')).data;
	},

	methods: {
		async deleteSale(id, i) {
			console.log(id);
			if (
				confirm(
					'Do you really want to delete sale # ' +
						(i + 1) +
						"? You won't be able to undo this operation. Press OK to confirm deletion."
				)
			) {
				axios.post('http://localhost:3000/api/sale/delete', {
					saleID: id,
				});
				this.sales.splice(i, 1);
			}
		},

		viewSale(saleID) {
			let salePath = `/sale/${saleID}`;
			this.$router.push({ path: salePath });
		},

		editSale(id) {
			this.$router.push({ name: 'edit-sale', params: { saleID: id } });
		},
	},
	computed: {
		formatCouponUsed() {
			return (couponUsed) => {
				return couponUsed ? 'Yes' : 'No';
			};
		},
	},
}
</script>

<style scoped>
ul.no-bullets {
  list-style-type: none;
}
</style>