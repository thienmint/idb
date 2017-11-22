from api_classes import Helper

def search_game(search_str):
    query = (
        """
        select g.id, g.name, g.summary, g.release_date,
             pt.list_players, tt.list_teams
          from GAME g
          left join (
            select group_concat(p.tag) as list_players, p.current_game
            from PLAYER p
            where p.tag REGEXP "{0}"
            group by p.current_game
          ) pt on pt.current_game = g.id
          left join (
            select group_concat(t.name) as list_teams, t.current_game
            from TEAM t
            where t.name REGEXP "{0}"
            group by t.current_game
          ) tt on tt.current_game = g.id
        where g.name REGEXP "{0}" or g.summary REGEXP "{0}" or g.release_date REGEXP "{0}" or
        tt.list_teams is not null or pt.list_players is not null
        """.format(search_str)
    )
    return query


def search_player(search_str):
    query = (
        """
            select p.id, p.tag, p.first_name, p.last_name, p.role, p.hometown, 
                   t.name as team_name, g.name as game_name
            from PLAYER p
            join TEAM t on t.id = p.current_team
            join GAME g on g.id = p.current_game
            where 
              p.tag REGEXP "{0}" or p.first_name REGEXP "{0}" or p.last_name REGEXP "{0}" or
              p.role REGEXP "{0}" or p.hometown REGEXP "{0}" or
              t.name REGEXP "{0}" or g.name REGEXP "{0}"
        """.format(search_str)
    )
    return query


def search_team(search_str):
    query = (
        """
            select t.id, t.name, t.acronym, g.name as game_name, pt.list_players as players_name
            from TEAM t
            join GAME g on g.id = t.current_game
            left join (
              select group_concat(p.tag) as list_players, p.current_team
              from PLAYER p
              where p.tag REGEXP "{0}"
              group by p.current_team
            ) pt on pt.current_team = t.id
            where t.name REGEXP "{0}" or t.acronym REGEXP "{0}" or 
                  g.name REGEXP "{0}" or pt.list_players is not null
        """.format(search_str)
    )
    return query


def search_tourney(search_str):
    query = (
        """
            select tn.id, tn.name, tn.slug, tn.begin_at, tn.end_at, g.name as game_name, R.list_names as team_names
            from TOURNEY2 tn
            join GAME g on g.id = tn.game
            left join (
              select tt.tournament_id as id, group_concat(t.name) as list_names
              from TEAM_TOURNAMENTS tt
              join TEAM t on tt.team_id = t.id
              where t.name REGEXP "{0}"
              group by tt.tournament_id
            ) R on tn.id = R.id
            where tn.name REGEXP "{0}" or tn.slug REGEXP "{0}" or tn.begin_at REGEXP "{0}" or tn.end_at REGEXP "{0}" or
                  g.name REGEXP "{0}" or R.list_names is not null
        """.format(search_str)
    )
    return query