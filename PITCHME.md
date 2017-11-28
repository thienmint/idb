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

## Critique of Museumary (Group 20)

### What did they do well?

- Searching/sorting works very well
- Models have a good degree of interconnectivity
- A lot of content for users to explore and absorb

+++

### What did we learn from their website?

- There are a lot of artists that we've never heard about
- Harvard has an arts museum
- Chairmaking is a type of art

+++

### What can they do better?

- Some of the photos are stretched to fit and look a little awkward
- Some order by selections did not work properly
- There's only one notable work for van Gogh and Picasso
- Some cases where pagination doesn't work perfectly

+++

### What puzzles us about their website?

Why don't famous artists have more of their works listed?

---

## Visualization

[Museumary Visualization](http://esportguru.com/visualization.html)
