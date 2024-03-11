const express = require("express");
const mysql = require("mysql");
const mydbinfo = require("../data/dbconfig.json")

const mysqlapi = express.Router();

mysqlapi.use(express.json())
mysqlapi.use(express.urlencoded({ extended: true }))

const myconnection = mysql.createPool(mydbinfo)



//글목록보기
//리액트에서 요청하는 주소의 형태는 서버/store/테이블명
mysqlapi.get('/:tablenm', (req, res) => {
    const tablenm = req.params.tablenm; // 0, 1, ~~~, all, Scinic_Product , Category   

    const sqltable = parseInt(tablenm);

    console.log(  tablenm, typeof sqltable , sqltable );

    
   let tablenmparam;

    if (!isNaN(sqltable)) {
        //숫자라우터
        tablenmparam = `Scinic_Product where Category_no = '${sqltable}'`;

    } else {
        
        if(tablenm == 'all'){
            tablenmparam = `Scinic_Product`;
        }else{
            tablenmparam = tablenm;
        }
    }

    console.log(`select * from ${tablenmparam}`);


    //const wheretable = p_id !== "" ? ` where p_id =${p_id}` : null
    myconnection.getConnection((err, connect) => {
        if (err) throw console.log("DB접속정보확인 " + err)
        connect.query(`select * from ${tablenmparam}`, (error, result) => {
            if (error) throw console.log("첫번째 쿼리문 오류" + error)
            res.send(result);
            console.log("store 새로고침문제",result, "store 새로고침문제",tablenmparam);
            connect.release(); //요청한것이 완료되면 연결 해제

        })
    })
})


//요청주소 /store/
// mysqlapi.get('/:tablenm/:num', (req, res) => {
//     const tablenm = req.params.tablenm
//     const category_no = req.params.num
//     const wheretable = `where 
//     id=${category_no}`

//     myconnection.getConnection((err, connect) => { //카테고리 pk로 정보에 접근
//         if (err) throw console.log("DB접속정보확인 " + err)
//         connect.query(`select * from ${tablenm} ${wheretable}`, (error, result) => {
//             if (error) throw console.log("쿼리문 오류" + error)
//             res.send(result)
//             console.log(result);
//             connect.release();

//         })
//     })
// })

mysqlapi.get('/:tablenm/:id', (req, res) => { //제품 상세페이지  //
    const tablenm = req.params.tablenm;
    const idnum = req.params.id;
    const wherenum = `where id=${idnum}`

    myconnection.getConnection((err, connect) => {
        if (err) throw console.log("DB접속정보" + err)
        connect.query(`select * from ${tablenm} ${wherenum}`, (error, result) => {
            if (error) throw console.log("검색 쿼리문 오류")
            res.send(result);
            console.log(result);
            connect.release();
        })
    })
})







module.exports = mysqlapi;