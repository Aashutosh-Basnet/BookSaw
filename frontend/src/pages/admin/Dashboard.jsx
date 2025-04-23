import { useState } from 'react';
import { FaBook, FaUsers, FaShoppingCart, FaChartLine, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BooksList from '../../components/admin/BooksList';
import AddBook from '../../components/admin/AddBook';
import EditBook from '../../components/admin/EditBook';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setActiveTab('edit-book');
  };

  const handleBackToBooks = () => {
    setEditingBook(null);
    setActiveTab('books');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return <BooksList onEditBook={handleEditBook} />;
      case 'add-book':
        return <AddBook onSuccess={handleBackToBooks} />;
      case 'edit-book':
        return <EditBook book={editingBook} onSuccess={handleBackToBooks} onCancel={handleBackToBooks} />;
      case 'users':
        return <div className="p-4">Users management (coming soon)</div>;
      case 'orders':
        return <div className="p-4">Orders management (coming soon)</div>;
      case 'analytics':
        return <div className="p-4">Analytics dashboard (coming soon)</div>;
      default:
        return <BooksList onEditBook={handleEditBook} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <div className="w-64 bg-navColor shadow-lg">
        <div className="p-6 border-b border-navColor-700">
          <h1 className="text-2xl font-bold">BookSaw Admin</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'books' ? 'bg-white text-navColor' : 'hover:bg-navColor-700'
                }`}
                onClick={() => setActiveTab('books')}
              >
                <FaBook className="mr-3" />
                <span>Books</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'add-book' ? 'bg-white text-navColor' : 'hover:bg-navColor-700'
                }`}
                onClick={() => setActiveTab('add-book')}
              >
                <FaPlus className="mr-3" />
                <span>Add New Book</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'users' ? 'bg-white text-navColor' : 'hover:bg-navColor-700'
                }`}
                onClick={() => setActiveTab('users')}
              >
                <FaUsers className="mr-3" />
                <span>Users</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'orders' ? 'bg-white text-navColor' : 'hover:bg-navColor-700'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <FaShoppingCart className="mr-3" />
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeTab === 'analytics' ? 'bg-white text-navColor' : 'hover:bg-navColor-700'
                }`}
                onClick={() => setActiveTab('analytics')}
              >
                <FaChartLine className="mr-3" />
                <span>Analytics</span>
              </button>
            </li>
            <li className="mt-8">
              <button
                className="w-full flex items-center p-3 rounded-lg text-red-200 hover:bg-red-700 hover:text-white"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'books' && 'Manage Books'}
              {activeTab === 'add-book' && 'Add New Book'}
              {activeTab === 'edit-book' && 'Edit Book'}
              {activeTab === 'users' && 'Manage Users'}
              {activeTab === 'orders' && 'Manage Orders'}
              {activeTab === 'analytics' && 'Analytics Dashboard'}
            </h2>
          </div>
        </header>

        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard; 