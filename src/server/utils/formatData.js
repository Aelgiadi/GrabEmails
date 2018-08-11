const formatAll = data => {
  return data.map(datum => datum.attributes);
};

const formatOne = data => {
  return data.attributes;
};

const formatCategories = data => {
  let result = {};

  data.forEach(({ id, category, description }) => {
    result[id] = { name: category, description };
  });

  return result;
};

const formatCategoryAmount = data => {
  let results = {};

  // eslint-disable-next-line camelcase
  data.forEach(({ category_id, amount }) => {
    if (results[category_id]) {
      results[category_id] += parseFloat(amount);
    } else {
      results[category_id] = parseFloat(amount);
    }
  });

  return results;
};

const getColumns = (data, columns) => {
  let newData = {};
  columns.forEach(column => {
    newData[column] = data[column];
  });

  return newData;
};

const getColumnsFromAll = (data, columns) => {
  return data.map(datum => getColumns(datum, columns));
};

module.exports.getColumns = getColumns;
module.exports.getColumnsFromAll = getColumnsFromAll;
module.exports.formatOne = formatOne;
module.exports.formatAll = formatAll;
module.exports.formatCategoryAmount = formatCategoryAmount;
module.exports.formatCategories = formatCategories;
