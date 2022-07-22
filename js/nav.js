"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

const $storyForm = $('.new-story-form');

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/**Show the form to submit a new story when the navigation button submit is
 * clicked */


//naming consistant
function navShowSubmitFormOnClick(evt) {
  $storyForm.slideToggle();
  //hide and show
}

$("#nav-submit").on("click", navShowSubmitFormOnClick);

//TODO:
function navShowFavoritesOnClick(evt) {
  $('#all-stories-list').hide();
  createFavoritesList();
  $('#favorites-stories-list').show();
}

$('#nav-favorites').on('click', navShowFavoritesOnClick);

//TODO:
function createFavoritesList() {

  const favorites = currentUser.favorites;

  for (let fav of favorites) {
  //  const hostName = fav.getHostName();
    let createdFav = $(`
    <li id="${fav.storyId}">
      <a href="${fav.url}" target="a_blank" class="story-link">
        ${fav.title}
      </a>

      <small class="story-author">by ${fav.author}</small>
      <small class="story-user">posted by ${fav.username}</small>
    </li>
  `);
  $('#favorites-stories-list').append(createdFav);
  }


}
//hit favorites, hide all stories, create ol, map thru array of favorites and append all to OL as li elements,
//append OL back into where storylist was, ol should have class hidden to toggle
//<small class="story-hostname">(${hostName})</small>