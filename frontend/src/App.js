import { useState } from 'react';

import { useArticles } from './asyncData/';

function App() {
  const { addArticles, isLoadingAddArticles } = useArticles();

  const [toAddArticles, setToAddArticles] = useState({})

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setToAddArticles(JSON.parse(e.target.result));
    };
  };

  return (
    <div className="App">
      <input disabled={isLoadingAddArticles} type="file" onChange={handleChange} />
      <button disabled={isLoadingAddArticles} onClick={() => addArticles(toAddArticles)}>Add Articles</button>
      {isLoadingAddArticles ? <p>Adding articles</p> : null}
    </div>
  );
}

export default App;
