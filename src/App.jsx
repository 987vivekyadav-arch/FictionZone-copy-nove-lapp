import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Home";
import Novel from "./Novel";
import Chapter from "./Chapter";
function App(){
  const[novel,setNovel]=React.useState("")
  const[data,setData]=React.useState([])
  const[chapters,setChapters]=React.useState([])
  return(
  <div>
<BrowserRouter>
<Routes>


<Route path="/"
element={<Home
novel={novel}
setNovel={setNovel}
data={data}
setData={setData}
/>}
/>
<Route path="/novel/:id"
element={<Novel
novel={novel}
setNovel={setNovel}
data={data}
setData={setData}
chapters={chapters}
setChapters={setChapters}
/>}
/>
<Route path="/chapters/:id"
element={<Chapter
novel={novel}
setNovel={setNovel}
data={data}
setData={setData}
chapters={chapters}
setChapters={setChapters}
/>}
/>



</Routes>
</BrowserRouter>

  </div>
)}export default App;