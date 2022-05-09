import React from 'react';
import "./Notes.css"
import BottomNav from './BottomNav';
import { useEffect } from 'react';
import Masonry from 'masonry-layout';
import { useState } from 'react';
import redDelete from "../assets/delete.png";
import {collection,addDoc,setDoc,doc,updateDoc,deleteDoc,getDocs, onSnapshot} from 'firebase/firestore';
import { db } from "./Firebase";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";



// note structure
// {
//   index : noteListData.length,
//   heading : "",
//   description : ""
//   docId : ""
// }

export default function Notes(props) {

  const [noteListData,setNoteListData] = useState([]);
  const noteCollectionRef = collection(db,"Notes");

  const [user, setUser] = useState(null);

  function authChange(){
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u.uid);
        console.log('u=',u)
        console.log("here=",user);
      } else setUser(null);
      console.log("onauthchange");
    });
  }

  useEffect(() => {
    authChange();
    console.log(user);
  }, []);

  function addNoteBtnClicked(e) {
    let headingValue = document.querySelector(".note-heading").children[1].value;
    let descriptionValue = document.querySelector(".note-description").children[1].value;

    let item = {
      userId: user.uid,
      index: noteListData.length,
      heading: headingValue,
      description: descriptionValue,
    };
    let nt = noteListData;
    nt.push(item);
    console.log(nt);
    console.log(item)
    setNoteListData(nt);
    console.log(noteListData);    
    setNoteListData(noteListData);
    addNoteToFireBase(item);
  }

  useEffect(()=>{
    getAllNotesFromFireBase();
  },[]);

  // useEffect(()=>{
  //   getAllNotesFromFireBase();
  // },[noteListData);



  function addNoteToFireBase(item){
    try {
      addDoc(noteCollectionRef, item)
      .then(()=>{ 
        props.handleSnack("Note added!","info");
        getAllNotesFromFireBase();
      });
    } catch (error) {
      props.handleSnack("Couldn't add the note", "error");
      console.log(error.message);
    }
  }


  function deleteNoteFromFireBase(docId){
    const noteDoc = doc(db,"Notes",docId);
    deleteDoc(noteDoc)
    .then(()=> props.handleSnack("Note Deleted!","info"))
    .catch(err =>{
      console.log(err.message);
      props.handleSnack("Couldn't delete the note", "error");
    })
  }

  function getAllNotesFromFireBase(){
    getDocs(noteCollectionRef)
    .then((snapshot)=>{
      let nList = [];
      snapshot.docs.forEach((doc)=>{
        if (doc.data().userId === user) {
          nList.push({ ...doc.data(), docId: doc.id });
        }
      })
      setNoteListData(nList);
    }).
    catch(err=>{
      console.log(err.message);
    })

  }

  


  function dismissTimeInterval() {
    clearInterval(intervalId);
    console.log("Cleared Time Interval");
  }
  if (noteListData.length == 0) {
    var intervalId = setInterval(getAllNotesFromFireBase, 100);
  }
  if (noteListData.length != 0) {
    setTimeout(dismissTimeInterval, 10000);
  }



  return (
    <>
      {(user == null && noteListData.length==0)?(
        <div
          style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}>
          <h2>Please Login First</h2>
        </div>
      ):(
        <>
        <div className="note-container">
          {/* <!-- Note adder */}
          <div className="note-taker">
            <span className="write-notes-here">Write notes here</span>
            <div className="note-heading">
              <p>Heading</p>
              <input
                className="Input"
                type="text"
                placeholder="Heading here..."
              />
            </div>
            <div className="note-description">
              <p>Description</p>
              <textarea
                className="Input"
                placeholder="What's on your mind?"
              ></textarea>
            </div>
            <button className="note-adder-btn Button" onClick={addNoteBtnClicked}>
              Add Note
            </button>
          </div>

          {/* Note List -- */}
          <div className="note-list-container">
            <div className="note-list">
              {noteListData.map((el, key) => (
                <div className="note-item">
                  <div>
                    <p className="note-item-heading">{el.heading}</p>
                    <img
                      className="note-delete-btn"
                      src={redDelete}
                      alt="delete"
                      onClick={(e) => {
                        // let item = e.target;
                        // item.parentElement.parentElement.remove();

                        let nlist = noteListData;
                        console.log(el.index);
                        deleteNoteFromFireBase(el.docId);
                      }}
                    />
                  </div>
                  <p className="note-item-description">{el.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
    </>
    )
  }
  </>
  );
}
