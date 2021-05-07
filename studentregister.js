var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app=express();
var ejs=require('ejs');
var path=require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Omkar@1234",
    database:"onexam"
});
// student register

app.get('/test',function(req,res){
    res.sendFile(__dirname+'/studentregister.html');
});
app.post('/studentregister',function(req,res){
    var username=req.body.uname;
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    var mobilenumber=req.body.mobile;
    var birthdate=req.body.date;
    var gender=req.body.gender;
    var password=req.body.password;
conn.connect(function(err){
    var sql="insert into regstudent(username,firstname,lastname,email,mobilenumber,birthdate,gender,password) values('"+username+"','"+firstname+"','"+lastname+"','"+email+"','"+mobilenumber+"','"+birthdate+"','"+gender+"','"+password+"')";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Inserted');
        res.redirect('test');
    });
});
});

app.get('/test1',function(req,res){
    res.sendFile(__dirname+'/studentupdate.html');
});
app.post('/studentupdate',function(req,res){
    var id=req.body.id;
    var username=req.body.uname;
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    var mobilenumber=req.body.mobile;
    var birthdate=req.body.date;
    var gender=req.body.gender;
    var password=req.body.password;
conn.connect(function(err){
    var sql="update regstudent set username='"+username+"',firstname='"+firstname+"',lastname='"+lastname+"',email='"+email+"',mobilenumber='"+mobilenumber+"',birthdate='"+birthdate+"',gender='"+gender+"',password='"+password+"' where id='"+id+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Updated');
        res.redirect('test1');
    });
});
});
app.get('/test2',function(req,res){
    res.sendFile(__dirname+'/studentdelete.html');
});
app.post('/studentdelete',function(req,res){
    var id=req.body.id;
    
conn.connect(function(err){
    var sql="delete from regstudent where id='"+id+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record deleted');
        res.redirect('test2');
    });
});
});
app.get('/testA',function(req,res){
    var sql="select * from regstudent";
    conn.query(sql,function(err,rows){
        if(err)throw err;
        res.render('studentview',{
            studs:rows
        });
    });
});

//student Login

app.get('/test4',function(req,res){
    res.sendFile(__dirname+'/studentLogin.html')
});
app.post('/studentLogin',function(req,res){
    var username=req.body.uname;
    var password=req.body.password;
    if(username && password){
        conn.query('select * from regstudent where username=? and password=?',[username,password],function(err,results,field){
        if(results.length>0)
        {
            res.redirect('/testA');
        }
        else{
            res.send('Incorrect Username and Password')
        }
        res.end();
    });
}
    else{
        res.send('Please enter username and password');
        res.end();
    }    
    });

    // Batch start coding

    app.get('/test6',function(req,res){
        res.sendFile(__dirname+'/createbatch.html');
    });
    app.post('/createbatch',function(req,res){
        var batchname=req.body.bname;
        var startdate=req.body.sdate;
        var enddate=req.body.edate;
        
    conn.connect(function(err){
        var sql="insert into batch(batchname,startdate,enddate) values('"+batchname+"','"+startdate+"','"+enddate+"')";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record Inserted');
            res.redirect('test6');
        });
    });
    });

    

    app.get('/test7',function(req,res){
        res.sendFile(__dirname+'/batchupdate.html');
    });
    app.post('/batchupdate',function(req,res){
        var bid=req.body.bid;
        var batchname=req.body.bname;
        var startdate=req.body.sdate;
        var enddate=req.body.edate;
    conn.connect(function(err){
        var sql="update batch set batchname='"+batchname+"',startdate='"+startdate+"',enddate='"+enddate+"' where bid='"+bid+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record Updated');
            res.redirect('test7');
        });
    });
    });

    app.get('/test8',function(req,res){
        res.sendFile(__dirname+'/batchdelete.html');
    });
    app.post('/batchdelete',function(req,res){
        var bid=req.body.bid;
        
    conn.connect(function(err){
        var sql="delete from batch where bid='"+bid+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record deleted');
            res.redirect('test8');
        });
    });
    });
    app.get('/testB',function(req,res){
        var sql="select * from batch";
        conn.query(sql,function(err,rows){
            if(err)throw err;
            res.render('batchview',{
                batchs:rows
            });
        });
    });
    
    //add student to batch code

    app.get('/test11',function(req,res){
        res.sendFile(__dirname+'/addstudenttobatch.html');
    });
    app.post('/addstudenttobatch',function(req,res){
        var sid=req.body.sid;
        var sname=req.body.sname;
        var bid=req.body.bid;
        var batchname=req.body.bname;
        
    conn.connect(function(err){
        var sql="insert into studentbatch(sid,sname,bid,batchname) values('"+sid+"','"+sname+"','"+bid+"','"+batchname+"')";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record Inserted');
            res.redirect('test11');
        });
    });
    });

    

    app.get('/test12',function(req,res){
        res.sendFile(__dirname+'/addstudenttobatchupdate.html');
    });
    app.post('/addstudenttobatchupdate',function(req,res){
        var sid=req.body.sid;
        var sname=req.body.sname;
        var bid=req.body.bid;
        var batchname=req.body.bname;
        
    conn.connect(function(err){
        var sql="update studentbatch set sname='"+sname+"',bid='"+bid+"',batchname='"+batchname+"' where sid='"+sid+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record Updated');
            res.redirect('test12');
        });
    });
    });

    app.get('/test13',function(req,res){
        res.sendFile(__dirname+'/addstudenttobatchdelete.html');
    });
    app.post('/addstudenttobatch',function(req,res){
        var sid=req.body.sid;
        
    conn.connect(function(err){
        var sql="delete from studentbatch where sid='"+sid+"'";
        conn.query(sql,function(err,result){
            if(err)throw err;
            console.log('Record deleted');
            res.redirect('test13');
        });
    });
    });
    app.get('/testC',function(req,res){
        var sql="select * from studentbatch";
        conn.query(sql,function(err,rows){
            if(err)throw err;
            res.render('addstudenttobatchview',{
                adds:rows
            });
        });
    });


