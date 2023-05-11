import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue';
import Sales from '../views/Sale.vue';
import AddSale from '../views/AddSale.vue';
import ViewSale from '../views/ViewSale.vue';
import EditSale from '../views/EditSale.vue';
import Restock from '../views/Restock.vue';
import NotFound from '../views/404.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage,
	},
	{
		path: '/sales',
		name: 'sales',
		component: Sales,
	},
	{
		path: '/sales/add',
		name: 'add-sale',
		component: AddSale,
	},
	{
		path: '/sale/:saleID',
		name: 'view-sale',
		component: ViewSale,
		props: true,
	},
	{
		path: '/sale/:saleID/edit',
		name: 'edit-sale',
		component: EditSale,
		props: true,
	},
	{
		path: '/restock',
		name: 'restock',
		component: Restock,
		props: true,
	},
	{
		path: '/:pathMatch(.*)',
		name: 'not-found',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	hash: false,
	routes,
});

export default router;
