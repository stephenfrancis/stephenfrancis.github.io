
/*


Danielle, Lilliana, and Melody play a fighting video game in tournament mode.
In this mode, two players play a match, and the winner of the match plays a new
match against the player who was sitting out. This continues until a player wins
two matches in a row. Danielle and Lilliana play the first match.

If they are all equally skilled at the game, then what is the probability that
Melody will win the tournament?

Players: D, L and M. Play continues until same player wins twice in a row.
*/

var total_prob = {
    D: 0,
    M: 0,
    L: 0
};

function round(playerA, playerB, playerC, seq, prob) {
    var prev_winner = (seq.length > 0) ? seq.charAt(seq.length - 1) : "";
    result(playerA, playerB, playerC, prev_winner, seq, prob * 0.5);
    result(playerB, playerA, playerC, prev_winner, seq, prob * 0.5);
}

function result(winner, loser, sat_out, prev_winner, seq, prob) {
    seq += winner;
    if (winner === prev_winner) {
        console.log(seq + " ... " + prob);
        total_prob[winner] += prob;
    } else if (seq.length > 15) {
        console.log(seq + " ... " + prob);
        total_prob[winner] += prob;
    } else {
        round(winner, sat_out, loser, seq, prob);
    }
}

round("D", "L", "M", "", 1);

console.log("Total Prob D: " + total_prob.D);
console.log("Total Prob L: " + total_prob.L);
console.log("Total Prob M: " + total_prob.M);
