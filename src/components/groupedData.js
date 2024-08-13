export const groupedData = (data, groupInput) => {
  if (!data) return;
  let newData = {};
  for (let item of data) {
    // console.log(item[groupInput]);
    let newItem = {};
    if (!newData[item[groupInput]]) {
      newData[item[groupInput]] = [item];
    } else {
      newData[item[groupInput]].push(item);
    }
    // newData.push(newItem);
  }

  let newSoldData = [];
  for (let item in newData) {
    let sold = 0;
    for (let i = 0; i < newData[item].length; i++) {
      sold += newData[item][i]["sold"];
    }
    newSoldData.push({
      category: item,
      sold: sold,
    });
  }
  // console.log(newSoldData);
  return newSoldData;
};
