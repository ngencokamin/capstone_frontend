# It's Over, Isn't It?

## Introduction

**It's Over, Isn't It?** is a web app that allows users to find shows similar to ones they’ve previously enjoyed. The site is built with a Ruby on Rails backend and VueJS frontend with OMDB api integration. Users can go to the page of a show they enjoyed and make suggestions, rated on both enjoyability and similarity to the original show. Suggestions will also include a brief description of what the users liked and didn’t like in the suggested show. Suggestions can then be voted down or up depending on if other users liked the suggestion. OMBD integration allows for new shows to be added to the database quickly and accurately as needed. 

[Video presentation](https://youtu.be/CJyzOZ6Vyxw?t=1312) | [Live demo](https://itsover.netlify.app/) 

Demo status: [![Netlify Status](https://api.netlify.com/api/v1/badges/ca838d52-2200-478f-a753-a1550baeff02/deploy-status)](https://app.netlify.com/sites/itsover/deploys)

## Features

- Homepage shows list of all shows currently in database
- Users can search for a show and check if it already exists
- Users can easily add new shows to the database with data provided by OMDb API
- Users can customize their profile with a username, profile picture, and short bio
- Users can go to the page of a show to view comments, displayed from most to least votes
- Users can look at the profile and comment histories of other users
- Users can comment on media with links to recommendations, rated on enjoyability and similarity with a short comment
- Users can edit or delete their own comments
- Users can vote up or down on comments depending on if they agree with the comment
- Users can pick a favorite show to display in their profile
- Users can add shows to an in-site watchlist
- Optional Trello integration to sync users' watchlists with a Trello board

## Screenshots

<figure style="width: 80%;">
  <figcaption align="center"><b>Home Page</b></figcaption>
  <img src="public/assets/img/screenshot_homepage.png"
  alt="Home page." >
</figure>

<figure style="width: 80%;">
  <figcaption align="center"><b>New comment form and pre-existing comment on media</b></figcaption>
  <img src="public/assets/img/screenshot_comment.png"
  alt="Screenshot of new comment form and existing comment" >
</figure>

<figure style="width: 80%;">
  <figcaption align="center"><b>User Profile with comments</b></figcaption>
  <img src="public/assets/img/screenshot_profile.png"
  alt="Profile page" >
</figure>

<figure style="width: 80%;">
  <figcaption align="center"><b>Profile Edit modal with Trello and profanity filter</b></figcaption>
  <img src="public/assets/img/screenshot_profile_edit.png"
  alt="Home page." >
</figure>

## Frontend Routes

| Action      | Users                                                        | Comments | Media                                                        | Votes                    |
| ----------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | ------------------------ |
| **Index**   | No                                                           | No       | Yes                                                          | No                       |
| **Create**  | Yes - Signup Form                                            | No       | Yes                                                          | No                       |
| **Show**    | Yes - Profile page with user's comments, contains button to edit profile | No       | Yes - Shows media information, comments, and votes on comments. Allows editing and deletion of user comments with authorization. | No - Buttons on comments |
| **Update**  | Yes - With button to delete account                          | No       | No                                                           | No - Buttons on comments |
| **Destroy** | No                                                           | No       | No                                                           | No                       |

