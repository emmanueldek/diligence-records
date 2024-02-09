import { useState, SetStateAction } from "react";
import { useFormik } from "formik";
import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
import NewSpaceImg from "@/assets/images/new_workspace.svg";
import {
  PrimaryBtn,
  Card,
  InputText,
  LinkCheckBox,
  TextArea,
  SelectInput,
  LoadingBtn,
} from "@/components";
import {
  TNewWorkspace,
  newWorkspaceValidationSchema,
} from "@/utils/validationSchemas";
import organizationSizeData from "@/assets/data/org_size.json";
import industryData from "@/assets/data/industries.json";
import countryData from "@/assets/data/countries.json";
import stateData from "@/assets/data/states.json";
import { transformToLableValue } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { createWorkspace } from "@/services/workspace";
import Toast from "@/config/Toast";
import { useNavigate } from "react-router-dom";

const NewSpace = ({
  setShowForm,
}: {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Card className="w-full bg-white rounded-md p-6">
      <div className="flex justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="flex flex-col text-center justify-center items-center my-6">
        <figure className="mb-2">
          <img src={NewSpaceImg} alt="new_workspace" />
        </figure>
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px] mb-2">
          Create Workspace
        </h1>
        <p className="mt-1 font-light text-grey-300">
          We can see that you do not belong to any organisation. Create a
          workspace to continue.
        </p>
      </div>
      <div className="w-full mt-8">
        <PrimaryBtn
          text="Create New workspace"
          type="submit"
          className="w-full h-10"
          onClick={() => setShowForm(true)}
        />
      </div>
    </Card>
  );
};

const SpaceForm = () => {
  const initialValues: TNewWorkspace = {
    workspaceName: "",
    position: "",
    // workspaceLogo: "",
    workspaceDesc: "",
    organizationSize: "",
    industry: "",
    officeAddress: "",
    country: "",
    state: "",
    website: "",
  };

  const navigate = useNavigate();

  const onSubmit = (data: TNewWorkspace) => {
    console.log({ ...data, workspaceLogo: "imagelink" });
    mutate({ ...data, workspaceLogo: "imagelink" });
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: newWorkspaceValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const transformedCountryData = transformToLableValue(countryData, "name");

  const getStatesForCountry = (countryName: string) => {
    const data = stateData.find((country) => country.name === countryName)
      ?.states || [{}];
    return transformToLableValue(data, "name");
  };

  const getError = (key: keyof TNewWorkspace) => {
    return touched[key] && errors[key];
  };
  const { mutate, isLoading } = useMutation(createWorkspace, {
    onError: (error: { message: string; statusCode: number }) => {
      console.log("error creating request", error);
      Toast.error(`${error.message}`);
    },
    onSuccess: (data) => {
      console.log("suceess creating request", data);

      Toast.success(data?.message);
      navigate("/");
    },
  });
  return (
    <Card className="bg-white">
      <div className="flex justify-center items-center mb-4">
        <RecordsLetterLogo />
      </div>
      <div className="flex flex-col text-center justify-center items-center my-6">
        <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px] mb-2">
          Create Workspace
        </h1>
        <p className="mt-1 font-light text-grey-300">
          Enter your workspace details below
        </p>
      </div>
      <div className="w-full mt-8 h-[510px] scrollbar-hide overflow-y-scroll">
        <form action="" onSubmit={handleSubmit} className="space-y-1">
          <div className="mb-8">
            <InputText
              label="Workspace Name"
              placeholder="Workspace Name"
              error={getError("workspaceName")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name="workspaceName"
              value={values.workspaceName}
            />

            <TextArea
              label="Workspace Description"
              placeholder="Workspace Description"
              error={getError("workspaceDesc")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name="workspaceDesc"
              value={values.workspaceDesc}
            />

            <div className="mb-4">
              <SelectInput
                id={"organisationsize"}
                label={"Organisation Size"}
                error={getError("organizationSize")}
                onChange={handleChange}
                isRequired={true}
                name={"organizationSize"}
                options={organizationSizeData}
                value={values.organizationSize}
              />
            </div>

            <InputText
              label="Position"
              placeholder="C.E.O"
              error={getError("position")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name="position"
              value={values.position}
            />

            <div className="mb-4">
              <SelectInput
                id={"inndustry"}
                label={"Industry"}
                error={getError("industry")}
                onChange={handleChange}
                isRequired={true}
                name={"industry"}
                options={industryData}
                value={values.industry}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="w-full mb-4 md:mb-0 md:w-[48%]">
                <SelectInput
                  id={"country"}
                  label={"Country"}
                  error={getError("country")}
                  onChange={handleChange}
                  isRequired={true}
                  name={"country"}
                  options={transformedCountryData}
                  value={values.country}
                />
              </div>

              <div className="w-full md:w-[48%]">
                <SelectInput
                  id={"state"}
                  label={"State"}
                  error={getError("state")}
                  onChange={handleChange}
                  isRequired={true}
                  name={"state"}
                  options={getStatesForCountry(values.country)}
                  value={values.state}
                />
              </div>
            </div>

            <InputText
              label={"Office Address"}
              placeholder={"Enter office Address"}
              error={getError("officeAddress")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              name={"officeAddress"}
              value={values.officeAddress}
            />
            <InputText
              label={"Website"}
              placeholder="Enter organisation website"
              error={getError("website")}
              type="text"
              onChange={handleChange}
              name={"website"}
              value={values.website}
            />

            <LinkCheckBox
              className="items-center"
              id="terms"
              name="terms"
              text="By creating this space, you agree with the"
              link="/"
              linkText="Terms and Privacy Policy"
            />
          </div>
          <LoadingBtn
            isLoading={isLoading}
            text="Create Account"
            type="submit"
            className="w-full h-10"
          />
        </form>
      </div>
    </Card>
  );
};

const CreateWorkspace = () => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? <SpaceForm /> : <NewSpace setShowForm={setShowForm} />;
};

export default CreateWorkspace;
