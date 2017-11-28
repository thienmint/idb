def player_query(player_id=None):
    query = (
        """
            select p.id, p.tag, p.first_name, p.last_name, p.role, p.hometown, p.image_url, 
                   p.current_game, p.current_team,
                   g.name as game_name, t.name as team_name
            from PLAYER p
            join GAME g on g.id = p.current_game
            join TEAM t on t.id = p.current_team
            {0}
            """.format("where p.id = %d" % int(player_id) if player_id is not None else "")
    )

    return query


def team_query(team_id=None):
    query = (
        """
          select t.id, t.name, t.acronym, t.image_url, t.current_game, 
                 g.name as game_name,
                 pt.list_players
          from TEAM t
          
          join GAME g on g.id = t.current_game
          left join (
            select concat('[', group_concat(json_object("id", p.id, "tag", p.tag)), ']') list_players, p.current_team
            from PLAYER p
            group by p.current_team
          ) pt on pt.current_team = t.id
          {0}
        """.format("where t.id = %d" % int(team_id) if team_id is not None else "")
    )

    return query


def tourney_query(tourney_id = None):
    query = (
        """
          select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, tn.game,
                 tn.league, tn.league_image, g.name as game_name, R.list_teams as list_teams
          from TOURNEY2 tn
          join GAME g on g.id = tn.game
          left join (
              select tt.tournament_id as id, concat('[', 
              substring_index(
                group_concat(
                  json_object("id", t.id, "name", t.name)), ',', 40), ']') list_teams
              from TEAM_TOURNAMENTS tt
              join TEAM t on tt.team_id = t.id
              group by tt.tournament_id
            ) R on tn.id = R.id
          {0}
        """.format("where tn.id = %d" % int(tourney_id) if tourney_id is not None else "")
    )

    return query


def game_query(game_id=None):
    query = (
        """
          select g.id, g.name, g.release_date, g.screenshots, g.summary, g.website,
                 pt.list_players, tt.list_teams
          from GAME g
          left join (
            select concat('[', 
            substring_index(
              group_concat(
                json_object("id", p.id, "tag", p.tag)), ',', 20), ']') list_players, p.current_game
            from PLAYER p
            group by p.current_game
          ) pt on pt.current_game = g.id
          left join (
            select concat('[', 
              substring_index(
                group_concat(
                  json_object("id", t.id, "name", t.name)), ',', 20), ']') list_teams, t.current_game
            from TEAM t
            group by t.current_game
          ) tt on tt.current_game = g.id
          {0}
        """.format("where g.id = %d" % int(game_id) if game_id is not None else "")
    )

    return query