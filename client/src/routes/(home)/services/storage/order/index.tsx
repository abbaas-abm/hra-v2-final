import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { storageEmail } from '@/api/email';
import { createPayFastSubscription } from '@/utils/payfast';

export const Route = createFileRoute('/(home)/services/storage/order/')({
  component: StorageFormPage,
  head: () => ({
    meta: [
      { title: 'Warehouse Storage | HRA Transportations' }
    ]
  })
})

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const storageOptions = [
  { name: "Single Size Bed", price: 300 },
  { name: "Double Size Bed", price: 350 },
  { name: "Queen Size Bed", price: 400 },
  { name: "Small Box", price: 100 },
  { name: "Medium Box", price: 125 },
  { name: "Large Box", price: 150 },
  { name: "Bar Fridge", price: 150 },
  { name: "Top Freezer", price: 200 },
  { name: "Microwave", price: 200 },
  { name: "TV", price: 200 },
  { name: "Speakers", price: 150 },
  { name: "Desk & Chair", price: 200 },
  { name: "Washing Basket", price: 150 },
  { name: "Blanket/Basket", price: 100 },
  { name: "Small Suitcase", price: 100 },
  { name: "Large Suitcase", price: 150 },
];

function StorageFormPage() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    pickup: "",
    return: "",
    months: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleAddItem = () => {
    const option = storageOptions.find((i) => i.name === itemName);
    if (option && !selectedItems.find((i) => i.name === option.name)) {
      setSelectedItems([...selectedItems, { ...option, quantity: 1 }]);
      setItemName("");
    }
  };

  const handleRemoveItem = (name: string) => {
    setSelectedItems(selectedItems.filter((i) => i.name !== name));
  };

  const handleQuantityChange = (name: string, quantity: number) => {
    setSelectedItems(
      selectedItems.map((i) => (i.name === name ? { ...i, quantity } : i))
    );
  };

  const totalCost = selectedItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const {mutateAsync} = useMutation({
    mutationKey: ['storage-email'],
    mutationFn: storageEmail,
    onSuccess: () => {
      setSubmissionStatus('success');
      alert(`Form submitted successfully! Total cost: R${totalCost}`);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        number: "",
        pickup: "",
        return: "",
        months: "",
      });
      setSelectedItems([]);
      createPayFastSubscription({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        cost: totalCost,
        deposit: 0,
        months: parseInt(formData.months)
      })
    },
    onError: (err:any) => {
    setErrorMessage(err?.message || 'Failed to submit the form. Please try again.');
    setSubmissionStatus('error');
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus('submitting');
  setErrorMessage('');

  const form = e.target as HTMLFormElement;
  const fd = new FormData(form);

  // Append non-form fields
  fd.append('items', JSON.stringify(selectedItems));
  fd.append('total', totalCost.toString());
  
  
    await mutateAsync(fd);
  };

  const inputStyles = 'w-full border border-[#aaa] rounded-md p-2 focus:ring-2 focus:ring-yellow-400 outline-none'

  return (
    <div className="min-h-screen flex justify-center items-start bg-yellow-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-600">
          Warehouse Storage Registration
        </h2>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Pick-up Address</label>
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Return Address</label>
            <input
              type="text"
              name="return"
              value={formData.return}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </div>
        </div>

        {/* Item Selection */}
        <div>
          <label className="block mb-1 font-medium">
            Select Item/s for Storage
          </label>
          <div className="flex gap-2 mb-2">
            <select
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={inputStyles}
            >
              <option value="" disabled>
                Select...
              </option>
              {storageOptions.map((i) => (
                <option key={i.name} value={i.name}>
                  {i.name} - R{i.price}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 rounded-md font-bold"
            >
              +
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {selectedItems.map((item) => (
              <li
                key={item.name}
                className="bg-yellow-100 px-3 py-2 rounded-md flex justify-between items-center"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.name, Number(e.target.value))
                    }
                    className="w-16 text-center border rounded-md p-1"
                  />
                  <span className="font-semibold text-yellow-400">
                    R{item.price * item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.name)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {selectedItems.length > 0 && (
            <p className="mt-2 font-bold text-gray-700">
              Total: R{totalCost}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">
            Storage Duration (months)
          </label>
          <select
            name="months"
            value={formData.months}
            onChange={handleChange}
            required
            className={inputStyles}
          >
            <option value="" disabled>
              Select...
            </option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        
        {[
        { id: "idCopy", label: "Certified Copy of ID", name: "idCopy" },
        { id: "proofOfResidence", label: "Proof of Residence", name: "proofOfResidence" },
        { id: "bankStatement", label: "Recent Bank Statement", name: "bankStatement" },
        ].map((file) => (
        <div key={file.id} className="flex flex-col">
            <label className="mb-1 font-medium">{file.label}</label>
            <input
            type="file"
            id={file.id}
            name={file.name}
            required
            className={inputStyles}
            />
        </div>
        ))}

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input type="checkbox" required id="termsCheckbox" />
          <label htmlFor="termsCheckbox" className="text-sm text-gray-700">
            By ticking this box, you accept and agree to our{" "}
            <a
              href="storageTCs.html"
              target="_blank"
              className="text-yellow-600 underline"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submissionStatus === 'submitting'}
          className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Proceed With Payfast'}
        </button>

        {submissionStatus === 'error' && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}