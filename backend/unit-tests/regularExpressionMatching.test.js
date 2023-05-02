const Solution = require('../regularExpressionMatching');

describe('regular expression matching correct input tests', () => {
  let solution;

  beforeAll(() => {
    solution = new Solution();
  });

  /**
   * Check if function return any value
   */
  test.each`
    string  | pattern
    ${'ab'} | ${'.*'}
    ${'aa'} | ${'a'}
    ${'aa'} | ${'a*'}
  `('should return something', ({ string, pattern }) => {
    expect(solution.isMatch(string, pattern)).not.toBe(undefined);
  });

  describe('when pattern has 1 letter character', () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains only one lowercase English letter
     * And with correct input string with length 1 and 2
     */
    test.each`
      string  | result   | stringResult
      ${'a'}  | ${true}  | ${''}
      ${'aa'} | ${false} | ${'not'}
      ${'ba'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern 'a'`, ({ string, result }) => {
      expect(solution.isMatch(string, 'a')).toBe(result);
    });
  });

  describe(`when pattern has 1 '.' character`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains only one character '.'
     * And with correct input string with length 1 and 2
     */
    test.each`
      string  | result   | stringResult
      ${'a'}  | ${true}  | ${''}
      ${'aa'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern '.'`, ({ string, result }) => {
      expect(solution.isMatch(string, '.')).toBe(result);
    });
  });

  describe(`when pattern has 2 letter characters`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains only two lowercase English letters
     * And with correct input string with length 1, 2 and 3
     */
    test.each`
      string   | result   | stringResult
      ${'b'}   | ${false} | ${'not'}
      ${'ab'}  | ${true}  | ${''}
      ${'cab'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern 'ab'`, ({ string, result }) => {
      expect(solution.isMatch(string, 'ab')).toBe(result);
    });
  });

  describe(`when pattern has 2 characters: letter and '*'`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains one lowercase English letter and one '*'
     * And with correct input string with length 1, 2 and 3
     * Character '*' follows the letter
     */
    test.each`
      string   | result   | stringResult
      ${'abc'} | ${false} | ${'not'}
      ${'a'}   | ${true}  | ${''}
      ${'aa'}  | ${true}  | ${''}
    `(`'$string' should $stringResult match pattern 'a*'`, ({ string, result }) => {
      expect(solution.isMatch(string, 'a*')).toBe(result);
    });
  });

  describe(`when pattern has 2 characters: letter and '.'`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains one lowercase English letter and one '.'
     * And with correct input string with length 1, 2 and 3
     * Character '.' follows the letter
     */
    test.each`
      string   | result   | stringResult
      ${'b'}   | ${false} | ${'not'}
      ${'ab'}  | ${true}  | ${''}
      ${'aab'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern 'a.'`, ({ string, result }) => {
      expect(solution.isMatch(string, 'a.')).toBe(result);
    });

    /**
     * Check if function return currect value true or false
     * With pattern which contains one lowercase English letter and one '.'
     * And with correct input string with length 1, 2 and 3
     * Letter follows the character '.'
     */
    test.each`
      string   | result   | stringResult
      ${'ba'}  | ${true}  | ${''}
      ${'baa'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern '.a'`, ({ string, result }) => {
      expect(solution.isMatch(string, '.a')).toBe(result);
    });
  });

  describe(`when pattern has 2 characters: '.' and '*'`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains one '*' and one '.'
     * And with correct input string with length 1, and 2
     * Character '*' follows character '.'
     */
    test.each`
      string  | result  | stringResult
      ${'a'}  | ${true} | ${''}
      ${'ab'} | ${true} | ${''}
      ${'aa'} | ${true} | ${''}
    `(`'$string' should $stringResult match pattern '.*'`, ({ string, result }) => {
      expect(solution.isMatch(string, '.*')).toBe(result);
    });
  });

  describe(`when pattern has 2 '.' characters`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains two '.'
     * And with correct input string with length 1, 2 or 3
     */
    test.each`
      string   | result   | stringResult
      ${'aa'}  | ${true}  | ${''}
      ${'abc'} | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern '..'`, ({ string, result }) => {
      expect(solution.isMatch(string, '..')).toBe(result);
    });
  });

  describe(`when pattern has more than 2 characters`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains all available characters and has length 6
     * And with correct input string with not more than 20 and not less than 1
     * Character '*' follows character '.' or letter
     */
    test.each`
      string        | result   | stringResult
      ${'bccb'}     | ${true}  | ${''}
      ${'qaaaacvb'} | ${true}  | ${''}
      ${'ab'}       | ${false} | ${'not'}
    `(`'$string' should $stringResult match pattern '.a*..b'`, ({ string, result }) => {
      expect(solution.isMatch(string, '.a*..b')).toBe(result);
    });
  });

  describe(`when pattern has 19 characters`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains all available characters and has length 19
     * And with correct input string with not more than 20 and not less than 1
     * Character '*' follows character '.' or letter
     */
    test.each`
      string                | result   | stringResult
      ${'abcbabvcadddaaaa'} | ${true}  | ${''}
      ${'b'}                | ${false} | ${'not'}
      ${'abcbacbvcvaaad'}   | ${false} | ${'not'}
    `(
      `'$string' should $stringResult match pattern 'abc.ab*.*bvc..*aaaa'`,
      ({ string, result }) => {
        expect(solution.isMatch(string, 'abc.ab*.*bvc..*aaaa')).toBe(result);
      },
    );
  });

  describe(`when pattern has 20 characters`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which contains all available characters and has length 20
     * And with correct input string with not more than 20 and not less than 1
     * Character '*' follows character '.' or letter
     */
    test.each`
      string                    | result   | stringResult
      ${'abcbadvcadddaaaa'}     | ${false} | ${''}
      ${'b'}                    | ${false} | ${'not'}
      ${'abcbabbaabvcantaaaab'} | ${true}  | ${''}
    `(
      `'$string' should $stringResult match pattern 'abc.ab*.*bvc..*aaaa.'`,
      ({ string, result }) => {
        expect(solution.isMatch(string, 'abc.ab*.*bvc..*aaaa.')).toBe(result);
      },
    );
  });

  describe(`when entire string coincides with the start of pattern`, () => {
    /**
     * Check if function return currect value true or false
     * With pattern which includes entire string
     * Function is expected to work correctly because there is no constraints
     * Such as s.length >= p.length
     */
    test.each`
      string  | pattern  | result   | stringResult
      ${'ab'} | ${'abc'} | ${false} | ${'not'}
      ${'b'}  | ${'.a'}  | ${false} | ${'not'}
      ${'a'}  | ${'a.'}  | ${false} | ${'not'}
      ${'a'}  | ${'a*'}  | ${true}  | ${''}
    `(`'$string' should $stringResult match pattern '$pattern'`, ({ string, result, pattern }) => {
      expect(solution.isMatch(string, pattern)).toBe(result);
    });
  });
});

