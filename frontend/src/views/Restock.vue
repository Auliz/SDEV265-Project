<template>
	<div class="p-5 text-center">
		<div class="h1">Current Inventory</div>
		<div class="pt-5">
			<table class="table">
				<thead class="table-dark">
					<tr>
						<th>Item Number</th>
						<th>Item Name</th>
						<th>In-Stock</th>
						<th>Price ($)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, i) in items" :key="i">
						<td>{{ i + 1 }}</td>
						<td>{{ item.itemName }}</td>
						<td>{{ item.quantity }}</td>
						<td>{{ item.price }}</td>
						<td>
							<button
								type="button"
								class="btn btn-primary"
								@click="editItem(item)"
							>
								Edit
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			<div v-if="showEditForm">
				<h2>Edit Item</h2>
				<form>
					<div class="form-group">
						<label for="itemName">Name:</label>
						<input
							type="text"
							class="form-control"
							v-model="editedItem.itemName"
							id="itemName"
						/>
					</div>
					<div class="form-group">
						<label for="quantity">Quantity:</label>
						<input
							type="number"
							class="form-control"
							v-model="newQuantity"
							id="quantity"
						/>
					</div>
					<div class="form-group">
						<label for="price">Price:</label>
						<input
							type="number"
							step="0.01"
							class="form-control"
							v-model="editedItem.price"
							id="price"
						/>
					</div>

					<button
						type="submit"
						class="btn btn-primary"
						@click.prevent="updateItem"
					>
						Confirm Restock Order
					</button>
					<button type="button" class="btn btn-secondary" @click="cancelEdit">
						Cancel
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			items: [],
			newItemName: '',
			newQuantity: 0,
			newPrice: 0,
			showEditForm: false,
			editedIndex: -1,
			editedItem: {},
		};
	},
	async created() {
		this.items = (await axios.get('http://localhost:3000/api/inventory')).data;
	},
	methods: {
		editItem(item) {
			this.showEditForm = true;
			this.editedItem = { ...item };
			this.editedIndex = this.items.indexOf(item);
		},
		cancelEdit() {
			this.showEditForm = false;
			this.editedItem = { itemName: '', quantity: 0, price: 0 };
			this.editedIndex = -1;
		},
		updateItem() {
			this.items.splice(this.editedIndex, 1, { ...this.editedItem });
			this.showEditForm = false;
			this.postItem();
			this.editedItem = { itemName: '', quantity: 0, price: 0 };
			this.editedIndex = -1;
		},
		async postItem() {
			await axios.patch('http://localhost:3000/api/inventory/edit', {
				itemID: this.editedItem._id,
				itemName: this.editedItem.itemName,
				quantity: this.editedItem.quantity + this.newQuantity,
				price: this.editedItem.price,
			});
		},
	},
};
</script>

<style scoped>
ul.no-bullets {
	list-style-type: none;
}
</style>