// Admin login

app.get('/test15',function(req,res){
    res.sendFile(__dirname+'/adminLogin.html');
});
app.post('/adminLogin',function(req,res){
    var username=req.body.uname;
    var password=req.body.password;
    
    
conn.connect(function(err){
    var sql="insert into admin(username,password) values('"+username+"','"+password+"')";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Inserted');
        res.redirect('/testI1');
    });
});
});



/*app.get('/test16',function(req,res){
    res.sendFile(__dirname+'/adminupdate.html');
});
app.post('/adminupdate',function(req,res){
    var username=req.body.uname;
    var password=req.body.password;
    
conn.connect(function(err){
    var sql="update admin set password='"+password+"'where username='"+username+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Updated');
        res.redirect('test16');
    });
});
});

app.get('/test17',function(req,res){
    res.sendFile(__dirname+'/admindelete.html');
});
app.post('/admindelete',function(req,res){
    var username=req.body.uname;
    var password=req.body.password;
    
conn.connect(function(err){
    var sql="delete from admin where username='"+username+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record deleted');
        res.redirect('test17');
    });
});
});
app.get('/testD',function(req,res){
    var sql="select * from admin";
    conn.query(sql,function(err,rows){
        if(err)throw err;
        res.render('adminview',{
            admins:rows
        });
    });
});*/

//Questions code

app.get('/test20',function(req,res){
    res.sendFile(__dirname+'/question.html');
});
app.post('/question',function(req,res){
    var question=req.body.question;
    var optionA=req.body.optionA;
    var optionB=req.body.optionB;
    var optionC=req.body.optionC;
    var optionD=req.body.optionD;
    var answer=req.body.answer;

conn.connect(function(err){
    var sql="insert into questions(question,optionA,optionB,optionC,optionD,answer) values('"+question+"','"+optionA+"','"+optionB+"','"+optionC+"','"+optionD+"','"+answer+"')";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Inserted');
        res.redirect('test20');
    });
});
});

app.get('/test21',function(req,res){
    res.sendFile(__dirname+'/questionupdate.html');
});
app.post('/studentupdate',function(req,res){
    var qid=req.body.qid;
    var optionA=req.body.optionA;
    var optionB=req.body.optionB;
    var optionC=req.body.optionC;
    var optionD=req.body.optionD
    var answer=req.body.answer;
    
conn.connect(function(err){
    var sql="update questions set question='"+question+"',optionA='"+optionA+"',optionB='"+optionB+"',optionC='"+optionC+"',optionD='"+optionD+"',answer='"+answer+" where qid='"+qid+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Updated');
        res.redirect('test21');
    });
});
});
app.get('/test22',function(req,res){
    res.sendFile(__dirname+'/questiondelete.html');
});
app.post('/questiondelete',function(req,res){
    var qid=req.body.qid;
    
conn.connect(function(err){
    var sql="delete from questions where qid='"+qid+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record deleted');
        res.redirect('test22');
    });
});
});
app.get('/testE',function(req,res){
    var sql="select * from questions";
    conn.query(sql,function(err,rows){
        if(err)throw err;
        res.render('questionview',{
            que:rows
        });
    });
});

// Scheduletest coding 

app.get('/test25',function(req,res){
    res.sendFile(__dirname+'/scheduleTest.html');
});
app.post('/scheduleTest',function(req,res){
    
    var bid=req.body.bid;
    var batchname=req.body.bname;
    var examdate=req.body.edate;
    
conn.connect(function(err){
    var sql="insert into scheduletest(bid,batchname,examdate) values('"+bid+"','"+batchname+"','"+examdate+"')";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Inserted');
        res.redirect('test25');
    });
});
});



app.get('/test26',function(req,res){
    res.sendFile(__dirname+'/scheduleTestupdate.html');
});
app.post('/scheduleTestupdate',function(req,res){
    var sid=req.body.sid;
    var bid=req.body.bid;
    var batchname=req.body.bname;
    var examdate=req.body.edate;
    
conn.connect(function(err){
    var sql="update scheduletest set bid='"+bid+"',batchname='"+batchname+"',examdate='"+examdate+"' where sid='"+sid+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record Updated');
        res.redirect('test26');
    });
});
});

app.get('/test27',function(req,res){
    res.sendFile(__dirname+'/scheduleTestdelete.html');
});
app.post('/scheduleTestdelete',function(req,res){
    var sid=req.body.sid;
    
conn.connect(function(err){
    var sql="delete from scheduletest where sid='"+sid+"'";
    conn.query(sql,function(err,result){
        if(err)throw err;
        console.log('Record deleted');
        res.redirect('test27');
    });
});
});
app.get('/testF',function(req,res){
    var sql="select * from scheduletest";
    conn.query(sql,function(err,rows){
        if(err)throw err;
        res.render('scheduleTestview',{
            schedules:rows
        });
    });
});

// index page
app.get('/testI',function(req,res){
    res.sendFile(__dirname+'/index.html')
});

// index1 page
app.get('/testI1',function(req,res){
    res.sendFile(__dirname+'/index1.html')
});



app.listen(2021);
console.log('server started with port 2021');
