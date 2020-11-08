let teamName = document.getElementById('teamName');
let playersList = document.getElementById('playersList');

let params = new URLSearchParams(window.location.search);
let teamId = params.get("teamName");
console.log(teamId);

async function getTeamName() {
  await fetch('https://api.sportsdata.io/v3/nba/scores/json/teams?key=4a3c1ad9e42b4a3b892aa67ac688860b')
    .then((res) => res.json())
    .then((data) => {
      teamName.innerHTML = data[teamId-1].City + ' ' + data[teamId-1].Name ;
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
        <span>
        <img src="${player.PhotoUrl}"> ${player.FirstName} ${player.LastName}
        </span>
        <span>
        Number: ${player.Jersey} 
        Position: ${player.Position}
        Height: ${player.Height}
        Weight: ${player.Weight}
        </span>
        </li>
        `;
      }
    })
    playersList.innerHTML = output;
  })
  
}

getData();