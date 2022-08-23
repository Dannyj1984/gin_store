using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            //'using' is the equivelant of adding finally to a try/catch block
            //disposes of any resources scope is using
            using var scope = host.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            //Log any exceptions inside the program class and show on terminal
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                context.Database.Migrate(); // Does the same as dotnet ef database update on CLI
                DbInitilizer.Initialize(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
