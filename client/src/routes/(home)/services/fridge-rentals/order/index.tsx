import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fridgeRental } from '@/api/email';
import { createPayFastSubscription } from '@/utils/payfast';

export const Route = createFileRoute('/(home)/services/fridge-rentals/order/')({
  component: FridgeRentalOrderPage,
  head: () => ({
    meta: [{ title: 'Fridge Rental | HRA Transportations' }],
  }),
});

function FridgeRentalOrderPage() {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    number: '',
    email: '',
    residentialAddress: '',
    institutionName: '',
    studentId: '',
    course: '',
    year: '',
    residentialStatus: '',
    residenceName: '',
    residenceRoom: '',
    applianceSize: '',
    rentalDuration: '',
    startDate: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyNumber: '',
  });

  const [files, setFiles] = useState({
    idCopy: null as File | null,
    proofOfResidence: null as File | null,
    bankStatement: null as File | null,
  });

  const [fileNames, setFileNames] = useState({
    idCopy: 'Choose file',
    proofOfResidence: 'Choose file',
    bankStatement: 'Choose file',
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Calculate total cost
  const totalCost = useMemo(() => {
    const option = formData.applianceSize;
    let price = 0;
    if (option.includes('Bar Fridge')) price = 199;
    else if (option.includes('Top Freezer')) price = 349;
    else if (option.includes('Bottom Freezer')) price = 649.99;
    const months = parseInt(formData.rentalDuration) || 0;
    // return (price * months).toFixed(2);
    return (price * months).toFixed(2);
  }, [formData.applianceSize, formData.rentalDuration]);

  const monthlyCost = useMemo(() => {
    const option = formData.applianceSize;
    let price = 0;
    if (option.includes('Bar Fridge')) price = 199;
    else if (option.includes('Top Freezer')) price = 349;
    else if (option.includes('Bottom Freezer')) price = 649.99;
    return price
  }, [formData.applianceSize, formData.rentalDuration]);

  const deposit = useMemo(() => {
    const option = formData.applianceSize;
    let price = 0;
    if (option.includes('Bar Fridge')) price = 300;
    else if (option.includes('Top Freezer')) price = 400;
    else if (option.includes('Bottom Freezer')) price = 600;
    return price
  }, [formData.applianceSize, formData.rentalDuration]);

  const mutation = useMutation({
    mutationKey: ['fridge-email'],
    mutationFn: fridgeRental,
    onSuccess: () => {
      setSubmissionStatus('success');
     
        // Reset form
        setFormData({
          firstname: '',
          lastname: '',
          dob: '',
          gender: '',
          number: '',
          email: '',
          residentialAddress: '',
          institutionName: '',
          studentId: '',
          course: '',
          year: '',
          residentialStatus: '',
          residenceName: '',
          residenceRoom: '',
          applianceSize: '',
          rentalDuration: '',
          startDate: '',
          emergencyName: '',
          emergencyRelationship: '',
          emergencyNumber: '',
        });
        setFiles({ idCopy: null, proofOfResidence: null, bankStatement: null });
        setFileNames({ idCopy: 'Choose file', proofOfResidence: 'Choose file', bankStatement: 'Choose file' });
        setSubmissionStatus('idle');
      
        createPayFastSubscription({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          cost: monthlyCost,
          deposit: deposit,
          months: parseInt(formData.rentalDuration)
        })
    },
    onError: (err: any) => {
      setErrorMessage(err?.message || 'Failed to submit form.');
      setSubmissionStatus('error');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'idCopy' | 'proofOfResidence' | 'bankStatement') => {
    const file = e.target.files?.[0] || null;
    setFiles({ ...files, [key]: file });
    setFileNames({ ...fileNames, [key]: file ? file.name : 'Choose file' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setErrorMessage('');

    // Validate files
    if (!files.idCopy || !files.proofOfResidence || !files.bankStatement) {
      setErrorMessage('Please upload all required documents.');
      setSubmissionStatus('error');
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
    Object.entries(files).forEach(([key, file]) => {
      if (file) fd.append(key, file);
    });
    fd.append('total', totalCost);

    console.log('Submitting FormData:', Object.fromEntries(fd));

    await mutation.mutateAsync(fd);
  };

  const inputStyles = 'w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 outline-none';

  const isSubmitting = submissionStatus === 'submitting' || mutation.isPending;

  return (
    <div className="min-h-screen flex justify-center items-start bg-yellow-50 py-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-yellow-600">Fridge Rental Registration</h2>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name *</label>
            <input name="firstname" value={formData.firstname} onChange={handleChange} required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name *</label>
            <input name="lastname" value={formData.lastname} onChange={handleChange} required className={inputStyles} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Date of Birth *</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className={inputStyles}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Contact Number *</label>
            <input name="number" value={formData.number} onChange={handleChange} type="tel" required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" required className={inputStyles} />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Residential Address *</label>
          <input name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} type="text" required className={inputStyles} />
        </div>

        {/* Academic Details */}
        <h3 className="text-2xl font-semibold text-yellow-600 mt-6 mb-4">Academic Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Institution Name *</label>
            <input name="institutionName" value={formData.institutionName} onChange={handleChange} type="text" required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Student ID *</label>
            <input name="studentId" value={formData.studentId} onChange={handleChange} type="text" required className={inputStyles} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Course of Study *</label>
            <input name="course" value={formData.course} onChange={handleChange} type="text" required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Year of Study *</label>
            <select name="year" value={formData.year} onChange={handleChange} required className={inputStyles}>
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>

        {/* Residence Info */}
        <h3 className="text-2xl font-semibold text-yellow-600 mt-6 mb-4">Residence Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Residential Status *</label>
            <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} required className={inputStyles}>
              <option value="">Select Status</option>
              <option value="Off-Campus">Off-Campus</option>
              <option value="On-Campus">On-Campus</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Residence Name *</label>
            <input name="residenceName" value={formData.residenceName} onChange={handleChange} type="text" required className={inputStyles} />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Residence Room Number</label>
          <input name="residenceRoom" value={formData.residenceRoom} onChange={handleChange} type="text" className={inputStyles} />
        </div>

        {/* Lease Details */}
        <h3 className="text-2xl font-semibold text-yellow-600 mt-6 mb-4">Lease Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Preferred Appliance Size *</label>
            <select name="applianceSize" value={formData.applianceSize} onChange={handleChange} required className={inputStyles}>
              <option value="">Select Preference</option>
              <option value="Bar Fridge - R199.00/month">Bar Fridge - R199.00/month</option>
              <option value="Top Freezer - R349.00/month">Top Freezer - R349.00/month</option>
              <option value="Bottom Freezer - R649.99/month">Bottom Freezer - R649.99/month</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Duration of Rental (Months) *</label>
            <select name="rentalDuration" value={formData.rentalDuration} onChange={handleChange} required className={inputStyles}>
              <option value="">Select Duration</option>
              {Array.from({ length: 12 }, (_, i) => {
                const m = i + 1;
                return <option key={m} value={m}>{m}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label className="block mb-1 font-medium">Preferred Start Date *</label>
          <input name="startDate" value={formData.startDate} onChange={handleChange} type="date" required className={inputStyles} />
        </div>

        {totalCost !== '0.00' && (
          <p className="col-span-full text-center font-bold text-green-600 text-xl p-4 bg-green-50 rounded-lg">
            Estimated Total Cost: <span className="text-2xl">R{totalCost}</span>
          </p>
        )}
        {totalCost !== '0.00' && (
          <p className="col-span-full text-center font-bold text-green-600 text-xl p-4 bg-green-50 rounded-lg">
            Monthly Payment: <span className="text-2xl">R{ monthlyCost }</span>
          </p>
        )}
        {totalCost !== '0.00' && (
          <p className="col-span-full text-center font-bold text-green-600 text-xl p-4 bg-green-50 rounded-lg">
            Initial Deposit: <span className="text-2xl">R{ deposit }</span>
          </p>
        )}
        {totalCost !== '0.00' && (
          <p className="col-span-full text-center font-bold text-green-600 text-xl p-4 bg-green-50 rounded-lg">
            Due Today: <span className="text-2xl">R{ monthlyCost + deposit }</span>
          </p>
        )}

        {/* Emergency Contact */}
        <h3 className="text-2xl font-semibold text-yellow-600 mt-6 mb-4">Emergency Contact</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name *</label>
            <input name="emergencyName" value={formData.emergencyName} onChange={handleChange} type="text" required className={inputStyles} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Relationship *</label>
            <input
              name="emergencyRelationship"
              value={formData.emergencyRelationship}
              onChange={handleChange}
              type="text"
              placeholder="e.g., Brother"
              required
              className={inputStyles}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Emergency Contact Number *</label>
          <input name="emergencyNumber" value={formData.emergencyNumber} onChange={handleChange} type="tel" required className={inputStyles} />
        </div>

        {/* File Uploads */}
        <h3 className="text-2xl font-semibold text-yellow-600 mt-6 mb-4">Documents *</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Certified Copy of ID</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => handleFileChange(e, 'idCopy')}
              className={inputStyles + ' cursor-pointer'}
            />
            <span className="text-sm text-gray-500 mt-1 block">{fileNames.idCopy}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Proof of Residence</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => handleFileChange(e, 'proofOfResidence')}
              className={inputStyles + ' cursor-pointer'}
            />
            <span className="text-sm text-gray-500 mt-1 block">{fileNames.proofOfResidence}</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Bank Statement</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => handleFileChange(e, 'bankStatement')}
              className={inputStyles + ' cursor-pointer'}
            />
            <span className="text-sm text-gray-500 mt-1 block">{fileNames.bankStatement}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center mt-4">
          <input type="checkbox" required id="terms" className="accent-yellow-500 mr-2" />
          <label htmlFor="terms">
            By ticking this box, you accept and agree to our{' '}
            <a href="fridgeTCs.html" target="_blank" className="text-yellow-600 underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || submissionStatus === 'success'}
          className="w-full bg-yellow-600 text-white cursor-pointer py-3 rounded-md mt-6 hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Proceed with PayFast'}
        </button>

        {submissionStatus === 'success' && (
          <p className="text-green-500 text-center font-bold bg-green-50 p-4 rounded-lg">
            🎉 Form submitted successfully! We will contact you soon.
          </p>
        )}
        {submissionStatus === 'error' && (
          <p className="text-red-500 text-center bg-red-50 p-4 rounded-lg">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}