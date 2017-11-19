export default class HighlightKeywords {

    /**
     * This method will take in the p1 grouping, which should be the found keyword, then it will wrap the found
     * keyword with <span id="keyword"> ... </span>
     * @param match The matched substring. (Corresponds to $& above.)
     * @param p1 The word that matches with one of the search keywords
     * @param offset The offset of the matched substring within the whole string being examined.
     * @param string The whole string being examined.
     */
    static regexReplaceFunction(match, p1, offset, string) {
        // console.log("p1 = " + p1.bold());
        // TODO convert this to <span> as specified above, keeping .bold() for backward compatibility for nwo
        return p1.bold();
    }


    /**
     * This is a simple contain check for null for a given search string. If it is not null, replace all regex's matches
     * with the value specified from regexReplaceFunction
     * @param resultString The given result string come from API
     * @param regex given RegExp object or string
     */
    static highlightKeywords(resultString, regex){
        if(resultString !== null){
            return resultString.replace(regex, HighlightKeywords.regexReplaceFunction);
        }
        else
            return resultString;
    }

    /**
     * This method take in an array of items, each item is a dictionary of its attribute:values pairs.
     * @param array contain a number of items. Each item should be a dictionary with only simple alphanumeric type
     * @param regex given RegExp object or string
     */
    static boldData(array, regex) {
        for(let i = 0; i < array.length; i++){
            let item = array[i];
            for (let label in item) {
                if(item.hasOwnProperty(label)){
                    item[label] = HighlightKeywords.highlightKeywords(String(item[label]), regex);
                }
            }
            // TODO this line is necessary for backward compatitbility, but will need to be taken out eventually
            array[i] = [item]
        }

        return array;
    }

    /**
     * Manipulate the given result data set to bold/highlight found words
     * This method specifically create the regex based on given search words by inserting OR logic in between each word
     * and combine all of it as one grouping. For example "a b c" will become "(a|b|c)"
     * @param state A copy of our the page current state with all the data in .results
     */
    static boldKeywords(state) {
        let results = state.results;
        // For each key word, we'll put an OR logic in between
        let regex = new RegExp("(" + state.temp.replace(/\s+/gi,"|") + ")", "gi");
        state.games = HighlightKeywords.boldData(results.games, regex);
        state.players = HighlightKeywords.boldData(results.players, regex);
        state.teams = HighlightKeywords.boldData(results.teams, regex);
        state.tournaments = HighlightKeywords.boldData(results.tournaments, regex);
        state.dataLength = [state.games.length, state.players.length, state.teams.length, state.tournaments.length];
        return state
    }
}