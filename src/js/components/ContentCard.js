export class ContentCard {
  static buildTeamFormElement(teamFormString) {
    const resultMap = {
      W: 'win',
      L: 'lose',
      D: 'draw'
    };

    const parent = document.createElement('div');
    parent.className = 'card__footer-results';

    const results = teamFormString.split('').reverse();

    for (const result of results) {
      const child = document.createElement('span');

      child.classList.add('card__footer-result');
      child.classList.add(`card__footer-result--${resultMap[result]}`);
      child.textContent = result;

      parent.appendChild(child);
    }

    return parent.outerHTML;
  }

  static render(teamData) {
    const {
      intRank: ranking,
      strBadge: logo,
      strTeam: name,
      intPoints: points,
      intPlayed: matchesPlayed,
      intWin: matchesWon,
      intLoss: matchesLost,
      intDraw: matchesDrawn,
      intGoalsFor: goalsFor,
      intGoalsAgainst: goalsAgains,
      intGoalDifference: goalsDifference,
      strForm: teamForm
    } = teamData;

    const badgeModifier = ranking <= 3 ? 'card__badge--highlighted' : '';

    const component = `
      <div class="card">
        <div class="card__body">
          <div class="card__badge ${badgeModifier}">${ranking}</div>

          <div class="card__team">
            <img
              src="${logo}"
              alt="${name} team logo"
              class="card__team-logo"
            />
            <p class="card__team-name">${name}</p>
          </div>

          <div class="card__stats">
            <div class="card__stats-bar" style="
              --width-won:${Math.floor((matchesWon / matchesPlayed) * 100)}%;
              --width-lost:${Math.floor((matchesLost / matchesPlayed) * 100)}%;
            "></div>
              <div class="card__stats-details">
                <span>W: ${matchesWon}</span>
                <span>D: ${matchesDrawn}</span>
                <span>L: ${matchesLost}</span>
            </div>
          </div>

          <div class="card__points">${points} PTS</div>
        </div>

        <div class="card__footer">
          <div class="card__footer-cell card__footer-cell--horizontal">
            <span>Form:</span>
            ${ContentCard.buildTeamFormElement(teamForm)}
          </div>

          <div class="card__footer-cell card__footer-cell--vertical">
            <span>Goals for:</span>
            <span>${goalsFor}</span>
          </div>

          <div class="card__footer-cell card__footer-cell--vertical">
            <span>Goals against:</span>
            <span>${goalsAgains}</span>
          </div>

          <div class="card__footer-cell card__footer-cell--vertical">
            <span>Goals difference:</span>
            <span>${goalsDifference}</span>
          </div>
        </div>
      </div>
    `;

    return component;
  }
}
