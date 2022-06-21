import { useState } from 'react';

import './styles.scss';

import Article from '../../ui/Article';
import Button from '../../ui/Button';
import { useArticles } from '../../asyncData';

const Articles = () => {
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
  const [fileName, setFileName] = useState('');
  const handleArticlesChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setToAddArticles(JSON.parse(e.target.result));
    };
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <h2>Articles</h2>
      <div className="add-articles-wrapper">
        <div className="upload-file-wrapper">
          <div className="upload-file-container">
            <label className="upload-file-label">
              <input
                disabled={isLoadingAddArticles}
                type="file"
                onChange={handleArticlesChange}
              />
              Upload file
            </label>
          </div>
          {fileName ? <span className="file-name">{fileName}</span> : null}
        </div>
        {fileName ? (
          <Button
            title={'Add articles'}
            onClick={() => addArticles(toAddArticles)}
            disabled={isLoadingAddArticles}
          />
        ) : null}
      </div>
      <div className="add-articles-info">
        {isLoadingAddArticles ? <p>Adding articles</p> : null}
        {isErrorAddArticles ? <p>Articles could not be created</p> : null}
        {isSuccessAddArticles ? <p>Articles created successfully</p> : null}
      </div>
      <div className="articles-list">
        {!isLoadingArticles && articlesData
          ? articlesData.data.articles.map(article => (
              <div key={article._id} className="article">
                <Article name={article.name} stock={article.stock} />
              </div>
            ))
          : null}
        {isErrorArticles ? (
          <p>An error ocurred while fetching articles</p>
        ) : isLoadingArticles ? (
          <p>Loading Articles</p>
        ) : null}
      </div>
    </>
  );
};

export default Articles;
