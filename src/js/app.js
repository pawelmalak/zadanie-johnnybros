import initInlineSVG from './inline-svg.js';
import {
  SkeletonCard,
  ContentCard,
  FeedbackMessage
} from './components/index.js';
import { Data, UserInterface, Carousel } from './classes/index.js';

const renderDataCards = data => {
  UserInterface.clear();

  for (const team of data) {
    UserInterface.render(ContentCard, team);
  }

  Carousel.init('.card__footer');
};

(async function main() {
  document.addEventListener('DOMContentLoaded', () => {
    // render initial skeleton cards
    for (let _ = 0; _ < 5; _++) {
      UserInterface.render(SkeletonCard);
    }

    let data = [];

    /**
     * handle case on larger screens when there is not enough skeleton cards for
     * scroll bar to be displayed -> we then listen for mouse wheel event and then
     * dispatch scroll event on the document element
     */
    document.addEventListener(
      'wheel',
      () => {
        if (document.documentElement.scrollHeight < window.outerHeight) {
          document.dispatchEvent(new Event('scroll'));
        }
      },
      { once: true }
    );

    // on scroll, fetch data once and render cards with content
    document.addEventListener(
      'scroll',
      async () => {
        try {
          const req = await Data.fetchData();
          data = [...req.table];

          UserInterface.clear();

          // render content cards
          renderDataCards(data);
        } catch (err) {
          // render error state on query fail
          UserInterface.clear();
          UserInterface.render(FeedbackMessage, err, 'error');
        }
      },
      { once: true }
    );

    // search for teams
    const searchbar = document.getElementById('searchbar');

    searchbar.addEventListener('keyup', e => {
      if (e.key == 'Escape') {
        e.target.value = '';
      }

      const value = e.target.value.trim();

      // if user starts searching before scrolling first (no-data) -> fetch data
      if (!data.length) {
        document.dispatchEvent(new Event('scroll'));
        return;
      }

      if (!value.length) {
        return renderDataCards(data);
      }

      const pattern = new RegExp(value, 'i');
      const results = data.filter(t => pattern.test(t.strTeam));

      if (results.length) {
        return renderDataCards(results);
      }

      const message = `No teams found matching "${value}"`;
      UserInterface.clear();
      UserInterface.render(FeedbackMessage, message);
    });

    initInlineSVG();
  });
})();
