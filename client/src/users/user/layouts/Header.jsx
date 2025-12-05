import { useAuth } from "../../../contexts/AuthContext";

const Header = ({ title }) => {
  const { UserData, logout } = useAuth();

  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8'>
        {/* Title Section */}
        <h1 className='text-sm font-semibold text-gray-100 sm:text-3xl'>{title}</h1>

        {/* User Name Section */}
        <div className='text-gray-100 text-sm sm:text-lg flex items-center space-x-4'>
          <span>
            {UserData.username}, {UserData.role}
          </span>
          {/* Logout Button */}
          <button
            onClick={logout}
            className='text-sm font-medium text-white bg-red-600 hover:bg-red-700 sm:px-3 sm:py-2 px-2 py-1 rounded-lg shadow transition-colors'
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;