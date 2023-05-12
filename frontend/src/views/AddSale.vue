<template>
	<div class="pt-5">
		<div class="h1 text-center">New Sale</div>
		<div class="pt-2" style="margin-left: auto; margin-right: auto; width: 60%">
			<form>
				<div class="form-group">
					<label for="dateInput">Sale Date:</label>
					<input
						type="text"
						id="dateInput"
						class="form-control"
						ref="saleDate"
						aria-describedby="emailHelp"
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: 2015-03-23</small
					>
				</div>
				<div class="form-group my-2">
					<label for="locationInput">Store Location:</label>
					<input
						id="locationInput"
						type="text"
						class="form-control"
						ref="storeLocation"
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
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: true or false</small
					>
				</div>
				<div class="form-group my-2">
					<label for="genderInput">Customer Gender:</label>
					<input
						id="genderInput"
						type="text"
						class="form-control"
						ref="custGender"
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: M or F</small
					>
				</div>
				<div class="form-group my-2">
					<label for="ageInput">Customer Age:</label>
					<input
						id="ageInput"
						type="number"
						class="form-control"
						min="1"
						ref="custAge"
					/>
					<small id="dateHelp" class="form-text text-muted">Example: 77</small>
				</div>
				<div class="form-group my-2">
					<label for="emailInput">Customer Email:</label>
					<input
						id="emailInput"
						type="text"
						class="form-control"
						ref="custEmail"
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: joseph.auz@python.com</small
					>
				</div>
				<div class="form-group my-2">
					<label for="satisfactionInput">Customer Satisfaction:</label>
					<input
						id="satisfactionInput"
						type="number"
						min="1"
						max="5"
						class="form-control"
						ref="custSatisfaction"
					/>
					<small id="dateHelp" class="form-text text-muted"
						>Example: 1-5 scale</small
					>
				</div>
				<label for="itemsInput">Select items:</label>
				<div class="form-check" v-for="(item, i) in items" :key="i">
					<input
						type="checkbox"
						class="form-check-input"
						:id="'item' + i"
						:value="item"
						v-model="selectedItems"
					/>
					<label class="form-check-label" :for="'item' + i">{{
						item.itemName
					}}</label>
					<span class="price-span">{{ 'Price: $ ' + item.price }}</span>
					<span class="price-span">{{ 'In Stock: ' + item.quantity }}</span>
					<input
						type="number"
						class="form-control"
						min="0"
						v-model="selectedItemsQuantity[item.itemName]"
						:disabled="!selectedItems.includes(item)"
					/>
				</div>
				<button class="btn btn-primary" @click.prevent="getFormValues()">
					Confirm New Sale
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
			items: [],
			selectedItems: [],
			selectedItemsQuantity: {},
			newCustomer: {},
			newSaleDate: '',
			newSaleLocation: '',
			newPurchaseMethod: '',
			newCouponUsed: '',
      gender: '',
      age: 0,
      email: '',
      satisfcation: 0,
			errors: [],
			alertType: {
				active: false,
				'alert-danger': false,
				'alert-success': false,
			},
		};
	},

	computed: {},
	async created() {
		this.items = (await axios.get('http://localhost:3000/api/inventory')).data;
	},
	methods: {
		getFormValues() {
			this.errors = [];
			this.newSaleDate = this.$refs.saleDate.value;
			this.newSaleLocation = this.$refs.storeLocation.value;
			this.newPurchaseMethod = this.$refs.purchaseMethod.value;
			this.newCouponUsed = this.$refs.couponUsed.value;
			this.gender = this.$refs.custGender.value;
			this.age = this.$refs.custAge.value;
			this.email = this.$refs.custEmail.value;
			this.satisfaction = this.$refs.custSatisfaction.value;
      this.newCustomer = {gender: this.gender, age: this.age, email: this.email, satisfaction: this.satisfaction};

			if (
				this.newSaleDate &&
				this.newSaleLocation &&
				this.newPurchaseMethod &&
				this.newCouponUsed &&
        this.gender &&
        this.age &&
        this.email &&
        this.satisfaction
			) {
				this.postSale();
				this.alertType = {
					active: true,
					'alert-success': true,
					'alert-danger': false,
				};
				document.getElementById(
					'alert'
				).innerHTML = `<p style="margin: 0; padding: 0"><strong>Success</strong>: Sale was posted successfully. Go back to <a  class="alert-link" href="/sales">Sales</a>.`;
			} else {
				if (!this.newSaleDate) this.errors.push('No Sale Date');
				if (!this.newSaleLocation) this.errors.push('No Store Location');
				if (!this.newPurchaseMethod) this.errors.push('No Purchase Method');
				if (!this.newCouponUsed) this.errors.push('No Coupon Used');
				if (!this.gender) this.errors.push('No Customer Gender');
				if (!this.age) this.errors.push('No Customer Age');
				if (!this.email) this.errors.push('No Customer Email');
				if (!this.satisfaction) this.errors.push('No Customer Satisfaction');
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
			let selectedItemsList = [];
      let itemCount = [];

			for (let i = 0; i < this.selectedItems.length; i++) {
				let selectedItem = this.selectedItems[i];
				let itemIndex = this.items.findIndex(
					(item) => item.itemName === selectedItem.itemName
				);
				let itemPrice = this.items[itemIndex].price;
        let itemID = this.items[itemIndex]._id
        let originalQuantity = this.items[itemIndex].quantity;
				selectedItemsList.push({
					itemName: selectedItem.itemName,
					quantity: this.selectedItemsQuantity[selectedItem.itemName],
					price: itemPrice,
				});
        itemCount.push({
          itemID: itemID,
          newQuantity: this.selectedItemsQuantity[selectedItem.itemName],
          itemName: selectedItem.itemName,
          price: itemPrice,
          originalQuantity: originalQuantity
        })
			}
      this.decrementItem(itemCount)
			await axios.post('http://localhost:3000/api/sale/add', {
				saleDate: this.newSaleDate,
				storeLocation: this.newSaleLocation,
				purchaseMethod: this.newPurchaseMethod,
				couponUsed: this.newCouponUsed,
				items: selectedItemsList,
        customer: this.newCustomer,
			});
		},

    async decrementItem(itemsList) {
      console.log(itemsList)
      for (let i = 0; i < itemsList.length; i++) {
        let item = itemsList[i]
        console.log(item)
        await axios.patch('http://localhost:3000/api/inventory/edit', {
          itemID: item.itemID,
          itemName: item.itemName,
          quantity: (item.originalQuantity - item.newQuantity),
          price: item.price,
        });
      }
    },
	},
};
</script>

<style>
.form-check-input {
	margin-right: 5px;
}
.price-span {
	margin-left: 10px;
}
</style>
