const StatusBadge = ({status}:{status:string}) => {
  let badgeColor, displayText;

  switch (status) {
    case 'order-placed':
      badgeColor = 'bg-gray-500';
      displayText = 'No Driver';
      break;
    case 'out-for-pickup':
      badgeColor = 'bg-yellow-500';
      displayText = 'Out for Pickup';
      break;
    case 'out-for-dropoff':
      badgeColor = 'bg-blue-500';
      displayText = 'Out for Dropoff';
      break;
    case 'completed':
      badgeColor = 'bg-green-500';
      displayText = 'Completed';
      break;
    default:
      badgeColor = 'bg-gray-300';
      displayText = 'Unknown';
  }

  return (
    <span
      className={` my-3 inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${badgeColor}`}
    >
      {displayText}
    </span>
  );
}
export default StatusBadge