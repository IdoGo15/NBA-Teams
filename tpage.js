let teamName = document.getElementById('teamName');
let playersList = document.getElementById('playersList');
body = document.getElementById('teamPage');

let params = new URLSearchParams(window.location.search);
let teamId = params.get("teamName");
console.log(teamId);

async function getTeamName() {
  await fetch('https://api.sportsdata.io/v3/nba/scores/json/teams?key=4a3c1ad9e42b4a3b892aa67ac688860b')
    .then((res) => res.json())
    .then((data) => {
      teamName.innerHTML = data[teamId-1].City + ' ' + data[teamId-1].Name;
})
}

getTeamName();

async function getData() {
  await fetch ('https://api.sportsdata.io/v3/nba/scores/json/Players?key=4a3c1ad9e42b4a3b892aa67ac688860b')
  .then((res) => res.json())
  .then((data) => {
    let output = ``;
    data.forEach(function(player) {
      if(player.TeamID == teamId) {
        output += `
        <li class="list-group-item">
        <div>
        <img class="mr-4" src="${player.PhotoUrl}"> ${player.FirstName} ${player.LastName}
        </div>
        <div class="details">
        <span class="mr-2">Number: ${player.Jersey}</span>
        <span class="mr-2">Position: ${player.Position}</span>
        <span class="mr-2">Height: ${player.Height}</span>
        <span class="mr-2">Weight: ${player.Weight} </span>
        </div>
        </li>
        `;
      }
    })
    playersList.innerHTML = output;
  })
  
}

getData();