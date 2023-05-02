class Solution {
  isMatch(text, pattern) {
    const isBaseCase = pattern.length === 0;
    if (isBaseCase) return text.length === 0;

    const isTextAndPatternEqual = pattern[0] === text[0],
      isPatternPeriod = pattern[0] === '.',
      isFirstMatch = text && (isTextAndPatternEqual || isPatternPeriod),
      isNextPatternWildCard = pattern.length >= 2 && pattern[1] === '*';

    return isNextPatternWildCard
      ? this.isMatch(text, pattern.slice(2)) ||
          (isFirstMatch && this.isMatch(text.slice(1), pattern))
      : isFirstMatch && this.isMatch(text.slice(1), pattern.slice(1));
  }
}

module.exports = Solution;
