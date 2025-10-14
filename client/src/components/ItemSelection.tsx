import  { useEffect, useState } from 'react';
import { FaCouch, FaShoppingBasket, FaTrash } from 'react-icons/fa';
// Define a type for the initial items
interface Item {
  id: number;
  name: string;
  weight: number;
}

// Define a type for the items in the cart, which includes a quantity
interface SelectedItem extends Item {
  quantity: number;
}

type ItemSelectProps = {
    setUserItems: (items:any) =>void
}

const initialItems: Item[] = [
  { id: 1, name: 'Refrigerator', weight: 135.0 },
  { id: 2, name: 'Washing Machine', weight: 90.5 },
  { id: 3, name: 'Dishwasher', weight: 56.5 },
  { id: 4, name: 'Microwave Oven', weight: 20.0 },
  { id: 5, name: 'Oven Range', weight: 67.5 },
  { id: 6, name: 'Air Conditioner', weight: 54.0 },
  { id: 7, name: 'Television', weight: 9.05 },
  { id: 8, name: 'Vacuum Cleaner', weight: 6.75 },
  { id: 9, name: 'Toaster', weight: 1.6 },
  { id: 10, name: 'Coffee Maker', weight: 3.4 },
  { id: 11, name: 'Sofa Couch', weight: 67.5 },
  { id: 12, name: 'Bed', weight: 67.5 },
  { id: 13, name: 'Dining Table', weight: 56.5 },
  { id: 14, name: 'Dining Chairs', weight: 6.75 },
  { id: 15, name: 'Coffee Table', weight: 27.0 },
  { id: 16, name: 'Bookcase Shelving Unit', weight: 45.5 },
  { id: 17, name: 'Wardrobe Armoire', weight: 90.5 },
  { id: 18, name: 'Desk', weight: 45.5 },
  { id: 19, name: 'Nightstand', weight: 9.05 },
  { id: 20, name: 'Dresser', weight: 67.5 },
  { id: 21, name: 'TV Stand / Entertainment Center', weight: 45.5 },
  { id: 22, name: 'Cabinet', weight: 45.5 },
  { id: 23, name: 'Side Table', weight: 9.05 },
  { id: 24, name: 'Mini Fridge', weight: 30.0 },
  { id: 25, name: 'Study Chair', weight: 7.5 },
  { id: 26, name: 'Boxes (Small)', weight: 10.0 },
  { id: 27, name: 'Boxes (Medium)', weight: 20.0 },
  { id: 28, name: 'Boxes (Large)', weight: 30.0 },
  { id: 29, name: 'Laptop', weight: 2.0 },
  { id: 30, name: 'Desk Lamp', weight: 1.5 },
  { id: 31, name: 'Mattress (Single)', weight: 20.0 },
  { id: 32, name: 'Mattress (Double)', weight: 30.0 },
  { id: 33, name: 'Books (Stack)', weight: 5.0 },
  { id: 34, name: 'Printer', weight: 7.0 },
  { id: 35, name: 'Electric Kettle', weight: 1.2 },
  { id: 36, name: 'Fan', weight: 4.0 },
  { id: 37, name: 'Backpack', weight: 2.5 },
  { id: 38, name: 'Bedding Set', weight: 3.0 },
  { id: 39, name: 'Clothes Hamper', weight: 2.0 },
  { id: 40, name: 'Wall Mirror', weight: 5.5 }
];

const ItemSelectForm = ({setUserItems}:ItemSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredItems = initialItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(()=>{
      setUserItems(selectedItems)
  }, [selectedItems])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAddItem = (itemToAdd: Item) => {
    const existingItem = selectedItems.find(item => item.id === itemToAdd.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`w-8 h-8 rounded-full font-bold transition duration-300 ${
          currentPage === number
            ? 'bg-yellow-500 text-gray-900'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div data-aos="fade-right" className="min-h-screen bg-white text-gray-800 p-4 sm:p-6 md:p-12 font-inter flex items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Available Items Section */}
        <div className="bg-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaCouch className='text-xl text-yellow-400 mr-4'/>
            Step 3
          </h2>
          <p className='text-gray-400 text-lg my-3'>Add Items For Moving</p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.09l3.124 3.125a.75.75 0 01-1.06 1.06l-3.125-3.124A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            />
          </div>

          {/* Item List */}
          <ul className="space-y-3">
            {currentItems.length > 0 ? (
              currentItems.map((item: Item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex-grow">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.weight} kg)</span>
                  </div>
                  <button
                    onClick={() => handleAddItem(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1.5 px-4 rounded-full transition duration-300 transform hover:scale-105"
                  >
                    Add
                  </button>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-4">No items found.</li>
            )}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center flex-wrap items-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Selected Items Section */}
        <div className="bg-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaShoppingBasket className='text-xl mr-3 text-yellow-400'/>
            Selected Items
          </h2>
          
          <ul className="space-y-3">
            {selectedItems.length > 0 ? (
              selectedItems.map((item: SelectedItem) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex-grow mb-2 sm:mb-0">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.weight} kg)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FaTrash/>
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-4">No items selected yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemSelectForm;
