import { BsFillExclamationCircleFill } from "react-icons/bs";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconCopy } from "tabler-icons";
import { BsCheckLg } from "react-icons/bs";
import { useFormik } from "formik";
import { useState } from "react";
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
import * as Yup from "yup";
import ActivitiesVariantA from "../Activities.tsx/ActivitiesVariantA";
import AssociateVariantA from "../Associate/AssociateVariantA";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LoadingLottie from "../../Global/Lottie/LoadingLottie";
import ConfirmModal from "../../Global/Common/ConfirmModal";

export default function VendorFormVariantA(props: any) {
  const location = useLocation();

  const [opened, { open, close }] = useDisclosure(false);
  const [openedDeleteModal, setOpenedDeleteModal] = useState(false);
  const [openedToolTip, setOpenedToolTip] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [state, setState] = useState<any | null>(props?.data?.state || null);
  // const [logo, setLogo] = useState<any | null>(props?.data?.logo || null);

  const formik = useFormik({
    initialValues: {
      vendorName: `${
        location.pathname.endsWith("/new")
          ? "testVendor"
          : props?.data?.vendorName
      }`,
      description: `${
        location.pathname.endsWith("/new")
          ? "testVendor"
          : props?.data?.description
      }`,
      address: `${
        location.pathname.endsWith("/new") ? "testVendor" : props?.data?.address
      }`,
      address2: `${
        location.pathname.endsWith("/new") ? "testVendor" : props?.data?.address
      }`,
      suburb: `${
        location.pathname.endsWith("/new") ? "testVendor" : props?.data?.suburb
      }`,
      postCode: `${
        location.pathname.endsWith("/new") ? "1234" : props?.data?.postCode
      }`,
      phone: `${
        location.pathname.endsWith("/new") ? "1111111111" : props?.data?.phone
      }`,
      email: `${
        location.pathname.endsWith("/new")
          ? "testvendor@gmail.com"
          : props?.data?.email
      }`,
      supportContactNumber: `${
        location.pathname.endsWith("/new")
          ? "1234567891"
          : props?.data?.supportContactNumber
      }`,
      supportContactEmail: `${
        location.pathname.endsWith("/new")
          ? "testvendor@gmail.com"
          : props?.data?.supportContactEmail
      }`,
      vendorStatus: location.pathname.endsWith("/new")
        ? false
        : props?.data?.vendorStatus,
      logo: null,
    },
    validationSchema: Yup.object().shape({
      vendorName: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .min(5, "Vendor name must be more than 5 character")
        .max(65, "Enter vendor name with 65 characters or less")
        .required("Please enter vendor name")
        .matches(/^\S*$/, "No white spaces are allowed"),
      description: Yup.string()
        .max(200, "Enter description with 200 characters or less")
        .matches(/^[a-zA-Z0-9 ]*$/, "No special characters are allowed"),
      address: Yup.string()
        .max(200, "Enter address with 200 characters or less")
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed"),
      address2: Yup.string()
        .min(3, "Enter address 2 with 200 characters or less")
        .max(200, "address2 must be less than 200 characters"),
      suburb: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, "No special characters are allowed")
        .max(65, "Enter suburb with 65 characters or less"),
      postCode: Yup.string()
        .matches(/^[0-9]+$/, "Post code must only contain numbers")
        .max(10, "Enter postcode with 10 characters or less"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must only contain numbers")
        .max(15, "Enter phone number between 10-15 digits "),
      email: Yup.string()
        .email("Invalid email")
        .max(225, "Enter email address with 225 characters or less")
        .required("Please enter email"),
      supportContactNumber: Yup.string()
        .min(10, "Enter phone number between 10-15 digits")
        .max(15, "Enter phone number between 10-15 digits")
        .required("Please enter support contact number")
        .matches(/^[0-9]+$/, "Post code must only contain numbers"),
      supportContactEmail: Yup.string()
        .email("Invalid email")
        .required("Please enter support contact email")
        .max(30, "Enter email address with 225 characters or less"),
      // logo: Yup.mixed()
      //   .test("fileFormat", "Invalid file format", (value: any) => {
      //     if (!value) return true; // If no image is selected, consider it valid
      //     const validFormats = ["image/jpeg", "image/png", "image/gif"]; // Valid image formats
      //     return validFormats.includes(value?.type);
      //   })
      //   .test("fileSize", "File size too large", (value: any) => {
      //     if (!value) return true; // If no image is selected, consider it valid
      //     const fileSizeInMB = value?.size / 1024 / 1024;
      //     return fileSizeInMB <= 10;
      //   }),
    }),
    onSubmit: (values) => {
      handleSaveAction(values);
    },
    enableReinitialize: true,
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const handleSaveAction = (formValue: any) => {
    // formValue.logo = logo;
    open();
  };

  const handelDelete = () => {
    setOpenedDeleteModal(true);
  };

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
                        Are you sure you want to archive this Vendor record?
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
                        <Link to={`/vendors/${props?.vendorId || ""}`}>
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
                <p className="text-3xl font-bold">{location.pathname.endsWith("/new") && "New "}Vendor</p>
                {!props?.edit ? (
                  <div className="flex items-center">
                    <Button
                      className="border  border-[#202E61] text-[#202E61] hover:bg-[#202E61] hover:text-white mr-4"
                      onClick={handelDelete}
                    >
                      Archive
                    </Button>
                    <Link to={`/vendors/edit/${props.vendorId}`}>
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
                <div className="pt-2 mx-6 max-w-screen-md mb-8">
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
                    className="h-full mb-4 rounded-t"
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
                      <h1 className="text-lg font-bold">Vendor details</h1>
                    </Card>
                    <div className="p-4 pb-10">
                      {location.pathname.endsWith("/new") ? (
                        ""
                      ) : (
                        <div>
                          <Input.Wrapper
                            label="Vendor Id"
                            className="w-full mb-4 mr-4 h-16 "
                          >
                            <Input value={props?.vendorId} readOnly={true} />
                          </Input.Wrapper>
                        </div>
                      )}
                      <div className="flex items-center w-full  ">
                        <Input.Wrapper
                          label="Vendor name*"
                          className="w-full !border-black h-14"
                          error={
                            errors.vendorName && touched.vendorName ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.vendorName}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Vendor name"
                            name="vendorName"
                            value={values.vendorName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={!props?.edit}
                            className="!border-black"
                            error={
                              errors.vendorName && touched.vendorName ? (
                                <div>{errors.vendorName}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Textarea
                          label="Description"
                          placeholder="Vendor description"
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
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Street address 1"
                          className="w-full h-14"
                          error={
                            errors.address && touched.address ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.address}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Street address 1"
                            name="address"
                            onChange={handleChange}
                            value={values.address}
                            readOnly={!props?.edit}
                            error={
                              errors.address && touched.address ? (
                                <div>{errors.address}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Street address 2"
                          className="w-full h-14"
                          error={
                            errors.address2 && touched.address2 ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.address2}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Street address 2"
                            name="address2"
                            onChange={handleChange}
                            value={values.address2}
                            readOnly={!props?.edit}
                            error={
                              errors.address2 && touched.address2 ? (
                                <div>{errors.address2}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Suburb"
                          className="w-full h-14"
                          error={
                            errors.suburb && touched.suburb ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.suburb}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Suburb"
                            name="suburb"
                            onChange={handleChange}
                            value={values.suburb}
                            readOnly={!props?.edit}
                            error={
                              errors.suburb && touched.suburb ? (
                                <div>{errors.suburb}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Post code"
                          className="w-full md:ml-4 h-14"
                          error={
                            errors.postCode && touched.postCode ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.postCode}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Post code"
                            name="postCode"
                            onChange={handleChange}
                            value={values.postCode}
                            readOnly={!props?.edit}
                            error={
                              errors.postCode && touched.postCode ? (
                                <div>{errors.postCode}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div>
                        <Select
                          label="State"
                          // rightSection={<IconChevronDown size="1rem" />}
                          placeholder="Choose state"
                          defaultValue="ng"
                          name="state"
                          onChange={setState}
                          value={state}
                          readOnly={!props?.edit}
                          className="w-full sm:mr-4 mt-6 h-14"
                          data={[
                            {
                              label: "Australian Capital Territory",
                              value: "ACT",
                            },
                            {
                              label: "New South Wales",
                              value: "NSW",
                            },
                            {
                              label: "Northern Territory",
                              value: "NT",
                            },
                            {
                              label: "Queensland",
                              value: "QLD",
                            },
                            {
                              label: "South Australia",
                              value: "SA",
                            },
                            {
                              label: "Tasmania",
                              value: "TAS",
                            },
                            {
                              label: "Victoria",
                              value: "VIC",
                            },
                            {
                              label: "Western Australia",
                              value: "WA",
                            },
                          ]}
                        />
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Business phone"
                          className="w-full h-14"
                          error={
                            errors.phone && touched.phone ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.phone}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Business phone"
                            name="phone"
                            onChange={handleChange}
                            value={values.phone}
                            readOnly={!props?.edit}
                            error={
                              errors.phone && touched.phone ? (
                                <div>{errors.phone}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Business email"
                          className="w-full md:ml-4 h-14"
                          error={
                            errors.email && touched.email ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.email}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Business email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            readOnly={!props?.edit}
                            error={
                              errors.email && touched.email ? (
                                <div>{errors?.email}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="flex items-center w-full mt-8">
                        <Input.Wrapper
                          label="Support contact phone number*"
                          className="w-full h-14"
                          error={
                            errors.supportContactNumber &&
                            touched.supportContactNumber ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.supportContactNumber}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Support contact phone number"
                            name="supportContactNumber"
                            onChange={handleChange}
                            value={values.supportContactNumber}
                            readOnly={!props?.edit}
                            error={
                              errors.supportContactNumber &&
                              touched.supportContactNumber ? (
                                <div>{errors.supportContactNumber}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                        <Input.Wrapper
                          label="Support contact email*"
                          className="w-full md:ml-4 h-14"
                          error={
                            errors.supportContactEmail &&
                            touched.supportContactEmail ? (
                              <div className="p-1 rounded-md flex items-center bg-red-100">
                                <RxCrossCircled
                                  className="text-red-400 mr-2"
                                  size={20}
                                />
                                <p className="text-black font-bold">
                                  {errors.supportContactEmail}
                                </p>
                              </div>
                            ) : null
                          }
                        >
                          <Input
                            placeholder="Support contact email"
                            name="supportContactEmail"
                            onChange={handleChange}
                            value={values.supportContactEmail}
                            readOnly={!props?.edit}
                            error={
                              errors.supportContactEmail &&
                              touched.supportContactEmail ? (
                                <div>{errors.supportContactEmail}</div>
                              ) : null
                            }
                          />
                        </Input.Wrapper>
                      </div>
                      <div className="flex justify-between items-center w-full md:w-52 mt-8 mb-6">
                        <h1 className="text-sm">Vendor Status</h1>
                        <Switch
                          onLabel={<BsCheckLg size="1rem" color="white" />}
                          offLabel={<RxCross2 size="1rem" color="red" />}
                          name="vendorStatus"
                          onChange={handleChange}
                          checked={values.vendorStatus}
                          className="!cursor-pointer"
                          disabled={!props?.edit}
                        />
                      </div>
                    </div>
                  </Card>
                  {!location.pathname.endsWith("/new") && (
                    <>
                      <AssociateVariantA
                        project={true}
                        deviceGroup={true}
                        title="Relationship"
                        vendorId={props?.vendorId}
                        projectSubType={"associate_project_vendor"}
                        deviceGroupSubType={"associate_vendor_devicegroup"}
                        disassociateProjectSubType={
                          "disassociate_project_vendor"
                        }
                        disassociateDeviceGroupSubType={
                          "disassociate_vendor_devicegroup"
                        }
                        projects={props?.data?.project}
                        deviceGroups={props?.data?.deviceGroups}
                        fetch={props?.fetch}
                        edit={props?.edit}
                      />
                      <ActivitiesVariantA
                        type="vendor"
                        vendorId={`${props?.vendorId}`}
                      />
                    </>
                  )}
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
                              label="Vendor Id"
                              className="w-full mr-4 h-16 "
                            >
                              <Input
                                value={props?.vendorId}
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
                  {props?.edit && (
                    <div className=" pt-4 border-t-2 border-[#202E61]">
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
