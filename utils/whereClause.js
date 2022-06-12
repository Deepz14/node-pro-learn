// base - Product.find()
// bigQ - ?search=coder&page=1&category=longsleeve&price[lte]=999&price[gte]=199&limit=5

class WhereClause{
    constructor(base, bigQ){
        this.base = base;
        this.bigQ = bigQ;
    }

    search(){
        const searchWord = this.bigQ.search ? {
            name: {
                $regex: this.bigQ.search,
                $options: 'i'
            }
        } : {}

        this.base = this.base.find({...searchWord});
        return this;
    }


    filter(){
        const copyQ = {...this.bigQ};

        delete copyQ['search'];
        delete copyQ['limit'];
        delete copyQ['page'];

        // convert the bigQ into a string =>  copyQ
        let stringCopyQ = JSON.stringify(copyQ);

        // Regex to convert the price[gte] to price[$gte];
        stringCopyQ = stringCopyQ.replace(/\b(gte | lte | gt | lt)\b/g, m => `$${m}`);

        const jsonOfCopyQ = JSON.parse(stringCopyQ);

        this.base = this.base.find(jsonOfCopyQ);

        return this;
    }

    pager(resultPerPage){
        let currentPage;

        this.bigQ.page ? currentPage = page : currentPage = 1;
        
        let skipVal = resultPerPage * (currentPage - 1);

        this.base = this.base.limit(resultPerPage).skip(skipVal);

        return this;
    }
}

module.exports = WhereClause;