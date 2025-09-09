import { useAuth } from '@/components/context/AuthContext';
import { LogOut } from 'lucide-react';
import React from 'react';

 function Logout() {

	const { signOut } = useAuth();

	const handleSignOut = async () => {
		await signOut();
	};


	return (
		<div className="w-full p-3">
			<button
				onClick={handleSignOut}
				className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors w-full"
			>
				<LogOut className="h-5 w-5 mr-3" />
				Logout
			</button>
		</div>
	);
}

export default Logout;