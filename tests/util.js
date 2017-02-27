let data = [{name: "john", surname: "doe", id:3}, {name: "john", surname: "doe", id:2},
  {name:"jack", surname: "doe", id:1,}, {name:"john", surname:"foe", id:4}];

function customComparator(a,b) {
  if (a.id%2 === b.id%2) {
    return 0;
  }
  return a%2===0 ? 1 : -1;
}

export default {
  data: data,
  customComparator: customComparator
};
