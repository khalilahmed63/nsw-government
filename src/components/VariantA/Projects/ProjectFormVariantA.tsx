/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { CgCalendarDates } from "react-icons/cg";
import { IconCheck, IconChevronDown, IconCopy } from "tabler-icons";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import { BsCheckLg } from "react-icons/bs";
import { useFormik } from "formik";
import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  FileInput,
  Input,
  LoadingOverlay,
  Select,
  Switch,
  Textarea,
  Tooltip,
  createStyles,
} from "@mantine/core";
import * as Yup from "yup";
import ActivitiesVariantA from "../Activities.tsx/ActivitiesVariantA";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssociateVariantA from "../Associate/AssociateVariantA";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import ConfirmModal from "../../Global/Common/ConfirmModal";
import Empty from "../../Global/Common/Empty";

const useStyles = createStyles((theme) => ({
  required: {
    backgroundColor: "#22272B",
  },
}));

export default function ProjectFormVariantA(props: any) {
  const { classes } = useStyles();
  const location = useLocation();

  // const storageAccountAPI = process.env.REACT_APP_API_STORAGE_ACCOUNT;

  // const [sampleFile, setSampleFile] = useState<any | null>(
  //   props?.data?.sampleFile
  // );
  // const [storageRequirement, setStorageRequirement] = useState<any | null>(
  //   props?.data?.storageRequirement
  // );
  // const [projectEndDate, setProjectEndDate] = useState<Date | null>(
  //   props?.data?.createdTimestamp
  //   // props?.data?.projectEndDate || props?.data?.createdTimestamp
  // );

  const [applicationCriticality, setApplicationCriticality] = useState<
    any | null
  >(props?.data?.applicationCriticality);

  const [dataSecurityClassification, setDataSecurityClassification] = useState<
    any | null
  >(
    props?.data?.dataSecurityClassification ||
      `${
        location.pathname.endsWith("/new")
          ? "test"
          : props?.data?.shortProjectName
      }`
  );

  const [error, setError] = useState(props?.status === 500 ? true : false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [storageAccounts, setStorageAccounts] = useState<any>([]);
  const [openedToolTip, setOpenedToolTip] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  // function handleFileUpload(event: any) {
  //   if (validateImage(event)) {
  //     setSampleFile(event);
  //   } else {
  //     setSampleFile(null);
  //   }
  // }

  function validateImage(file: any) {
    // Check the file size
    if (file?.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10 MB");
      return false;
    }

    // Check the file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file?.type)) {
      alert("Only JPEG, PNG, GIF, and WebP images are allowed");
      return false;
    }

    // The file is valid
    return true;
  }

  const formik = useFormik({
    initialValues: {
      projectName: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props.data?.projectName
      }`,
      shortProjectName: `${
        location.pathname.endsWith("/new")
          ? "test"
          : props?.data?.shortProjectName
      }`,
      projectDescription: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.projectDescription
      }`,
      projectCostCodeWBS: `${
        location.pathname.endsWith("/new")
          ? "123123123"
          : props.data?.projectCostCodeWBS
      }`,
      postGoLiveProjectCostCodeWBS: `${
        location.pathname.endsWith("/new")
          ? "test"
          : props?.data?.postGoLiveProjectCostCodeWBS
      }`,

      primaryResourceOwnerEmail: `${
        location.pathname.endsWith("/new")
          ? "testproject@gmail.com"
          : props?.data?.primaryResourceOwnerEmail
      }`,
      primaryResourceOwnerName: `${
        location.pathname.endsWith("/new")
          ? "testproject"
          : props?.data?.primaryResourceOwnerName
      }`,
      // secondaryResourceOwnerEmails: `${
      //   location.pathname.endsWith("/new")
      //     ? "testproject@gmail.com"
      //     : props?.data?.secondaryResourceOwnerEmails
      // }`,
      projectGroupEmail: `${
        location.pathname.endsWith("/new")
          ? "testproject@gmail.com"
          : props?.data?.projectGroupEmail
      }`,
      applicationID: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.applicationID
      }`,
      applicantName: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.applicantName
      }`,
      accountOwner: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.accountOwner
      }`,
      applicationCriticality: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.applicationCriticality
      }`,
      dataSecurityClassification: `${
        location.pathname.endsWith("/new")
          ? "testProject"
          : props?.data?.dataSecurityClassification
      }`,
      projectState: location.pathname.endsWith("/new")
        ? false
        : props?.data?.projectState,
      // projectEndDate: location.pathname.endsWith("/new") ? "" : projectEndDate,
      division: `${
        location.pathname.endsWith("/new") ? "test" : props?.data?.division
      }`,
      branch: `${
        location.pathname.endsWith("/new") ? "test" : props?.data?.branch
      }`,
      subBranch: `${
        location.pathname.endsWith("/new") ? "test" : props?.data?.subBranch
      }`,
      team: `${
        location.pathname.endsWith("/new") ? "test" : props?.data?.team
      }`,
      storageRequirement: location.pathname.endsWith("/new")
        ? "testProject"
        : props?.data?.storageRequirement || storageAccounts?.[0]?.id,
      sampleFile: location.pathname.endsWith("/new")
        ? null
        : props?.data?.sampleFile,
    },
    validationSchema: Yup.object().shape({
      projectName: Yup.string()
        .max(65, "Enter project name with 65 characters or less")
        .required("Please enter project name")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      shortProjectName: Yup.string()
        .max(10, "Enter short project name with 10 characters or less")
        .required("Please enter project short name")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      projectDescription: Yup.string()
        .max(500, "Enter description with 200 characters or less")
        .matches(/^[a-zA-Z0-9 ]*$/, "No special characters are allowed"),
      projectCostCodeWBS: Yup.string()
        .max(50, "Enter Project Code with 65 characters or less")
        .required("Please enter Project cost code WBS")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      postGoLiveProjectCostCodeWBS: Yup.string()
        .max(65, "Enter project code with 65 characters or less")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      division: Yup.string()
        .max(65, "Enter Division with 65 characters or less")
        .required("Please enter project division")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      branch: Yup.string()
        .max(65, "Enter Branch with 65 characters or less")
        .required("Please enter project branch")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      subBranch: Yup.string()
        .max(10, "Enter Sub Branch with 10 characters or less")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .matches(/^\S*$/, "No white spaces are allowed"),
      primaryResourceOwnerEmail: Yup.string()
        .email("Invalid email address")
        .max(225, "Enter email address with 225 characters or less")
        .required("Please enter primary resource owner email")
        .matches(/^\S*$/, "No white spaces are allowed"),
      team: Yup.string()
        .min(3, "team can be minimum 3 character")
        .max(10, "team can be maximum 10 characters")
        .required("Please enter team")
        .matches(/^\S*$/, "No white spaces are allowed"),
      primaryResourceOwnerName: Yup.string()
        .max(65, "Enter resource owner name with 65 characters or less")
        .required("Please enter primary resource owner name")
        .matches(/^\S*$/, "No white spaces are allowed"),
      // secondaryResourceOwnerEmails: Yup.string()
      //   .email("Invalid email address")
      //   .min(3, "Email can be minimum 3 character")
      //   .max(255, "Email can be maximum 255 characters")
      //   .required("Please enter secondary resource owner name")
      //   .matches(/^\S*$/, "No white spaces are allowed"),
      projectGroupEmail: Yup.string()
        .email("Invalid email address")
        .max(255, "Enter email address with 225 characters or less"),
      applicantName: Yup.string()
        .max(65, "Enter requester name with 65 characters or less")
        .matches(/^\S*$/, "No white spaces are allowed"),
      applicationID: Yup.string()
        .max(65, "Enter request ID with 65 characters or less")
        .matches(/^\S*$/, "No white spaces are allowed"),
      accountOwner: Yup.string()
        .min(3, "Account Owner name can be minimum 3 character")
        .max(65, "Account Owner name can be maximum 65 characters")
        .required("Please enter account owner name")
        .matches(/^\S*$/, "No white spaces are allowed"),
      applicationCriticality: Yup.string().required(
        "Select application criticality value"
      ),
      dataSecurityClassification: Yup.string().required(
        "Select data security classifcation"
      ),
      projectState: Yup.boolean().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(errors);
      // handleSaveAction(values);
    },
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  // const handleSaveAction = (formValue: any) => {
  //   formValue.projectEndDate = projectEndDate;
  //   formValue.sampleFile = sampleFile;
  //   open();
  // };

  // const fetchstorageAccounts = async () => {
  //   const response = await axios.get(`${storageAccountAPI}`);
  //   setStorageAccounts(response.data);
  // };

  // const fetchschema = async () => {
  //   const response = await axios.get(
  //     `https://dlssdviotc001.blob.core.windows.net/templates/telemetric-message-schema-d2c/TfNSW_DSI_IOTC_Mandatory_Message_Sample_forDevice_to_cloud_messaging_for_IOT_Device_R1-0.json?sp=r&st=2023-06-19T14:00:00Z&se=2028-06-09T14:00:00Z&spr=https&sv=2022-11-02&sr=b&sig=pYFF55EZp%2B4QjgAG6WOKZHyu2czefr7IbGG5ewezgqY%3D`
  //   );
  //   // setStorageAccounts(response.data);
  //   console.log(response, "schema response");
  // };

  const handelDelete = () => {
    setOpenedDeleteModal(true);
  };

  // useEffect(() => {
  //   fetchstorageAccounts();
  //   fetchschema();
  // }, []);

  console.log(props,'data')
  return (
    <>
      {props?.animation ? (
        <div className="pt-20 flex justify-center items-center h-full w-full">
          {props?.animationType}
        </div>
      ) : (
        <>
          {props?.loading ? (
            <div className="pt-20 flex justify-center items-center h-full w-full">
              <LoadingLottie />
            </div>
          ) : (
            <div>
              {props?.edit && (
                <div className="px-6 pt-2 text-xs flex items-center">
                  <BsFillExclamationCircleFill
                    className="text-red-500 cursor-pointer mr-2"
                    fontSize="medium"
                  />
                  If you leave this form session, you will lose your progress
                </div>
              )}
              <div className="m-6 pt-4 flex justify-between items-center lg:max-w-screen-md">
                <p className="text-3xl font-bold">
                  {location.pathname.endsWith("/new") && "New "}Project
                </p>
                {!props?.edit ? (
                  <div className="flex items-center ">
                    <Button
                      className="border  border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white mr-4"
                      onClick={handelDelete}
                    >
                      Archive
                    </Button>
                    <Link to={`/projects/edit/${props?.projectId}`}>
                      <Button className="bg-[#202E61] hover:border border-[#202E61] hover:bg-[#26477B] text-white">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="relative">
                    <InfoRoundedIcon
                      className="text-gray-400 cursor-pointer"
                      fontSize="medium"
                      onClick={() => {
                        setOpenedToolTip(!openedToolTip);
                      }}
                    />
                    <div
                      className={`absolute -top-10 left-8 z-10 w-52 inline-block p-3 text-sm 
                          font-medium text-gray-900 bg-white rounded-lg shadow-lg border transition-opacity duration-300 
                ${!openedToolTip ? "opacity-0" : ""}
                `}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Link to="#">
                          <p className="cursor-ponter underline underline-offset-2 text-blue-900 font-bold">
                            Checklist
                          </p>
                        </Link>
                        <RxCross2
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            setOpenedToolTip(false);
                          }}
                        />
                      </div>
                      <p className="text-xs">
                        Help guide and checklist for device model and vendor
                        onboarding
                      </p>

                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                )}
              </div>
              <ConfirmModal
                opened={openedDeleteModal}
                close={close}
                closeButton={false}
              >
                <div className="relative rounded-lg  ">
                  <div className="">
                    <h1 className="pb-6 pt-2 text-xl font-bold">Archive</h1>
                    <div className="border-y">
                      <h3 className="py-4 text-sm font-normal text-gray-500 ">
                        Are you sure you want to archive this project record?
                      </h3>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        className="border-2  ml-4 hover:bg-[#202E61] border-[#202E61] hover:text-white text-[#202E61]"
                        onClick={() => {
                          setOpenedDeleteModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <div className="ml-2">
                        <Button
                          type="button"
                          className="border-2 ml-4 bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                          onClick={() => {
                            props?.delete();
                          }}
                        >
                          Archive
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
              <ConfirmModal opened={opened} close={close} closeButton={false}>
                <div className="relative rounded-lg  ">
                  <div className="">
                    <h1 className="pb-6 pt-2 text-xl font-bold">
                      Are you sure you want to proceed
                    </h1>
                    <div className="border-y">
                      <h3 className="py-4 text-sm font-normal text-gray-500 ">
                        {props?.modalDescription}
                      </h3>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        className="border-2  ml-4 hover:bg-[#202E61] border-[#202E61] hover:text-white text-[#202E61]"
                        onClick={close}
                      >
                        Back to form
                      </Button>
                      <div className="ml-2">
                        <Button
                          type="button"
                          className="border-2 ml-4 bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                          onClick={() => {
                            props?.action(values);
                          }}
                        >
                          Proceed
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
              <ConfirmModal
                opened={warningModal}
                close={close}
                closeButton={false}
              >
                <div className="relative rounded-lg  ">
                  <div className="">
                    <h1 className="pb-6 pt-2 text-xl font-bold">
                      Are you sure you want to leave?
                    </h1>
                    <div className="border-y">
                      <h3 className="py-4 text-sm font-normal text-gray-500 ">
                        If you leave, you will lose your progress and this form
                        will be permanently deleted.
                      </h3>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <Button
                        type="button"
                        className="border-2  ml-4 hover:bg-[#202E61] border-[#202E61] hover:text-white text-[#202E61]"
                        onClick={() => {
                          setWarningModal(false);
                        }}
                      >
                        Back to form
                      </Button>
                      <div className="ml-2">
                        <Link to={`/projects/${props?.projectId || ""}`}>
                          <Button
                            type="button"
                            className="border-2 ml-4 bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                          >
                            Leave
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
              <ConfirmModal
                opened={error}
                close={() => {
                  setError(false);
                }}
                closeButton={true}
              >
                <div className="relative rounded-lg">
                  <div className="">
                    <h1 className="pb-6 pt-2 text-xl font-bold">ooops!</h1>
                    <div className="border-y">
                      <h3 className="py-4 text-sm font-normal text-red-500 ">
                        Something went wrong error in loading form data!
                      </h3>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <Link to={"/projects"}>
                        <Button
                          type="button"
                          className="border-2  ml-4 hover:bg-[#202E61] border-[#202E61] hover:text-white text-[#202E61]"
                        >
                          Back to listing
                        </Button>
                      </Link>

                      <div className="ml-2">
                        <Button
                          type="button"
                          className="border-2 ml-4 bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                          onClick={() => {
                            setError(false);
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
              <form onSubmit={handleSubmit}>
                <div className="pt-2 lg:max-w-screen-md mx-6">
                  <Card
                    sx={(theme: any) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.gray[8]
                          : "#F9FAFB",
                      color: theme.colorScheme === "dark" ? "white" : "black",
                    })}
                    p={0}
                    radius={0}
                    className="h-full mb-8 "
                  >
                    <div>
                      <Card
                        sx={(theme: any) => ({
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? "#5C5F66"
                              : "#E5E7EB",
                          color:
                            theme.colorScheme === "dark" ? "white" : "black",
                        })}
                        p={0}
                        radius={0}
                        className="p-4 w-full rounded-t"
                      >
                        <h1 className="font-bold text-lg">Project details</h1>
                      </Card>
                      <div className="px-4">
                        <div className="flex items-center w-full mt-4">
                          <Input.Wrapper
                            label="Project name*"
                            className="w-full mr-4 h-14"
                            error={
                              errors.projectName && touched.projectName ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.projectName}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Project name"
                              name="projectName"
                              value={values.projectName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={!props?.edit}
                              error={
                                errors.projectName && touched.projectName ? (
                                  <div>{errors.projectName}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            label="Short project name*"
                            className="w-full h-14"
                            error={
                              errors.shortProjectName &&
                              touched.shortProjectName ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.shortProjectName}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Project short name"
                              name="shortProjectName"
                              value={values.shortProjectName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={!props?.edit}
                              error={
                                errors.shortProjectName &&
                                touched.shortProjectName ? (
                                  <div>{errors.shortProjectName}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <Textarea
                            placeholder="Project description"
                            label="Description"
                            name="projectDescription"
                            minRows={4}
                            maxRows={4}
                            onChange={handleChange}
                            readOnly={!props?.edit}
                            value={values.projectDescription}
                            className="w-full"
                            error={
                              errors.projectDescription &&
                              touched.projectDescription ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.projectDescription}
                                  </p>
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Project cost code WBS (Capex)*"
                            className="w-full mr-4 h-14"
                            error={
                              errors.projectCostCodeWBS &&
                              touched.projectCostCodeWBS ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.projectCostCodeWBS}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Project cost code WBS (Capex)"
                              name="projectCostCodeWBS"
                              value={values.projectCostCodeWBS}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={!props?.edit}
                              error={
                                errors.projectCostCodeWBS &&
                                touched.projectCostCodeWBS ? (
                                  <div>{errors.projectCostCodeWBS}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            label="Post go-live project cost code WBS (Opex)"
                            className="w-full h-14"
                            error={
                              errors.postGoLiveProjectCostCodeWBS &&
                              touched.postGoLiveProjectCostCodeWBS ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.postGoLiveProjectCostCodeWBS}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Post go-live project cost code WBS (Opex)"
                              name="postGoLiveProjectCostCodeWBS"
                              value={values.postGoLiveProjectCostCodeWBS}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={!props?.edit}
                              error={
                                errors.postGoLiveProjectCostCodeWBS &&
                                touched.postGoLiveProjectCostCodeWBS ? (
                                  <div>
                                    {errors.postGoLiveProjectCostCodeWBS}
                                  </div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <DateInput
                            rightSection={<CalendarMonthIcon />}
                            // value={projectEndDate}
                            label="Project end date"
                            // onChange={setProjectEndDate}
                            placeholder="Select project end date"
                            name="projectEndDate"
                            className="sm:w-[35%]"
                            readOnly={!props?.edit}
                          />
                        </div>
                        <div className="flex items-center w-full my-8">
                          <h1 className="text-sm font-bold w-[25%]">
                            Project status
                          </h1>
                          <div className="flex items-center w-[75%]">
                            <Switch
                              onLabel={<BsCheckLg size="1rem" color="white" />}
                              offLabel={<RxCross2 size="1rem" color="red" />}
                              labelPosition="left"
                              checked={values.projectState}
                              name="projectState"
                              onChange={handleChange}
                              disabled={!props?.edit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card
                    sx={(theme: any) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.gray[8]
                          : "#F9FAFB",
                      color: theme.colorScheme === "dark" ? "white" : "black",
                    })}
                    p={0}
                    radius={0}
                    className="mt-8 mb-8 rounded-t"
                  >
                    <Card
                      sx={(theme: any) => ({
                        backgroundColor:
                          theme.colorScheme === "dark" ? "#5C5F66" : "#E5E7EB",
                        color: theme.colorScheme === "dark" ? "white" : "black",
                      })}
                      p={0}
                      radius={0}
                      className="p-4 w-full rounded-t"
                    >
                      <h1 className="text-lg font-bold">
                        Project contact details
                      </h1>
                    </Card>
                    <div className="p-4">
                      <div className="sm:flex items-center w-full mt-4">
                        <Input.Wrapper
                          label="Division*"
                          className="sm:mr-4 w-full h-14"
                          error={
                            errors.division && touched.division ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.division}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Division"
                            name="division"
                            onChange={handleChange}
                            value={values.division}
                            readOnly={!props?.edit}
                            error={
                              errors.division && touched.division ? (
                                <div>{errors.division}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Branch*"
                          className="w-full h-14"
                          error={
                            errors.branch && touched.branch ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.branch}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Branch"
                            name="branch"
                            onChange={handleChange}
                            value={values.branch}
                            readOnly={!props?.edit}
                            error={
                              errors.branch && touched.branch ? (
                                <div>{errors.branch}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="sm:flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Sub Branch"
                          className="sm:mr-4 w-full h-14"
                          error={
                            errors.subBranch && touched.subBranch ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.subBranch}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Sub Branch"
                            name="subBranch"
                            onChange={handleChange}
                            value={values.subBranch}
                            readOnly={!props?.edit}
                            error={
                              errors.subBranch && touched.subBranch ? (
                                <div>{errors.subBranch}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Team*"
                          className="w-full h-14"
                          error={
                            errors.team && touched.team ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.team}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Team"
                            name="team"
                            onChange={handleChange}
                            value={values.team}
                            readOnly={!props?.edit}
                            error={
                              errors.team && touched.team ? (
                                <div>{errors.team}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="sm:flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Business owner name*"
                          className="sm:mr-4 w-full h-14"
                          error={
                            errors.primaryResourceOwnerName &&
                            touched.primaryResourceOwnerName ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.primaryResourceOwnerName}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Business owner name"
                            name="primaryResourceOwnerName"
                            onChange={handleChange}
                            value={values.primaryResourceOwnerName}
                            readOnly={!props?.edit}
                            error={
                              errors.primaryResourceOwnerName &&
                              touched.primaryResourceOwnerName ? (
                                <div>{errors.primaryResourceOwnerName}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Business owner email*"
                          className="w-full h-14"
                          error={
                            errors.primaryResourceOwnerEmail &&
                            touched.primaryResourceOwnerEmail ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.primaryResourceOwnerEmail}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Business owner email"
                            name="primaryResourceOwnerEmail"
                            onChange={handleChange}
                            value={values.primaryResourceOwnerEmail}
                            readOnly={!props?.edit}
                            error={
                              errors.primaryResourceOwnerEmail &&
                              touched.primaryResourceOwnerEmail ? (
                                <div>{errors.primaryResourceOwnerEmail}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="sm:flex items-center w-full mt-8">
                        {/* <Input.Wrapper
                          label="Secondary business owner email*"
                          className="sm:mr-4 w-full h-20"
                          error={
                            errors.secondaryResourceOwnerEmails &&
                            touched.secondaryResourceOwnerEmails ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.secondaryResourceOwnerEmails}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Secondary business owner email"
                            name="secondaryResourceOwnerEmails"
                            onChange={handleChange}
                            value={values.secondaryResourceOwnerEmails}
                            readOnly={!props?.edit}
                            error={
                              errors.secondaryResourceOwnerEmails &&
                              touched.secondaryResourceOwnerEmails ? (
                                <div>{errors.secondaryResourceOwnerEmails}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper> */}
                        <Input.Wrapper
                          label="Project group email"
                          className="w-full h-20"
                          error={
                            errors.projectGroupEmail &&
                            touched.projectGroupEmail ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.projectGroupEmail}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Project group email"
                            name="projectGroupEmail"
                            onChange={handleChange}
                            value={values.projectGroupEmail}
                            readOnly={!props?.edit}
                            error={
                              errors.projectGroupEmail &&
                              touched.projectGroupEmail ? (
                                <div>{errors.projectGroupEmail}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                    </div>
                  </Card>
                  <div className={`h-full flex flex-col justify-between mb-8`}>
                    <Card
                      sx={(theme: any) => ({
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.gray[8]
                            : "#F9FAFB",
                        color: theme.colorScheme === "dark" ? "white" : "black",
                      })}
                      p={0}
                      radius={0}
                      className="rounded-t"
                    >
                      <Card
                        sx={(theme: any) => ({
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? "#5C5F66"
                              : "#E5E7EB",
                          color:
                            theme.colorScheme === "dark" ? "white" : "black",
                        })}
                        p={0}
                        radius={0}
                        className="p-4 w-full rounded-t"
                      >
                        <h1 className="text-lg font-bold">Requester details</h1>
                      </Card>
                      <div className="p-4">
                        <div className="flex items-center w-full mt-4">
                          <Input.Wrapper
                            label="Requester name"
                            className="sm:w-full sm:mr-4 h-14"
                            error={
                              errors.applicantName && touched.applicantName ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.applicantName}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Requester name"
                              name="applicantName"
                              onChange={handleChange}
                              value={values.applicantName}
                              readOnly={!props?.edit}
                              error={
                                errors.applicantName &&
                                touched.applicantName ? (
                                  <div>{errors.applicantName}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                          <Input.Wrapper
                            label="Request ID"
                            className="sm:w-full h-14"
                            error={
                              errors.applicationID && touched.applicationID ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.applicationID}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Request ID"
                              name="applicationID"
                              onChange={handleChange}
                              value={values.applicationID}
                              readOnly={!props?.edit}
                              error={
                                errors.applicationID &&
                                touched.applicationID ? (
                                  <div>{errors.applicationID}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                        <div className="flex items-center w-full mt-8">
                          {/* <Input.Wrapper
                            label="Account owner*"
                            className="sm:w-full sm:mr-4 h-20"
                            error={
                              errors.accountOwner && touched.accountOwner ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.accountOwner}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder=""
                              name="accountOwner"
                              onChange={handleChange}
                              value={values.accountOwner}
                              readOnly={!props?.edit}
                              error={
                                errors.accountOwner && touched.accountOwner ? (
                                  <div>{errors.accountOwner}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper> */}
                          <Select
                            label="Application criticality*"
                            withinPortal
                            // rightSection={<IconChevronDown size="1rem" />}
                            placeholder="Select application criticality"
                            defaultValue={`${props?.data?.applicationCriticality}`}
                            readOnly={!props?.edit}
                            onChange={setApplicationCriticality}
                            value={applicationCriticality}
                            className="sm:w-full h-20"
                            data={[
                              "Core Infrastructure (Foundational)",
                              "Business Critical (Mission Critical)",
                              "Business Operational (Critical)",
                              "Business Standard (Important)",
                              "Business Optional (Non Critical)",
                            ]}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="flex flex-col justify-between mb-4">
                    <Card
                      sx={(theme: any) => ({
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.gray[8]
                            : "#F9FAFB",
                        color: theme.colorScheme === "dark" ? "white" : "black",
                      })}
                      p={0}
                      radius={0}
                      className="rounded-t"
                    >
                      <Card
                        sx={(theme: any) => ({
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? "#5C5F66"
                              : "#E5E7EB",
                          color:
                            theme.colorScheme === "dark" ? "white" : "black",
                        })}
                        p={0}
                        radius={0}
                        className="p-4 w-full rounded-t"
                      >
                        <h1 className="text-lg font-bold">
                          Storage requirements
                        </h1>
                      </Card>
                      <div className="p-4">
                        <div className="flex items-center w-full mt-4">
                          <Input.Wrapper
                            label="Storage account"
                            className="sm:w-full sm:mr-4 h-20"
                          >
                            <Input
                              placeholder="Select storage account"
                              name="storageRequirement"
                              // onChange={setStorageRequirement}
                              value={storageAccounts?.[0]?.name}
                              readOnly={true}
                            />
                          </Input.Wrapper>
                          <Select
                            label="Data security classification*"
                            dropdownPosition="top"
                            withinPortal
                            // rightSection={<IconChevronDown size="1rem" />}
                            placeholder="Select data security classification"
                            defaultValue={`${props?.data?.dataSecurityClassification}`}
                            readOnly={!props?.edit}
                            onChange={setDataSecurityClassification}
                            value={dataSecurityClassification}
                            className="sm:w-full h-20 z-50"
                            data={[
                              "NOT CLASSIFIED",
                              "PROTECTED",
                              "CONFIDENTIAL",
                              "SECRET",
                              "TOP SECRET",
                            ]}
                          />
                        </div>
                      </div>
                    </Card>
                    {location.pathname.endsWith("/new") ? (
                      ""
                    ) : (
                      <>
                        <Card
                          sx={(theme: any) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.gray[8]
                                : "#F9FAFB",
                            color:
                              theme.colorScheme === "dark" ? "white" : "black",
                          })}
                          p={0}
                          radius={0}
                          className="rounded-t"
                        >
                          <Card
                            sx={(theme: any) => ({
                              backgroundColor:
                                theme.colorScheme === "dark"
                                  ? "#5C5F66"
                                  : "#E5E7EB",
                              color:
                                theme.colorScheme === "dark"
                                  ? "white"
                                  : "black",
                            })}
                            p={0}
                            radius={0}
                            className="p-4 w-full rounded-t"
                          >
                            <h1 className="text-sm font-bold">
                              Technical details
                            </h1>
                          </Card>
                          <div className="p-4">
                            <div>
                              <Input.Wrapper
                                label="Project Id"
                                className="w-full mr-4 h-16 "
                              >
                                <Input
                                  value={props?.projectId}
                                  readOnly={true}
                                  rightSection={
                                    <CopyButton
                                      value={props?.projectId}
                                      timeout={2000}
                                    >
                                      {({ copied, copy }) => (
                                        <Tooltip
                                          label={copied ? "Copied" : "Copy"}
                                          withArrow
                                          position="right"
                                          className=" ml-2 hover:bg-transparent"
                                        >
                                          <ActionIcon
                                            color={copied ? "teal" : "gray"}
                                            onClick={copy}
                                            className="pr-2"
                                          >
                                            {copied ? (
                                              <IconCheck size="1rem" />
                                            ) : (
                                              <IconCopy size="1rem" />
                                            )}
                                          </ActionIcon>
                                        </Tooltip>
                                      )}
                                    </CopyButton>
                                  }
                                />
                              </Input.Wrapper>
                            </div>
                          </div>
                        </Card>
                        <Card
                          sx={(theme: any) => ({
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.gray[8]
                                : "#F9FAFB",
                            color:
                              theme.colorScheme === "dark" ? "white" : "black",
                          })}
                          p={0}
                          radius={0}
                          className="rounded-t"
                        >
                          <Card
                            sx={(theme: any) => ({
                              backgroundColor:
                                theme.colorScheme === "dark"
                                  ? "#5C5F66"
                                  : "#E5E7EB",
                              color:
                                theme.colorScheme === "dark"
                                  ? "white"
                                  : "black",
                            })}
                            p={0}
                            radius={0}
                            className="mt-8 p-4 w-full rounded-t"
                          >
                            <h1 className="text-sm font-bold">Landing zone</h1>
                          </Card>
                          <div className="p-4">
                            <Card
                              sx={(theme: any) => ({
                                backgroundColor:
                                  theme.colorScheme === "dark"
                                    ? theme.colors.gray[8]
                                    : "#F5F5F5",
                                color:
                                  theme.colorScheme === "dark"
                                    ? "white"
                                    : "black",
                              })}
                              p={0}
                              radius={0}
                              className="p-4 my-4 w-full min-h-[10rem] max-h-[17rem] mx-6 md:mx-0  overflow-auto rounded "
                            >
                              <LoadingOverlay visible={false} overlayBlur={2} />
                              <>
                                <div className="flex py-2 border-b-2 border-gray-400">
                                  <div className="w-[50%] ">
                                    <p className="text-sm font-semibold ">
                                      Device Model
                                    </p>
                                  </div>
                                  <div className="w-[50%]">
                                    <p className="text-sm font-semibold">
                                      Container path
                                    </p>
                                  </div>
                                </div>
                                {props?.data?.deviceGroup?.map((item: any) => (
                                  <>
                                    <div
                                      key={item.deviceGroupId}
                                      className="flex border-b-2 py-2"
                                    >
                                      <div className="w-[50%]">
                                        <p className="text-sm">
                                          {item?.deviceGroupName}
                                        </p>
                                      </div>
                                      <div className="w-[50%]">
                                        <Link
                                          to={`https://dlssdviotc001.blob.core.windows.net/events-data/odre/raw/MQTT/3.1.1/samsung/s21/project1`}
                                          target="_blank"
                                        >
                                          <p className="text-sm">
                                            {`${storageAccounts?.[0]?.name}/events-data/odre/raw/MQTT/3.1.1/${item?.deviceGroupName}/${props.projectName}`}
                                          </p>
                                        </Link>
                                        <Link
                                          to={`https://dlssdviotc001.blob.core.windows.net/meta-data/odre/raw/MQTT/3.1.1/samsung/s21/project1`}
                                          target="_blank"
                                        >
                                          <p className="text-sm">
                                            {`meta-data/odre/raw/MQTT/3.1.1/${item?.deviceGroupName}/${props.projectName}`}
                                          </p>
                                        </Link>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </>
                            </Card>
                          </div>
                        </Card>
                      </>
                    )}
                    {!location.pathname.endsWith("/new") && (
                      <>
                        <AssociateVariantA
                          vendor={true}
                          deviceGroup={true}
                          title="Relationship"
                          projectId={props?.projectId}
                          deviceGroupSubType={"associate_project_devicegroup"}
                          vendorSubType={"associate_vendor_project"}
                          disassociateDeviceGroupSubType={
                            "disassociate_project_devicegroup"
                          }
                          disassociateVendorSubType={
                            "disassociate_vendor_project"
                          }
                          vendors={props?.data?.vendor}
                          deviceGroups={props?.data?.deviceGroup}
                          fetch={props?.fetch}
                          edit={props?.edit}
                        />
                        <ActivitiesVariantA
                          type="project"
                          projectId={`${props?.projectId}`}
                        />
                      </>
                    )}
                    {props?.edit && (
                      <div className=" pt-4 mt-8 border-t-2 border-[#202E61]">
                        <div className="mt-2 mb-4 flex justify-end max-w-screen-md">
                          <Button
                            className="border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white"
                            onClick={() => {
                              setWarningModal(true);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="ml-4 border bg-[#202E61] hover:border-[#202E61] hover:bg-[#26477B] text-white"
                            disabled={!validateImage}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}
