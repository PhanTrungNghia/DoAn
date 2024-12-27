using System.DirectoryServices.Protocols;
using System.Text.Json;
using dotnet_employee_management.Authorization;
using dotnet_employee_management.Dto.Request;
using dotnet_employee_management.Models;
using dotnet_employee_management.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NPOI.SS.Formula.Functions;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace dotnet_employee_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private readonly IAdmissionService _admissionService;
        private ILogger<AdmissionController> _logger;
        private readonly IConfiguration _config;

        public AdmissionController(IAdmissionService admissionService, ILogger<AdmissionController> logger)
        {
            _admissionService = admissionService;
            _logger = logger;
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            _logger.LogInformation("Input", JsonSerializer.Serialize(file));
            try
            {
                int count = await _admissionService.ImportCandidates(file: file, config: _config);
                var response = new
                {
                    Message = "Admission created successfully",
                    Count = count,
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return NotFound("Failed to import Admissions");
            }
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("upload-confirmation")]
        public async Task<IActionResult> UploadConfirmation(IFormFile file)
        {
            try
            {
                await _admissionService.ImportConfirmAdmission(file: file, config: _config);
                var response = new
                {
                    Message = "Import Confirmation successfully",
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return NotFound("Failed to import confirm Admissions");
            }
        }

        /// <summary>
        /// Lấy ra thông tin của Admission
        /// </summary>
        /// <returns></returns>
        [HttpGet("get")]
        public async Task<IActionResult> GetAdmissions()
        {
            var admissions = await _admissionService.GetAllAsync();
            return Ok(admissions);
        }

        /// <summary>
        /// Lấy ra thông tin của Admission bằng id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetAdmissionById(int id)
        {
            var result = await _admissionService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound("Failed to locate Admission");
        }

        /// <summary>
        /// Thêm một Admission mới
        /// </summary>
        /// <param name="admission"></param>
        /// <returns></returns>
        [Authorize(Roles = Role.Admin)]
        [HttpPost("add")]
        public async Task<IActionResult> AddAdmission([FromBody]Admission admission)
        {
            var count = await _admissionService.AddAsync(admission);

            var response = new
            {
                Message = "Admission created successfully",
                Count = count
            };

            return count > 0 ? Ok(response) : NotFound("Unable to create Admission");
        }

        /// <summary>
        /// Cập nhật thông tin cho Admission
        /// </summary>
        /// <param name="admission"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAdmission(Admission admission)
        {
            var count = await _admissionService.UpdateAsync(admission);

            var resp = new
            {
                Message = "Admission updated successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("Admission failed to update");
        }

        /// <summary>
        /// Xóa thông tin 1 Admission dựa trên id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = Role.Admin)]
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteAdmission(int id)
        {
            var count = await _admissionService.DeleteAsync(id);

            var resp = new
            {
                Message = "Admission deleted successfully",
                Count = count
            };

            return count > 0 ? Ok(resp) : NotFound("Admission failed to delete");
        }

        /// <summary>
        /// Xác nhận trúng tuyển
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize(Roles = Role.Admin)]
        [HttpPost("confirm-admission")]
        public async Task<IActionResult> ConfirmAdmission([FromBody] List<int> cr)
        {
            await _admissionService.ConfirmAdmission(cr);

            //var resp = new
            //{
            //    Message = "Admission deleted successfully",
            //    Count = count
            //};

            //return count > 0 ? Ok(resp) : NotFound("Admission failed to delete");
            return Ok("Xác nhận trúng tuyển thành công");
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("unconfirm-admission")]
        public async Task<IActionResult> UnConfirmAdmission([FromBody] List<int> cr)
        {
            await _admissionService.UnConfirmAdmission(cr);

            //var resp = new
            //{
            //    Message = "Admission deleted successfully",
            //    Count = count
            //};

            //return count > 0 ? Ok(resp) : NotFound("Admission failed to delete");
            return Ok("Hủy xác nhận trúng tuyển thành công");
        }
    }
}
