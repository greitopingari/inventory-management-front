import ActivateCategories from '../pages/ActivateCategories';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import Roles from '../pages/Roles';

const AdminTabs = [
	{
		id: 1,
		label: "Products",
		component: <Products />,
	},
	{
		id: 2,
		label: "Categories",
		component: <Categories />,
	},
	{
		id: 3,
		label: "Roles",
		component: <Roles />,
	},
	{
		id: 4,
		label: "Deactivated Categories",
		component: <ActivateCategories />,
	},
];

export default AdminTabs;
