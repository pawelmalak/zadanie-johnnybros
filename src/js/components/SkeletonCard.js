export class SkeletonCard {
  static render() {
    const component = `
			<div class="card">
				<div class="card__body">
					<div class="card__badge card__badge--placeholder"></div>

					<div class="card__team">
						<div class="card__team-logo card__team-logo--placeholder"></div>
						<p class="card__team-name card__team-name--placeholder"></p>
					</div>

					<div class="card__stats">
						<div class="card__stats-bar card__stats-bar--placeholder"></div>
						<div class="card__stats-details card__stats-details--placeholder"></div>
					</div>

					<div class="card__points card__points--placeholder"></div>
				</div>
			</div>
		`;

    return component;
  }
}
