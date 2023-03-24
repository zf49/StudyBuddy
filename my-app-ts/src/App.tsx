import React from 'react';
import {HashRouter} from 'react-router-dom'
import IndexRouter from './Router/IndexRouter'
function App() {
  return (
    <div>
       <HashRouter>

        <IndexRouter/>

       </HashRouter>
    </div>
  );
}

export default App;
