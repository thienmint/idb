FORMAT: 1A
HOST: https://api.esportguru.com

# eSportGuru

eSport Guru is an internet database for eSports players. Data provided consists of
information about players, teams, tournaments, and competitive games played.

The API will be designed to receive and return JSONs.

NOTE: API has not been made yet. This is a mock up.

## Player Collection [/players]

### Get All Players [GET /players/{?filter}]
+ Request
    + Headers
    
            Authorization: {token}
        
+ Parameters
    + filter (optional, string) ... Must be one of: name, game, team.

+ Response 200 (application/json)

                [
                  {
                    "id": 3296, 
                    "tag": "nshka", 
                    "first_name": null, 
                    "last_name": null, 
                    "role": null, 
                    "hometown": null, 
                    "image_url": null, 
                    "current_team": {
                      "id": 615, 
                      "name": "Awsomniac Academy"
                    }, 
                    "current_game": {
                      "id": 14, 
                      "name": "Overwatch"
                    }
                  }, 
                  {
                    "id": 3297, 
                    "tag": "Zaynor", 
                    "first_name": null, 
                    "last_name": null, 
                    "role": null, 
                    "hometown": null, 
                    "image_url": null, 
                    "current_team": {
                      "id": 616, 
                      "name": "Monkeys T-Bagging You"
                    }, 
                    "current_game": {
                      "id": 14, 
                      "name": "Overwatch"
                    }
                  }
                ]

### Get a Player [GET /players/{id}]

Gets a single player. Must use Get All Players if filtering by tag/name, since there can
be multiple people with the same tag/name across different games.

+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + id (required, string) ... The requested id.

+ Response 200 (application/json)

              {
                "id": 3298, 
                "tag": "RedPandaka", 
                "first_name": null, 
                "last_name": null, 
                "role": null, 
                "hometown": null, 
                "image_url": null, 
                "current_team": {
                  "id": 616, 
                  "name": "Monkeys T-Bagging You"
                }, 
                "current_game": {
                  "id": 14, 
                  "name": "Overwatch"
                }
              }

## Team Collection [/teams]

### Get All Teams [GET /teams/{?tournament_id,filter}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + tournament_id (optional) ... The tournament id or slug.
    + filter (optional) ... Must be one of: id, name, acronym.

+ Response 200 (application/json)

                [
                  {
                    "id": 10, 
                    "name": "Enemy", 
                    "acronym": "NME", 
                    "image_url": "https://pandacdn.blob.core.windows.net/cdn/uploads/enemy-esports-hash116b.png", 
                    "current_players": [], 
                    "current_game": {
                      "id": 1, 
                      "name": "League of Legends"
                    }
                  }, 
                  {
                    "id": 18, 
                    "name": "Giants", 
                    "acronym": "GIA", 
                    "image_url": "https://pandacdn.blob.core.windows.net/cdn/uploads/giants-gaming-96kph40s.png", 
                    "current_players": [
                      {
                        "id": 3501, 
                        "tag": "Minitroupax"
                      }, 
                      {
                        "id": 3502, 
                        "tag": "Rayito"
                      }, 
                      {
                        "id": 3503, 
                        "tag": "Razork"
                      }, 
                      {
                        "id": 3504, 
                        "tag": "Joo"
                      }
                    ], 
                    "current_game": {
                      "id": 1, 
                      "name": "League of Legends"
                    }
                  }
                ]

### Get a Team [GET /teams/{id}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + id (required) ... The requested id

+ Response 200 (application/json)

              {
                "id": 34, 
                "name": "Alliance", 
                "acronym": "Alliance", 
                "image_url": "https://pandacdn.blob.core.windows.net/cdn/uploads/Team_icon_Alliance.png", 
                "current_players": [
                  {
                    "id": 3663, 
                    "tag": "jonassomfan"
                  }, 
                  {
                    "id": 3950, 
                    "tag": "Mynuts"
                  }, 
                  {
                    "id": 3951, 
                    "tag": "AdmiralBulldog"
                  }, 
                  {
                    "id": 7365, 
                    "tag": "Patient Zero"
                  }
                ], 
                "current_game": {
                  "id": 2, 
                  "name": "Hearthstone"
                }
              }
                
