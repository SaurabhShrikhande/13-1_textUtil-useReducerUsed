import './App.css';
import { useState, useEffect, useReducer } from 'react';

function App() {
    const [text , settext] = useState("");
    function changetextt(initstate, action){
        switch(action.type){
          case "change" : 
          return {...initstate , value: action.paylode };
          default :
          return { ...initstate };
        }
    }
    const [textt , dispatch] = useReducer(changetextt, '');
   const [char , setchar] = useState(0);
   const [word , setword] = useState(0);
   const [readingtime , setrt] = useState(0);
   const [dark , setdark] = useState(false); 
 const [dtheme, setdtheme] = useState({
      backgroundColor : "black",
      color : "white",
      display:"flex", 
      justifyContent:"space-between", 
      padding:"4px 40px",
 });
 const [dthemee , setdthemee] = useState("Appp");

   function darklight (par){
    if(par === "dark"){
       setdark(true);
    }
    else if (par === "light"){
       setdark(false);
    }
   }

   useEffect(()=>{
             if(dark === true){
              // document.body.style.backgroundColor = '#';
               //  document.body.style.color = '#333';
               setdtheme({
                  backgroundColor : "black",
                  color : "white",
                  display:"flex", 
                  justifyContent:"space-between", 
                  padding:"4px 40px"
               }
               )

               setdthemee("Appp");
               
             }
             else if(dark === false){
              // document.body.removeAttribute('data-theme');
            //   document.body.style.color = 'pink';
              setdtheme({ display:"flex", 
              justifyContent:"space-between", backgroundColor:"white", padding:"4px 40px"

              })
              setdthemee("App");

             }
   }, [dark])

    function funall (e){
        settext(e.target.value);
    }
  
    function btn (parameter){
     if (parameter === "upper" ){
        settext(text.toUpperCase());
     }
     else if(parameter === "lower"){
      settext(text.toLowerCase());
     }
     else if(parameter === "clear"){
        settext("");
     }
     else if(parameter === "copy"){
         navigator.clipboard.writeText(text)
         .then(() => alert("text copied"))
         .catch (() => alert("text copied failed"));
         ;
     }
     else if(parameter === "trim"){
      let sentence = text.trim();
      const wor = sentence.split(/\s+/);
      const join = wor.join(" ");
        
          settext(join);
     }

    }

    useEffect(()=> {
      let sentence = text.trim();
     const wor = sentence.split(/\s+/);
        console.log(sentence);
        console.log(wor);
       if(text !== "") setword(wor.length);
       if(text === "") setword(0);
        setchar(text.length);
        if(text !== "") setrt(wor.length * 0.008);
        if(text === "") setrt(0);
 
    }, [text])


  return (
    <div className= {dthemee} >
      
      <nav  style={dtheme} >
        <div style={{display:"flex", gap:"20px", alignItems:"center"}}>
         <h2 style={{color :"skyBlue"}}>TextUtils</h2>
         <h3>Home</h3>
         <h3>About Us</h3>
         <h3>Contact</h3>
         </div>

         {
          dark === false &&  <h3 onClick={() => darklight("dark")}> click here for Dark Mode</h3>
         }
         {
          dark &&  <h3 onClick={() => darklight("light")}> click here for light Mode</h3>
         }
            
      </nav>


      <div >
        <h1>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>
         <h2>Enter Your Text Here:</h2>
         <textarea rows="12" cols="70" value={textt.value} className='textarea'
         onChange={(e) => {dispatch({type:"change" , paylode: e.target.value})}}></textarea> <br></br>
         <button className='btn bgblue' onClick={() => btn("upper")}>Convert Uppercase</button>
         <button className='btn bgblue' onClick={() => btn("lower")}>Convert Lowercase</button>
         <button className='btn bgred'  onClick={() => btn("clear")}>Clear Text</button>
         <button className='btn bggreen' onClick={() => btn("copy")}>Copy To Clipboart</button>
         <button className='btn bgblue'  onClick={() => btn("trim")}>Remove Extra Spaces</button>

         <h1>Summery Of Your Text</h1>
         <h3>Number of words : {word}</h3>
         <h3>Number of charecters : {char}</h3>
         <h3>Reading Time : {readingtime}</h3>

         <h2>Preview Document</h2>
         <textarea rows="6" cols="70" className='textarea' value={text}></textarea>
      </div>

    </div>
  );
}

export default App;
