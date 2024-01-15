import './App.css';
import { useState, useEffect, useReducer } from 'react';

function App() {
    function changetextt(initstate, action){
        switch(action.type){
          case "change" : 
           return { ...initstate , value: action.paylode};
            // if(initstate.value === "") return { ...initstate , value: action.paylode , words : 0 };
          case 'upper' :
               return  { ...initstate , value : initstate.value.toUpperCase()};
           case 'lower' :
              return { ...initstate , value : initstate.value.toLowerCase()};
           case 'clear' :
               return { ...initstate , value : '' };
           case 'copy' :
            navigator.clipboard.writeText(initstate.value)
            .then(() => alert("text copied"))
            .catch (() => alert("text copied failed"));
             return {...initstate};
          case 'trim' :
           const sent = initstate.value.trim();
           const wo = sent.split(/\s+/);
            const join = wo.join(" ");
            return  { ...initstate , value: join};
          default :
          return { ...initstate };
        }
    }
    const [textt , dispatch] = useReducer(changetextt, { value : ''});

   const [word , setword] = useState(0);
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


    useEffect(()=> {
      let sentence = textt.value.trim();
     const wor = sentence.split(/\s+/);
        console.log(sentence);
        console.log(wor);
       if(textt.value !== "") setword(wor.length);
       if(textt.value === "") setword(0);
    }, [textt.value])


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
         <button className='btn bgblue' onClick={() =>  dispatch({type:"upper"}) /* btn("upper") */ }>Convert Uppercase</button>
         <button className='btn bgblue' onClick={() => dispatch({type:"lower"}) /* btn("lower")  */ }>Convert Lowercase</button>
         <button className='btn bgred'  onClick={() =>  dispatch({type:"clear"}) /* btn("clear") */}>Clear Text</button>
         <button className='btn bggreen' onClick={() =>  dispatch({type:"copy"}) /* btn("copy")  */ }>Copy To Clipboart</button>
         <button className='btn bgblue'  onClick={() => dispatch({type:"trim"}) /* btn("trim") */}>Remove Extra Spaces</button>

         <h1>Summery Of Your Text</h1>
         <h3>Number of words : {word}</h3>
         <h3>Number of charecters : {textt.value.length}</h3>
         <h3>Reading Time : {word * 0.008}</h3>

         <h2>Preview Document</h2>
         <textarea rows="6" cols="70" className='textarea' value={textt.value}></textarea>
      </div>

    </div>
  );
}

export default App;