## Tournament Collection [/tournaments]

### Get All Tournaments [GET /tournaments/{?videogame_id,filter}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + videogame_id (optional) ... The videogame id.
    + filter (optional) ... Must be one of: id, name.
    
+ Response 200 (application/json)

                [
                     {
                        "id": 2, 
                        "name": "Summer", 
                        "slug": "eu-lcs-summer-2015-summer", 
                        "begin_at": "Thu, 28 May 2015 00:00:00 GMT", 
                        "end_at": "Fri, 24 Jul 2015 00:00:00 GMT", 
                        "game": {
                          "id": 1, 
                          "name": "League of Legends"
                        }, 
                        "teams": [
                          {
                            "id": 74, 
                            "name": "Royal Never Give Up"
                          }, 
                          {
                            "id": 75, 
                            "name": "Master3"
                          }, 
                          {
                            "id": 77, 
                            "name": "Fire Ball"
                          } 
                        ]
                     }, 
                     {
                        "id": 3, 
                        "name": "Some Tourney", 
                        "slug": "eu-lcs-summer-2015-summer", 
                        "begin_at": "Thu, 28 May 2012 00:00:00 GMT", 
                        "end_at": "Fri, 24 Jul 2012 00:00:00 GMT", 
                        "game": {
                          "id": 1, 
                          "name": "League of Legends"
                        }, 
                        "teams": [
                          {
                            "id": 9, 
                            "name": "Gravity"
                          }, 
                          {
                            "id": 10, 
                            "name": "Enemy"
                          }, 
                          {
                            "id": 16, 
                            "name": "mousesports"
                          }, 
                          {
                            "id": 18, 
                            "name": "Giants"
                          }, 
                          {
                            "id": 19, 
                            "name": "Unicorns of Love"
                          }, 
                          {
                            "id": 20, 
                            "name": "Origen"
                          }, 
                          {
                            "id": 21, 
                            "name": "Gambit Esports"
                          } 
                        ]
                     }
                ]             
            

### Get a Tournament [GET /tournaments/{id}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + id (required) ... The requested id

+ Response 200 (application/json)

         {
            "id": 2, 
            "name": "Summer", 
            "slug": "eu-lcs-summer-2015-summer", 
            "begin_at": "Thu, 28 May 2015 00:00:00 GMT", 
            "end_at": "Fri, 24 Jul 2015 00:00:00 GMT", 
            "game": {
              "id": 1, 
              "name": "League of Legends"
            }, 
            "teams": [
              {
                "id": 9, 
                "name": "Gravity"
              }, 
              {
                "id": 10, 
                "name": "Enemy"
              } 
            ]
         }
                
## Game Collection [/games]

### Get All Games [GET /games/{?videogame_id,filter}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + videogame_id (optional, string) ... The videogame id.
    + filter (optional) ... Must be one of: id, name, developer, genre.
    
