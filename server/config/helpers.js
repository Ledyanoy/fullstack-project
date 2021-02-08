const sortArgsHelper = (args) => {
    // return  {
    //     sortBy: args._id,
    //     order: args.order || "asc",
    //     limit: args.limit || 3,
    //     skip: args.skip || 0
    // }

    let sortArgs = {sortBy: "_id",
            order: "asc",
           limit: 3,
           skip: 0
    }

    for (let key in args){
        if(args[key]){
            sortArgs[key] = args[key]
        }
    }

    console.log(sortArgs)

    return sortArgs
}

module.exports = {sortArgsHelper}