describe('regular expression matching incorrect input tests', () => {
  let solution;
  let funcWithError;

  beforeAll(() => {
    solution = new Solution();

    funcWithError = (text, pattern) => {
      solution.isMatch(text, pattern);
    };
  });

  /**
   * Check if function throw an error when string is not satisfy constraint '1 <= s.length <= 20'
   */
  test('should throw error when string length = 21', () => {
    expect(() => funcWithError('aaaaaaaaaaaaaaaaaaaaa', '.*')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint '1 <= p.length <= 20'
   */
  test('should throw error when pattern length = 21', () => {
    expect(() => funcWithError('aa', '................abvc.')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint '1 <= s.length <= 20'
   */
  test('should throw error when string length > 21', () => {
    expect(() => funcWithError('aaaaaaaaaaaaaaaaaaaaab', '.*')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint '1 <= p.length <= 20'
   */
  test('should throw error when pattern length > 21', () => {
    expect(() => funcWithError('aa', '................abvc..')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint '1 <= s.length <= 20'
   */
  test('should throw error when string length = 0', () => {
    expect(() => funcWithError('', '.*')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint '1 <= p.length <= 20'
   */
  test('should throw error when pattern length = 0', () => {
    expect(() => funcWithError('abc', '')).toThrow(
      new RangeError('parametres can have length only from 1 to 20'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string contains uppercase English letters', () => {
    expect(() => funcWithError('aaBCva', '.*')).toThrow(
      new Error('parameters contain only lowercase English letters'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern contains uppercase English letters', () => {
    expect(() => funcWithError('abc', '.Bc')).toThrow(
      'parameters contain only lowercase English letters',
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is number', () => {
    expect(() => funcWithError(123, '.*')).toThrow(new TypeError('parameters can be only strings'));
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is number', () => {
    expect(() => funcWithError('abc', 123)).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is undefined', () => {
    expect(() => funcWithError(undefined, '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is undefined', () => {
    expect(() => funcWithError('abc', undefined)).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is null', () => {
    expect(() => funcWithError(null, '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is null', () => {
    expect(() => funcWithError('abc', null)).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is boolean', () => {
    expect(() => funcWithError(true, '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is boolean', () => {
    expect(() => funcWithError('abc', false)).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is array', () => {
    expect(() => funcWithError(['a', 1, true], '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is array', () => {
    expect(() => funcWithError('abc', ['a', 1, true])).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is object', () => {
    expect(() => funcWithError({ a: 10, b: true }, '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is object', () => {
    expect(() => funcWithError('abc', { a: 10, b: true })).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string is function', () => {
    expect(() => funcWithError(() => console.log(2), '.*')).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern is function', () => {
    expect(() => funcWithError('abc', () => console.log(2))).toThrow(
      new TypeError('parameters can be only strings'),
    );
  });

  /**
   * Check if function throw an error when string is not satisfy constraint 's contains only lowercase English letters'
   */
  test('should throw error when string has not only English letters', () => {
    expect(() => funcWithError('123абв.', '.*')).toThrow(
      'string contains only lowercase English letters',
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'p contains only lowercase English letters'
   */
  test('should throw error when pattern has not only English letters', () => {
    expect(() => funcWithError('abc', '123абв.*')).toThrow(
      `pattern contains only lowercase English letters, '.' and '*'`,
    );
  });

  /**
   * Check if function throw an error when pattern is not satisfy constraint 'for each appearance of the character '*' should be a previous valid character to match'
   */
  test(`should throw error when pattern does not have  valid character before '*'`, () => {
    expect(() => funcWithError('abc', '*')).toThrow(`before '*' have to be letter or '.'`);
  });
});
