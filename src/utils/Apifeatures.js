  export class Apifeatures{
constructor(mongooseQuery,queryString){
    this.mongooseQuery=mongooseQuery
    this.queryString=queryString
}
  // 1-pagination=========
  pagination()
 {
    let page_limit = 4;
  let page = this.queryString.page * 1 || 1;
  if (this.queryString.page <= 0) page = 1;
  let skip = (page - 1) * page_limit;
  this.page=page
  this.mongooseQuery.skip(skip).limit(page_limit)
return this
}


filter(){
  // 2-filter===========
  let filterObj ={...this.queryString};
  console.log(filterObj);

  let excludeQuery=['page','sort','fields','keyword']
  excludeQuery.forEach((q)=>{
    delete filterObj[q]
  })

  filterObj=JSON.stringify(filterObj)
filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
filterObj = JSON.parse(filterObj);
this.mongooseQuery.find(filterObj)

return this

}

sort(){
    // 3-sort=======

if (this.queryString.sort)
{
  let sortBy =this.queryString.sort.split(",").join(" "); //["-price","sold"] => -price sold
  this.mongooseQuery.sort(sortBy)
}
return this
}

search(){
    if (this.queryString.keyword)
{
  this.mongooseQuery.find({
    $or: [
      { name: { $regex: this.queryString.keyword, $options: "i" } },
      { title: { $regex: this.queryString.keyword, $options: "i" } },
      { description: { $regex: this.queryString.keyword, $options: "i" } },

      { email: { $regex: this.queryString.keyword, $options: "i" } },
    ],
  });


}
return this
}


fields(){
if (this.queryString.fields)
{
  let fields = this.queryString.fields.split(",").join(" "); 
  this.mongooseQuery.select(fields)
}

return this
}

}


