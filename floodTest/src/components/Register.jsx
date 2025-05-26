import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    nic: "",
    mobile: "",
    location: "",
    email: "",
    age: "",
    profilePhoto: null,
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [NIC, setNIC] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [Location, setLocation] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState("");
  const [Checkbox, setCheckbox] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    if (!UserName) formErrors.UserName = "Please Insert User Name";
    if (!NIC) formErrors.NIC = "Please Insert nic number";
    if (!MobileNo) formErrors.MobileNo = "Please Insert Mobile Number";
    if (!Location) formErrors.Location = "Please choose location";
    if (!Email) formErrors.Email = "Please Insert Email";
    if (!Checkbox) formErrors.Checkbox = "Please Agree to Terms and Conditions";

    setErrors(formErrors);

    if (Object.keys(formErrors).length <= 0) {
      // need to pass data backend true mongodb users table

      try {
        const saveData = await axios.post("http://127.0.0.1:5000/save-users", {
          full_name: UserName,
          nic_number: NIC,
          mobile_number: MobileNo,
          location: Location,
          email: Email,
          age: Age,
        });

        if (saveData) {
          console.log(saveData);
          setUserName('');
          setNIC('');
          setMobileNo('');
          setLocation('');
          setEmail('');
          setAge('');

         navigate('/');

        }
      } catch (e) {
        console.log("Saved data Unsuccessfully because: ", e);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Register
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            onChange={(e) => {
              setUserName(e.target.value);
              console.log(UserName);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.UserName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* NIC Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            NIC Number *
          </label>
          <input
            type="text"
            name="nic"
            onChange={(e) => {
              setNIC(e.target.value);
              console.log(NIC);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.NIC && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number *
          </label>
          <input
            type="number"
            name="mobile"
            onChange={(e) => {
              setMobileNo(e.target.value);
              console.log(MobileNo);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
          {errors.MobileNo && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        {/* Location / District */}
        {/* Location / District as a dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location / District *
          </label>
          <select
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
              console.log(Location);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 text text-gray-500"
          >
            <option value="">Select a district</option>
            <option value="Matara">Matara</option>
            <option value="Akuressa">Akuressa</option>
            <option value="Thihagoda">Thihagoda</option>
            <option value="Pasgoda">Pasgoda</option>
            <option value="Kotapola">Kotapola</option>
            <option value="Pitabeddara">Pitabeddara</option>
            <option value="Kamburupitiya">Kamburupitiya</option>
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>
        {/* Email (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email (optional)
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(Email);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        {/* Age (Optional) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Age (optional)
          </label>
          <input
            type="number"
            name="age"
            onChange={(e) => {
              setAge(e.target.value);
              console.log(Age);
            }}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        {/* Terms Checkbox */}
        <div>
          <p>
            All the information you enter is recorded in our database and{" "}
            <span className="text-red-700">cannot be changed in any way</span> .
            Please provide your information accurately.
          </p>
        </div>

        <div className="mb-6">
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="termsAccepted"
              onChange={(e) => {
                setCheckbox(e.target.value);
                console.log(Checkbox);
              }}
              className="form-checkbox"
            />
            <span>I agree to the terms and conditions *</span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
