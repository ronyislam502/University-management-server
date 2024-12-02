import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Admin is getting successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is getting successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminFromDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin was updated successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is deleted successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
