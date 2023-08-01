using System.Data;
using System.Data.SQLite;
using integrationMvcReact;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();


builder.Services.AddScoped<ContactsContext>((_) =>
{
    string file = builder.Configuration.GetValue<string>("SQLiteDb");
    string cstr = "Data Source=" + file; //+ ";providerName=\"System.Data.SQLite\"";

    var opts = new DbContextOptionsBuilder<ContactsContext>()
        .UseSqlite(cstr);

    return new ContactsContext(opts.Options);
    //return new ContactsContext(cstr);
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
