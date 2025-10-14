export function createPayFastSubscription({
    firstname,
    lastname,
    email,
    cost,
    deposit,
    months
}: {
    firstname: string;
    lastname: string;
    email: string;
    cost: number;
    deposit: number;
    months:  number;
}) {
        // e.preventDefault();

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://www.payfast.co.za/eng/process'; // Use sandbox URL for testing
        form.style.display = 'none';

        const fields: Record<string, string> = {
        merchant_id: '29695041', // Replace with your ID
        merchant_key: 'mnuo1qokxbj9n', // Replace with your key
        return_url: 'https://hratransportation/success.html',
        cancel_url: 'https://hratransportation/cancel.html',
        notify_url: 'https://hratransportation/success.html',

        name_first: firstname,
        name_last: lastname,
        email_address: email,

        m_payment_id: 'sub123456',  // Your unique ID
        amount: String(+cost + +deposit),
        item_name: 'Storage Subscription',
        item_description: 'Monthly subscription',

        // Recurring billing parameters
        subscription_type: '1', // 1 = subscription
        billing_date: new Date().toISOString().split('T')[0], // Today
        recurring_amount: cost.toFixed(2),
        frequency: '3', // 3 = monthly
        cycles: String(months) // Convert months to string
};

for (const key in fields) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = key;
  input.value = fields[key];
  form.appendChild(input);
}

document.body.appendChild(form);
form.submit();
}

export function createSinglePayment({
  firstname,
  lastname,
  email,
  mobile,
  cost,
  userId
}: {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  cost: number;
  userId: string;
}) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.payfast.co.za/eng/process';
    // form.action = 'https://sandbox.payfast.co.za/eng/process'; // Use sandbox URL for testing

  form.style.display = 'none';

  const fields = {
    merchant_id: '29695041',
    merchant_key: 'mnuo1qokxbj9n', 
    // merchant_id: '10038863', // Replace with your ID
    // merchant_key: 'x5498lvmro4ap', // Replace with your key
    return_url: 'https://hratransportation.com',
    cancel_url: 'https://hratransportation.com/cancel',
    notify_url: 'https://hratransportation.com/api/orders/confirm',

    name_first: firstname,
    name_last: lastname,
    email_address: email,
    cell_number: mobile,
    amount: cost.toFixed(2),
    item_name: 'Delivery Service',
    item_description: 'Logistical Moving',
    custom_str1: userId
  };

  for (const key in fields) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = fields[key as keyof typeof fields];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}