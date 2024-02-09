import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/store";
import { useFormik } from "formik";
import { InputText, LoadingBtn } from "@/components";
// import { SetStateAction } from "react";
import {
  TUpdateProfile,
  updateProfileValidationSchema,
} from "@/utils/validationSchemas";
import { updateProfile } from "@/services/auth";
import { useUploadImage } from "@/services/workspace";
import Toast from "@/config/Toast";
import { queryClient } from "@/config";

// interface IProfileProps {
//   setOpenModal: React.Dispatch<SetStateAction<boolean>>;
// }

function Profile() {
  const { user } = useUser();

  const initialValues: TUpdateProfile = {
    avatar: user?.avatar || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    position: user?.position || "",
  };

  const { mutate: updateProfileMutationFn, isLoading } = useMutation({
    mutationFn: updateProfile,
    onError: () => {
      Toast.error("Error saving your profile");
    },
    onSuccess: () => {
      Toast.success("Profile successfully saved");
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const onSubmit = (profileData: TUpdateProfile) => {
    updateProfileMutationFn(profileData);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: updateProfileValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const { mutate: uploadFileMutFn, isLoading: isFileLoading } = useMutation(
    useUploadImage,
    {
      onError: () => {
        Toast.error("upload error");
      },
      onSuccess: (data) => {
        const userData = {
          ...values,
          avatar: data.data.url,
        };
        Toast.success("upload success");
        console.log(userData);
        updateProfileMutationFn(userData);
      },
    },
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      errors.avatar = "Please select only one image";
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      uploadFileMutFn({ imageFile, flags: "avatars" });
    }
  };

  const getError = (key: keyof TUpdateProfile) => {
    return touched[key] && errors[key];
  };

  return (
    <div className="px-6">
      <h2 className="mb-4 md:mb-0 font-bold text-xl">Profile</h2>

      <div className="my-4 flex items-start">
        <figure className="w-[64px] h-[64px] overflow-hidden rounded-md mb-2">
          <img
            className="w-full h-full object-cover"
            src={user?.avatar}
            alt=""
          />
        </figure>

        <div className="ml-3">
          <p className="text-sm leading-[20px] mb-2">Change profile picture</p>
          {getError("avatar") && <small>{getError("avatar")}</small>}

          <label
            htmlFor="upload_logo"
            className="cursor-pointer flex rounded-md border w-fit border-grey-300 p-1"
          >
            <p className="text-xs text-grey-400">
              {isFileLoading ? "Uploading..." : "Upload photo"}
            </p>
            <input
              className="hidden"
              id="upload_logo"
              name="file"
              type="file"
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit} className="space-y-1">
        <InputText
          id={"first_name"}
          isRequired={true}
          name={"firstName"}
          placeholder={user?.firstName || ""}
          label={"First Name"}
          value={values.firstName}
          type={"text"}
          onChange={handleChange}
          error={getError("firstName")}
        />

        <InputText
          id={"last_name"}
          isRequired={true}
          name={"lastName"}
          placeholder={user?.lastName || ""}
          label={"Last Name"}
          value={values.lastName}
          type={"text"}
          onChange={handleChange}
          error={getError("lastName")}
        />

        <InputText
          id={"work_email"}
          isRequired={true}
          name={"email"}
          placeholder={user?.email || ""}
          label={"Work Email"}
          value={values.email}
          type={"text"}
          onChange={handleChange}
          error={getError("email")}
          className="mb-4"
        />
        <InputText
          id={"postion"}
          isRequired={true}
          name={"position"}
          placeholder={user?.position || "e.g. CEO, COO etc."}
          label={"Position"}
          value={values.position}
          type={"text"}
          onChange={handleChange}
          error={getError("position")}
          className="mb-4"
        />

        {/* <p
          onClick={() => setOpenModal(true)}
          className="text-blue-400 cursor-pointer hover:underline transition-all my-4"
        >
          Change password
        </p> */}

        <LoadingBtn
          isLoading={isLoading}
          type="submit"
          className="w-full h-10"
          text="Save"
        />
      </form>
    </div>
  );
}

export default Profile;
