module.exports = (query) => {
  let objectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    objectSearch.keyword = query.keyword;
    const regex = new RegExp(objectSearch.keyword, "i");
    // Tìm kiếm chung
    objectSearch.regex = regex;
  }

  return objectSearch;
};
