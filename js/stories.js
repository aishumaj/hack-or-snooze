"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i class="bi bi-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**Get data from new story form submission, pass through the addStory function
 * to create a new instance of Story, and invokes putStoriesOnPage function to
 * update HTML.
 */
async function getStorySubmissionAndCreate(e) {
  e.preventDefault();

  //pull data from form
  const authorInput = $("#authorInput").val();
  const titleInput = $("#titleInput").val();
  const urlInput = $("#urlInput").val();

  //call addStory
  let newStory = await storyList.addStory(currentUser, {
    title: titleInput, author: authorInput, url: urlInput
  });

  $allStoriesList.prepend(generateStoryMarkup(newStory));
}

$storyForm.on("submit", getStorySubmissionAndCreate);

/**  A render method to render HTML for an individual Story instance that has
 * been added to a user's favorited stories list. Returns the markup for the
 * story and adds it to the HTML of the page for display.
 */
function generateFavoritesMarkup() {

  const favorites = currentUser.favorites;

  for (let fav of favorites) {
  //  const hostName = fav.getHostName();
    let createdFav = $(`
    <li id="${fav.storyId}">
      <i class="bi bi-star-fill"></i>
      <a href="${fav.url}" target="a_blank" class="story-link">
        ${fav.title}
      </a>

      <small class="story-author">by ${fav.author}</small>
      <small class="story-user">posted by ${fav.username}</small>
    </li>
  `);
  $favStoriesList.append(createdFav);
  }
}

//TODO:
async function toggleFavoriteStatus(evt){
  const pressedIcon = $(evt.target);

  //variables to return story object from storyID stored in parentlist element
  const storyID = pressedIcon.closest("li").attr("id");
  const story = await Story.getStoryFromId(storyID);
  console.log(storyID, story);

  //switch style of icon when clicked and invoke respective add/removal function
  //to favorites list
  if(pressedIcon.attr("class") === "bi bi-star"){
    pressedIcon.attr("class", "bi bi-star-fill");
    await currentUser.addFavoriteStory(story.data.story);
  } else {
    pressedIcon.attr("class", "bi bi-star");
    await currentUser.removeFavoriteStory(story.data.story);
  }
}

$(".stories-container").on("click", "i", toggleFavoriteStatus)