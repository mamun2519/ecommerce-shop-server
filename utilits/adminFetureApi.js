class AdminFetureApi {
      constructor(query, searchQuery) {
        this.query = query;
        this.searchQuery = searchQuery;
      }
    // ------------
      search() {
        const keyword = this.searchQuery.keyword
          ? {
              name: {
                // regex mongodb reguler expretion
                $regex: this.searchQuery.keyword,
                $options: "i",
              },
            }
          : {role: "admin"};
    
        this.query = this.query.find({ ...keyword });
    
        return this;
      }
    
      filter() {
        const searchQuaryCopy = { ...this.searchQuery };
        const removeFlied = ["keyword", "page", "limit"];
        removeFlied.forEach((key) => delete searchQuaryCopy[key]);
        this.query = this.query.find(searchQuaryCopy);
        return this;
      }
    
      pagination(resultPerPage) {
        const carrentPage = Number(this.searchQuery.page) || 1;
        const pageSkip = resultPerPage * (carrentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(pageSkip);
        return this;
      }
    }
    
    module.exports =  AdminFetureApi;