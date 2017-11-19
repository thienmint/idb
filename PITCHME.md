# eSportGuru

A website dedicated to the competitive eSports world

---

## Developers

- Thien Vo: Platform, Backend, Frontend
- Rachel Beale: Frontend
- Eric Liu: Frontend
- Kevin Zheng: Backend, Frontend
- Persia Ghaffari: Data, Backend

---

## Demonstration

[eSportGuru](http://esportguru.com)

1. Navigation - models: players, teams, games, tournaments
2. Search - "league legends", "tsm", "pokemon"
3. Run Unit Tests

---

## Self Critique

### What did we do well?

- Used Trello effectively
- Quickly set up the database and platform
- Automated builds and deployment
- Separated branches and maintained good naming patterns
- Created a copy of production for dev testing

+++

### What did we learn?

- GCP can eat a lot of money quickly if you're not careful
- Creating and hosting an API with Flask is relatively painless
- Storing JSON data in a SQL database can make queries slow
 - Time consuming to parse a JSON of ids; better to create a join table

+++

### What can we do better?

- Mine more visual data
 - We lack strong visual data, sepcfically for player and tournament models
- Some styling decisions for required data are a little awkward looking
 - We display a long summary of a game in our Games page, but since we have to
   display five attributes, it doesn't look as attractive as our other pages
- As with any group project, communication could always be better

+++

### What puzzles us?

- There isn't enough available data for eSports tournaments
- _League of Legends_ has been around for over 8 years, yet it is very hard to
  find specifics over tournaments
 - This is even worse for other competitive video games
- There are thousands of tournaments every year and tracking most of it for 
  rankings is still done by hand

---

## Critique of Phonedb (Group 19)

### What did they do well?

- Visuals are clean and slick
- Searching/pagination/filtering works very well
- Models are nicely interconnected with descriptive attributes

+++

### What did we learn from their website?

- For the number of countries and people in the world, there aren't a lot of
  phone carriers
 - Could be that mass data is not available, or there are monopolies
- Alibaba has a phone operating system
- Tables are considered as cellular devices

+++

### What can they do better?

(Just to preface, this critque was done on 11-18-17; the website could've
changed substantially since then)

- Some of the photos are low resolution, making them look grainy
- Searching did not highlight search query terms
- Did not have a "no results found" page to indicate that users entered a bad
  query

+++

### What puzzles us about their website?

Why is your stock photo a picture of a very cute kitten? What does that have 
to do with phones?

---

## Visualization

[Phonedb Visualization](http://phonedbvisualization.azurewebsites.net)