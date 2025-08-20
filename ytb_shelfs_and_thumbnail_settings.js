// ==UserScript==
// @name         ytb_shelf_thumbnail_remover
// @namespace    http://tampermonkey.net/
// @version      2025-08-20
// @description  try to take over the world!
// @author       dmfk
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==


(function() {
  'use strict';
  // The main function that hides the specified elements.
  function hideElements() {
    // Hides the "Shorts" shelves on the home page.
    // The tag name 'ytd-rich-shelf-renderer' is what YouTube uses for the Shorts section.
    const shortShelfs = document.getElementsByTagName('ytd-rich-shelf-renderer');
    Array.from(shortShelfs).forEach(shortShelf => {
      shortShelf.style.display = 'none';
    });

    // Hides all video thumbnails.
    // The tag name 'yt-thumbnail-view-model' is what YouTube uses for the video thumbnail container.
    const thumbnails = document.getElementsByTagName('yt-thumbnail-view-model');
    Array.from(thumbnails).forEach(thumbnail => {
      // Setting visibility to 'hidden' keeps the space for the thumbnail,
      // which can prevent layout shifts while still making it invisible.
      thumbnail.style.visibility = 'hidden';
    });
  }

  // Use a MutationObserver to detect when new content is added to the page.
  // This is crucial for hiding new Shorts shelves and thumbnails as you scroll down.
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Check if new nodes were added to the DOM.
      if (mutation.addedNodes.length > 0) {
        // Call the function to hide the elements again whenever new content appears.
        hideElements();
      }
    });
  });

  // Start observing the body element for changes in its child nodes.
  // 'childList' watches for new elements being added or removed.
  // 'subtree' ensures it also watches for changes inside the body.
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial call to hide existing elements on page load.
  // This handles the content that is already on the page before scrolling.
  hideElements();
})();
