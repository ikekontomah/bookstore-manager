import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await axios.get('https://yourapi.com/user/profile');
      setUser(result.data);
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async () => {
    await axios.post('https://yourapi.com/user/update', user);
    alert('Profile updated!');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        value={user.name}
        onChange={e => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={e => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}

export default ProfilePage;

