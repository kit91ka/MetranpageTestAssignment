using Microsoft.AspNetCore.Mvc;

namespace worker.Controllers
{
  public class BuildRequest 
  {
    public int? id { get; set; }
    public Template? template { get; set; }
  }

  public class Template
  {
      public int? id { get; set; }
      public string? arg1 { get; set; }
      public string? arg2 { get; set; }
  }

  [Route("/")]
  [ApiController]
  public class AppController : ControllerBase
  {

    public AppController()
    {
    }

    [HttpPost("build")]
    public async Task<IActionResult> build(BuildRequest requestData)
    {
      await Task.CompletedTask;
      Console.WriteLine(requestData.ToString());
      return Ok(new { success = true, buildedProject = $"Project ID {requestData.id} Template args: "
        + $"arg1 = {requestData.template.arg1}, arg2 = arg1-2 {requestData.template.arg2}" });
    }
    [HttpGet("qq")]
    public async Task<IActionResult> qq()
    {
      await Task.CompletedTask;
      return Ok(new { success = true, buildedProject = "ok"});
    }
  }
}
