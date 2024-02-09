import { InputText, PrimaryBtn, SelectInput, TextArea } from "@/components";
import FileUpload from "@/components/input/FileUpload";
import Toast from "@/config/Toast";
import {
  formattedTabs,
  generateYears,
  monthsArray,
} from "@/constant/requestConstant";
import { addRecordForOrg } from "@/services/request";
import { RouteParams } from "@/types/organizationTypes";
import { TRequestRecord, TRequestRecordPayload } from "@/types/requestTypes";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";

interface NewRouteParams extends RouteParams {
  orgName: string;
}

const validationSchema = yup.object({
  recordInput: yup.string().required("field is required"),
  recordSection: yup.string().required("This selection is required"),
  startMonth: yup.string().required("this selection is required"),
  startYear: yup.string().required("this selection is required"),
  endMonth: yup.string().required("this selection is required"),
  endYear: yup.string().required("this selection is required"),
});

const RequestRecord = () => {
  const { id, orgName } = useParams() as unknown as NewRouteParams;
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<TRequestRecordPayload>({
    profileType: "",
    recordSection: "",
    recordInput: "",
    recordDoc: "",
    recordDocDescription: "",
    organizationName: orgName,
    recordPeriod: {
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
    link: image,
  });

  const { mutate: addOrg } = useMutation(addRecordForOrg, {
    onSuccess: () => {
      Toast.success("Record Requested Successfully!");
      navigate(`/home/organisation/${id}`);
    },
    onError: (error: string) => {
      Toast.error(error);
    },
  });

  const initialValues: TRequestRecord = {
    profileType: "addRecordToOrganization",
    recordSection: submittedData?.recordSection || "",
    recordInput: submittedData?.recordInput || "",
    recordDoc: submittedData?.recordDoc || "",
    recordDocDescription: submittedData?.recordDocDescription || "",
    organizationName: orgName,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    link: "",
  };

  const onSubmit = (data: TRequestRecord) => {
    const userData: TRequestRecordPayload = {
      profileType: data.profileType,
      recordSection: data.recordSection,
      recordInput: data.recordInput,
      recordDoc: data.recordDoc,
      recordDocDescription: data.recordDocDescription,
      organizationName: orgName,
      recordPeriod: {
        startMonth: data.startMonth,
        startYear: data.startYear,
        endMonth: data.endMonth,
        endYear: data.endYear,
      },
      link: image,
    };

    if (submitted) {
      Toast.error("cannot submit multiple request");
    } else {
      addOrg({
        id: id,
        flag: "executiveId",
        payload: userData,
      });
      setSubmittedData(userData);
      setSubmitted(true);
    }
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema,
  });

  const getError = (key: keyof TRequestRecord) => {
    return touched[key] && errors[key];
  };

  return (
    <div className="bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] mx-auto py-[5em] space-y-4"
      >
        <p className="text-2xl font-semibold">Make Records Request</p>
        <p className="text-sm font-light">
          Use this form to make a request for missing records on this profile.
        </p>

        <SelectInput
          id={""}
          name="recordSection"
          value={values.recordSection}
          label={"Record Section *"}
          options={formattedTabs}
          error={getError("recordSection")}
          onChange={handleChange}
        />

        <TextArea
          name="recordInput"
          placeholder={"Enter suggestion"}
          label={"Describe the record you are looking for *"}
          onChange={handleChange}
          value={values.recordInput}
          error={getError("recordInput")}
        />

        <div className="space-y-4">
          <div className="flex gap-8 w-[100%]">
            <SelectInput
              id={""}
              name="startMonth"
              label={"Start Month *"}
              value={values.startMonth}
              options={monthsArray}
              onChange={handleChange}
              className="w-[100%]"
              error={getError("startMonth")}
            />

            <SelectInput
              id={""}
              name="startYear"
              label={"Start Year *"}
              value={values.startYear}
              options={generateYears()}
              onChange={handleChange}
              className="w-[100%]"
              error={getError("startYear")}
            />
          </div>

          <div className="flex gap-8 w-[100%]">
            <SelectInput
              id={""}
              name="endMonth"
              label={"End Month *"}
              value={values.endMonth}
              options={monthsArray}
              onChange={handleChange}
              className="w-[100%]"
              error={getError("endMonth")}
            />

            <SelectInput
              id={""}
              name="endYear"
              label={"End Year *"}
              options={generateYears()}
              value={values.endYear}
              onChange={handleChange}
              className="w-[100%]"
              error={getError("endYear")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm ">Upload supporting document</p>
          <FileUpload
            setImage={setImage}
            image={image}
            flag="organizationDocuments"
          />
        </div>

        <InputText
          name={"recordDocDescription"}
          placeholder={"Document description"}
          label={"Document description"}
          value={values.recordDocDescription}
          onChange={handleChange}
        />

        <InputText
          name="link"
          value={values.link}
          placeholder={"Supporting Link"}
          label={"Supporting Link"}
          onChange={handleChange}
        />

        <PrimaryBtn text={"Send Request"} className="w-[100%] h-[40px]" />
      </form>
    </div>
  );
};

export default RequestRecord;
