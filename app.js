const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require('ejs');
// const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text({ type: "text/html" }));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// app.use(favicon(path.join(__dirname,'public', "/favicon.ico")));

app.set('view engine', 'ejs');
app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" ,function(req,res){
    const classGroup = req.body.classGroup;
    const labGroup = req.body.labGroup;
    const pool = req.body.pool;
    const pool_lab = req.body.pool_lab;
    var arr = new Array(5);
    for(var i =0;i<5;i++){
        arr[i] = new Array(7);
    }

    // Class Groups
    if(classGroup == 'G1'){
        // Monday
        arr[0][2] = "EC1352 L25 DD";
        arr[0][3] = "EC1353 L31 AJ";
        arr[0][4] = "EC1351 L24 NG";

        // Tuesday
        arr[1][2] = "EC1352 L25 DD";
        arr[1][3] = "EC1353 L31 AJ";
        arr[1][4] = "EC1351 L24 NG";
        
        // Wednesday
        arr[2][3] = "EC1353 L31 AJ";
                    
        // Thrusday
        arr[3][2] = "EC1352 L25 DD"; 

        //Friday
        arr[4][4] = "EC1351 L24 NG"; 

    }else{
        // Monday
        arr[0][2] = "EC1351 L31 PL";
        arr[0][3] = "EC1352 L25 AP";
        arr[0][4] = "EC1353 L31 AJ";

        // Tuesday
        arr[1][2] = "EC1351 L20 PL";
        arr[1][3] = "EC1352 L25 AP";
        arr[1][4] = "EC1353 L31 AJ";
        
        // Wednesday
        arr[2][1] = "EC1352 L30 AP";
        arr[2][3] = "EC1351 L25 PL";
                    
        // Thrusday

        //Friday
        arr[4][4] = "EC1353 L25 AJ"; 
    }

    // Class Lab/Tut Groups
    if(labGroup == "g1"){
        arr[0][0] = arr[0][1] = "EC1351 Lab9 PL";
        arr[3][5] = "EC1352 T L25 DD";
        arr[4][5] = arr[4][6] = "EC1353 Lab7 SHANOL/DB";
    }else if(labGroup == "g2"){
        arr[0][1] = "EC1352 T L25 DD";
        arr[2][0] = arr[2][1] = "EC1353 Lab7 DB/AJ";
        arr[4][1] = arr[4][2] = "EC1351 Lab9 PL";
    }else if(labGroup == "g3"){
        arr[2][0] = arr[2][1] = "EC1351 Lab9 PL/JKEDIA";
        arr[3][1] = "EC1352 T L25 DD";
        arr[4][1] = arr[4][2] = "EC1353 Lab7 AJ";
    }else if(labGroup == "g4"){
        arr[1][5] = arr[1][6] = "EC1353 Lab7 DB/RM"; 
        arr[2][5] = arr[2][6] = "EC1351 Lab9 PL/NG";
        arr[4][2] = "EC1352 T L25 DD";
    }else if(labGroup == "g5"){
        arr[1][5] = arr[1][6] = "EC1351 Lab9 PL/NG";
        arr[2][5] = arr[2][6] = "EC1353 Lab7 AJ/SS";
        arr[4][2] = "EC1352 T L30 AP";
    }else if(labGroup == "g6"){
        arr[1][6] = "EC1352 T L25 AP";
        arr[3][1] = arr[3][2] = "EC1351 Lab9 PL";
        arr[3][5] = arr[3][6] = "EC1353 Lab7 SHANOL/DB";
    }else if(labGroup == "g7"){
        arr[0][0] = arr[0][1] = "EC1353 Lab7 AJ/SS";
        arr[3][5] = arr[3][6] = "EC1351 Lab9 NG/ANCHAL";
        arr[4][1] = "EC1352 T L25 AP";
    }else if(labGroup == "g8"){
        arr[2][6] = "EC1352 T L24 AP";
        arr[3][1] = arr[3][2] = "EC1353 Lab7 AJ/SS";
        arr[4][5] = arr[4][6] = "EC1351 Lab9 NG/ANCHAL";
    }

    // Pool
    if(pool == "Communication"){
        arr[1][0] = "EC2212 L30 AP";
        arr[1][1] = "EC2213 L25 SS";
        arr[2][2] = "EC2213 L25 SS";
        arr[2][4] = "EC2212 L31 AP";
        arr[3][3] = "EC2213 L25 SS";
        arr[4][3] = "EC2212 L31 AP";
        if(pool_lab == "g1"){
            arr[2][5] = "EC2212 T L31 AP";
            arr[3][4] = "EC2213 T L31 SS";
        }else if(pool_lab == "g2"){
            arr[0][5] = "EC2213 T L24 SS";
            arr[0][6] = "EC2212 T L25 AP";
        }else if(pool_lab == "g3"){
            arr[0][5] = "EC2212 T L25 AP";
            arr[4][0] = "EC2213 T L31 SS";
        }else if(pool_lab == "g4"){
            arr[4][0] = "EC2212 T L30 AP";
            arr[4][2] = "EC2213 T L31 SS";
        }
    }else if(pool == "Embedded"){
        arr[0][5] = "EC2224 L31 SD";
        arr[1][1] = "EC2224 L31 SD";
        arr[2][2] = "EC2222 L25 GMK";
        arr[2][4] = "EC2224 L31 SD";
        arr[3][3] = "EC2222 L31 GMK";
        arr[4][3] = "EC2222 L30 GMK";
        if(pool_lab == "g1"){
            arr[4][0] = arr[4][1] = "EC2224 Lab6 SD/RM";
            arr[4][2] = "EC2222 T L20 GMK";
        }else if(pool_lab == "g2"){
            arr[4][0] = "EC2222 T L25 GMK";
            arr[4][5] = arr[4][6] = "EC2224 Lab6 SD/SS";
        }
    }else if(pool == "VLSI"){
        arr[1][0] = "EC2234 L31 JKEDIA";
        arr[2][2] = "EC2234 L20 JKEDIA";
        arr[2][4] = "EC2231 L24 GMK";
        arr[3][0] = "EC2231 L25 GMK";
        arr[3][3] = "EC2234 L20 JKEDIA";
        arr[3][4] = "EC2231 L24 GMK";
        if(pool_lab == "g1"){
            arr[0][5] = arr[0][6] = "EC2234 Lab8 JKEDIA";
            arr[2][5] = arr[2][6] = "EC2231 Lab SRC GMK";
        }else if(pool_lab == "g2"){
            arr[3][5] = arr[3][6] = "EC2231 Lab SRC GMK/AP";
        }
    }
    res.render('result.ejs', {arr:arr});
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server working fine on port 3000");
});