/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  Input,
  Select,
  Switch,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconChevronDown, IconCopy } from "tabler-icons";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import ActivitiesVariantA from "../Activities.tsx/ActivitiesVariantA";
import AssociateVariantA from "../Associate/AssociateVariantA";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import ConfirmModal from "../../Global/Common/ConfirmModal";

export default function DeviceGroupFormVariantA(props: any) {
  const vendorsAPI = process.env.REACT_APP_API_VENDORS;

  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [vendorId, setVendorId] = useState<any | null>(
    props?.data?.vendorId
  );
  let vendorName;
  const [vendors, setVendors] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedToolTip, setOpenedToolTip] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  // console.log(props,'data')

  const formik = useFormik({
    initialValues: {
      deviceGroupName: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.deviceGroupName
      }`,
      description: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.description
      }`,
      vendorId: `${props?.vendorId || ""}`,
      vendorName: vendorName,
      make: `${
        location.pathname.endsWith("/new") ? "1999" : props?.data?.make
      }`,
      deviceDataSheet: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.deviceDataSheet
      }`,
      origin: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.origin
      }`,
      TNSWSecurity: location.pathname.endsWith("/new")
        ? false
        : props?.data?.TNSWSecurity,
      deviceGroupStatus: location.pathname.endsWith("/new")
        ? false
        : props?.data?.deviceGroupStatus,
      projectName: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.projectName
      }`,
      additionalProject: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.additionalProject
      }`,
      deviceGroupProperty: `${
        location.pathname.endsWith("/new")
          ? "testDeviceGroup"
          : props?.data?.deviceGroupProperty
      }`,
      expectedNumberOfDevices: `${
        location.pathname.endsWith("/new")
          ? "1000"
          : props?.data?.expectedNumberOfDevices
      }`,
      messagesPerHour: `${
        location.pathname.endsWith("/new")
          ? "60"
          : props?.data?.messagesPerHour
      }`,
      expectedDeviceActiveHoursPerDay: `${
        location.pathname.endsWith("/new")
          ? "24"
          : props?.data?.expectedDeviceActiveHoursPerDay
      }`,
    },
    validationSchema: Yup.object().shape({
      deviceGroupName: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .min(5, "Device model name must be more than 5 character")
        .max(65, "Enter device model name with 65 characters or less")
        .required("Please enter device model name")
        .matches(/^\S*$/, "No white spaces are allowed"),
      description: Yup.string()
        .max(200, "Enter description with 200 characters or less")
        .matches(/^[a-zA-Z0-9 ]*$/, "No special characters are allowed"),
      make: Yup.string()
        .matches(/^[0-9]+$/, "Make must only contain numbers")
        .max(65, "Enter device make with 65 characters or less")
        .required("please enter make"),
      deviceDataSheet: Yup.string().max(
        15,
        "Enter Make with 15 characters or less"
      ),
      origin: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .max(65, "Enter country of origin with 65 characters or less"),
      projectName: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .min(3, "Project name must be more than 3 character")
        .max(15, "Project name must be less than 16 characters"),
      additionalProject: Yup.string(),
      expectedNumberOfDevices: Yup.number()
        .required("please enter expected number of devices")
        .max(1000, "Enter a value between 1- 1000"),
      messagesPerHour: Yup.number()
        .required("please enter message per hour")
        .max(60, "Enter a value between 1-60"),
      expectedDeviceActiveHoursPerDay: Yup.number()
        .required("please enter Expected device active hours per day")
        .max(24, "Enter a value between 1-24"),
    }),
    onSubmit: (values) => {
      values.vendorId = vendorId;
      handleSaveAction(values);
    },
    enableReinitialize: true,
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;
  const handleSaveAction = (formValue: any) => {
    open();
  };

  const handelDelete = () => {
    setOpenedDeleteModal(true);
  };

  // const fetchVendors = async () => {
  //   const apiResponse = await axios.get(`${vendorsAPI}`);
  //   setVendors(apiResponse?.data);
  // };

  // const vendorList = vendors?.map((vendor: any) => ({
  //   value: vendor?.vendorId,
  //   label: vendor?.data?.vendorName || "Unknown",
  // }));

  // const selectedvendorName = vendorList?.find(
  //   (obj: any) => obj?.id === vendorId
  // );
  // vendorName = selectedvendorName?.label;

  // useEffect(() => {
  //   setErvendorListror(props?.error?.response?.status === 500 ? true : false);
  //   fetchVendors();
  // }, []);

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
              <ConfirmModal
                opened={openedDeleteModal}
                close={close}
                closeButton={false}
              >
                <div className="relative rounded-lg  ">
                  <div className="">
                    <h1 className="pb-6 pt-2 text-xl font-bold">Archive</h1>
                    <div className="border-y">
                      <h3 className="py-4 text-sm font-normal text-gray-500">
                        Are you sure you want to archive this device model
                        record?
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
                        <Link
                          to={`/deviceGroups/${props?.deviceGroupId || ""}`}
                        >
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
                        Something went wrong, Error in loading form data!
                      </h3>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <div className="ml-2">
                        <Link to={"/projects"}>
                          <Button
                            type="button"
                            className="border-2 ml-4 bg-[#202E61] hover:border-[#202E61] hover:bg-transparent hover:text-[#202E61]"
                          >
                            Close
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ConfirmModal>
              {props?.edit && (
                <div className="px-6 pt-2 text-xs flex items-center">
                  <BsFillExclamationCircleFill
                    className="text-red-500 cursor-pointer mr-2"
                    fontSize="medium"
                  />
                  If you leave this form session, you will lose your progress
                </div>
              )}
              <div className="m-6 pt-4 flex justify-between items-center lg:max-w-screen-md ">
                <p className="text-3xl font-bold">
                  {location.pathname.endsWith("/new") && "New "}Device Model
                </p>
                {!props?.edit ? (
                  <div className="flex items-center">
                    <Button
                      className="border  border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white mr-4"
                      onClick={handelDelete}
                    >
                      Archive
                    </Button>
                    <Link to={`/deviceGroups/edit/${props?.deviceGroupId}`}>
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
                      className={`absolute -top-10 left-8 z-10 w-52 inline-block p-3 text-sm font-medium text-gray-900 bg-white rounded-lg shadow-lg border transition-opacity duration-300 
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
              <form onSubmit={handleSubmit}>
                <div className="pt-2 lg:max-w-screen-md mx-6 mb-8">
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
                    <h1 className="text-lg font-bold">Device model details</h1>
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
                    className="p-4 pb-10 rounded-t"
                  >
                    {location.pathname.endsWith("/new") ? (
                      ""
                    ) : (
                      <div>
                        <Input.Wrapper
                          label="Device Model Id"
                          className="w-full mb-4 mr-4 h-16 "
                        >
                          <Input value={props?.deviceGroupId} readOnly={true} />
                        </Input.Wrapper>
                      </div>
                    )}
                    <div className="flex items-center w-full">
                      <Input.Wrapper
                        label="Device model name*"
                        className="w-full h-14"
                        error={
                          errors.deviceGroupName && touched.deviceGroupName ? (
                            <div className="p-1 rounded-md flex items-center bg-red-100">
                              <RxCrossCircled
                                className="text-red-400 mr-2"
                                size={20}
                              />
                              <p className="text-black font-bold">
                                {errors.deviceGroupName}
                              </p>
                            </div>
                          ) : null
                        }
                      >
                        <Input
                          placeholder="Device model name"
                          name="deviceGroupName"
                          value={values.deviceGroupName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={!props?.edit}
                          error={
                            errors.deviceGroupName &&
                            touched.deviceGroupName ? (
                              <div>{errors.deviceGroupName}</div>
                            ) : null
                          }
                        />
                      </Input.Wrapper>
                    </div>
                    <div className="flex items-center w-full mt-8">
                      <Textarea
                        placeholder="Device model description"
                        label="Description"
                        name="description"
                        minRows={4}
                        maxRows={4}
                        onChange={handleChange}
                        readOnly={!props?.edit}
                        value={values.description}
                        className="w-full"
                        error={
                          errors.description && touched.description ? (
                            <div className="p-1 rounded-md flex items-center bg-red-100">
                              <RxCrossCircled
                                className="text-red-400 mr-2"
                                size={20}
                              />
                              <p className="text-black font-bold">
                                {errors.description}
                              </p>
                            </div>
                          ) : null
                        }
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex">
                        <div className="flex items-center w-full mt-8">
                          <Select
                            label="Vendor Name*"
                            // rightSection={<IconChevronDown size="1rem" />}
                            placeholder="Select vendor name"
                            defaultValue={`${props?.data?.data?.vendorId}`}
                            readOnly={!props?.edit}
                            onChange={setVendorId}
                            className="sm:w-full sm:mr-4 h-14"
                            data={[]}
                            // data={vendorList}
                          />
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Make*"
                            className="w-full h-14"
                            error={
                              errors.make && touched.make ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.make}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Make"
                              name="make"
                              onChange={handleChange}
                              value={values.make}
                              readOnly={!props?.edit}
                              error={
                                errors.make && touched.make ? (
                                  <div>{errors.make}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Device Data Sheet"
                            className="w-full sm:mr-4 h-14"
                            error={
                              errors.deviceDataSheet &&
                              touched.deviceDataSheet ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.deviceDataSheet}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Device Data Sheet"
                              name="deviceDataSheet"
                              onChange={handleChange}
                              value={values.deviceDataSheet}
                              readOnly={!props?.edit}
                              error={
                                errors.deviceDataSheet &&
                                touched.deviceDataSheet ? (
                                  <div>{errors.deviceDataSheet}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Origin"
                            className="w-full h-14"
                            error={
                              errors.origin && touched.origin ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.origin}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              placeholder="Origin"
                              name="origin"
                              onChange={handleChange}
                              value={values.origin}
                              readOnly={!props?.edit}
                              error={
                                errors.origin && touched.origin ? (
                                  <div>{errors.origin}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Expected number of devices*"
                            className="w-full sm:mr-4 h-14"
                            error={
                              errors.expectedNumberOfDevices &&
                              touched.expectedNumberOfDevices ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.expectedNumberOfDevices}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              name="expectedNumberOfDevices"
                              placeholder="Expected number of devices"
                              type="number"
                              value={values.expectedNumberOfDevices}
                              onChange={handleChange}
                              readOnly={!props?.edit}
                              error={
                                errors.expectedNumberOfDevices &&
                                touched.expectedNumberOfDevices ? (
                                  <div>{errors.expectedNumberOfDevices}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                        <div className="flex items-center w-full mt-8">
                          <Input.Wrapper
                            label="Messages per hour per device*"
                            className="w-full h-14"
                            error={
                              errors.messagesPerHour &&
                              touched.messagesPerHour ? (
                                <div className="p-1 rounded-md flex items-center bg-red-100">
                                  <RxCrossCircled
                                    className="text-red-400 mr-2"
                                    size={20}
                                  />
                                  <p className="text-black font-bold">
                                    {errors.messagesPerHour}
                                  </p>
                                </div>
                              ) : null
                            }
                          >
                            <Input
                              name="messagesPerHour"
                              placeholder="Messages per hour per device"
                              type="number"
                              value={values.messagesPerHour}
                              onChange={handleChange}
                              readOnly={!props?.edit}
                              error={
                                errors.messagesPerHour &&
                                touched.messagesPerHour ? (
                                  <div>{errors.messagesPerHour}</div>
                                ) : null
                              }
                            />
                          </Input.Wrapper>
                        </div>
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Expected device active hours per day*"
                          className="w-full h-14"
                          error={
                            errors.expectedDeviceActiveHoursPerDay &&
                            touched.expectedDeviceActiveHoursPerDay ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.expectedDeviceActiveHoursPerDay}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            name="expectedDeviceActiveHoursPerDay"
                            placeholder="Expected device active hours per day"
                            type="number"
                            value={values.expectedDeviceActiveHoursPerDay}
                            onChange={handleChange}
                            readOnly={!props?.edit}
                            error={
                              errors.expectedDeviceActiveHoursPerDay &&
                              touched.expectedDeviceActiveHoursPerDay ? (
                                <div>
                                  {errors.expectedDeviceActiveHoursPerDay}
                                </div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                    </div>
                    <div className="flex items-end w-full mt-8">
                      <h1 className="text-sm font-semibold w-[25%]">
                        TNSW Security Assessment complete?
                      </h1>
                      <div className="w-[35%] flex items-center ml-4">
                        <Switch
                          onLabel={<BsCheckLg size="1rem" color="white" />}
                          offLabel={<RxCross2 size="1rem" color="red" />}
                          name="TNSWSecurity"
                          checked={values.TNSWSecurity}
                          onChange={handleChange}
                          disabled={!props?.edit}
                        />
                      </div>
                    </div>
                    <div className="flex items-end w-full mt-8">
                      <h1 className="text-sm font-semibold w-[25%]">
                        Device Model Status
                      </h1>
                      <div className="w-[35%] flex items-center ml-4">
                        <Switch
                          onLabel={<BsCheckLg size="1rem" color="white" />}
                          offLabel={<RxCross2 size="1rem" color="red" />}
                          name="deviceGroupStatus"
                          checked={values.deviceGroupStatus}
                          onChange={handleChange}
                          disabled={!props?.edit}
                        />
                      </div>
                    </div>
                    {!location.pathname.endsWith("/new") && (
                      <>
                        <div className="flex items-end w-full mt-8">
                          <div className="flex items-center w-[25%]">
                            <h1 className="text-sm font-semibold">IoT Hub</h1>
                          </div>
                          <div className="w-[35%] flex items-center ml-4">
                            {props?.data?.data?.iotHub?.iotHubName}
                          </div>
                        </div>
                        <div className="flex items-end w-full mt-8">
                          <div className="flex items-center w-[25%]">
                            <h1 className="text-sm font-semibold">
                              Stream Analytics Job
                            </h1>
                          </div>
                          <div className="w-[35%] flex items-center ml-4">
                            {
                              props?.data?.data?.streamAnalytics
                                ?.streamAnalyticsName
                            }
                          </div>
                        </div>
                      </>
                    )}
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
                              theme.colorScheme === "dark" ? "white" : "black",
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
                              label="Device Model Id"
                              className="w-full mr-4 h-16 "
                            >
                              <Input
                                value={props?.deviceGroupId}
                                readOnly={true}
                                rightSection={
                                  <CopyButton
                                    value={props?.deviceGroupId}
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
                    </>
                  )}
                  {!location.pathname.endsWith("/new") && (
                    <>
                      <AssociateVariantA
                        vendor={true}
                        project={true}
                        title="Relationship"
                        deviceGroupId={props?.deviceGroupId}
                        projectSubType={"associate_project_devicegroup"}
                        vendorSubType={"associate_vendor_devicegroup"}
                        disassociateProjectSubType={
                          "disassociate_project_devicegroup"
                        }
                        disassociateVendorSubType={
                          "disassociate_vendor_devicegroup"
                        }
                        projects={props?.data?.data?.project}
                        vendors={props?.data?.data?.vendor}
                        fetch={props.fetch}
                        edit={props?.edit}
                      />

                      <ActivitiesVariantA
                        type="devicegroup"
                        deviceGroupId={`${props?.deviceGroupId}`}
                      />
                    </>
                  )}
                  {props?.edit && (
                    <div className=" pt-4 mt-4 border-t-2 border-[#202E61]">
                      <div className="mt-2 mb-4 flex justify-end max-w-screen-lg">
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
                          className="ml-4 border  bg-[#202E61] hover:border-[#202E61] hover:bg-[#26477B] text-white"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
}
