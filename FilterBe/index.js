const http=require('http');
var url=require('url')
var server=http.createServer(async(req,res)=>{
        var parsed_url=url.parse(req.url,true)
        console.log(parsed_url.query.cat)

        console.log(req.url.split('?'))

        var queryy=req.url.split('?')[1].split('&')
        console.log(queryy)

        let response=await fetch('https://fakestoreapi.com/products')
        let data=await response.json()

        var result=[]
        if(parsed_url.query.cat=='m'){
            var mens=data.filter((val)=>{
                return val.category=="men's clothing"
            })
            result=[...mens]
            // res.write(JSON.stringify(mens))
            // res.end();
        }else if(parsed_url.query.cat=='w'){
            var womens=data.filter((val)=>{
                return val.category=="women's clothing"
            })
            // res.write(JSON.stringify(womens))
            // res.end();
            result=[...womens]
        }else if(parsed_url.query.cat=='j'){
            var jew=data.filter((val)=>{
                return val.category=="jewelery"
            })
            // res.write(JSON.stringify(jew))
            // res.end();
            result=[...jew]
        }else if(parsed_url.query.cat=='e'){
            var elec=data.filter((val)=>{
                return val.category=="electronics"
            })
            // res.write(JSON.stringify(elec))
            // res.end();
            result=[...elec]
        }else{
            res.write(JSON.stringify(result))
            res.end();
        }
        if(parsed_url.query.sort=='lh'){
        result.sort((a,b)=>{
            return a.price-b.price
        })
        res.write(JSON.stringify(result))
        res.end();
    }else if(parsed_url.query.sort=='hl'){
        result.sort((a,b)=>{
            return b.price-a.price
        })
        res.write(JSON.stringify(result))
        res.end();
    }else{
        res.write(JSON.stringify(result))
        res.end();
    }
})
server.listen(3006,()=>{
 console.log('Server running')
})