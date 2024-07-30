import { useNavigate, useParams } from "react-router-dom";

function ArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <h1>ArticleFormPage {id}</h1>
      <button onClick={() => navigate("/articles")} className="btn btn-primary">
        Save
      </button>
    </>
  );
}

export default ArticleFormPage;
