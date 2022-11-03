// Levenshtein Distance - dirask [29.10.22]
// https://dirask.com/posts/JavaScript-calculate-Levenshtein-distance-between-strings-pJ3krj
const calculateLevenshteinDistance = (input: string, target: string) => {
    const inputLimit = input.length + 1;
    const targetLimit = target.length + 1;
    const distance = Array(inputLimit);

    for (let i = 0; i < inputLimit; ++i) {
        distance[i] = Array(targetLimit);
    }
    for (let i = 0; i < inputLimit; ++i) {
        distance[i][0] = i;
    }
    for (let j = 0; j < targetLimit; ++j) {
        distance[0][j] = j;
    }
    for (let i = 1; i < inputLimit; ++i) {
        for (let j = 1; j < targetLimit; ++j) {
            const substitutionCost = (input[i - 1] === target[j - 1] ? 0 : 1);
            distance[i][j] = Math.min(
                distance[i - 1][j] + 1,
                distance[i][j - 1] + 1,
                distance[i - 1][j - 1] + substitutionCost
            );
        }
    }
    return distance[input.length][target.length];
};

export const levenshteinDistance = (input: string, target: string) => {

    const lowerInput = input.toLowerCase()
    const lowerTarget = target.toLowerCase()
    if (lowerTarget.startsWith(lowerInput)) {
        return 0
    }
    else return calculateLevenshteinDistance(lowerInput, lowerTarget);
}