// // CALL STACK AND TIMER QUEUE

// console.log("1"); // pushed to call stack executes by node immediately

// setTimeout(() => { // Is sent to libuv api (executes async tasks) after 0 secs a callback is is sent to callback queue, 
//                     //  Event loop checks whether stack is empty if yes then execute the callback
//     console.log("2");
// }, 0);

// console.log("3");  // pushed to call stack executes by node immediately


// // BLOCKING EVENT LOOP

// console.log("Start"); // Executes immediately

// setTimeout(() => {   // sent to lib uv executes after 0 seconds sends callback to callback queue waits until stack is empty
//     console.log("Timer");
// }, 0);

// const start = Date.now();

// while (Date.now() - start < 5000) {} // synchronous operation runs for 5 secs

// console.log("End"); // prints after 5 secs



// import http from "http";

// const server = http.createServer((req, res) => { // user 1 request arrives

//     console.log("Request Started"); // prints 1

//     setTimeout(() => { // goes to libuv, completes execution after 5 seconds sends callback to callback queue
//                         // response sent to user 1 after 5 seconds
//         console.log("Request Finished");
//         res.end("Done");
//     }, 5000);
//     console.log("Hello") // prints Hello immediately after 1

// });

// server.listen(3000);



// async and await


// function wait() {
//     return new Promise(resolve => {
//         setTimeout(resolve, 3000);
//     });
// }

// async function task() {    
//     console.log("Task Start"); // prints Task start

//     await wait(); // waits until wait function is finished executing, pauses function temporarly, control goes outside of the function executes "Main code"

//     console.log("Task End"); // resumes function after 3 secs and prints "Task End"
// }

// task(); // added to call stack

// console.log("Main Code"); // prints after encountering wait() as control gets back 


// Source - https://stackoverflow.com/q/40629456
// Posted by Rahul Shivsharan
// Retrieved 2026-06-21, License - CC BY-SA 3.0

function fn(name){
   return f;

   function f(){
       var n = name;
       console.log("Next TICK "+n+", ");        
   }
}

function myTimeout(time,msg){
   setTimeout(function(){
       console.log("TIMEOUT "+msg);
   },time); 
}

process.nextTick(fn("ONE"));
myTimeout(500,"AFTER-ONE");
process.nextTick(fn("TWO"));
myTimeout(500,"AFTER-TWO");
process.nextTick(fn("THREE"));
myTimeout(500,"AFTER-THREE");
process.nextTick(fn("FOUR"));
