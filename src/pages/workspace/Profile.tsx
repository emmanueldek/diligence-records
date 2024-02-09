import OrganisationLogo from "@/assets/images/organisation_logo.png";
import { InputText, PrimaryBtn, TextArea, SelectInput } from "@/components";

import countryData from "@/assets/data/countries.json";
import industryData from "@/assets/data/industries.json";
import organizationSizeData from "@/assets/data/org_size.json";

import { transformToLableValue } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { updateWorkspace, useUploadImage } from "@/services/workspace";
import Toast from "@/config/Toast";
import { TWorkspace } from "@/types/workspaceTypes";
import { useFormik } from "formik";
import { queryClient } from "@/config";

function Profile({ data }: { data?: TWorkspace }) {
  const { mutate: patchWorkspaceData } = useMutation(updateWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries(["workspace-profile"]);
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  const initialValues: TWorkspace = {
    country: data?.country || "",
    workspaceName: data?.workspaceName || "",
    workspaceDesc: data?.workspaceDesc || "",
    workspaceLogo: data?.workspaceLogo || "",
    organizationSize: data?.organizationSize || "",
    industry: data?.industry || "",
    officeAddress: data?.officeAddress || "",
    website: data?.website || "",
  };

  const onSubmit = (data: TWorkspace) => {
    patchWorkspaceData(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof TWorkspace) => {
    return touched[key] && errors[key];
  };

  const { mutate: postImage } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      const userData = {
        ...values,
        workspaceLogo: uploadRes?.url,
      };
      patchWorkspaceData(userData);
      Toast.success("upload success");
    },

    onError: () => {
      Toast.error("something went wrong");
    },
  });

  const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Please select only one image");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      postImage({ imageFile, flags: "avatars" });
    }
  };

  const transformedCountryData = transformToLableValue(countryData, "name");

  return (
    <form onSubmit={handleSubmit} className="px-6">
      <h2 className="mb-4 md:mb-0 font-bold text-xl">Profile</h2>

      <div className="my-4 flex items-start">
        <figure className="w-[64px] h-[64px] overflow-hidden rounded-md mb-2">
          <img
            className="w-full h-full"
            src={
              values.workspaceLogo === ""
                ? OrganisationLogo
                : values.workspaceLogo
            }
            alt=""
          />
        </figure>

        <div className="ml-3">
          <p className="text-sm leading-[20px] mb-2">Change workspace logo</p>

          <label
            htmlFor="upload_logo"
            className="cursor-pointer flex rounded-md border w-fit border-grey-300 p-1"
          >
            <p className="text-xs text-grey-400">Upload logo</p>
            <input
              className="hidden"
              id="upload_logo"
              type="file"
              onChange={(e) => handleUploads(e)}
            />
          </label>
        </div>
      </div>

      <div>
        <InputText
          id={"workspace_name"}
          isRequired={true}
          name={"workspaceName"}
          placeholder={"Workspace Name"}
          label={"Workspace Name"}
          value={values.workspaceName}
          type={"text"}
          onChange={handleChange}
          error={getError("workspaceName")}
        />

        <TextArea
          id={"org_desc"}
          isRequired={true}
          name={"workspaceDesc"}
          placeholder={""}
          label={"Organisation Description"}
          value={values.workspaceDesc}
          onChange={handleChange}
        />

        <SelectInput
          className="mb-4"
          id={"org_size"}
          label={"Organisation Size"}
          isRequired={true}
          options={organizationSizeData}
          name={"org_size"}
          value={values.organizationSize}
          onChange={handleChange}
        />

        <SelectInput
          className="mb-4"
          id={"industry"}
          label={"Industry"}
          isRequired={true}
          options={industryData}
          name={"industry"}
          value={values.industry}
          onChange={handleChange}
        />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <InputText
            className="w-full md:w-[48%]"
            id={"location"}
            isRequired={true}
            name={"officeAddress"}
            placeholder={"location"}
            label={"Location"}
            value={values.officeAddress}
            type={"text"}
            onChange={handleChange}
          />

          <SelectInput
            className="mb-4 w-full md:w-[48%]"
            id={"country"}
            label={"Country"}
            isRequired={true}
            options={transformedCountryData}
            name={"country"}
            value={values.country}
            onChange={handleChange}
          />
        </div>

        <InputText
          id={"website"}
          isRequired={true}
          name={"website"}
          placeholder={"website url"}
          label={"Website"}
          value={values.website}
          onChange={handleChange}
          type={"text"}
        />

        <PrimaryBtn className="w-full h-10" text="Save" type="submit" />
      </div>
    </form>
  );
}

export default Profile;
