import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/driverAuth';
import  { useDriverAuth } from '@/context/DriverAuthContext';
import { toast } from 'sonner';


export const Route = createFileRoute('/(home)/(auth)/driver-registration/')({
  component: RegisterPage,
  head: () => ({
    meta: [
      {title: 'Driver Registration | HRA Transportation'}
    ]
  })
})

function RegisterPage() {
  const {login} = useDriverAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

 // 1. State for Company Details
  const [companyName, setCompanyName] = useState('');
  const [regIdNumber, setRegIdNumber] = useState('');
  const [licenseDiskDate, setLicenseDiskDate] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');

  // 2. State for User Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  // 3. State for Supporting Documents (file objects)
  const [idCopy, setIdCopy] = useState<File | null>(null);
  const [driversLicense, setDriversLicense] = useState<File | null>(null);
  const [prdp, setPrdp] = useState<File | null>(null);
  const [proofOfResidence, setProofOfResidence] = useState<File | null>(null);
  const [vehicleReg, setVehicleReg] = useState<File | null>(null);
  const [vehicleLicenseDisk, setVehicleLicenseDisk] = useState<File | null>(null);
  const [vehicleRoadworthy, setVehicleRoadworthy] = useState<File | null>(null);
  const [companyRegDocs, setCompanyRegDocs] = useState<File | null>(null);

  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [accountType, setAccountType] = useState('');

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['driver-registeration'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      login(data.token, {
        email: data.email,
        _id: data._id,
        name: data.name
      });
      navigate({to: '/dashboard/driver'});
      toast.success('Account Succesfully Created!')
    },
    onError: (err:any) => {
       setError(err?.message || 'Something went wrong')
    }
  })

  const handleRegistration = async (e:React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const fd = {
      companyDetails: {
        companyName,
        regIdNumber,
        licenseDiskDate,
        vatNumber,
        vehicleType,
        vehicleMake,
        vehicleModel,
        vinNumber,
        vehicleColor,
      },
      userDetails: {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
      },
      supportingDocuments: {
        idCopy,
        driversLicense,
        prdp,
        proofOfResidence,
        vehicleReg,
        vehicleLicenseDisk,
        vehicleRoadworthy,
        companyRegDocs,
      },
      bankDetails: {
         accountHolderName,
         bankName,
         accountNumber,
         branchCode,
         accountType,
      }
    };
    //  await mutateAsync({
    //     companyDetails: formData.companyDetails,
    //     userDetails: formData.userDetails,
    //     bankDetails: formData.bankDetails
    //  })

     e.preventDefault();

  const formData = new FormData();

  // Send nested data as JSON string
  const data = {
    companyDetails: fd.companyDetails,
    userDetails: fd.userDetails,
    bankDetails: fd.bankDetails,
  };
  formData.append('data', JSON.stringify(data));

  // Append files individually
  if (idCopy) formData.append('idCopy', idCopy);
  if (driversLicense) formData.append('driversLicense', driversLicense);
  if (prdp) formData.append('prdp', prdp);
  if (proofOfResidence) formData.append('proofOfResidence', proofOfResidence);
  if (vehicleReg) formData.append('vehicleReg', vehicleReg);
  if (vehicleLicenseDisk) formData.append('vehicleLicenseDisk', vehicleLicenseDisk);
  if (vehicleRoadworthy) formData.append('vehicleRoadworthy', vehicleRoadworthy);
  if (companyRegDocs) formData.append('companyRegDocs', companyRegDocs);

  await mutateAsync(formData);
  };

  const fileInputClass = "block w-full text-sm text-yellow-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-white hover:file:bg-yellow-500 transition-colors duration-200";
  const inputClass = "block w-full px-4 py-2 mt-1 text-black bg-white border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-black";
  const sectionTitleClass = "text-xl font-semibold text-yellow-400 mb-4 border-b border-yellow-500 pb-2";

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6">
      <div className="w-full max-w-2xl p-6 space-y-8 bg-white rounded-xl shadow-lg border-2 border-yellow-400">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-3xl font-bold text-yellow-400">Driver Registration</h2>
          <p className="text-sm text-yellow-400">
            Please fill out all the required information to register.
          </p>
          {error && <>
            <p className="py-2 w-full px-4 rounded-lg shadow bg-red-300 text-red-700 text-center">{error}</p>
          </>}
        </div>
        <form className="space-y-8" onSubmit={handleRegistration}>

          {/* Company Details Section */}
          <div>
            <h3 className={sectionTitleClass}>Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company-name" className={labelClass}>
                  Company Name or Full Names
                </label>
                <input
                  id="company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="reg-number" className={labelClass}>
                  Registration Number or ID number
                </label>
                <input
                  id="reg-number"
                  type="text"
                  required
                  value={regIdNumber}
                  onChange={(e) => setRegIdNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="license-date" className={labelClass}>
                  License Disk Date
                </label>
                <input
                  id="license-date"
                  type="date"
                  required
                  value={licenseDiskDate}
                  onChange={(e) => setLicenseDiskDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vat-number" className={labelClass}>
                  VAT Number (Optional)
                </label>
                <input
                  id="vat-number"
                  required
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-type" className={labelClass}>
                  Vehicle Type
                </label>
                <input
                  id="vehicle-type"
                  type="text"
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-make" className={labelClass}>
                  Vehicle Make
                </label>
                <input
                  id="vehicle-make"
                  type="text"
                  required
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-model" className={labelClass}>
                  Vehicle Model
                </label>
                <input
                  id="vehicle-model"
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vin-number" className={labelClass}>
                  VIN Number
                </label>
                <input
                  id="vin-number"
                  type="text"
                  required
                  placeholder="Can be found on car disk"
                  value={vinNumber}
                  onChange={(e) => setVinNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-color" className={labelClass}>
                  Vehicle Color
                </label>
                <input
                  id="vehicle-color"
                  type="text"
                  required
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

             {/* User Details Section */}
          <div>
            <h3 className={sectionTitleClass}>Banking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="account-holder-name" className={labelClass}>
                  Account Holder Name
                </label>
                <input
                  id="account-holder-name"
                  type="text"
                  required
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="bank-name" className={labelClass}>
                  Bank Name
                </label>
                <input
                  id="bank-name"
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="account-number" className={labelClass}>
                  Account Number
                </label>
                <input
                  id="account-number"
                  type="number"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="branch-code" className={labelClass}>
                  Branch Code
                </label>
                <input
                  id="branch-code"
                  type="number"
                  required
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="account-type" className={labelClass}>
                  Account Type
                </label>
                <input
                  id="account-type"
                  type="text"
                  required
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* User Details Section */}
          <div>
            <h3 className={sectionTitleClass}>User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className={labelClass}>
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="last-name" className={labelClass}>
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="mobile-number" className={labelClass}>
                  Mobile Number
                </label>
                <input
                  id="mobile-number"
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
         

          {/* Supporting Documents Section */}
          <div>
            <h3 className={sectionTitleClass}>Supporting Documents (File Uploads)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="id-copy" className={labelClass}>
                  Certified Copy of ID / Passport
                </label>
                <input
                  id="id-copy"
                  type="file"
                  // required
                  onChange={(e) => setIdCopy(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="drivers-license" className={labelClass}>
                  Valid Driver’s License
                </label>
                <input
                  id="drivers-license"
                  type="file"
                  // required
                  onChange={(e) => setDriversLicense(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="prdp" className={labelClass}>
                  Professional Driving Permit (PrDP)
                </label>
                <input
                  id="prdp"
                  type="file"
                  // required
                  onChange={(e) => setPrdp(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="proof-of-residence" className={labelClass}>
                  Proof of Residence – recent utility bill
                </label>
                <input
                  id="proof-of-residence"
                  type="file"
                  // required
                  onChange={(e) => setProofOfResidence(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-reg" className={labelClass}>
                  Vehicle Registration Certificate (logbook)
                </label>
                <input
                  id="vehicle-reg"
                  type="file"
                  // required
                  onChange={(e) => setVehicleReg(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="vehicle-license-disk" className={labelClass}>
                  Vehicle License Disk (up-to-date)
                </label>
                <input
                  id="vehicle-license-disk"
                  type="file"
                  // required
                  onChange={(e) => setVehicleLicenseDisk(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="roadworthy" className={labelClass}>
                  Vehicle Roadworthy Certificate
                </label>
                <input
                  id="roadworthy"
                  type="file"
                  // required
                  onChange={(e) => setVehicleRoadworthy(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
              <div>
                <label htmlFor="company-reg-docs" className={labelClass}>
                  Company Registration Documents (CIPC)
                </label>
                <input
                  id="company-reg-docs"
                  type="file"
                  // required
                  onChange={(e) => setCompanyRegDocs(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  className={fileInputClass}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white ${isPending ? `bg-gray-300` : `bg-yellow-400`} border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
            >
             {isPending ? 'Creating Account...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            <span className="text-yellow-400">
              Already have an account?{' '}
            </span>
            <Link to="/driver-login" className="font-medium text-yellow-400 hover:text-yellow-500">
              Login.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
