import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import user from "../services/userService";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username is too short." }),
  username: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username is too short." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: " " }),
});

type FormData = z.infer<typeof schema>;

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const navigate = useNavigate();

  async function onSubmit(data: FormData) {
    console.log("Submitted", data);
    await user.register(data);

    navigate("/articles");
  }

  return (
    <div className="background">
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <div
          className="p-5 shadow rounded-5 "
          style={{ background: "white", opacity: "93%" }}
        >
          <h1 className="mb-4 text-center">Register Page</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                {...register("name")}
                className="form-control login-input"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                {...register("username")}
                className="form-control login-input"
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                {...register("password")}
                className="form-control login-input"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="d-grid justify-content-center mt-4">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
