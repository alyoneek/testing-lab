class Solution {
  isMatch(text, pattern) {
    if (!this.checkType(text) || !this.checkType(pattern)) {
      throw new TypeError('parameters can be only strings');
    }

    if (!this.checkOnlyLetters(text)) {
      throw new Error('string contains only lowercase English letters');
    }

    if (!this.checkOnlyLettersAndSymbols(pattern)) {
      throw new Error(`pattern contains only lowercase English letters, '.' and '*'`);
    }

    if (!this.checkLowercase(text) || !this.checkLowercase(pattern)) {
      throw Error('parameters contain only lowercase English letters');
    }

    if (!this.checkLength(text) || !this.checkLength(pattern)) {
      throw RangeError('parametres can have length only from 1 to 20');
    }

    if (!this.ckeckStarSymbol(pattern)) {
      throw new Error(`before '*' have to be letter or '.'`);
    }

    const answer = this.solve(text, pattern);

    if (answer === '') return false;

    return answer;
  }

  checkLength(value) {
    return value.length >= 1 && value.length <= 20;
  }

  checkType(value) {
    return typeof value === 'string';
  }

  checkOnlyLetters(value) {
    return /^[A-Za-z]*$/.test(value);
  }

  checkOnlyLettersAndSymbols(value) {
    return /^[A-Za-z.*]*$/.test(value);
  }

  checkLowercase(value) {
    return value.toLowerCase() === value;
  }

  ckeckStarSymbol(value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '*') {
        if (i === 0 || !/^[A-Za-z.]*$/.test(value[i - 1])) {
          return false;
        }
      }
    }
    return true;
  }

  solve(text, pattern) {
    const isBaseCase = pattern.length === 0;
    if (isBaseCase) return text.length === 0;

    const isTextAndPatternEqual = pattern[0] === text[0],
      isPatternPeriod = pattern[0] === '.',
      isFirstMatch = text && (isTextAndPatternEqual || isPatternPeriod),
      isNextPatternWildCard = pattern.length >= 2 && pattern[1] === '*';

    return isNextPatternWildCard
      ? this.solve(text, pattern.slice(2)) || (isFirstMatch && this.solve(text.slice(1), pattern))
      : isFirstMatch && this.solve(text.slice(1), pattern.slice(1));
  }
}

module.exports = Solution;
