import React, { useState } from 'react';

interface FamilyMember {
  id: number;
  name: string;
  relationship: string;
}

const ProfilePage: React.FC = () => {
  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
  });

  // State for family members
  const [family, setFamily] = useState<FamilyMember[]>([
    { id: 1, name: 'Jane Doe', relationship: 'Spouse' },
    { id: 2, name: 'Sam Doe', relationship: 'Child' },
  ]);

  // State for adding a new family member
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: '',
    relationship: '',
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFamilyMember((prev) => ({ ...prev, [name]: value }));
  };

  const addFamilyMember = () => {
    if (newFamilyMember.name && newFamilyMember.relationship) {
      setFamily((prev) => [
        ...prev,
        { id: Date.now(), ...newFamilyMember },
      ]);
      setNewFamilyMember({ name: '', relationship: '' });
    }
  };

  const removeFamilyMember = (id: number) => {
    setFamily((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        My Profile
      </h1>

      {/* User Information */}
      <div className="mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleUserChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Family Management */}
      <div className="mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Family Members
        </h2>

        {/* List of Family Members */}
        <ul className="space-y-4 mb-6">
          {family.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-white"
            >
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.relationship}</p>
              </div>
              <button
                onClick={() => removeFamilyMember(member.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Add New Family Member */}
        <div className="space-y-4">
          <div>
            <label htmlFor="familyName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="familyName"
              name="name"
              value={newFamilyMember.name}
              onChange={handleNewMemberChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              id="relationship"
              name="relationship"
              value={newFamilyMember.relationship}
              onChange={handleNewMemberChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            onClick={addFamilyMember}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200"
          >
            Add Family Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
