import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import StatCard from "../layouts/StatCard";


const AdminDashboard = () => {
	
	return (
		<>
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
		<Sidebar />
		<div className='flex-1 overflow-auto relative z-10'>
			
			<Header title='Admin Dasboard' />
			
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Order' icon={Zap} value='10' color='#6366F1' />
					<StatCard name='Orders' icon={Users} value='1' color='#8B5CF6' />
					<StatCard name='Payment' icon={ShoppingBag} value='5' color='#EC4899' />
					<StatCard name='Users' icon={BarChart2} value='4' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				{/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div> */}
			</main>
		</div>
		</div>
		</>
	);
};
export default AdminDashboard;
