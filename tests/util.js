let data = [{name: "john", surname: "doe", id:3}, {name: "john", surname: "doe", id:2},
  {name:"jack", surname: "doe", id:1,}, {name:"john", surname:"foe", id:4}];

function customJackFilterer(data, fieldFilters) {
  if (fieldFilters.length !== 2||
    fieldFilters[0].fieldName !== 'name' || fieldFilters[0].filter !== 'oh' ||
    fieldFilters[1].fieldName !== 'surname' || fieldFilters[1].filter !== 'd') {
    throw "Field filters are not retrieved as expected";
  }

  return data.filter(function (item) {
    return item.name === 'jack';
  });
}

function customSorter(data, sortFields) {
  if (sortFields.length !== 2 ||
    sortFields[0].fieldName !== 'name' || sortFields[0].isAscending === true ||
    sortFields[1].fieldName !== 'surname' || sortFields[1].isAscending === false) {
    throw "Sort fields are not retrieved as expected";
  }

  let newData = [];
  newData.push(data[1]);
  newData.push(data[3]);
  newData.push(data[0]);
  newData.push(data[2]);

  return newData;
}

export default {
  data: data,
  customJackFilterer: customJackFilterer,
  customSorter: customSorter
};
