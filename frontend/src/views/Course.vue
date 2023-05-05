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
									{{ item.name }} - {{ item.quantity }} -
									{{ '$' + item.price.$numberDecimal }}
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
							<button class="mx-2 btn btn-primary" @click="viewSale(sale.name)">View</button>
							<button class="mx-2 btn btn-secondary" @click="editSale(course._id)">Edit</button>
							<button class="mx-2 btn btn-danger" @click="deleteSale(course._id, i)">Delete</button>
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
					'Do you really want to delete ' +
						this.courses[i].name +
						"? You won't be able to undo this operation. Press OK to confirm deletion."
				)
			) {
				axios.post('http://localhost:3000/api/course/delete', {
					courseID: id,
				});
				this.courses.splice(i, 1); // this replaces window.location.reload();
			}
		},

		viewSale(courseName) {
			let coursePath = `/course/${courseName}`;
			this.$router.push({ path: coursePath });
		},

		editSale(id) {
			this.$router.push({ name: 'edit-course', params: { courseID: id } });
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