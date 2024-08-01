import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories } from "../../services/fakeCategoryService";
import { getArticle, saveArticle } from "../../services/fakeArticleService";
import { useEffect, useState } from "react";
import { Article } from "../../types";

const schema = z.object({
  _id: z.string().optional(),
  categoryId: z.string().min(1, { message: "You must select a category" }),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  type: z.string().min(1, { message: "You must select a type" }),
  nbrPages: z
    .number({
      invalid_type_error: "Number of pages must be a number, at least 0",
    })
    .min(0, { message: "Number of pages must be at least 0" })
    .max(10000, { message: "Number of pages cannot be higher than 1000" }),
  runTimeMinutes: z
    .number({ invalid_type_error: "Minutes must be a number, at least 0" })
    .min(0, { message: "Minutes must be at least 0" })
    .max(10000, { message: "Minutes cannot be higher than 1000" }),
  isBorrowable: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

function ArticleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!id || id === "new") return;

    const article = getArticle(id);

    if (!article) return navigate("/not-found");

    setTitle(article.title);
    reset(mapToFormData(article));
  }, []);

  function mapToFormData(article: Article): FormData {
    return {
      _id: article._id,
      title: article.title,
      author: article.author,
      categoryId: article.category._id,
      nbrPages: article.nbrPages,
      runTimeMinutes: article.runTimeMinutes,
      type: article.type,
      isBorrowable: article.isBorrowable,
    };
  }

  function onSubmit(data: FormData) {
    saveArticle(data);
    navigate("/articles");
  }

  return (
    <div className="p-5">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Category</label>
          <select {...register("categoryId")} className="form-select">
            <option />

            {getCategories().map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}{" "}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-danger">{errors.categoryId.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Title</label>
          <input {...register("title")} className="form-control" />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Author</label>
          <input {...register("author")} className="form-control" />
          {errors.author && (
            <p className="text-danger">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Type</label>
          <select {...register("type")} className="form-select">
            <option />
            <option>Book</option>
            <option>DVD</option>
            <option>Audiobook</option>
            <option>Reference book</option>
          </select>
          {errors.type && <p className="text-danger">{errors.type.message}</p>}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Number of pages</label>
          <input
            {...register("nbrPages", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.nbrPages && (
            <p className="text-danger">{errors.nbrPages.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Number of minutes</label>
          <input
            {...register("runTimeMinutes", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.runTimeMinutes && (
            <p className="text-danger">{errors.runTimeMinutes.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Borrowable</label>
          <input
            type="checkbox"
            {...register("isBorrowable")}
            className="form-check-input m-1 border-black"
          />
        </div>
        <button className="btn btn-primary" disabled={!isValid}>
          Save
        </button>
        <button
          onClick={() => navigate("/articles")}
          className="btn btn-danger m-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ArticleFormPage;
