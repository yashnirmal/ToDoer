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

export default function Notes() {

  const [noteListData,setNoteListData] = useState([]);
  const noteCollectionRef = collection(db,"Notes");

  const [currentUserId, setCurrentUserId] = useState(null);

  function authChange(){
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setCurrentUserId(u.uid);
        console.log('u=',u)
        console.log("here=",currentUserId);
        setMasonryLayout();
      } else setCurrentUserId(null);
      console.log("onauthchange");
    });
  }

  useEffect(() => {
    authChange();
    console.log(currentUserId);
  }, []);

  function addNoteBtnClicked(e) {
    let headingValue = document.querySelector(".note-heading").children[1].value;
    let descriptionValue = document.querySelector(".note-description").children[1].value;

    let item = {
      userId: currentUserId,
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

  function setMasonryLayout() {
    const noteList = document.querySelector(".note-list");
    let masonry = new Masonry(noteList, {
      itemSelector: ".note-item", 
      gutter: 25,
    });
  }

  useEffect(()=>{
    getAllNotesFromFireBase();
  },[]);

  // useEffect(()=>{
  //   getAllNotesFromFireBase();
  //   setMasonryLayout();
  // },[noteListData);



  function addNoteToFireBase(item){
    try {
      addDoc(noteCollectionRef, item)
      .then(()=>{ 
        getAllNotesFromFireBase();
        setMasonryLayout();
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  function deleteNoteFromFireBase(docId){
    const noteDoc = doc(db,"Notes",docId);
    deleteDoc(noteDoc)
    .catch(err =>{
      console.log(err.message);
    })
  }

  function getAllNotesFromFireBase(){
    getDocs(noteCollectionRef)
    .then((snapshot)=>{
      let nList = [];
      snapshot.docs.forEach((doc)=>{
        if (doc.data().userId === currentUserId) {
          nList.push({ ...doc.data(), docId: doc.id });
        }
      })
      setNoteListData(nList);
    }).
    catch(err=>{
      console.log(err.message);
    })

  }

  setInterval(getAllNotesFromFireBase,100);



  if (currentUserId == null && noteListData.length==0)
    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>Please Login First</h2>
      </div>
    );


  
  return (
    <>
      <div className="container">
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
        <div className="note-list">
          {
          noteListData.map((el, key) => (
            <div className="note-item">
              <div>
                <p className="note-item-heading">{el.heading}</p>
                <img
                  className="note-delete-btn"
                  src={redDelete}
                  alt="delete"
                  onClick={(e)=>{
                    let item = e.target;
                    item.parentElement.parentElement.remove();
                    setMasonryLayout();
                    
                    let nlist = noteListData;
                    // nlist.splice(el.index,1);
                    // setNoteListData(nlist);
                    // console.log(noteListData);
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

      <BottomNav />
    </>
  );
}