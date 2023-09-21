import React, { useState } from 'react';
import emailjs from "emailjs-com"
import './mailerStyles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function sendEmail(e){
    e.preventDefault();
    emailjs.sendForm("service_uw1xd0q","template_oxic1a9", e.target,"90Fph-Pdh4zTbSoTY").then(res=>{
        console.log(res);
    }).catch(err=> console.log(err));
}

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false); // New state for phone number validation error

  const notify = () => {
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message || emailError || phoneError) {
      toast.warn(`   Enter valid details first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(`   Successfully sent!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Email validation check
    if (name === "email") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setEmailError(!emailPattern.test(value));
    }

    // Phone number validation check
    if (name === "phone") {
      const phonePattern = /^\d+$/; // Only digits allowed
      setPhoneError(!phonePattern.test(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check email and phone number errors before submitting
    if (emailError || phoneError) {
      return;
    }
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset the form or show a success message
      })
      .catch((error) => {
        console.error(error);
        // Show an error message
      });
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Contact Me</h1>
      <form onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {emailError && <p className="error-message">Enter a valid email address</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          {phoneError && <p className="error-message">Enter a valid phone number</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" onClick={notify} />
        </div>
      </form>
    </div>
  );
};

export default App;
