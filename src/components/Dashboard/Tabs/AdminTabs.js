import Categories from '../components/Categories';
import EmployeesWork from '../components/EmployeesWork';
import Products from '../components/Products';
import Roles from '../components/Roles';

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
		label: "ROLES",
		component: <Roles />,
	},
];

export default AdminTabs;
