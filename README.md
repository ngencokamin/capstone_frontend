# It's Over, Isn't It?

## Introduction

**It's Over, Isn't It?** is a web app that allows users to find shows similar to ones they’ve previously enjoyed. The site is built with a Ruby on Rails backend and VueJS frontend with OMDB api integration. Users can go to the page of a show they enjoyed and make suggestions, rated on both enjoyability and similarity to the original show. Suggestions will also include a brief description of what the users liked and didn’t like in the suggested show. Suggestions can then be voted down or up depending on if other users liked the suggestion. OMBD integration allows for new shows to be added to the database quickly and accurately as needed. 

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

## Todo

- Add theme to site
- Add screenshots to README

## Frontend Routes

| Action      | Users                                                        | Comments | Media                                                        | Votes                    |
| ----------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ | ------------------------ |
| **Index**   | No                                                           | No       | Yes                                                          | No                       |
| **Create**  | Yes - Signup Form                                            | No       | Yes                                                          | No                       |
| **Show**    | Yes - Profile page with user's comments, contains button to edit profile | No       | Yes - Shows media information, comments, and votes on comments. Allows editing and deletion of user comments with authorization. | No - Buttons on comments |
| **Update**  | Yes - With button to delete account                          | No       | No                                                           | No - Buttons on comments |
| **Destroy** | No                                                           | No       | No                                                           | No                       |

