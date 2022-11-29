import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../assets/logout.png';

import AdminTabs from './Tabs/AdminTabs';
import EmployeeTabs from './Tabs/EmployeeTabs';

import { useData } from '../../contexts/DataContext';
import Loading from '../common/Loading';

const Dashboard = () => {
	const navigate = useNavigate();

	const user_role = JSON.parse(sessionStorage.getItem('user_info')).role[0];

	const { loadingStatus } = useData();

	const [activeTab, setActiveTab] = useState(1);

	const setTab = (id) => {
		setActiveTab(id);
		sessionStorage.setItem('ActiveTab', id);
	};

	const LogOut = () => {
		sessionStorage.clear();
		navigate('/login');
	};

	useEffect(() => {
		sessionStorage.getItem('ActiveTab')
			? setActiveTab(parseInt(sessionStorage.getItem('ActiveTab')))
			: setActiveTab(1);
	}, []);

	return (
		<>
			<div className="flex flex-row flex-wrap">
				<div className="flex flex-col w-[15%] h-[100vh] bg-blue-500 text-white">
					<div className="border-b border-sky-500 text-center">
						<p className="p-5">Inventory Management</p>
					</div>
					{user_role === 'Admin'
						? AdminTabs.map((item) => {
								return (
									<div
										className={
											item.id === activeTab
												? 'border-b border-sky-500 bg-gray-100 text-black text-center p-5 cursor-pointer transition-all'
												: 'border-b border-sky-500 text-center p-5 cursor-pointer'
										}
										key={item.id}
										onClick={() => setTab(item.id)}
									>
										{item.label}
									</div>
								);
						  })
						: EmployeeTabs.map((item) => {
								return (
									<div
										className={
											item.id === activeTab
												? 'border-b border-sky-500 bg-gray-100 text-black text-center p-5 cursor-pointer transition-all'
												: 'border-b border-sky-500 text-center p-5 cursor-pointer'
										}
										key={item.id}
										onClick={() => setTab(item.id)}
									>
										{item.label}
									</div>
								);
						  })}
					<div
						className="flex flex-row items-center justify-between text-center absolute bottom-0 cursor-pointer"
						onClick={LogOut}
					>
						<img src={LogoutIcon} className="p-5 text-center" alt="" />
						<input
							className=" text-white text-left cursor-pointer uppercase font-semibold"
							type="button"
							value="Log out"
						/>
					</div>
				</div>
				{user_role === 'Admin'
					? AdminTabs.map((item) => {
							if (item.id === activeTab) {
								return (
									<div key={item.id} className="w-[85%] text-center">
										{item.component}
									</div>
								);
							}
					  })
					: EmployeeTabs.map((item) => {
							if (item.id === activeTab) {
								return (
									<div key={item.id} className="w-[85%] text-center">
										{item.component}
									</div>
								);
							}
					  })}
			</div>
			{loadingStatus ? <Loading /> : null}
		</>
	);
};

export default Dashboard;
