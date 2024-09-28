let count = 0;
function createTree(arr, parentID = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentID) {
      const newBranch = item;
      count++;
      newBranch.index = count;
      const children = createTree(arr, item.id);
      if (children.length > 0) {
        newBranch.children = children;
      }
      tree.push(newBranch);
    }
  });
  return tree;
}
module.exports.tree = (arr, parentID) => {
  count = 0;
  const tree = createTree(arr, (parentID = ""));
  return tree;
};
