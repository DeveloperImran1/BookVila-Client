import React, { useState } from 'react';

function ProfileUpdate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    day: '',
    month: '',
    year: '',
    phoneNumber: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or handle it as needed
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="personal-info-form">
      <h2>Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <select name="day" value={formData.day} onChange={handleChange}>
            <option value="">Day</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
          <select name="month" value={formData.month} onChange={handleChange}>
            <option value="">Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <select name="year" value={formData.year} onChange={handleChange}>
            <option value="">Year</option>
            {[...Array(100).keys()].map(year => (
              <option key={year} value={2024 - year}>
                {2024 - year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+88 01700001111"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === 'Others'}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </div>
        <button type="submit" disabled={!formData.firstName || !formData.lastName || !formData.phoneNumber}>
          Update
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
