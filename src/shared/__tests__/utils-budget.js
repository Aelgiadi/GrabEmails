import { renderMoney, getTypeTotal, round } from '../utils/budget';

describe('renderMoney', () => {
  test('Returns a money format', () => {
    const expected = '$20.00';
    const actual = renderMoney(20);

    expect(expected).toBe(actual);
  });

  test('Rounds to the rearest hundredth', () => {
    const expected = '$23.35';
    const actual = renderMoney(23.3464);

    expect(expected).toBe(actual);
  });

  test('Handles negative amounts', () => {
    const expected = '($23.35)';
    const actual = renderMoney(-23.347);

    expect(expected).toBe(actual);
  });

  test('returns undefined with a non number input', () => {
    const expected = undefined;
    const actual = renderMoney('hello');

    expect(expected).toBe(actual);
  });
});

describe('getTypeTotal', () => {
  const categories = [
    {
      id: 1,
      name: 'Rent',
      budgeted: 900,
      activity: 500,
      available: 400,
    },
    {
      id: 2,
      name: 'Car',
      budgeted: 1000,
      activity: 120,
      available: 880,
    },
    {
      id: 3,
      name: 'Stuff',
      budgeted: 500,
      activity: 620,
      available: -120,
    },
  ];

  test('Returns correct sum', () => {
    const budgetedExpected = '$2400.00';
    const budgetedActual = getTypeTotal(categories, 'budgeted');
    expect(budgetedExpected).toBe(budgetedActual);

    const activityExpected = '$1240.00';
    const activityActual = getTypeTotal(categories, 'activity');
    expect(activityExpected).toBe(activityActual);

    const availableExpected = '$1160.00';
    const availableActual = getTypeTotal(categories, 'available');
    expect(availableExpected).toBe(availableActual);
  });

  test('Returns undefined if category type does not exist', () => {
    const expected = undefined;
    const actual = getTypeTotal(categories, 'notThere');

    expect(expected).toBe(actual);
  });
});

describe('round()', () => {
  test('should round to give decimal place', () => {
    const oneExpected = 10.2;
    const oneActual = round(10.2234456, 1);
    expect(oneExpected).toBe(oneActual);

    const twoExpected = 10.22;
    const twoActual = round(10.215, 2);
    expect(twoExpected).toBe(twoActual);

    const threeExpected = 10.201;
    const threeActual = round(10.20054, 3);
    expect(threeExpected).toBe(threeActual);
  });

  test('should round to a whole number', () => {
    const expected = 10;
    const actual = round(10.34);
    expect(expected).toBe(actual);
  });
});
