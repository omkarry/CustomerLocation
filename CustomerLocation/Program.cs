using CustomerLocation.Data.DBContext;
using CustomerLocation.Service.Interfaces;
using CustomerLocation.Service.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddPolicy("ReactPolicy", builder =>
{
    builder.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin();
}));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<CustomerLocationContext>(options =>
options.UseSqlServer("name=ConnectionStrings:DefaultConnection", b => b.MigrationsAssembly("CustomerLocation")));
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped<ICustomerLocationRepository, CustomerLocationService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