+ Response 200 (application/json)

                [
                  {
                    "id": 13, 
                    "name": "FIFA 16", 
                    "summary": "FIFA 16 innovates across the entire pitch to deliver a balanced, authentic, and exciting football experience that lets you play your way, and compete at a higher level. You'll have Confidence in Defending, take Control in Midfield, and you'll produce more Moments of Magic than ever before. FIFA 16 - Play Beautiful. \n \nWith innovative gameplay features, FIFA 16 brings Confidence in Defending, Control in Midfield, and gives you the tools to create more Moments of Magic than ever before. Fans new to the franchise, or skilled players looking to improve their game will have a chance to Compete at a Higher Level using the all new FIFA Trainer. Innovation Across the Entire Pitch. New Ways to Play. Compete at a Higher Level.", 
                    "release_date": "2015-09-21", 
                    "website": "[\"https://www.easports.com/fifa\", \"http://www.easports.com/fifa\", \"http://www.ea.com/it/calcio/fifa\"]", 
                    "screenshots": "[\"http://chuboi.com/wp-content/uploads/2016/06/My-Great-Capture-Screenshot-2016-06-07-22-47-17.png\", \"https://s.candybanana.com/images/057a/fifa_16_18.jpg\", \"https://s.candybanana.com/images/9d43/fifa_16_13.jpg\", \"https://s.candybanana.com/images/108d/fifa_16_28.jpg\"]"
                    "sample_players": [
                      {
                        "id": 3145, 
                        "tag": "oserv process"
                      }, 
                      {
                        "id": 3146, 
                        "tag": "i makes pancakes"
                      }
                    ],
                    "sample_teams": [
                        {
                            "id": 9, 
                            "name": "Gravity"
                        }, 
                        {
                            "id": 10, 
                            "name": "Enemy"
                        }, 
                    ]
                  }, 
                  {
                    "id": 14, 
                    "name": "Overwatch", 
                    "summary": "In Overwatch, you control one of several heroes in competitive 6-person team shooting matches. Battle over objectives, take down the other team, and achieve victory. \n \nIn Overwatch, heroes do battle in diverse locations around the world. From the technological marvel of Numbani to the manufacturing powerhouse of Volskaya, each map has a unique layout and specific win conditions that your team must meet in order to secure victory.", 
                    "release_date": "2016-05-23", 
                    "website": "[\"http://overwatch.wikia.com/wiki/Overwatch_Wiki\", \"http://battle.net/overwatch/\", \"https://twitter.com/PlayOverwatch\"]", 
                    "screenshots": "[\"http://failcraft.org/wordpress/wp-content/uploads/2015/11/overwatch-beta-kings-row-screenshot-mei-hammeh-failcraft-youtube-3.jpg\", \"http://videogameinterfaces.com/content/ui/blizzard/overwatch/lobby/overwatch-lobby-ui-1.jpg\", \"https://goingsony.com/system/file_uploads/uploads/000/013/177/original/ow-ps4-1p-tracer_khpx.1920.jpg\", \"http://videogameinterfaces.com/content/ui/blizzard/overwatch/main-menu/overwatch-main-menu-ui-8.jpg\"]"
                    "sample_players": [
                      {
                        "id": 3145, 
                        "tag": "oserv process"
                      }, 
                      {
                        "id": 3146, 
                        "tag": "i makes pancakes"
                      }
                    ],
                    "sample_teams": [
                        {
                            "id": 9, 
                            "name": "Gravity"
                        }, 
                        {
                            "id": 10, 
                            "name": "Enemy"
                        }, 
                    ]                  
                  }
                ]

### Get a Game [GET /games/{id}]
+ Request
    + Headers
    
            Authorization: {token}
            
+ Parameters
    + id (required) ... The requested id

+ Response 200 (application/json)

          {
            "id": 14, 
            "name": "Overwatch", 
            "summary": "In Overwatch, you control one of several heroes in competitive 6-person team shooting matches. Battle over objectives, take down the other team, and achieve victory. \n \nIn Overwatch, heroes do battle in diverse locations around the world. From the technological marvel of Numbani to the manufacturing powerhouse of Volskaya, each map has a unique layout and specific win conditions that your team must meet in order to secure victory.", 
            "release_date": "2016-05-23", 
            "website": "[\"http://overwatch.wikia.com/wiki/Overwatch_Wiki\", \"http://battle.net/overwatch/\", \"https://twitter.com/PlayOverwatch\"]", 
            "screenshots": "[\"http://failcraft.org/wordpress/wp-content/uploads/2015/11/overwatch-beta-kings-row-screenshot-mei-hammeh-failcraft-youtube-3.jpg\", \"http://videogameinterfaces.com/content/ui/blizzard/overwatch/lobby/overwatch-lobby-ui-1.jpg\", \"https://goingsony.com/system/file_uploads/uploads/000/013/177/original/ow-ps4-1p-tracer_khpx.1920.jpg\", \"http://videogameinterfaces.com/content/ui/blizzard/overwatch/main-menu/overwatch-main-menu-ui-8.jpg\"]"
            "sample_players": [
              {
                "id": 3145, 
                "tag": "oserv process"
              }, 
              {
                "id": 3146, 
                "tag": "i makes pancakes"
              }
            ],
            "sample_teams": [
                {
                    "id": 9, 
                    "name": "Gravity"
                }, 
                {
                    "id": 10, 
                    "name": "Enemy"
                }, 
            ]
          }