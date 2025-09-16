const initInlineSVG = () => {
  inlineSVG.init({
    svgSelector: '.svg', // the class attached to all images that should be inlined
    initClass: 'js-inlinesvg', // class added to <html>
  });
}

export default initInlineSVG;
