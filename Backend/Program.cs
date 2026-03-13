using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

string connectionString =
builder.Configuration.GetConnectionString("DefaultConnection");

app.MapGet("/users", async () =>
{
    var users = new List<object>();

    using SqlConnection conn = new(connectionString);
    await conn.OpenAsync();

    SqlCommand cmd = new("SELECT Id, Name FROM Users", conn);
    var reader = await cmd.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        users.Add(new
        {
            id = reader.GetInt32(0),
            name = reader.GetString(1)
        });
    }

    return users;
});

app.Run();