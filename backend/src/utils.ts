export const getReadinessLevels = (
  readiness:
    | 'Technology'
    | 'Market'
    | 'Acceptance'
    | 'Organizational'
    | 'Regulatory'
    | 'Investment',
) => {
  const levels = {
    Technology: [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 4 },
      { id: 5, level: 5 },
      { id: 6, level: 6 },
      { id: 7, level: 7 },
      { id: 8, level: 8 },
      { id: 9, level: 9 },
    ],
    Market: [
      { id: 10, level: 1 },
      { id: 11, level: 2 },
      { id: 12, level: 3 },
      { id: 13, level: 4 },
      { id: 14, level: 5 },
      { id: 15, level: 6 },
      { id: 16, level: 7 },
      { id: 17, level: 8 },
      { id: 18, level: 9 },
    ],
    Acceptance: [
      { id: 19, level: 1 },
      { id: 20, level: 2 },
      { id: 21, level: 3 },
      { id: 22, level: 4 },
      { id: 23, level: 5 },
      { id: 24, level: 6 },
      { id: 25, level: 7 },
      { id: 26, level: 8 },
      { id: 27, level: 9 },
    ],
    Organizational: [
      { id: 28, level: 1 },
      { id: 29, level: 2 },
      { id: 30, level: 3 },
      { id: 31, level: 4 },
      { id: 32, level: 5 },
      { id: 33, level: 6 },
      { id: 34, level: 7 },
      { id: 35, level: 8 },
      { id: 36, level: 9 },
    ],
    Regulatory: [
      { id: 37, level: 1 },
      { id: 38, level: 2 },
      { id: 39, level: 3 },
      { id: 40, level: 4 },
      { id: 41, level: 5 },
      { id: 42, level: 6 },
      { id: 42, level: 7 },
      { id: 44, level: 8 },
      { id: 45, level: 9 },
    ],
    Investment: [
      { id: 46, level: 1 },
      { id: 47, level: 2 },
      { id: 48, level: 3 },
      { id: 49, level: 4 },
      { id: 50, level: 5 },
      { id: 51, level: 6 },
      { id: 52, level: 7 },
      { id: 53, level: 8 },
      { id: 54, level: 9 },
    ],
  };

  return levels[readiness];
};
