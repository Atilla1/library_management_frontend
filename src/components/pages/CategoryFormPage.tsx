import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  deleteCategory,
  getCategories,
  getCategory,
  saveCategory,
} from "../../services/fakeCategoryService";
import { Category } from "../../types";
import { useEffect, useState } from "react";

const schema = z.object({
  _id: z.string().optional(),
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
    if (!id || id === "new") return;

    const category = getCategory(id);

    if (!category) return navigate("/not-found");

    setName(category.name);
    reset(mapToFormData(category));
  }, []);

  function mapToFormData(category: Category): FormData {
    return {
      _id: category._id,
      name: category.name,
    };
  }

  function onSubmit(data: FormData) {
    console.log("data", data);
    console.log("Catagories", getCategories());
    const categoryData: Category = {
      _id: data._id ?? Date.now().toString(),
      name: data.name,
    };
    saveCategory(categoryData);
    navigate("/articles");
  }

  function handleDelete(id: string) {
    deleteCategory(id);
    navigate("/articles");
    console.log("Catagories", getCategories());
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

        <button
          onClick={() => {
            if (id) {
              handleDelete(id);
            } else {
              // Hantera fallet när id är undefined
              console.error("ID is undefined");
            }
          }}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default CategoryFormPage;
