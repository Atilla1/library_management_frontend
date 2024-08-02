import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  deleteCategory,
  getCategories,
  getCategory,
  saveCategory,
} from "../services/fakeCategoryService";
import { Category } from "../types";
import { useEffect, useState } from "react";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required." }),
});

type FormData = z.infer<typeof schema>;

function CategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
    async function fetch() {
      if (!id || id === "new") return;

      const { data: category } = await getCategory(id);

      if (!category) return navigate("/not-found");

      setName(category.name);
      reset(mapToFormData(category));
    }

    fetch();
  }, []);

  function mapToFormData(category: Category): FormData {
    return {
      id: category.id,
      name: category.name,
    };
  }

  async function onSubmit(data: FormData) {
    await saveCategory(data);
    navigate("/articles");
  }

  async function handleDelete(id: string) {
    await deleteCategory(id);
    navigate("/articles");
  }

  return (
    <div className="p-5">
      <h1> {name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Name</label>
          <input {...register("name")} className="form-control" />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <button className="btn btn-primary" disabled={!isValid}>
          Save
        </button>

        {id && id !== "new" && (
          <button
            type="button"
            onClick={() => handleDelete(id)}
            className="btn btn-danger m-2"
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default CategoryFormPage;
