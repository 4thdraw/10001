const express = require("express");
const app = express();
const port = 8001;
const path = require("path");
const mysqlapi = require('./api/get')
const formtag = require('./api/post')
const searchapi = require('./api/search')


app.use(express.static(path.join(__dirname, './project/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./project/build/index.html"))
})


//상품출력 라우터
app.use('/store', mysqlapi)

app.use('/result', searchapi)

//폼데이터 라우터
app.use('/form', formtag)



app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "publish/nopage.html"))
})



app.listen(port, () => {
    console.log(`localhost ${port} onload`)
})

// 엔트리포인트  | web.js

// 기능 : 포트설정 및 첫 인트로페이지 리액트 빌드응답 및 API 요청주소 생성

// 라우터  |  store , form : 단 2개의 라우터 생성하여 get과 post 응답처리 분리관리




// 하위라우터 : store |  get응답처리




// 요청주소 | params 기술처리                    성공응답결과 (res.data)

// 글목록 /store/:tablenm                          array -> map처리

// 글보기 /store/:tablenm/:pk                     array -> map처리

// 글쓰기 /form/:tablenm                          object(msg : "i") -> useState변수 응답결과 boolean으로 관리

// 글수정 /form/:tablenm/:pk/m                 object(msg : "m") -> useState변수 응답결과 boolean으로 관리

// 글삭제 /form/:tablenm/:pk/d                 object(msg : "d") -> useState변수 응답결과 boolean으로 관리