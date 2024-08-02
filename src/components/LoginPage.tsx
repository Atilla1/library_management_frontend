import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
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

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(e: FieldValues) {
    e.preventDefault();
    console.log("Submitted");
  }

  return (
    <div className="background">
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <div
          className="p-5 shadow rounded-5 "
          style={{ background: "white", opacity: "93%" }}
        >
          <h1 className="mb-4 text-center">Login Page</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <button className="btn btn-primary">Login</button>
              <a className="mt-4" href="url">
                Forgot username or password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
