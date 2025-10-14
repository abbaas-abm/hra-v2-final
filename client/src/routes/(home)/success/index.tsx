import { createFileRoute, Link } from '@tanstack/react-router'
import { FaCheckCircle } from 'react-icons/fa';
// import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/(home)/success/')({
  component: SuccessPage,
})

function SuccessPage() {
    // const navigate = useNavigate();

  return (
<div className="flex items-center justify-center min-h-screen bg-white px-4">
<div className="max-w-md w-full text-center">
{/* Success Icon */}
<div className="flex justify-center mb-6">
<FaCheckCircle className="text-yellow-500 w-20 h-20 animate-bounce" />
</div>


{/* Title */}
<h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
Delivery Placed Successfully!
</h1>


{/* Message */}
<p className="text-gray-700 mb-6 text-lg">
Thank you for placing your order. Your delivery request has been
successfully submitted. You can track your order in your dashboard.
</p>


{/* Button */}
<div className="flex justify-center">
    <Link to='/dashboard/user'>
<button
className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300"
>
Go to Dashboard
</button>
    </Link>
</div>
</div>
</div>
);
}
