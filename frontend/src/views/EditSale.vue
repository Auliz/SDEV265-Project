<template>
	<div class="p-5">
		<div class="h1 text-center">Edit Sale</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; width: 60%">
			<form>
				<div class="form-group">
					<label for="dateInput">Sale Date:</label>
					<input
						type="text"
						id="dateInput"
						class="form-control"
						ref="saleDate"
						v-model="viewedSale.saleDate"
						aria-describedby="emailHelp"
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: 2015-03-23T21:06:49.506Z</small
					>
				</div>
				<div class="form-group my-2">
					<label for="locationInput">Store Location:</label>
					<input
						id="locationInput"
						type="text"
						class="form-control"
						ref="storeLocation"
						v-model="viewedSale.storeLocation"
					/>
          <small id="dateHelp" class="form-text text-muted"
						>Example: Chicago</small
					>
				</div>
				<div class="form-group my-2">
					<label for="purchaseMethodInput">Purchase Method:</label>
					<input
						id="purchaseMethodInput"
						type="text"
						class="form-control"
						ref="purchaseMethod"
						v-model="viewedSale.purchaseMethod"
					/>
          <small id="dateHelp" class="form-text text-muted"
						>Example: Online, Phone, In Store</small
					>
				</div>
				<div class="form-group my-2">
					<label for="couponInput">Coupon Used:</label>
					<input
						id="couponInput"
						type="text"
						class="form-control"
						ref="couponUsed"
						v-model="viewedSale.couponUsed"
					/>
          <small id="dateHelp" class="form-text text-muted"
						>Example: true or false</small
					>
				</div>
				<button class="btn btn-primary" @click.prevent="getFormValues()">
					Confirm Edit
				</button>
			</form>
			<div id="alert" class="mt-5 alert" role="alert" :class="alertType"></div>
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
			saleID: 'ID Set',
			newSaleDate: '',
			newSaleLocation: '',
			newPurchaseMethod: '',
			newCouponUsed: '',
			errors: [],
			alertType: {
				active: false,
				'alert-danger': false,
				'alert-success': false,
			},
		};
	},

	async created() {
		this.saleID = this.$route.params.saleID;
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
	methods: {
		getFormValues() {
			this.errors = [];
			this.newSaleDate = this.$refs.saleDate.value;
			this.newSaleLocation = this.$refs.storeLocation.value;
			this.newPurchaseMethod = this.$refs.purchaseMethod.value;
			this.newCouponUsed = this.$refs.couponUsed.value;

			if (
				this.newSaleDate &&
				this.newSaleLocation &&
				this.newPurchaseMethod &&
				this.newCouponUsed
			) {
				this.postSale();
				this.saleDate = this.newSaleDate;
				this.alertType = {
					active: true,
					'alert-success': true,
					'alert-danger': false,
				};
				document.getElementById(
					'alert'
				).innerHTML = `<p style="margin: 0; padding: 0"><strong>Success</strong>: Sale was updated successfully. Go back to <a  class="alert-link" href="/sales">Sales</a>.`;
			} else {
				if (!this.newSaleDate) this.errors.push('No Sale Date');
				if (!this.newSaleLocation) this.errors.push('No Store Location');
				if (!this.newPurchaseMethod) this.errors.push('No Purchase Method');
				if (!this.newCouponUsed) this.errors.push('No Coupon Used');
				this.alertType = {
					active: true,
					'alert-danger': true,
					'alert-success': false,
				};
				let alertText = '';
				for (let error of this.errors) {
					alertText += `<p style="margin: 0; padding:0;"><strong>Error</strong>: ${error}</p>`;
				}
				document.getElementById('alert').innerHTML = alertText;
			}
		},
		async postSale() {
			await axios.patch('http://localhost:3000/api/sale/edit', {
				saleID: this.saleID,
				saleDate: this.newSaleDate,
				saleLocation: this.newSaleLocation,
				purchaseMethod: this.newPurchaseMethod,
				couponUsed: this.newCouponUsed,
			});
		},
	},
};
</script>
