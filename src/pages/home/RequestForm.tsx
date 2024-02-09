import {
  InputRadio,
  InputText,
  PrimaryBtn,
  TextArea,
  Wrapper,
} from "@/components";
import FileUpload from "@/components/input/FileUpload";
import Toast from "@/config/Toast";
import { requestExecOrg } from "@/services/request";
import { TNewRequest, newRequestSchema } from "@/utils/validationSchemas";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues: TNewRequest = {
  organizationName: "",
  executiveName: "",
  profileDesc: "",
  position: "",
  profileDoc: "",
  imageDesc: "",
  link: "",
};
function RequestForm() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [profileType, setProfileType] = useState<"organization" | "executive">(
    "organization",
  );
  const onSubmit = (data: TNewRequest) => {
    console.log("request data", data);
    const executivePayload = {
      profileType: profileType,
      organizationName: data?.organizationName,
      executiveName: data?.executiveName,
      executiveDesc: data?.profileDesc,
      position: data?.position,
      executiveDoc: image,
      imageDesc: data?.imageDesc,
      link: data?.link,
    };
    const organizationPayload = {
      profileType: profileType,
      organizationName: data?.organizationName,
      organizationDesc: data?.profileDesc,
      organizationDoc: image,
      imageDesc: data?.imageDesc,
      link: data?.link,
    };
    profileType === "executive"
      ? mutate(executivePayload)
      : mutate(organizationPayload);
  };
  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: newRequestSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });
  const getError = (key: keyof TNewRequest) => {
    return touched[key] && errors[key];
  };

  const { mutate } = useMutation(requestExecOrg, {
    onError: (error: string) => {
      console.log("error creating request", error);
      Toast.error(error);
    },
    onSuccess: (data) => {
      Toast.success(data?.message);
      navigate("/request");
    },
  });
  return (
    <Wrapper className="bg-white w-full">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-[415px] mx-auto py-5 md:py-8"
      >
        <div className="w-full mb-6">
          <h1 className="text-2xl leading-[28.8px] font-bold mb-2">
            Request Missing Organization or Executive Information
          </h1>
          <p className="leading-[20px] text-grey-400 font-light">
            Complete this form to request any absent organizational or executive
            information.
          </p>
        </div>

        <div className="mb-4">
          <p className="leading-[20px] text-sm text-grey-900 font-medium">
            What kind of profile are you looking for?
          </p>

          <div className="flex justify-start items-center mt-2">
            <InputRadio
              id={"profile_org"}
              label={"Organisation"}
              name={"profileType"}
              checked={profileType === "organization"}
              onChange={() => setProfileType("organization")}
              className="mr-2"
            />
            <InputRadio
              id={"profile_exec"}
              label={"Executive"}
              name={"profile"}
              checked={profileType === "executive"}
              onChange={() => setProfileType("executive")}
            />
          </div>
        </div>

        <div>
          <InputText
            id={"name"}
            isRequired={true}
            name={"organizationName"}
            placeholder={"Profile name"}
            label={"What is the Organisation name?"}
            type={"text"}
            error={getError("organizationName")}
            value={values.organizationName}
            onChange={handleChange}
          />
          {profileType === "executive" && (
            <>
              <InputText
                id={"name"}
                isRequired={true}
                name={"executiveName"}
                placeholder={"Profile name"}
                label={"What is the Executive name?"}
                type={"text"}
                error={getError("executiveName")}
                value={values.executiveName}
                onChange={handleChange}
              />
              <InputText
                id={"name"}
                isRequired={true}
                name={"position"}
                placeholder={"Profile position"}
                label={"What is the Executive position?"}
                error={getError("position")}
                type={"text"}
                value={values.position}
                onChange={handleChange}
              />
            </>
          )}

          <TextArea
            id={"profile_desc"}
            isRequired={true}
            name={"profileDesc"}
            placeholder={"Profile description"}
            label={"Provide crucial insights that could aid assist our search"}
            error={getError("profileDesc")}
            value={values.profileDesc}
            onChange={handleChange}
          />

          <div className="mb-4">
            <p className="leading-[20px] text-sm text-grey-900 font-medium mb-3">
              Upload any relevant documents that could enhance our search
            </p>
            <FileUpload
              setImage={setImage}
              image={image}
              flag="requestDocuments"
            />
          </div>

          <InputText
            id={"image"}
            name={"imageDesc"}
            placeholder={"Document description"}
            label={"Document Description"}
            type={"text"}
            value={values.imageDesc}
            // error={getError("imageDesc")}
            onChange={handleChange}
          />

          <InputText
            id={"link"}
            name={"link"}
            placeholder={"link to a useful webpage for request"}
            label={"Organisation or Executive website link (if any)"}
            type={"text"}
            // error={getError("link")}
            value={values.link}
            onChange={handleChange}
          />
        </div>

        <PrimaryBtn className="w-full" text="Send request" type="submit" />
      </form>
    </Wrapper>
  );
}

export default RequestForm;
