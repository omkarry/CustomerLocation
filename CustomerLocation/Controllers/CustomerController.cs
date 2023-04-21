using CustomerLocation.Data.DBContext;
using CustomerLocation.Data.Models;
using CustomerLocation.Service.DTOs;
using CustomerLocation.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CustomerLocation.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerLocationRepository _customerLocation;

        public CustomerController(ICustomerLocationRepository customerLocation)
        {
            _customerLocation = customerLocation;
        }

        /// <summary>
        /// Returns all customers
        /// </summary>
        /// <returns>List of cutomers</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Customers
        ///     
        /// </remarks>
        /// <response code="200">Returns List of customers</response>
        /// <response code="500">Internal server Error</response>
        [HttpGet("Customers")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                var customers = _customerLocation.GetCustomers();
                if (customers.ToList().Count == 0)
                {
                    return Ok(new ApiResponse<object> { StatusCode = 200, Message = ResponseMessages.NoCustomers });
                }
                else
                    return Ok(new ApiResponse<List<CustomerDto>> { StatusCode = 200, Message = ResponseMessages.CustomerList, Result = customers.ToList() });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Returns specific customer
        /// </summary>
        /// <returns>A requested customer</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Customer/{id}
        ///
        /// </remarks>
        /// <response code="200">Returns the requested customer</response>
        /// <response code="404">Customer not found</response>
        /// <response code="500">Internal server Error</response>
        [HttpGet("Customer/{id}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status500InternalServerError)]
        public ActionResult Get(int id)
        {
            try
            {
                var customer = _customerLocation.GetCustomer(id);
                if (customer == null)
                    return NotFound(new ApiResponse<object> { StatusCode = 404, Message = ResponseMessages.CustomerNotFound });
                else
                    return Ok(new ApiResponse<CustomerDto> { StatusCode = 200, Message = ResponseMessages.CustomerDetails, Result = customer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Creates a Customer.
        /// </summary>
        /// <returns>A newly created Customer</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/Customer
        ///     {
        ///        "id": 0,
        ///        "firstName": string,
        ///        "lastName": string,
        ///        "locations": [
        ///             {
        ///                 "id": 0,
        ///                 "addreess": string
        ///             }
        ///         ]
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Returns the newly created customer</response>
        /// <response code="400">Entered data is not in correct format</response>
        /// <response code="500">Internal server Error</response>
        [HttpPost("Customer")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(void), StatusCodes.Status500InternalServerError)]
        public IActionResult Post(CustomerDto newCustomer)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new ApiResponse<object> { StatusCode = 400, Message = ResponseMessages.DataFormat });

                else
                {
                    _customerLocation.AddCustomer(newCustomer);
                    return Ok(new ApiResponse<object> { StatusCode = 200, Message = ResponseMessages.CustomerAdd });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("Customer")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(void), StatusCodes.Status500InternalServerError)]
        public IActionResult Put(CustomerDto customer)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(new ApiResponse<object> { StatusCode = 400, Message = ResponseMessages.DataFormat });
                else
                {
                    CustomerDto updatedCustomer = _customerLocation.UpdateCustomer(customer);
                    if (updatedCustomer == null)
                        return NotFound(new ApiResponse<CustomerDto> { StatusCode = 404, Message = ResponseMessages.CustomerNotFound, Result = customer });
                    else
                        return Ok(new ApiResponse<CustomerDto> { StatusCode = 200, Message = ResponseMessages.CustomerUpdate, Result = updatedCustomer });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Deletes a Customer.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     DELETE /api/Customer/{id}
        ///
        /// </remarks>
        /// <response code="200">Customer deleted successfully</response>
        /// <response code="404">Customer not found</response>
        /// <response code="500">Internal server Error</response>

        [HttpDelete("Customer/{id}")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(void), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(void), StatusCodes.Status500InternalServerError)]
        public IActionResult Delete(int id)
        {
            try
            {
                bool customerDeleted = _customerLocation.DeleteCustomer(id);
                if (customerDeleted)
                    return Ok(new ApiResponse<object> { StatusCode = 200, Message = ResponseMessages.CustomerDelete });
                else
                    return NotFound(new ApiResponse<object> { StatusCode = 404, Message = ResponseMessages.CustomerNotFound });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Customer/IsEmailExist/{email}")]
        public IActionResult IsEmailExist(string email)
        {
            try
            {
                bool ext= _customerLocation.IsEmailExist(email);
                if (ext)
                {
                    return Ok(new ApiResponse<bool> { StatusCode = 200, Message="Customer already exist with this email", Result = true });
                }
                else
                {
                    return Ok(new ApiResponse<bool> { StatusCode = 200, Result = false });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("Customer/IsPhoneExist/{phone}")]
        public IActionResult IsPhoneExist(string phone)
        {
            try
            {
                bool ext = _customerLocation.IsPhoneExist(phone);
                if (ext)
                {
                    return Ok(new ApiResponse<bool> { StatusCode = 200, Message = "Customer already exist with this phone number.", Result = true });
                }
                else
                {
                    return Ok(new ApiResponse<bool> { StatusCode = 200, Result = false });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}