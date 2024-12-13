import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // to handle message types (success, error)
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Redirect to login if no token is found
      } else {
        const res = await fetch('http://localhost:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setName(data.name);
          setEmail(data.email);
          setBio(data.bio);
          setProfilePic(data.profile_picture);
        } else {
          setMessage('Failed to fetch profile!');
          setMessageType('error');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        bio,
        profile_picture: profilePic,
      }),
    });

    if (res.ok) {
      setMessage('Profile updated successfully!');
      setMessageType('success');
    } else {
      setMessage('Failed to update profile!');
      setMessageType('error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      return;
    }

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8000/api/user/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ new_password: newPassword }),
    });

    if (res.ok) {
      setMessage('Password changed successfully!');
      setMessageType('success');
    } else {
      setMessage('Failed to change password!');
      setMessageType('error');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Profile</h1>

        <form onSubmit={handleProfileUpdate} className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>

        <form onSubmit={handlePasswordChange} className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>

        {message && (
          <p className={`text-center mt-4 ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
