const modelNames = {
  user: 'User',
  hotel: 'Hotel',
  review: 'Review',
};

const userTypes = {
  admin: 'Admin',
  regular: 'Regular',
};

const ratingTable = {
  likes: 0.1,
  dislikes: -0.1,
  favorites: 0.25,
  unfavorites: -0.25,
};

const mapOperatorsToGroups = (query) => {
  let groups = {};

  if (!query) {
    return groups;
  }

  const equalities = query
    .filter((searchQuery) => searchQuery.type === 'eq')
    .map(({ feature, value }) => ({
      [feature]: value,
    }));

  if (equalities.length > 0) {
    groups = {
      ...groups,
      ...equalities.reduce((previous, current) => ({ ...previous, ...current })),
    };
  }

  const contains = query
    .filter((searchQuery) => searchQuery.type === 'in')
    .map(({ feature, value }) => ({
      [feature]: {
        $regex: `.*${value}.*`,
      },
    }));

  if (contains.length > 0) {
    groups = {
      ...groups,
      ...contains.reduce((previous, current) => ({ ...previous, ...current })),
    };
  }

  const greaterThan = query
    .filter((searchQuery) => searchQuery.type === 'gt')
    .map(({ feature, value }) => ({
      [feature]: {
        $gt: value,
      },
    }));

  if (greaterThan.length > 0) {
    groups = {
      ...groups,
      ...greaterThan.reduce((previous, current) => ({ ...previous, ...current })),
    };
  }

  const lessThan = query
    .filter((searchQuery) => searchQuery.type === 'lt')
    .map(({ feature, value }) => ({
      [feature]: {
        $lt: value,
      },
    }));

  if (lessThan.length > 0) {
    groups = {
      ...groups,
      ...lessThan.reduce((previous, current) => ({ ...previous, ...current })),
    };
  }

  return groups;
};

const mapSortsTogether = (sorts) => sorts
  .sort((a, b) => (a.priority < b.priority ? 1 : -1))
  .map((sort) => ({
    [sort.feature]: [sort.type],
  }))
  .reduce((a, b) => ({ ...a, ...b }));

export {
  userTypes,
  modelNames,
  ratingTable,
  mapSortsTogether,
  mapOperatorsToGroups,
};
