let irving = {name:'Kyrie', surname:'Irving', nick: 'Uncle Drew', birthYear: 1992, nationality:'American', position: 'Guard', team: 'CLE', conference: 'Eastern'};
let derozan = {name:'DeMar', surname: 'DeRozan', nick:'Deebo', birthYear: 1989, nationality:'American', position: 'Guard', team: 'TOR', conference: 'Eastern'};
let james = {name:'LeBron', surname: 'James', nick:'King', birthYear: 1984, nationality:'American', position: 'Forward', team: 'CLE', conference: 'Eastern'};
let antetokounmpo = {name:'Giannis', surname: 'Antetokounmpo', nick: 'Greek Freak', birthYear: 1994, nationality:'Greek', position: 'Forward', team: 'MIL', conference: 'Eastern'};
let butler = {name:'Jimmy', surname: 'Buttler', nick: 'Jimmy G. Buckets', birthYear: 1989, nationality:'American', position: 'Forward', team: 'CHI', conference: 'Eastern'};

let curry = {name:'Stephen', surname: 'Curry', nick:'Baby-Faced Assassin', birthYear: 1988, nationality:'American', position: 'Guard', team: 'GSW', conference: 'Western'};
let harden = {name:'James', surname: 'Harden', nick: 'The Beard', birthYear: 1989, nationality:'American', position: 'Guard', team: 'HOU', conference: 'Western'};
let durant = {name:'Kevin', surname: 'Durant', nick: 'KD', birthYear: 1988, nationality:'American', position: 'Forward', team: 'GSW', conference: 'Western'};
let leonard = {name:'Kawhi', surname: 'Leonard', nick: 'The Claw', birthYear: 1991, nationality:'American', position: 'Guard', team: 'SAS', conference: 'Western'};
let davis = {name:'Anthony', surname: 'Davis', nick: 'The Brow', birthYear: 1993, nationality:'American', position: 'Center', team: 'NOP', conference: 'Western'};
let players = [irving, derozan, james, antetokounmpo, butler, curry, harden, durant, leonard, davis];

let teams = [{name:'Cleveland Cavaliers', shortName:'CLE'}, {name:'Toronto Raptors', shortName:'TOR'}, {name: "Milwaukee Bucks", shortName: 'MIL'},
  {name: 'Chicago Bulls', shortName: 'CHI'}, {name: 'Golden State Warriors', shortName: 'GSW'}, {name: 'Houston Rockets', shortName: 'HOU'},
  {name: 'San Antonio Spurs', shortName: 'SAS'}, {name: 'New Orleans Pelicans', shortName: 'NOP'}];

export default {players: players, teams: teams};
