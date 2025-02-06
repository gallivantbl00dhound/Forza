let players = [];

document.getElementById('addPlayer').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const skill = parseInt(document.getElementById('skill').value);
  const position = document.getElementById('position').value;

  if (name && skill >= 1 && skill <= 5) {
    players.push({ name, skill, position });
    updatePlayerList();
    document.getElementById('name').value = '';
    document.getElementById('skill').value = '';
  } else {
    alert('Please enter valid player details.');
  }
});

document.getElementById('splitTeams').addEventListener('click', () => {
  if (players.length < 2) {
    alert('Add at least 2 players to split into teams.');
    return;
  }

  // Sort players by skill (descending)
  players.sort((a, b) => b.skill - a.skill);

  let teamA = [];
  let teamB = [];
  let totalSkillA = 0;
  let totalSkillB = 0;

  for (let i = 0; i < players.length; i++) {
    if (i % 2 === 0) {
      teamA.push(players[i]);
      totalSkillA += players[i].skill;
    } else {
      teamB.push(players[i]);
      totalSkillB += players[i].skill;
    }
  }

  // If odd number of players, adjust teams to balance skill
  if (players.length % 2 !== 0) {
    if (totalSkillA > totalSkillB) {
      teamB.push(teamA.pop());
    } else {
      teamA.push(teamB.pop());
    }
  }

  displayTeams(teamA, teamB);
});

function updatePlayerList() {
  const playerList = document.getElementById('playerList');
  playerList.innerHTML = '';
  players.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player.name} (Skill: ${player.skill}, Position: ${player.position})`;
    playerList.appendChild(li);
  });
}

function displayTeams(teamA, teamB) {
  const teamAList = document.getElementById('teamA');
  const teamBList = document.getElementById('teamB');
  teamAList.innerHTML = '';
  teamBList.innerHTML = '';

  teamA.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player.name} (Skill: ${player.skill}, Position: ${player.position})`;
    teamAList.appendChild(li);
  });

  teamB.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player.name} (Skill: ${player.skill}, Position: ${player.position})`;
    teamBList.appendChild(li);
  });
}