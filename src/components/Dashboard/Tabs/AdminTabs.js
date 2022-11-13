import Categories from '../pages/Categories';
import EmployeesWork from '../pages/EmployeesWork';
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
		label: "Employess Work",
		component: <EmployeesWork />,
	},
	{
		id: 4,
		label: "Roles",
		component: <Roles />,
	},
];

export default AdminTabs;
