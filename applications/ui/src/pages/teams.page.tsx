import React, { useState } from 'react';

interface Team {
  id: number;
  name: string;
  description: string;
}

const TeamsPage: React.FC = () => {
  // Sample team data
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Family Group A', description: 'Manage tasks for Group A' },
    { id: 2, name: 'Family Group B', description: 'Tasks and events for Group B' },
    { id: 3, name: 'Family Group C', description: 'Shared calendar for Group C' },
  ]);

  // Currently selected team
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const selectTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Teams
      </h1>

      {/* Teams List */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Teams
        </h2>
        <ul className="space-y-4">
          {teams.map((team) => (
            <li
              key={team.id}
              onClick={() => selectTeam(team.id)}
              className={`p-4 border rounded-lg cursor-pointer ${selectedTeamId === team.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
            >
              <h3 className="text-lg font-bold">{team.name}</h3>
              <p className="text-sm">{team.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Team Content */}
      <div>
        {selectedTeamId ? (
          <div className="p-6 bg-gray-50 border rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {teams.find((team) => team.id === selectedTeamId)?.name}
            </h2>
            <p className="text-gray-600">
              You can now view tasks, events, or details for this team.
            </p>
            <button
              onClick={() => setSelectedTeamId(null)}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200"
            >
              Back to Teams
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Select a team to view its details.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
