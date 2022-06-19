import { useState } from 'react';

import { useArticles } from './asyncData/';

function App() {
  const {
    articlesData,
    isLoadingArticles,
    isErrorArticles,
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles,
    isSuccessAddArticles,
  } = useArticles();

  const [toAddArticles, setToAddArticles] = useState({});
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setToAddArticles(JSON.parse(e.target.result));
    };
  };

  return (
    <div>
      <div>
        <input
          disabled={isLoadingAddArticles}
          type="file"
          onChange={handleChange}
        />
        <button
          disabled={isLoadingAddArticles}
          onClick={() => addArticles(toAddArticles)}
        >
          Add Articles
        </button>
        {isLoadingAddArticles ? <p>Adding articles</p> : null}
        {isErrorAddArticles ? <p>Articles could not be created</p> : null}
        {isSuccessAddArticles ? <p>Articles created successfully</p> : null}
      </div>
      <div>
        {!isLoadingArticles && articlesData ? (
          articlesData.data.articles.map(article => (
            <p key={article._id}>{article.name}</p>
          ))
        ) : (
          <p>Loading Articles</p>
        )}
        {isErrorArticles ? <p>An error ocurred while fetching articles</p> : null}
      </div>
    </div>
  );
}

export default App;
