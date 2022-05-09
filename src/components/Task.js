import React from 'react';
import "./Task.css";
import deleteImg from "../assets/trash.png";
import checkImg from "../assets/check.png";
import pinImg from "../assets/pin.png";
import unPinImg from "../assets/unpin.png";
import addImg from "../assets/thin_add.png";
import redDelete from "../assets/delete.png";
import BottomNav from "./BottomNav";
import { useState,useEffect } from 'react';
import {collection,addDoc,doc,updateDoc,getDocs,deleteDoc} from 'firebase/firestore';
import {db} from './Firebase';
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";





// taskItem structure
// {
//   index: taskListData.length,
//   heading : newHeading,
//   tasks : [{
//     number: taska.length,
//     value : "",
//     isDone : false
//   }]
// }  

export default function Task(props) {

  const [taskListData,setTaskListData] = useState([]);
  const taskCollectionRef = collection(db,"Tasks");

  const [user,setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  function makeNewHeading(newHeading){
    let tdata = taskListData;
    let item = {
      userId:user.uid,
      index: taskListData.length,
      title : newHeading,
      tasks : []
    }
    tdata.push(item);
    setTaskListData(tdata);
    console.log(taskListData);

    try{
      addDoc(taskCollectionRef,item).then(()=>{
        props.handleSnack("New Todo created", "info");
      });
    }
    catch(err){
      props.handleSnack("Couldn't make new heading", "error");
    }

    getAllTasksFromFireBase();
  }







  function getAllTasksFromFireBase(){
    getDocs(taskCollectionRef)
    .then((snapshot)=>{
      let tList = [];
      snapshot.docs.forEach((doc)=>{
        if(doc.data().userId === user.uid)
        tList.push({...doc.data(),docId: doc.id})
      })
      setTaskListData(tList);
    }).
    catch(err=>{
      console.log(err.message);
    })
  }

  useEffect(()=>{
    getAllTasksFromFireBase();
  },[]);
  
  // useEffect(()=>{
  //   if(taskListData.length==0){
  //     getAllTasksFromFireBase();
  //   }
  //   console.log("Getting Tasks");
  // },[taskListData])
  
  function dismissTimeInterval(){
    clearInterval(intervalId);
    console.log("Cleared Time Interval");
  }
  if(taskListData.length==0){
    var intervalId = setInterval(getAllTasksFromFireBase,100);
  }
  if(taskListData.length!=0){
    setTimeout(dismissTimeInterval,10000);
  }

  
  return (
    <>
      {(user == null && taskListData.length==0) ? (
        <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
          <h2>Please Login First</h2>
        </div>
      ):(
      <>
        <div className="grid-container">
          {
            taskListData.map((el, index) => (
              <div className="item">
                {/* <!-- heading of each item --> */}
                <div className="heading">
                  <span>{el.title}</span>
                  <div className="heading-icons">
                    <img
                      className="heading-delete-btn"
                      src={deleteImg}
                      onClick={(e) => {
                        // let item = e.target;
                        // let headingItem =
                        //   item.parentElement.parentElement;
                        // console.log(headingItem);
                        // headingItem.remove();

                        let tdlist = taskListData;
                        let hName = tdlist[el.index].title;
                        tdlist.splice(el.index, 1);
                        setTaskListData(tdlist);
                        console.log(taskListData);

                        // Delete task from firebase
                        const taskDoc = doc(db, "Tasks", el.docId);
                        deleteDoc(taskDoc)
                        .then(()=>{
                          props.handleSnack("Deleted Todo", "info");
                        })
                        .catch((err) => {
                          props.handleSnack("Couldn't Delete the heading", "error");
                          console.log(err.message);
                        });
                      }}
                    />
                    {/* <img
                      className="pin-unpin-btn"
                      src={pinImg}
                      onClick={(e) => {
                        let item = e.target;

                        if (item.getAttribute("src") === pinImg) {
                          item.setAttribute("src", unPinImg);
                        } else if (item.getAttribute("src") === unPinImg) {
                          item.setAttribute("src", pinImg);
                        }
                      }}
                    /> */}
                  </div>
                </div>

                {/* Tasks List Here */}
                <div className="task-list">
                  {/*  Individual Tasks Here */}
                  {
                    el.tasks.map((tel, key) => (
                    <div className="task-item">
                      <div className="task-text">
                        <div
                          className="check-btn"
                          onClick={(e) => {
                            console.log(e.target);
                            let item = e.target;

                            if (e.target.classList.contains("checked-img")) {
                              item = item.parentElement;
                              console.log(item);
                            }

                            if (!tel.isDone) {
                              item.classList.add("checkBtn-bg");
                              item.parentElement.children[1].classList.add(
                                "task-completed"
                              );
                            } else {
                              item.classList.remove("checkBtn-bg");
                              item.parentElement.children[1].classList.remove(
                                "task-completed"
                              );
                            }

                            for (let i = 0; i < el.tasks.length; i++) {
                              if (
                                el.tasks[i].number === tel.number &&
                                el.tasks[i].value === tel.value
                              ) {
                                console.log(tel);
                                if (el.tasks[i].isDone === false)
                                  el.tasks[i].isDone = true;
                                else el.tasks[i].isDone = false;
                              }
                            }

                            const taskDocRef = doc(db, "Tasks", el.docId);
                            updateDoc(taskDocRef, {
                              tasks: el.tasks,
                            })
                            .then(()=>{
                              props.handleSnack("Task Completed!", "info");
                            })
                            .catch((err) => {
                              props.handleSnack("Couldn't update the task!", "error");
                            });
                          }}
                        >
                          <img
                            className="checked-img"
                            src={checkImg}
                            alt="check"
                          />
                        </div>
                        <li>{tel.value}</li>
                      </div>
                      <img
                        className="delete-btn"
                        src={redDelete}
                        alt="Delete"
                        onClick={(e) => {
                          // let item = e.target;
                          // let taskItem = item.parentElement;
                          // console.log(taskItem);
                          // taskItem.remove();

                          for (let i = 0; i < el.tasks.length; i++) {
                            if (
                              el.tasks[i].number === tel.number &&
                              el.tasks[i].value === tel.value
                            ) {
                              console.log(tel);
                              el.tasks.splice(i, 1);
                            }
                          }

                          const taskDocRef = doc(db, "Tasks", el.docId);
                          updateDoc(taskDocRef, {
                            tasks: el.tasks,
                          })
                          .then(()=>{
                            props.handleSnack("Task deleted!", "info");
                          })
                          .catch((err) => {
                            props.handleSnack("Couldn't Delete the task!", "error");
                          });

                          // getAllTasksFromFireBase();
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="task-adder-div">
                  <input
                    className="task-adder"
                    type="text"
                    placeholder="Enter a task..."
                  />
                  <div
                    className="add-new-task-btn-div"
                    onClick={(e) => {
                      let item = e.target;

                      if (item.classList.contains("add-new-task-btn-div")) {
                        item = item.children[0];
                      }
                      // item is the 'add' image

                      let outerMostElements =
                        item.parentElement.parentElement.children;

                      // Getting input task text
                      let taskTodo = outerMostElements[0].value;

                      // If task is empty - don't do anything
                      if (taskTodo === "") {
                        return;
                      }
                      // Setting input tag to empty
                      outerMostElements[0].value = "";

                      el.tasks.push({
                        number: el.tasks.length,
                        value: taskTodo,
                        isDone: false,
                      });

                      const taskDocRef = doc(db, "Tasks", el.docId);
                      updateDoc(taskDocRef, {
                        tasks: el.tasks,
                      })
                      .then(()=>{
                      	props.handleSnack("New Task added!","info");
                      })
                      
                      .catch((err) => {
                        console.log("Error during updatoin !!!");
                      });

                      getAllTasksFromFireBase();
                    }}
                  >
                    <img
                      className="add-new-task-btn"
                      src={addImg}
                      alt="Add Task"
                    />
                  </div>
                </div>
              </div>
            ))
          }

          <div
            className="add-new-heading"
            onClick={() => {
              console.log(document.querySelector(".modal-bg").classList);
              document
                .querySelector(".modal-bg")
                .classList.remove("display-toggle");
              document.querySelector(".modal-input").focus();
            }}
          >
            <h2>Add a To-do</h2>
            <img src={addImg} alt="Adding" />
          </div>
        </div>


            {/* Modal */}
        <div className="modal-bg display-toggle">
          <div className="modal">
            <div>
              <button
                className="modal-close-btn"
                onClick={(e) => {
                  document
                    .querySelector(".modal-bg")
                    .classList.add("display-toggle");
                }}
              >
                &nbsp;X&nbsp;
              </button>
            </div>
            <div>
              <input
                className="modal-input Input"
                type="text"
                placeholder="Name the To-do"
              />
            </div>
            <div>
              <button
                className="modal-done-btn Button"
                onClick={() => {
                  let newHeading = document.querySelector(".modal-input").value;

                  if (newHeading !== "") {
                    makeNewHeading(newHeading);
                  }

                  document.querySelector(".modal-input").value = "";
                  document
                    .querySelector(".modal-bg")
                    .classList.add("display-toggle");
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>

        <BottomNav />
      </>
      )}
    </>
  );
}
