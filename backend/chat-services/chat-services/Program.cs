using chat_services.Hubs;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

//Add signalR
builder.Services.AddSignalR();

//Enable Cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(configuration.GetValue<string>("ClientURL"))
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseRouting();

app.UseCors();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chat");
});

app.Run();
