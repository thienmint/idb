export default class SliceResults {
    /**
     * Given the dataLength array and number of items to get, we will compute and return 2 arrays, 1 signify the
     * starting indices and the other wil lbe ending indices.
     * For example, if we have [2,5,7,5] and the numItems = 20, we would return: [[0,0,4,0],[0,0,7,5]],.
     * If it was 10, we would then return {"start": [0,0,4,0], "end": [0,0,7,5]}
     * @param dataLength
     * @param numItems
     */

    static computeIndices(dataLength, numItems) {
        let startingIndex = [0, 0, 0, 0];
        let endingIndex = [0, 0, 0, 0];

        let numToOffset = numItems - 10;
        let numLeftToGrab = 10;
        let offset = 0;
        /*
        Algorithm:
            1. As we traverse the dataLength array, we'd like to get rid of all the items
                that we wish to not get by subtracting from the numToOffset
            2. After getting rid of all that, that's when we need to get the items.
         */

        for (let i = 0; i < dataLength.length; ++i){
            // We're done
            if(numLeftToGrab <= 0)
                break;

            let length = dataLength[i];
            // This means that we can start grabbing items
            if(numToOffset === 0){

                // How many left would we need to grab after processing this array?
                let leftover = numLeftToGrab - (length - offset);
                startingIndex[i] = offset;
                if(leftover <= 0){
                    endingIndex[i] = Math.min(numLeftToGrab+offset, length);
                    numLeftToGrab = 0;
                }
                else{
                    endingIndex[i] = length;
                    numLeftToGrab = leftover;
                }
                offset = 0;
                continue;
            }

            // This means that we still need to offset items
            let numLeft = numToOffset - length;
            if(numLeft > 0) {
                // if(i === dataLength.length -1){
                //     console.log("Should this ever happens?");
                //     console.log(dataLength);
                //     console.log("NumItems = " + numItems)
                // }
                numToOffset = numLeft; // do nothing, we don't want to take anything from here
            }
            else if (numLeft === 0) {
                /**
                 * 2 cases where this can happens:
                 * 1. exact match of numToOffset and Length, for example, try to rid 10 and this array has 10
                 * 2. this array has size of 0 and num to get rid is also 0
                 */
                offset = 0;
                numToOffset = 0;
            }
            else if (numLeft < 0) {
                /**
                 * This happens when the size of the array is bigger than ours to offset
                 * IE:
                 * 1. Length = 30, numToOffset = 10, 10 - 30 = -20, we want to set offset = 10 (numToOffSet)
                 * 2. Length = 30, numToOffset = 0, 0 - 30 = -30, we want to set offset = 0 (numToOffset)
                 */
                offset = numToOffset;
                numToOffset = 0;
                --i; // We still need to grab some item from here
            }
        }

        return {"start": startingIndex, "end": endingIndex}
    }

    /**
     * After computing the indices, slice the array with given starting and ending indices.
     * @param state a copy of the state
     * @param page the actual page number starting from 1
     * @return {*}
     */
    static getResults(state, page){
        let dataLengthCopy = Object.assign([], state.dataLength);
        let indices = SearchPage.computeIndices(dataLengthCopy, page * 10);

        let startArray = indices.start;
        let endArray = indices.end;

        state.displayedGames = state.games.slice(startArray[0], endArray[0]);
        state.displayedPlayers = state.players.slice(startArray[1], endArray[1]);
        state.displayedTeams = state.teams.slice(startArray[2], endArray[2]);
        state.displayedTournaments = state.tournaments.slice(startArray[3], endArray[3]);

        return state;
    }
}