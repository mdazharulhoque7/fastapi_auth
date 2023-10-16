import { React, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

export default function Register(props) {
  //   Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    gender: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    confirm_password: ""
  })

  //   State for Birthdate Datepicker
  const [dTBirthDate, setDTBirthDate] = useState(null)

  // convert formated date to string
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-");
  };

  const genderOptions = [
    { value: "", label: "Select Your Gender" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ]


  //   Field Value Change Handler
  const onChangeValue = (label, event) => {

    // eslint-disable-next-line default-case
    switch (label) {
      case 'name':
        setFormData({ ...formData, name: event.target.value });
        break;

      case 'birth':
        setDTBirthDate(event);
        setFormData({ ...formData, birth: formatDate(event) });
        break;

      case 'gender':
        setFormData({ ...formData, gender: event.target.value });
        break;

      case 'phone_number':
        setFormData({ ...formData, phone_number: event.target.value });
        break;

      case 'email':
        setFormData({ ...formData, email: event.target.value });
        break;

      case 'username':
        setFormData({ ...formData, username: event.target.value });
        break;

      case 'password':
        setFormData({ ...formData, password: event.target.value });
        break;

      case 'confirm_password':
        setFormData({ ...formData, confirm_password: event.target.value })
        break;

      default:
        break;

    }
  }

  return (
    <>
      <div>
        <h1 className="mb-4 text-3xl font-bold text-center cursor-pointer">
          Welcome to FastApi/React
        </h1>
        <p className="mx-auto mb-8 text-sm font-semibold tracking-wide text-center text-gray-700 cursor-pointer w-80">
          Create An Account
        </p>
      </div>
      <form>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>

          <DatePicker
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
            dateFormat="dd-MM-yyyy"
            placeholderText="Birth Date"
            selected={dTBirthDate}
          />

          <select
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          >
            {genderOptions.map((option) => {
              if (option.value === "") {
                return (
                  <option key={option.label} value={option.value} disabled>
                    {option.label}
                  </option>
                )
              } else {
                return (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                )
              }
            })}

          </select>
          <input
            type="number"
            placeholder="Phone Number"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>

          <input
            type="email"
            placeholder="Email"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>

          <input
            type="text"
            placeholder="Username"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>

          <input
            type="password"
            placeholder="Password"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>


          <input
            type="password"
            placeholder="Confirm Password"
            className="block w-full px-4 py-3 text-sm border rounded-lg outline-none focus:ring-1 focus: ring-cyan-400 focus:shadow-cyan-500/40"
          ></input>

        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-64 py-3 text-xl text-white outline-none bg-cyan-500 hover:bg-cyan-600 rounded-2xl active:bg-cyan-500"
          >
            Create Account
          </button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              onClick={() => {
                props.setPage("login")
              }}
            >
              <span className="underline cursor-pointer">Sign In</span>
            </Link>

          </p>
        </div>
      </form>
    </>
  );
}
