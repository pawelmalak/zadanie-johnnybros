export class FeedbackMessage {
  static render(message, type = 'info') {
    const typeIconMapping = {
      default: 'ball.svg',
      info: 'ball.svg',
      error: 'error.svg'
    };

    const icon =
      type in typeIconMapping
        ? typeIconMapping[type]
        : typeIconMapping['default'];

    const component = `
      <div class="feedback">
        <img src="/assets/icons/${icon}" />
        <p>${message}</p>
      </div>
		`;

    return component;
  }
}
